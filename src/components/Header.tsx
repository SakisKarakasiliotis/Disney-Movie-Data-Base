import styled from "styled-components";

export default styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: var(--spacing-medium);

  @media (min-width: 1000px) {
    flex-direction: row;
    column-gap: var(--spacing-large);
  }
`;
