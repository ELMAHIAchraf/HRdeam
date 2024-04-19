import ReactDOM from 'react-dom/client'
import App from '@/Router/App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import {store} from './State/Store';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#fff',
          color: '#000',
          width: 'auto'
        },
      }}
    />
    </Provider>
)
