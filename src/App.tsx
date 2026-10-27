import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AppDemo from './components/AppDemo';
import Features, { HowItWorks } from './components/Features';
import Engineering from './components/Engineering';
import Process, { Footer } from './components/Process';
import { useLocale } from './i18n/LocaleContext';
import { commonCopy } from './i18n/common';

export default function App() {
  const { locale } = useLocale();
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
  }, []);
  return <><a href="#main" className="skip-link">{commonCopy[locale].skip}</a><div id="top"/><Navigation/><main id="main"><Hero/><AppDemo/><Features/><HowItWorks/><Engineering/><Process/></main><Footer/></>;
}
