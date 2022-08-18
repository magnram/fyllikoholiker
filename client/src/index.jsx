import React from 'react';
import { createStore } from 'redux'; 
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'; 
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux'; 
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { rootReducer } from './store/reducer';
import App from './App';
import './index.css';


const store = createStore(rootReducer);  

// Defines the URI for the backend
const uri = "http://localhost:4000";

// Adds credentials so it picks up on the SET-COOKIE header from the server
const link = createHttpLink({
    uri,
    credentials: 'include',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
}); 


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>, document.getElementById('root')
);
