import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {IOtherState} from './other/otherTypes';
import otherReducer from './other/otherReducer';
import AsyncStorage from '@react-native-community/async-storage';

const otherPersistConfig = {
  key: 'other',
  storage: AsyncStorage,
  whitelist: [],
};

export interface RootState {
  other: IOtherState;
}

export default combineReducers({
  other: persistReducer(otherPersistConfig, otherReducer),
});
