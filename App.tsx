import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

import persist from './src/config/store';
import Main from './src/Main';
import { AuthProvider } from './src/Contexts/AuthContext';

const persistStore = persist();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <AuthProvider>
            <AppContent />
            <Toast />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const AppContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
