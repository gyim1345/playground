import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage'
import CanvasPage from './pages/CanvasPage'

const App = () => {
  return (
    <>
      <div>hello1</div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/canvas" component={CanvasPage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;