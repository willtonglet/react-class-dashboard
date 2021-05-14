import styled from "styled-components";
import { MenuProps } from ".";

interface StyledMenuProps extends MenuProps {
  isMenuOpen: boolean;
}

export const StyledMenu = styled.aside<StyledMenuProps>`
  transition: 0.15s ease-in-out;

  ${({ isMenuOpen }) => !isMenuOpen && "width: 0;"}
  ${({ headerHeight }) => `height: calc(100vh - ${headerHeight}px);`}

  .wrapper {
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
    white-space: nowrap;
  }
`;
