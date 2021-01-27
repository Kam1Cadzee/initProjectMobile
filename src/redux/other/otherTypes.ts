import {Locale} from '../../context/FormattingContext';

export interface IOtherActions {
  setLocale: (o: Locale) => any;
  setData: (o: Partial<IOtherState>) => any;
}

export interface IOtherState {
  locale: Locale | null;
  theme: 'light' | 'dark';
}
