import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFavourite } from '../redux/slices/favouritesSlice';
import RecipeCard from '../components/RecipeCard';

const Favourites = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const uniqueIngredients = new Set<string | undefined | boolean>();

  favourites.forEach((meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof typeof meal];
      if (ingredient) uniqueIngredients.add(ingredient);
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Favorite Recipes</h1>

      {favourites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {favourites.map((meal) => (
              <RecipeCard meal={meal} onRemove={removeFavourite} />
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center">
              Total Ingredients
            </h2>
            <div className="grid grid-cols-5 gap-4 mt-4 p-2">
              {[...uniqueIngredients].map((ingredient, index) => (
                <div
                  key={index}
                  className="border text-center bg-white shadow-lg rounded-md py-2"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;
