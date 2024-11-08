import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  onSearch: ({ value, type }: { value: string; type: string }) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("name");

  const handleClick = useCallback((): void => {
    onSearch({ value, type });
  }, [onSearch, type, value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="name">Name</option>
        <option value="films">Films</option>
      </select>
      <button type="button" onClick={handleClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
