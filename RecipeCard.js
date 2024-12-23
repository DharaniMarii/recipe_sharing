import Image from 'next/image';
import StarRating from './StarRating';

export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={recipe.image_url} alt={recipe.title} width={400} height={300} objectFit="cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <StarRating initialRating={recipe.average_rating} recipeId={recipe.id} />
      </div>
    </div>
  );
}
