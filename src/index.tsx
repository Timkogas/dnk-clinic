import ReactDOM from 'react-dom/client';
import './index.scss';
import './types/interface'
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import bridge from '@vkontakte/vk-bridge'

bridge.send("VKWebAppInit");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);