import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './router';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ApplicationRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
