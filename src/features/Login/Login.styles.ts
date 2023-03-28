import { css } from '@emotion/react';

export const loginStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  & .login-form {
    width: 300px;
    padding: 50px 40px 10px;
    border-radius: 10px;
    h2 {
      text-align: center;
    }
    & .login-form-button {
      width: 100%;
    }
  }
`;
