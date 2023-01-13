import Main from './components/MainComponent';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
const store = ConfigureStore();
function App () {
  return (
    <Provider store={store}>
      <BrowserRouter basename='confusion'>
        <div className='App'>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
