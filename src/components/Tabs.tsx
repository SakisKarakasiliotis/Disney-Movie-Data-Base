import { useState } from "react";
import styled from "styled-components";

interface TabsProps {
  defaultIndex: number;
  labels: string[];
  children: React.ReactNode[];
}

export default function Tabs({ defaultIndex, labels, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultIndex);

  if (!children) return null;

  const activeTabItem = children[activeTab];

  if (!activeTabItem) return null;

  return (
    <StyledTabs>
      <ul className="labels" role="tablist" aria-label="tabs">
        {labels.map((label, index) => (
          <li key={label}>
            <button
              className={`${activeTab === index ? "active" : ""}`}
              key={label}
              onClick={() => setActiveTab(index)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="content">{activeTabItem}</div>
    </StyledTabs>
  );
}

const StyledTabs = styled.nav`
  margin-top: var(--spacing-large);

  .labels {
    display: flex;
    column-gap: var(--spacing-xsmall);
    padding: 0;
    margin: 0;
    list-style: none;
    border-bottom: 1px solid var(--border-color);

    li {
      button {
        padding: var(--spacing-small) var(--spacing-medium);
        border: none;
        background: none;
        cursor: pointer;
        font-size: var(--font-size-large);
        font-weight: 500;
        color: var(--text-color);
        opacity: 0.5;
        transition: opacity 0.2s;

        &:hover,
        &.active {
          opacity: 1;
        }
      }
    }
  }

  .content {
    padding: var(--spacing-large) var(--spacing-medium);
  }
`;
