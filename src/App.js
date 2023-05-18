import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './router';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ApplicationRoutes />
          <ToastContainer position='bottom-right'/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
