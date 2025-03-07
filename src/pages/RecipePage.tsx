import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { fetchMealById } from '../services/api';
import { Meal } from '../types/meal';
import { useDispatch } from 'react-redux';
import { addFavourite } from '../redux/slices/favouritesSlice';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  function handleAddTofavourites() {
    setIsFavorite(!isFavorite);
    dispatch(addFavourite(meal));
  }

  useEffect(() => {
    if (id) {
      fetchMealById(id).then(setMeal);
    }
  }, [id]);

  if (!meal) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {meal.strMeal}
        </h1>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />

        <div className="flex justify-between text-gray-600 text-sm mb-4">
          <span>
            🍽 Category: <strong>{meal.strCategory}</strong>
          </span>
          <span>
            🌍 Origin: <strong>{meal.strArea || 'Unknown'}</strong>
          </span>
        </div>

        {!isFavorite && (
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
              isFavorite ? 'bg-red-500' : 'bg-gray-400'
            } transition hover:bg-red-600`}
            onClick={handleAddTofavourites}
          >
            <Heart className="w-5 h-5" />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => ({
                ingredient: meal[`strIngredient${num}` as keyof Meal],
                measure: meal[`strMeasure${num}` as keyof Meal],
              }))
              .filter((item) => item.ingredient)
              .map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
