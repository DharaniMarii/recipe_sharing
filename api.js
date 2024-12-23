const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Use API_URL in your fetch calls

export async function fetchRecipes() {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
}

export async function rateRecipe(recipeId, score) {
  const response = await fetch(`${API_URL}/recipes/${recipeId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit rating');
  }
  return response.json();
}
