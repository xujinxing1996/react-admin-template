import { css } from '@emotion/react';

export const trendStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .trend-item {
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    &:first-of-type {
      margin-right: 16px;
    }
    svg {
      vertical-align: middle;
    }
    > * {
      margin-right: 8px;
      &:nth-of-type(2) {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
`;
