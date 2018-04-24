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
                            <h3>Simple Project Management Tool</h3>
                        </Link>
                    </header>
                    <Divider />
                    <main>
                        <Provider store={store}>
                            <div className='main-content'>
                                <Route path='/' component={MenuBar} />
                                <Route exact path='/' component={Home} />
                                <Route path='/features/:id' component={Features} />
                            </div>
                        </Provider>
                        {/* <Route path="/about" component={About} /> */}
                    </main>
                </div>
            </Router>
        )
    }
}

export default App;