import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  MainPage,
  StringReversePage,
  FibonacciPage,
  SortingPage,
  StackPage,
  QueuePage,
  ListPage,
} from '../pages';

import './app.css';

const App = () => (
  <div className='app'>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/recursion'>
          <StringReversePage />
        </Route>
        <Route path='/fibonacci'>
          <FibonacciPage />
        </Route>
        <Route path='/sorting'>
          <SortingPage />
        </Route>
        <Route path='/stack'>
          <StackPage />
        </Route>
        <Route path='/queue'>
          <QueuePage />
        </Route>
        <Route path='/list'>
          <ListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
