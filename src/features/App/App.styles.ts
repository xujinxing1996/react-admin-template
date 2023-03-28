import { css } from '@emotion/react';

export const contentStyles = css`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);

  .body {
    flex: auto;
    overflow: auto;
    padding: 6px;
  }
`;
