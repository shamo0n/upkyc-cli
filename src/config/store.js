import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'userReducer', 'formReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    // applyMiddleware(thunk) // ✅ middleware must be a function
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
