'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
}

export default function Autocomplete() {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchCharacters, { data, loading }] = useLazyQuery(SEARCH_CHARACTERS);
  const [isShowDropdown, setIsShowDropDown] =  useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length) {
        setIsShowDropDown(true)
        searchCharacters({ variables: { name: value } });
    }
  };

  const handleSuggestionClick = (name: string, e: MouseEvent<HTMLLIElement>) => {
    setInputValue(name);
    setIsShowDropDown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search characters..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      { loading && <p>Loading...</p>}
      { isShowDropdown && data && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto shadow-lg">
          {data.characters.results.map((character: Character) => (
            <li className="px-5 py-2 cursor-pointer hover:bg-slate-100" key={character.id} onClick={(e) => handleSuggestionClick(character.name, e)}>
              {character.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}