import ReactDOM from 'react-dom/client';
import './index.scss';
import './types/interface'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import bridge from '@vkontakte/vk-bridge'
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router';

bridge.send("VKWebAppInit");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const shouldRedirectToHome = () => {
  const queryParams = new URLSearchParams(window.location.search);
  // Clear all query parameters
  window.history.replaceState({}, document.title, window.location.pathname);
  
  // Check for the presence of hash fragment and redirect to home
  const shouldRedirect = window.location.hash.includes('#vk.com/app51759006');
  if (shouldRedirect) {
    window.location.hash = ''; // Clear the hash fragment
  }

  return shouldRedirect;
};

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL === '.' ? '/' : process.env.PUBLIC_URL}>
    <Provider store={store}>
    {shouldRedirectToHome() && <Navigate to="/" replace />}
      <App />
    </Provider>
  </BrowserRouter>
);