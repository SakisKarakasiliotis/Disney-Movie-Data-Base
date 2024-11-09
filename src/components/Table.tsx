import { useCallback, useState, useMemo } from "react";
import { DisneyCharacter } from "../services/types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

interface TableProps {
  disneyCharacters: DisneyCharacter[];
  isFetching: boolean;
  setSelectedDisneyCharacter: (character: DisneyCharacter) => void;
}

type sortDirection = "asc" | "desc" | "";

const HEADERs = [
  { key: "name", label: "Name", sort: true },
  { key: "films", label: "Films", sort: true },
  { key: "tvShows", label: "TV Shows", sort: true },
  { key: "videoGames", label: "Video Games", sort: true },
  { key: "allies", label: "Allies", sort: false },
  { key: "enemies", label: "Enemies", sort: false },
];

/**
 * SortIcon component to display the appropriate sort icon based on the sortedBy state
 */
const SortIcon = ({
  headerKey,
  sortedBy,
}: {
  headerKey: string;
  sortedBy: { key: string; direction: sortDirection };
}) => {
  if (sortedBy.key !== headerKey) return <FontAwesomeIcon icon={faSort} />;

  let icon;

  switch (sortedBy.direction) {
    case "asc":
      icon = faSortUp;
      break;
    case "desc":
      icon = faSortDown;
      break;
    default:
      icon = faSort;
  }

  return <FontAwesomeIcon icon={icon} />;
};

/**
 * Table component to display a sortable table of Disney characters
 */
export default function Table({
  disneyCharacters,
  isFetching,
  setSelectedDisneyCharacter,
}: TableProps) {
  const [sortedBy, setSortedBy] = useState<{
    key: string;
    direction: sortDirection;
  }>({ key: "", direction: "" });

  /**
   * Function to toggle the sortedBy state based on the key
   */
  const toggleSortedBy = useCallback(
    (key: string) => {
      switch (sortedBy.direction) {
        case "asc":
          setSortedBy({ key, direction: "desc" });
          break;
        case "desc":
          setSortedBy({ key, direction: "" });
          break;
        default:
          setSortedBy({ key, direction: "asc" });
      }
    },
    [sortedBy.direction],
  );

  /**
   * Memoized function to sort the Disney characters based on the sortedBy state
   */
  const sortedDisneyCharacters = useMemo(() => {
    if (sortedBy.key === "" || sortedBy.direction === "")
      return disneyCharacters;

    return [...disneyCharacters].sort((a, b) => {
      const key = sortedBy.key as keyof DisneyCharacter;
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (typeof a[key] === "string" && typeof b[key] === "string") {
        aValue = a[key];
        bValue = b[key];
      }
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        aValue = a[key].length;
        bValue = b[key].length;
      }

      if (sortedBy.direction === "asc") {
        return aValue <= bValue ? -1 : 1;
      }
      return bValue >= aValue ? 1 : -1;
    });
  }, [disneyCharacters, sortedBy]);

  return (
    <StyledTable $isFetching={isFetching}>
      <table>
        <thead>
          <tr>
            {HEADERs.map(
              ({
                key,
                label,
                sort,
              }: {
                key: string;
                label: string;
                sort: boolean;
              }) => (
                <th key={key}>
                  {label}
                  {sort && (
                    <button type="button" onClick={() => toggleSortedBy(key)}>
                      <SortIcon headerKey={key} sortedBy={sortedBy} />
                    </button>
                  )}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {!isFetching && !disneyCharacters.length && (
            <tr>
              <td className="no-results" colSpan={6}>
                No results found
              </td>
            </tr>
          )}
          {sortedDisneyCharacters.map((disneyCharacter: DisneyCharacter) => (
            <tr key={disneyCharacter._id}>
              <td>
                <button
                  type="button"
                  onClick={() => setSelectedDisneyCharacter(disneyCharacter)}
                >
                  {disneyCharacter.name}
                </button>
              </td>
              <td>{disneyCharacter.films?.length}</td>
              <td>{disneyCharacter.tvShows?.length}</td>
              <td>{disneyCharacter.videoGames?.length}</td>
              <td>
                {disneyCharacter.allies?.length
                  ? disneyCharacter.allies?.join(", ")
                  : "-"}
              </td>
              <td>
                {disneyCharacter.enemies?.length
                  ? disneyCharacter.enemies?.join(", ")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}

const StyledTable = styled.div<{ $isFetching: boolean }>`
  overflow: auto;

  table {
    width: 100%;
    border-top: 1px solid var(--border-color);
    border-radius: 4px;
    box-shadow: none;
    border-collapse: collapse;
    opacity: ${(props) => (props.$isFetching ? 0.5 : 1)};
    pointer-events: ${(props) => (props.$isFetching ? "none" : "auto")};
    transition: opacity 0.2s;
    margin-block: var(--spacing-medium);
  }

  tr {
    border: 0;
    background-color: var(--white-color);
    position: relative;

    + tr {
      border-top: 1px solid var(--border-color);
    }
  }

  th {
    background-color: var(--primary-color);
    color: var(--light-text-color);
    padding: var(--spacing-small) var(--spacing-medium);
    text-align: left;
    position: relative;

    button {
      border: 0;
      background: 0;
      color: var(--light-text-color);
      font-size: var(--font-size-medium);
      padding: 0;
      cursor: pointer;
      text-align: left;
      margin-left: var(--spacing-xsmall);

      &:after {
        content: "";
        position: absolute;
        inset: 0;
      }
    }
  }

  td {
    border: 0;
    padding: var(--spacing-small) var(--spacing-medium);
    vertical-align: top;
    color: var(--dark-text-color);
    text-align: left;

    button {
      border: 0;
      background: 0;
      color: var(--dark-text-color);
      font-size: var(--font-size-medium);
      padding: 0;
      cursor: pointer;
      text-align: left;

      &:after {
        content: "";
        position: absolute;
        inset: 0;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: var(--highlight-color);
        color: var(--light-text-color);
        cursor: pointer;
      }
    }
  }

  .no-results {
    text-align: center;
  }
`;
