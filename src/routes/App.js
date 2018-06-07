import React from 'react';
import { Router, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import routes from '../constants/routes'
// import store from '../store/createStore';
import history from '../utils/history'

function AppRouter() {
  return (
    <Router history={history}>
      <div>
        {/* <Switch> */}
          {routes.map((item, index) => (
            <Route key={item.path} path={item.path} exact component={item.component} />
          ))}
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default AppRouter;