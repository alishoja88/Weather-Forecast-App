import React from 'react';
import './index.css';
import { ContextProvider } from './ContextData/context';
import { CityProvider } from './ContextData/CityContext';
import AppConent from './componenet/AppContent';



function App() {


  return (
    <CityProvider>
      <ContextProvider >
        <AppConent />
      </ContextProvider>
    </CityProvider>
  );
}

export default App;
