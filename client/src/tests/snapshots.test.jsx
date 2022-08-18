import React from 'react';
import { createStore } from 'redux';
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'; 
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux'; 
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {configure, mount } from "enzyme"; 
import Adapter from "enzyme-adapter-react-16"; 

import { rootReducer } from '../store/reducer';
import App from '../App';

import renderer from "react-test-renderer";
import Checkbox from "../components/Main/Filters/Filter/CheckboxFilter/Checkbox/Checkbox";
import CheckboxFilter from "../components/Main/Filters/Filter/CheckboxFilter/CheckboxFilter";
import ProductList from '../components/Main/ProductList/ProductList';
import Filter from '../components/Main/Filters/Filter/Filter';

const store = createStore(rootReducer);  
const uri = "http://localhost:4000";
const link = createHttpLink({ uri, credentials: 'include', });
const client = new ApolloClient({ cache: new InMemoryCache(), link}); 

// All above is from index.jsx
// Tests starts here


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});


it('renders correctly', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    ).toJSON();
    expect(component).toMatchSnapshot();
})
  
// Checks that this specific checkbox is rendered correctly 
it('renders with Checkbox (Rødvin)', () => {
    const alt = "Rødvin";
    const tree = renderer.create(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Checkbox alt={ alt } selected={[]} />
            </Provider>
        </ApolloProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

// Checks that all the checkboxes are rendered as intended
it('renders with CheckboxFilter', () => {
    const productTypes = ["Akevitt", "Portvin", "Vodka", "Druebrennevin", "Whisky", "Likør", "Gin", "Bitter", "Rødvin", "Hvitvin", "Rosévin", "Musserende vin", "Rom", "India pale ale", "Sider", "Annen type"];

    const props = {
        filterKey:"filterType",
        options: { alternatives: productTypes }
    };
    const tree = renderer.create(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <CheckboxFilter filterKey={ props.filterKey } options={ props.options } filters={[]} />
            </Provider>
        </ApolloProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


configure({adapter: new Adapter() }); 

it("renders productList", () => {
    const wrapper = mount(
                        <ApolloProvider client={client}>
                            <Provider store={store}>
                                <App />
                            </Provider>
                        </ApolloProvider>); 
    expect(wrapper.find(ProductList).length).toEqual(1); 
})

it("passes props correctly to filter", () => {
    const wrapper = mount(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>);

    // Finds the filter 
    const filterWrapper = wrapper.find(Filter); 

    // First finds the div wrapping in the labelgroup and then checking that the text-value of the first label-element equals Norge.
    // This makes sure that props are passed correctly through the redux-store
    expect(filterWrapper.find("div.card-body.collapse.enzyme-test.null").at(1).find("label").at(0).text()).toEqual(" Norge ");
})
