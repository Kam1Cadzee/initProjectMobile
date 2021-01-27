import {CreatorReducer} from '../base/base';
import {IOtherActions, IOtherState} from './otherTypes';
import {RootState} from '../reducer';

const init: IOtherState = {
  locale: null,
  theme: 'light',
};

const creator = new CreatorReducer<IOtherActions, IOtherState>('other');
creator.addAction('setData', (state, action) => {
  return {...state, ...action.payload};
});
creator.addAction('setLocale', (state, action) => {
  return {...state, locale: action.payload};
});
const actionsOther = creator.createActions();

const selectorsOther = {
  getLocale: (state: RootState) => state.other.locale,
  getTheme: (state: RootState) => {
    return state.other.theme;
  },
};

export {actionsOther, selectorsOther};
export default creator.createReducer(init);
