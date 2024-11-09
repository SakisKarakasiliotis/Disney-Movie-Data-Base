import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalPages: number;
};

export default function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages,
}: PaginationProps) {
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="current-page">{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
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

    button {
      padding: var(--spacing-xsmall);
      border: none;
      background: none;
      cursor: pointer;
      color: var(--text-color);
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
      color: var(--text-color);
    }
  }
`;
