import styled from "styled-components";

export const StyledMain = styled.main<{ headerHeight: number }>`
  ${({ headerHeight }) => `height: calc(100vh - ${headerHeight}px);`}
`;
