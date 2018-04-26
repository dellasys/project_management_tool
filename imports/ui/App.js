import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import Home from './Home';
import Features from './Features';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import MenuBar from './Projects/MenuBar';
import Divider from 'material-ui/Divider';

const middleware = []; 

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
);

class App extends Component{
    render(){

        return (
            <Router>
                <div>
                    <header className='header'>
                        <Link className='href-link-remove' to='/'>
                            <h4>PM Tool</h4>
                        </Link>
                    </header>
                    <Divider />
                    <main>
                        <Provider store={store}>
                            <div className='main-content'>
                                {/* Display Menu Bar for everypage */}
                                <Route path='/' component={MenuBar} />
                                {/* Display Home if path is exact / */}
                                <Route exact path='/' component={Home} />
                                {/* Display feature with query string id / */}
                                <Route path='/features/:id' component={Features} />
                            </div>
                        </Provider>
                    </main>
                </div>
            </Router>
        )
    }
}

export default App;