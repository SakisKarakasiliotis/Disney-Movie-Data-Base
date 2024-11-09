import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalPages: number;
}

/**
 * Pagination component to navigate through pages and set page size.
 */
export default function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages,
}: PaginationProps): JSX.Element {
  return (
    <StyledPagination>
      <div className="page-size">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
      </div>

      <div className="actions">
        <button disabled={page === 1} onClick={() => setPage(1)}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span className="current-page">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: var(--spacing-small);

  .actions {
    display: flex;
    column-gap: var(--spacing-small);
    align-items: center;

    button {
      padding: var(--spacing-xsmall);
      border: none;
      background: none;
      cursor: pointer;
      color: var(--dark-text-color);
      transition: opacity 0.2s;

      &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
      }
    }

    .current-page {
      font-size: var(--font-size-medium);
    }
  }

  .page-size {
    select {
      padding: var(--spacing-xsmall);
      border: none;
      background: none;
      cursor: pointer;
      font-size: var(--font-size-medium);
      color: var(--dark-text-color);
    }
  }
`;
