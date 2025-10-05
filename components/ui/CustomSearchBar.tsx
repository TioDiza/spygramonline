import React, { useState } from 'react';
import SearchIcon from '../icons/SearchIcon'; // Reutilizando o ícone de busca existente

interface CustomSearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove o caractere '@' da entrada do usuário
    const sanitizedValue = e.target.value.replace(/@/g, '');
    setQuery(sanitizedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex justify-center items-center">
      <label className="relative block w-[350px] flex rounded-full border-2 border-[#373737] py-[15px] px-2 pl-[10px] text-left">
        <input
          type="text"
          value={query}
          onChange={handleChange} // Usando o novo handler para filtrar o '@'
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'Searching...' : 'Ex: neymarjr (sem @)'} // Novo texto do placeholder
          className="bg-transparent outline-none border-none text-[#c5c5c5] text-base w-full pr-8 focus:outline-none"
          disabled={isLoading}
        />
        <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out text-[#c5c5c5]">
          <SearchIcon className="w-5 h-5" />
        </div>
      </label>
    </form>
  );
};

export default CustomSearchBar;