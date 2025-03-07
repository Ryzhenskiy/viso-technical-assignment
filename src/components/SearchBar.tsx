import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!searchQuery.trim()) return;

    const encodedSearchQuery = encodeURIComponent(searchQuery);
    navigate(`/?q=${encodedSearchQuery}`);
    setSearchQuery('');
  };

  return (
    <form className="flex items-center " onSubmit={onSearch}>
      <input
        value={searchQuery}
        onChange={(ev) => setSearchQuery(ev.target.value)}
        type="text"
        placeholder="What do you find?"
        className="p-2 border shadow-md border-gray-300 rounded-sm focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
