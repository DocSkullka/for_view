import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  body {
    a {
      color: white;
    }

    .notistack-Snackbar > div {
      background-color: transparent !important;
      padding: 0px 0;
    }

    .notistack-SnackbarContainer {
      flex-direction: column;
      top: 0;
      padding-top: 10px;
      width: 100%;
    }
  }
 
`;
