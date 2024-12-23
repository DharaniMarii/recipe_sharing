import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../utils/api';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const data = await fetchRecipes();
      setRecipes(data);
    }
    loadRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Recipe Share</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
