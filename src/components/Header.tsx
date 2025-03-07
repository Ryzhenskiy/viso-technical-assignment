import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Header = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        🍽️ RecipeFinder
      </Link>

      <SearchBar />

      <Link to="/favourites" className="relative">
        <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition duration-200" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {favourites.length}
        </span>
      </Link>
    </header>
  );
};

export default Header;
