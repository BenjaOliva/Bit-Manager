import React, { useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import { useDispatch } from 'react-redux';
import { getProducts } from 'services/firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();
      return data;
    };
    getData()
      .then((res) => dispatch({ type: 'END_LOADING', data: res }))
      .then((res) => console.log(res));
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/auth`} component={AuthLayout} />
        <Redirect from="*" to={'/auth'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
