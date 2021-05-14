import styled from "styled-components";

export const StyledProgress = styled.svg`
  display: block;
  max-width: 100%;

  .svg-circle-bg {
    fill: none;
  }

  .svg-circle {
    fill: none;
    transition: stroke-dashoffset 850ms ease-in-out;
  }

  .svg-circle-text {
    text-anchor: middle;
    font-weight: 300;
    font-size: 0.875rem;
  }
`;
