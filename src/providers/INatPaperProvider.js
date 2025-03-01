// @flow

import INatIcon from "components/INatIcon";
import type { Node } from "react";
import * as React from "react";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import colors from "styles/tailwindColors";

const theme = {
  ...DefaultTheme,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.darkGray,
    onPrimary: colors.white,
    secondary: colors.focusGreen,
    onSecondary: colors.white,
    background: colors.white,
    error: colors.warningRed,
    onError: colors.white
  }
};

// eslint-disable-next-line react/jsx-props-no-spreading
const renderCustomIcon = props => <INatIcon {...props} />;

type Props = {
  children: any
}

const INatPaperProvider = ( { children }: Props ): Node => (
  <PaperProvider
    settings={{
      icon: renderCustomIcon
    }}
    theme={theme}
  >
    {children}
  </PaperProvider>
);

export default INatPaperProvider;
