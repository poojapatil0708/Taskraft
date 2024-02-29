import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './router';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <HelmetProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <BrowserRouter>
                <ApplicationRoutes />
                <div style={{ height: '0px' }}><ToastContainer position='bottom-right' /></div>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </HelmetProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
