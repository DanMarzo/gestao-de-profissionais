import React from 'react';
import {useColorScheme} from 'react-native';
import {EspecialidadeProvider} from './src/providers/Especialidade.context';
import themeLight from './theme.json';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {Routes} from './src/views/route';

const theme: ThemeProp = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: themeLight['color-primary-500'],
    secondary: themeLight['color-primary-500'],
  },
};

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={theme}>
      <EspecialidadeProvider>
        <Routes />
      </EspecialidadeProvider>
    </PaperProvider>
  );
};

export default App;
