import { useCallback, useEffect, useRef, useMemo } from "react";
import { DisneyCharacter } from "../services/types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface DialogProps {
  disneyCharacter: DisneyCharacter;
  setSelectedDisneyCharacter: (character: DisneyCharacter | null) => void;
}

/**
 * Dialog component to display details of a Disney character.
 */
export default function Dialog({
  disneyCharacter,
  setSelectedDisneyCharacter,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  /**
   * Closes the dialog and resets the selected Disney character.
   */
  const closeDialog = useCallback(() => {
    if (!disneyCharacter) return;
    document.body.style.overflow = "auto";
    dialogRef.current?.close();
    setSelectedDisneyCharacter(null);
  }, [disneyCharacter, setSelectedDisneyCharacter]);

  useEffect(() => {
    if (!disneyCharacter) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }, [disneyCharacter]);

  const catalog = useMemo(
    () => [
      {
        title: "Films",
        count: disneyCharacter?.films?.length ?? 0,
        items: disneyCharacter?.films ?? [],
      },
      {
        title: "TV Shows",
        count: disneyCharacter?.tvShows?.length ?? 0,
        items: disneyCharacter?.tvShows ?? [],
      },
      {
        title: "Video Games",
        count: disneyCharacter?.videoGames?.length ?? 0,
        items: disneyCharacter?.videoGames ?? [],
      },
    ],
    [disneyCharacter],
  );

  return (
    <StyledDialog ref={dialogRef} onClose={closeDialog}>
      <section aria-labelledby="header">
        <header>
          <h2 id="header">{disneyCharacter.name}</h2>
          <button onClick={closeDialog}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        <div className="dialog-content">
          <figure>
            <img src={disneyCharacter.imageUrl} alt="" />
          </figure>
          <ul className="catalog">
            {catalog.map(({ title, count, items }) => (
              <li key={title}>
                <strong>
                  {title} ({count}):
                </strong>
                <ul className="medium">
                  {items.length ? (
                    items.map((film: string) => <li key={film}>{film}</li>)
                  ) : (
                    <li>-</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </StyledDialog>
  );
}

const StyledDialog = styled.dialog`
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px;
  inset: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  background-color: var(--white-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin: 0;

  @media (min-width: 500px) {
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    max-height: 60vh;
    max-width: 500px;
    overflow: hidden;
    height: fit-content;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: var(--spacing-medium);
    padding-inline: var(--spacing-medium);
    padding-top: var(--spacing-medium);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    background-color: var(--white-color);

    @media (min-width: 500px) {
      position: static;
    }

    h2 {
      font-size: var(--font-size-large);
      margin: 0;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--dark-text-color);
      font-size: var(--font-size-large);
    }
  }

  .dialog-content {
    padding-block: var(--spacing-medium);
    padding-inline: var(--spacing-medium);

    @media (min-width: 500px) {
      display: grid;
      grid-template-columns: 200px 1fr;
      column-gap: var(--spacing-medium);
      overflow: auto;
      max-height: 500px;
    }

    figure {
      display: flex;
      height: fit-content;
      margin: 0;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      padding: var(--spacing-xsmall);
      margin-bottom: var(--spacing-medium);

      @media (min-width: 500px) {
        position: sticky;
        top: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .catalog {
      list-style: none;
      padding: 0;
      margin: 0;

      > li {
        padding-bottom: var(--spacing-medium);
        margin-bottom: var(--spacing-medium);
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid var(--border-color);

        &:last-child {
          border-bottom: 0;
        }

        strong {
          font-weight: 500;
          font-size: var(--font-size-medium);
          text-align: left;
          margin-bottom: var(--spacing-small);
        }

        span {
          color: var(--dark-text-color);
          font-size: var(--font-size-small);
          text-align: left;
        }
      }
    }

    .medium {
      li {
        font-size: var(--font-size-small);
        margin-bottom: var(--spacing-xsmall);
        text-align: left;
      }
    }
  }
`;
