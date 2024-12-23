from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from typing import List
from . import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RecipeBase(BaseModel):
    title: str
    description: str
    image_url: str

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int
    average_rating: float

    class Config:
        orm_mode = True


@app.get("/")
def read_root():
    return {"message": "Welcome to the Recipe Share API"}

@app.get("/recipes", response_model=List[Recipe])
def read_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    recipes = db.query(models.Recipe).offset(skip).limit(limit).all()
    return recipes

@app.post("/recipes/{recipe_id}/rate")
def rate_recipe(recipe_id: int, score: int, db: Session = Depends(get_db)):
    if score < 1 or score > 5:
        raise HTTPException(status_code=400, detail="Score must be between 1 and 5")
    
    recipe = db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    rating = models.Rating(recipe_id=recipe_id, score=score)
    db.add(rating)
    db.commit()
    
    # Update average rating
    avg_rating = db.query(func.avg(models.Rating.score)).filter(models.Rating.recipe_id == recipe_id).scalar()
    recipe.average_rating = avg_rating
    db.commit()
    
    return {"message": "Rating submitted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
