import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import './styles.css';
import App from './App';
import { LocaleProvider } from './i18n/LocaleContext';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><LocaleProvider><App /></LocaleProvider></React.StrictMode>);
