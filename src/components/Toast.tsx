import { useState, useEffect } from "react";
import styled from "styled-components";

interface ToastProps {
  message: string;
}

/**
 * Toast component that displays a message for a short duration.
 */
export default function Toast({ message }: ToastProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  if (hide) return null;

  return <StyledToast>{message}</StyledToast>;
}

const StyledToast = styled.div`
  position: fixed;
  top: -100%;
  left: 50%;
  background-color: red;
  color: var(--light-text-color);
  font-size: var(--font-size-medium);
  padding: var(--spacing-small) var(--spacing-medium);
  max-width: 300px;
  width: 100%;
  box-shadow: 0 0 8px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 4px;
  translate: -50% 0;
  z-index: 1000;
  opacity: 0;
  animation: smooth-appear 0.5s ease forwards;

  @keyframes smooth-appear {
    to {
      top: var(--spacing-large);
      opacity: 1;
    }
  }
`;
