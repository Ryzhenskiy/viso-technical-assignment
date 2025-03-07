import axios from 'axios';
import { Meal } from '../types/meal';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}categories.php`);
    return response.data.categories.map(
      (category: { strCategory: string }) => category.strCategory
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getAreas = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    return response.data.meals.map((area: { strArea: string }) => area.strArea);
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
};

export const fetchMealsByCategory = async (
  category: string
): Promise<Meal[]> => {
  try {
    const response = await axios.get(`${API_URL}filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    return [];
  }
};

export const fetchMealsByArea = async (area: string): Promise<Meal[]> => {
  try {
    const response = await axios.get(`${API_URL}filter.php?a=${area}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching meals by area:', error);
    return [];
  }
};

export const fetchMealById = async (id: string): Promise<Meal | null> => {
  const response = await axios.get(
    `https://corsproxy.io/?${API_URL}lookup.php?i=${id}`
  );
  return response.data.meals ? response.data.meals[0] : null;
};

export const fetchMealsBySearch = async (query: string): Promise<Meal[]> => {
  const response = await axios.get(`${API_URL}search.php?s=${query}`);
  return response.data.meals || [];
};

export const getAllMeals = async () => {
  const categories = await getCategories();
  const areas = await getAreas();

  const uniqueMeals = new Map<string, any>();

  for (const area of areas) {
    const mealsRes = await fetchMealsByArea(area);
    for (const meal of mealsRes) {
      const mealId = meal.idMeal;
      if (!uniqueMeals.has(mealId)) {
        uniqueMeals.set(mealId, { ...meal, strArea: area, strCategory: '' });
      } else {
        uniqueMeals.get(mealId).strArea = area;
      }
    }
  }

  for (const category of categories) {
    const mealsRes = await fetchMealsByCategory(category);
    for (const meal of mealsRes) {
      const mealId = meal.idMeal;
      if (!uniqueMeals.has(mealId)) {
        uniqueMeals.set(mealId, {
          ...meal,
          strCategory: category,
          strArea: '',
        });
      } else {
        uniqueMeals.get(mealId).strCategory = category;
      }
    }
  }

  return Array.from(uniqueMeals.values());
};
