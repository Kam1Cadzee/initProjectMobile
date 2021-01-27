import React, {useContext, useMemo} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actionsOther, selectorsOther} from '../redux/other/otherReducer';
const window = Dimensions.get('window');

export type Theme = 'dark' | 'light';

interface IThemeContext {
  onChangeTheme: (theme: Theme) => Theme;
  theme: Theme;

  primary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  backgroundDark: string;
  backgroundLight: string;
  border: string;
  text: string;
  lightText: string;
  darkText: string;
  errorColor: string;
}

const ThemeContext = React.createContext({} as IThemeContext);

const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

const ProviderTheme = ({children}: any) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectorsOther.getTheme);

  const value: IThemeContext = useMemo(() => {
    const primary = theme === 'light' ? '#18b860' : '#18b860';
    const secondaryLight = theme === 'light' ? '#cfaf8a' : '#cfaf8a';
    const secondaryDark = theme === 'light' ? '#ba8459' : '#ba8459';
    const background = theme === 'light' ? '#151517' : '#151517';
    const backgroundDark = theme === 'light' ? '#101010' : '#101010';
    const backgroundLight = theme === 'light' ? '#22242e' : '#22242e';
    const lightText = theme === 'light' ? '#9ea1b7' : '#9ea1b7';
    const darkText = theme === 'light' ? '#101010' : '#101010';
    const text = theme === 'light' ? '#ffffff' : '#ffffff';
    const border = theme === 'light' ? '#dadeea' : '#3c4162';
    const errorColor = theme === 'light' ? '#dc3545' : '#dc3545';

    return {
      onChangeTheme: (theme: Theme) => {
        dispatch(
          actionsOther.setData({
            theme,
          }),
        );
      },
      theme,
      primary,
      background,
      lightText,
      text,
      border,
      accent,
      darkText,
      lightBackground,
      errorColor,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const isTablet = Math.min(window.height, window.width) > 600;

const f = (z: number) => {
  const x = (16 / 9) * 187.5;

  return (100 * z) / Math.sqrt(Math.pow(x, 2) + Math.pow(187.5, 2));
};

const sizes: any = {};
const widths: any = {};

for (let i = 1; i <= 100; i++) {
  sizes[i] = responsiveFontSize(f(i) * (isTablet ? 0.7 : 1));
  widths[i] = responsiveFontSize(f(i));
}

export {useTheme, sizes, widths};
export default ProviderTheme;
