import { DinseyCharacter } from "../services/types";
import styled from "styled-components";

type TableProps = {
  disneyCharacters: DinseyCharacter[];
  isFetching: boolean;
  setSelectedDisneyCharacter: (character: DinseyCharacter) => void;
};

export default function Table({
  disneyCharacters,
  isFetching,
  setSelectedDisneyCharacter,
}: TableProps) {
  return (
    <StyledTable $isFetching={isFetching}>
      <thead>
        <tr>
          <th>Name</th>
          <th>TV Shows</th>
          <th>Video Games</th>
          <th>Allies</th>
          <th>Enemies</th>
        </tr>
      </thead>
      <tbody>
        {disneyCharacters.map((disneyCharacter: DinseyCharacter) => (
          <tr
            key={disneyCharacter._id}
            onClick={() => setSelectedDisneyCharacter(disneyCharacter)}
          >
            <td>{disneyCharacter.name}</td>
            <td>{disneyCharacter.tvShows?.length}</td>
            <td>{disneyCharacter.videoGames?.length}</td>
            <td>{disneyCharacter.allies?.join(", ")}</td>
            <td>{disneyCharacter.enemies?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table<{ $isFetching: boolean }>`
  width: 100%;
  border-top: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: none;
  border-collapse: collapse;
  opacity: ${(props) => (props.$isFetching ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$isFetching ? "none" : "auto")};
  transition: opacity 0.2s;
  margin-block: var(--spacing-medium);

  tr {
    border: 0;
    background-color: white;
    padding: 0;

    + tr {
      border-top: 1px solid var(--border-color);
    }
  }

  th {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-small) var(--spacing-medium);
    text-align: left;
  }

  td {
    border: 0;
    padding: var(--spacing-small) var(--spacing-medium);
    vertical-align: top;
    color: var(--text-color);
    text-align: left;
  }

  tbody {
    tr {
      &:hover {
        background-color: var(--highlight-color);
        color: white;
        cursor: pointer;
      }
    }
  }
`;
