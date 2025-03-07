import { Meal } from '../types/meal';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFavourite } from '../redux/slices/favouritesSlice';

import { Link } from 'react-router-dom';

interface RecipeCardProps {
  meal: Meal;
  onRemove?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal, onRemove }) => {
  const dispatch = useDispatch();

  const removeRecipe = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFavourite(meal.idMeal));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 relative">
      <Link to={`/recipe/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-gray-500">Category: {meal.strCategory}</p>
        <p className="text-sm text-gray-500">
          Origin: {meal.strArea || 'Unknown'}
        </p>
      </div>

      {/* Buttons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        {!!onRemove && (
          <button
            onClick={removeRecipe}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
