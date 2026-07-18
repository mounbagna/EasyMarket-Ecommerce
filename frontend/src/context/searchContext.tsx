import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchInput: string;
  setSearchInput: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a ModalProvider");
  }
  return context;
};

export const SearchProvider = ({ children }:{children: React.ReactNode}) => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider value={{searchInput, setSearchInput, search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}; 