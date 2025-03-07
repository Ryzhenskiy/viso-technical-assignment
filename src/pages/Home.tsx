import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMealsBySearch, getAllMeals } from '../services/api';
import { Meal, Category } from '../types/meal';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const [searchParams] = useSearchParams();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        let allMeals = [];
        if (searchQuery) {
          allMeals = await fetchMealsBySearch(searchQuery);
        } else {
          allMeals = await getAllMeals();
        }
        setMeals(allMeals);
        setFilteredMeals(allMeals);
      } catch (err) {
        setError('An error occurred while fetching meals.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [searchQuery]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(
      (res) => res.json().then((data) => setCategories(data.categories))
    );
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredMeals(
        meals.filter((meal) => meal.strCategory === selectedCategory)
      );
    } else {
      setFilteredMeals(meals);
    }
    setCurrentPage(1);
  }, [selectedCategory, meals]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedMeals = filteredMeals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-center my-4">
        <select
          className="p-2 rounded out"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 text-center">
        {displayedMeals.length > 0 ? (
          displayedMeals.map((meal) => <RecipeCard meal={meal} />)
        ) : (
          <h1 className="text-center">
            There are no products by this search :(
          </h1>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
};

export default Home;
