import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../NotFound/NotFound';

/*
    This is a stateles component. Hence we do not import Component class from react.
    We have used ES6 to import App.
*/
const App = () => {
    return(
        <BrowserRouter basename='/react_rmdb/'>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/movies" component={Movie} exact />
                    <Route path="/:movieId" component={Movie} exact />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>

        // <div>
        //     <Header />
        //     <Home />
        // </div>
    )
}

export default App;