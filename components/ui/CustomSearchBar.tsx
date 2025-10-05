import React from 'react'; // Removido useState, pois o estado agora é gerenciado pelo pai
import SearchIcon from '../icons/SearchIcon';

interface CustomSearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  query: string; // Nova prop para a query
  setQuery: (query: string) => void; // Nova prop para atualizar a query
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ onSearch, isLoading, query, setQuery }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove o caractere '@' da entrada do usuário
    const sanitizedValue = e.target.value.replace(/@/g, '');
    setQuery(sanitizedValue); // Usa o setter da prop para atualizar a query
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query.trim()); }} className="w-full max-w-md mx-auto flex justify-center items-center">
      <label className="relative block w-[250px] flex rounded-md border-2 border-[#373737] py-[15px] px-2 pl-[10px] text-left">
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