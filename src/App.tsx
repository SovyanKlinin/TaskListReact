import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store';
import { router } from './routes'
import './styles/index.sass'
import { useLocalStorageSync } from './hooks/useLocalStorageUtils';

const AppWithSync = () => {
  useLocalStorageSync();

  return <RouterProvider router={router} />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWithSync />
    </Provider>
  );
}