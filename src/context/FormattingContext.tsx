import React, {useContext, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionsOther, selectorsOther} from '../redux/other/otherReducer';
//import I18n from 'react-native-i18n';

export interface IFormattingContext {
  currentLocale: Locale;
  setLocale: (l: Locale) => any;
  formatPrice: (n: number) => string;
  formatDate: (d: Date) => string;
  longFormatDate: (d: Date) => string;
}

interface IFormattingContextProps {
  locale?: Locale;
}

export type Locale = 'en' | 'uk';

interface IConstant {
  currency: string;
}

type ILocaleConstant = {
  [name in Locale]: IConstant;
};

const CONSTANTS_UNIT: ILocaleConstant = {
  en: {
    currency: 'UAH',
  },
  uk: {
    currency: 'грн',
  },
};

const formatDate = (
  d: Date,
  isLongFormat: boolean = false,
  locale: Locale = 'uk',
) => {
  const separator = locale === 'uk' ? '.' : '/';
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.getMonth().toString().padStart(2, '0');
  const year = d.getFullYear();
  let arr: any = locale === 'uk' ? [day, month] : [month, day];
  arr = isLongFormat ? [...arr, year] : arr;
  return arr.join(separator);
};

const formatTime = (d: Date) => {
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
};

const FormattingContext = React.createContext({} as IFormattingContext);

const useFormattingContext = () => {
  return useContext(FormattingContext);
};
const ProviderFormattingContext: React.FC<IFormattingContextProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const currentLocale = useSelector(selectorsOther.getLocale) || 'uk';
  const value: IFormattingContext = useMemo(() => {
    return {
      currentLocale,
      setLocale: (locale: Locale) => {
        dispatch(actionsOther.setLocale(locale));
        //I18n.locale = locale;
      },
      formatPrice: (price: number) => {
        return `${price.toFixed(2)} ${CONSTANTS_UNIT[currentLocale].currency}`;
      },
      formatDate: (date: Date) => {
        return formatDate(date, false, currentLocale);
      },
      longFormatDate: (date: Date) => {
        return formatDate(date, true, currentLocale);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale]);

  useEffect(() => {
    if (!currentLocale) {
      dispatch(
        actionsOther.setData({
          locale: 'uk',
        }),
      );
      //I18n.locale = 'uk';
    }
    //I18n.locale = currentLocale;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormattingContext.Provider value={value}>
      {children}
    </FormattingContext.Provider>
  );
};

export {useFormattingContext, CONSTANTS_UNIT, formatTime};
export default ProviderFormattingContext;
