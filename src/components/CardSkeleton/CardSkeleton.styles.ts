import { css } from '@emotion/react';

export const overview = css`
  .overview-header {
    position: relative;
    width: 100%;
    overflow: hidden;

    .overview-header-meta {
      height: 22px;
      font-size: 14px;
      line-height: 22px;
    }

    .overview-header-count {
      height: 38px;
      margin-top: 4px;
      margin-bottom: 0;
      overflow: hidden;
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    .overview-header-action {
      position: absolute;
      top: 4px;
      right: 0;
      line-height: 1;
      cursor: pointer;
    }
  }

  .overview-body {
    height: 46px;
    margin-bottom: 12px;
    position: relative;
  }

  .overview-footer {
    margin-top: 8px;
    padding-top: 9px;
    border-top: 1px solid #292a2d;
  }
`;
