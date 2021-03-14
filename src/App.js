import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { fetchCurrentCovidData, fetchHistoricalCovidData, fetchCountriesData } from './redux/covidSlice';
import GlobalLoading from './components/GlobalLoading/GlobalLoading';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthRoute from './components/AuthRoute/AuthRoute';
import HomePage from './pages/HomePage/HomePage';
import CountryDetail from './pages/CountryDetail/CountryDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentCovidData());
    dispatch(fetchHistoricalCovidData());
    dispatch(fetchCountriesData());
  }, [dispatch]);

  return (
    <>
      <GlobalLoading />
      <Router>
        <div className="app">
          <Switch>
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/country/:id" component={CountryDetail} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
