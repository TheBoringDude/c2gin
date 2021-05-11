import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// start import all font css (doesn't work if importing just @fontsource/inter)
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
// end import all font css (doesn't work if importing just @fontsource/inter)

import './App.global.css';

import Home from './pages/home';

export default function App() {
  return (
    <main className="w-11/12 mx-auto">
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}
