import ReactDOM from 'react-dom/client';
import './index.scss';
import './types/interface'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import bridge from '@vkontakte/vk-bridge'
import {BrowserRouter} from 'react-router-dom';

bridge.send("VKWebAppInit");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL === '.' ? '/' : process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);