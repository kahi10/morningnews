import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookmarks from '../reducers/bookmarks';
import user from '../reducers/user';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import hiddenArticles from '../reducers/hiddenArticles';

const reducers = combineReducers({ user, bookmarks, hiddenArticles });
const persistConfig = { key: 'morningnews', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 
const persistor = persistStore(store);
/*const store = configureStore({
  reducer: { bookmarks, user },
});*/

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Morning News</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
