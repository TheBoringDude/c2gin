// start import all font css (doesn't work if importing just @fontsource/inter)
import '@fontsource/catamaran/300.css';
import '@fontsource/catamaran/400.css';
import '@fontsource/catamaran/700.css';
import '@fontsource/catamaran/900.css';
// end import all font css (doesn't work if importing just @fontsource/inter)
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import C2GinProvider from './c2gin/provider';
import Home from './pages/home';

export default function App() {
  return (
    <C2GinProvider>
      <main className="antialiased">
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </main>
    </C2GinProvider>
  );
}
