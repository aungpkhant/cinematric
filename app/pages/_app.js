import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

import { ProvideAuth } from "@/hooks/useAuth";

import theme from "@/styles/theme";
import { AppUiStateProvider } from "@/hooks/useAppUiState";

// ! Put this style in globals to debug
// * {
//   outline: solid 2px hsla(0, 100%, 50%, 0.5);
// }

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            background-color: ${theme.colors.elevation["100"]};
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <GlobalStyle>
        <ProvideAuth>
          <AppUiStateProvider>
            <Component {...pageProps} />
          </AppUiStateProvider>
        </ProvideAuth>
      </GlobalStyle>
    </ChakraProvider>
  );
}
export default MyApp;
