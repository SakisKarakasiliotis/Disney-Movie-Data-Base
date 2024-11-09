import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface SearchProps {
  /**
   * Function to be called when a search is performed.
   * value - The search input value.
   * type - The type of search (e.g., name, films, tvShows, videoGames).
   */
  onSearch: ({ value, type }: { value: string; type: string }) => void;
  isFetching: boolean;
}

/**
 * Search component that allows users to search by different types.
 * onSearch - Function to handle the search action.
 * isFetching - Boolean to disable input during fetching.
 */
export default function Search({ onSearch, isFetching }: SearchProps) {
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("name");

  const handleClick = useCallback((): void => {
    onSearch({ value, type });
  }, [onSearch, type, value]);

  return (
    <StyledSearch>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="name">Name</option>
        <option value="films">Films</option>
        <option value="tvShows">Shows</option>
        <option value="videoGames">Games</option>
      </select>
      <input
        type="search"
        value={value}
        disabled={isFetching}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        placeholder="Search"
      />
      <button type="button" onClick={handleClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  width: 100%;
  max-width: 500px;
  column-gap: var(--spacing-xsmall);

  select {
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--font-size-medium);
    color: var(--dark-text-color);
    padding: var(--spacing-small) var(--spacing-medium);

    &:focus {
      outline: none;
    }
  }

  input[type="search"] {
    border: none;
    background: none;
    font-size: var(--font-size-medium);
    color: var(--dark-text-color);
    padding: var(--spacing-small) var(--spacing-medium);
    border-left: 1px solid var(--border-color);
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: var(--spacing-xsmall);
    background-color: var(--primary-color);
    border: none;
    cursor: pointer;
    color: var(--light-text-color);
  }
`;
