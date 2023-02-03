import Login from "./components/login/login"
import Dashboard from './components/dashboard/dashboard';
import './App.css';
import {Routes , Route } from "react-router-dom" ;
import {IntlProvider} from 'react-intl';
import message_en from "./locales/en.json";
import message_ar from "./locales/ar.json";
import { useState } from "react";

const messages = {
  en: message_en,
  ar: message_ar
}

function App() {
  const [locale, setLocale] = useState('en');
  const [message, setMessage] = useState(messages.en);

  const changeLocale = (val) => {
    setLocale(val);
    setMessage(messages[val]);
  }

  return (
    <div className="App">
      <IntlProvider messages={message} locale={locale}>
      <Routes> 
            <Route path="/" element={<Login changeLocale={changeLocale} />} /> 
            <Route path="/dashboard" element={<Dashboard/> } /> 
       </Routes> 
       </IntlProvider>
    </div>
  );
}

export default App;
