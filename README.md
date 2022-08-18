<h1> Fyllikoholiker - <sup><sub><sub><i> Find the cheapest alcohol for your money</i></sub></sub></sup> </h1>


## Team members
* Thomas Iversen Ramm
* Ola Johannessen Kruge
* Magnus Ramm

## About the project
In this project, we've created an aesthetically pleasing and simple overview of all the products from Vinmonopolet. The data is freely accessible from their API-pages at [vinmonopolet.no/datadeling](http://www.vinmonopolet.no/datadeling). The goal of the project was for the team to get more experience with state-distribution in React, GraphQL both frontend and backend and to work with fun and cool technologies. This documentation will focus on what decisions has been made throughout the project and also give an overview of how the code is formatted.

------------  
<img src="/frontpage.png"  width="600">
<img src="/overview.png"  width="600">
<img src="/product.png"  width="600">  
------------  

## Installation

1. **Clone repository**

```shell
git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-26/webdev-p3.git
```

Then navigate into the repository with `cd webdev-p3`.

2. **Install dependencies**

```shell
cd client
npm install
cd ..
cd server
npm install
```

## Run the project

*To run the project, run the server and client in two separate terminals.*

**NB:** To connect to the database from localhost on the backend, you need to create an .env file in the server-folder. In this .env file, write this line and save:  
`PROD_DB = mongodb://test:test@it2810-26.idi.ntnu.no:27017/project3test`.  
This will allow you to access our test database, which has 109 entries to test on. For the full application with 20,553 entries, go to the deployed product [here](http://it2810-26.idi.ntnu.no/prosjekt3)

Navigate to the server directory, then:
```shell
npm start
```

In another terminal, navigate to the client directory, then:
```shell
npm start
```

## Test the project

To run the tests for the server-application, navigate to the server-folder and write `npm test`.  This test requires the server to be running.
  
To run the tests for the client-application, navigate to the client-folder and write either `npm run cypress:open` for Cypress-testing and `npm test` for other tests. All client-tests requires both the server and the client to run.


## Server (Backend)

### File Structure

```tree
server
│   .env  
│   package-lock.json  
│   package.json  
│  
├───src  
│   │   app.js  
│   │   resolvers.js  
│   │   typeDefs.js  
│   │  
│   └───models  
│           Favorite.js  
│           models.js  
│           Product.js  
│           User.js  
│           Watch.js  
│  
└───tests  
        api.js  
        product.test.js  
        products.test.js  
        test-data.js  
        user.test.js  
```

We chose this file structure because it felt very intuitive for our group. Also it's a common one for developing small/medium API's with ApolloServer and GraphQL. We don't feel like we had enough queries that it would be worth it to separate the resolvers into multiple files neither. Our source from choosing the file structure for backend can be found **[here](https://hackernoon.com/three-ways-to-structure-your-graphql-code-with-apollo-server-4788beed89db)**.

### GraphQL

In this project we decided to use GraphQL instead of a regular REST-API with Express because the group were interested in getting experience with this up-and-coming technology. We also wanted to get the benefits of flexible queries instead of doing multiple requests to the backend. Another advantage we wanted to capitalize on was the communication between the front-end and the backend-developers. While all our members were working on both ends, the documentation that follows with the GraphQL Playground made it very easy to implement the front-end when the backend-support was added. As GraphQL was developed by Facebook to make their website more effective, we feel confident that this solution is highly scalable as well, which fits the team goal of making scalable and reusable code.  
  
We feel like choosing GraphQL has given the group more insight in different ways of setting up an API.

**Overview of our GraphQL queries and mutations**
* products(skip, limit, search, filters, sort): products and totalCount
* product(id): Product
* watches(): watches, countries watched and types watched
* toggleFavorite(productId): Favorite

### Search functionality

The search-functionality we've implemented is a pretty simple one, but also an effective one. When you search in our application, we search directly into the MongoDB through mongoose. Mongoose's regex functionality gives us the possibility to search for name and ignoring upper/lowercase. We could have chosen to search on more than just name, but for this application we didn't feel this was very relevant, as you can also filter on some of the entries that you might have wanted to search for. Search is it's own optional field on the products-query you can do to the server, so you can choose whether you want to search or not.

### Pagination

We've implemented a simple offset/limit pagination. A drawback to this method of pagination is if the dataset is dynamic, because you risk skipping a product if one is added to the database while someone are browsing results. However, we have a static dataset of products, so this won't be an issue for us at all. Because of this, we chose the offset/limit pagination due to ease of implementation. We used the mongoose-methods of .skip() and .limit() to implement this functionality, and both skip and parameters are optional fields on the products-query you can do to the server. Also to see whether or not there are more products left with you current filter and search, the products-query returns a totalCount parameter.

### Details about a product

To see more details about a product, you click it and get redirected to it's own page. We chose to do this instead of expanding the list elements because we have a large amount of data for each product, and it would get really messy if we were to include it all in the same page as the products.

### Sorting

Sorting was implemented with mongoose's .sort() method, because of it's ease of implementation. This gives us a sorting right out of the database, so we can sort it even before skip/limit, which ensures intuitive and "correct" fetching of data.

### Filtering

Filtering was implemented with three kinds of filters by using the .find(filterObject) method in mongoose. The first kind of filtering is a boolean that says whether or not to only show favorited products for a specific user. The second kind of filter is the checkbox-filter. For this filter we used the $in operator from mongoose, which checks if the product matches one of many checked parameters. For our third type of filtering, the Range-filtering, we used the $gt and $lt operators to see if the product parameter is within a range. We chose to filter from the database query by using mongoose because this reduces the amount of fetched data by a lot, and also mongoose makes it very easy to implement.

### User data
For user data, we decided to create users with unique tokens which gets put in the cookie of the one issuing a query. To do this, we used jsonwebtoken. The reason we wanted to do this is because, again, we wanted a reusable and scalable system and also because we wanted more experience with authentication by using Node.js. We did however choose to not make a login-system, so whenever a user deletes its cookie, all it's user data will be lost for that user. We decided to do it this way because we know that this is a very normal way of implementing websites, where shopping sites usually add registering on top to connect to the user you've already generated. This login-system made us able to give the visitors users without actually having to register and login.  
  
The user data we save is each query to a specific product (we call it a Watch) and Favorites. This data gets saved persistently to the MongoDB, and still persists even if someone delete their cookie. We chose to save this specific data because Watches give a cool overview of what people have done on your webpage, and Favorites gives the user a feeling of interaction on the webpage.


### Technologies and dependencies
*Besides GraphQL, we've also used other great technologies for our server (back-end)* 

**Express:**  
We've used express mostly to handle our users and cors-settings. We didn't want to use the default cors-options that comes with ApolloServer, because they made it hard to enable credentials for the requests. That's why we used the express-cors to enable credentials. This made us able to add the Set-Cookie header to our responses from the server, which is the logic that makes sure that a we can identify users uniquely (until they delete their cookies). We use express for this logic, as whenever someone do a call to the express-server, we check and/or register a new user and add the token to the response. We then pass the userId down to the ApolloServer so we can use the identification of the user for our GraphQL-queries.

**Apollo Server:**  
Apollo Server is a tool for building GraphQL servers faster. Apollo Server has a very good documentation page, which is the main reason we decided to use it. Apollo Server really simplifies the code for GraphQL, and we feel like we've saved time by using it.

**MongoDB and mongoose:**  
We decided to use MongoDB because it is fast to set up, easy to use and has a lot of documentation. Another reason we chose to use MongoDB was because of mongoose. Mongoose has built-in functionality for a lot of the features we wanted to implement, like: sorting, filtering, pagination and searching. Our group also has experience with relational databases from earlier, and we wanted to learn how to use a NOSQL database, as they keep getting more popular.  

**Mocha and Chai:**
For testing our back-end we decided to use Mocha and Chai. This is because these technologies are well documented, and there's a big community for it, so it would be easy to find help online.

### Testing the server

To test the server, we've created a test-database with limited entries. This was done in order to make sure we get the correct results from the query. To run this database, you need to run `npm run test-server` instead of npm start. By using **axios** to do requests to the server from the tests, we were able to test whether or not the queries gave the intended results. This way of testing makes sure that all the queries returns what we expect them to return. We compare the response to the server with the results we're expecting it to return. This type of testing was made for many of our queries, through 6 tests with different combinations of queries, but we didn't  tests for all the possible combinations. We chose to not test all the possibilities because it would be repetitive and because it would offer low amount of learning for the team members. For testing, we're only using 100 products in order to make the testing faster.


## Client (Frontend)

### File Structure

```tree
│   cypress.json
│   package-lock.json
│   package.json
│
├───cypress
│   ├───fixtures
│   │       example.json
│   │
│   ├───integration
│   │       tests.js
│   │
│   ├───plugins
│   │       index.js
│   │
│   └───support
│           commands.js
│           index.js
│
├───public
│   │   background.afdesign
│   │   background.png
│   │   index.html
│   │   manifest.json
│   │   polet-logo.ico
│   │   polet-logo.png
│   │
│   └───icons
│           favorite-regular.svg
│           favorite-solid.svg
│
└───src
    │   App.jsx
    │   index.css
    │   index.jsx
    │
    ├───components
    │   ├───Favorite
    │   │       Favorite.jsx
    │   │       Favorite.module.css
    │   │
    │   ├───Main
    │   │   │   Main.jsx
    │   │   │   Main.module.css
    │   │   │
    │   │   ├───DropdownSort
    │   │   │       DropdownSort.jsx
    │   │   │
    │   │   ├───Filters
    │   │   │   │   filterList.js
    │   │   │   │   Filters.jsx
    │   │   │   │
    │   │   │   └───Filter
    │   │   │       │   CheckboxFilter.jsx
    │   │   │       │   Filter.jsx
    │   │   │       │   SliderFilter.jsx
    │   │   │       │
    │   │   │       └───Checkbox
    │   │   │               Checkbox.jsx
    │   │   │               Checkbox.module.css
    │   │   │
    │   │   └───ProductList
    │   │       │   ProductList.jsx
    │   │       │   ProductList.module.css
    │   │       │
    │   │       └───ProductCard
    │   │               ProductCard.jsx
    │   │               ProductCard.module.css
    │   │
    │   ├───NavBar
    │   │   │   NavBar.jsx
    │   │   │
    │   │   └───SearchBar
    │   │           SearchBar.jsx
    │   │
    │   ├───Overview
    │   │       Overview.jsx
    │   │
    │   └───ProductInfo
    │           PIHeader.jsx
    │           PIList.jsx
    │           PIText.jsx
    │           ProductInfo.jsx
    │           ProductInfo.module.css
    │
    ├───queries
    │       queries.jsx
    │
    ├───store
    │       actions.jsx
    │       reducer.jsx
    │
    └───utils
            utils.jsx
```

As you can see from the figure, we've chosen to make an own folder for components, and to give a folder to all components that has under-components or it's own stylesheet. This helps us make a hierarchy for our components, which makes it very easy to track what components are used where. For components that are used in multiple components, they're placed directly into the components folder. This was for us an effective way to get a good overview of what components would affect what and it helped us keep track of the application. The hierarchy of the folders, is the same as the component-structure you can see in the image below.

![Components-figure](/components.png)
  
You can also see that we've given reducers and actions it's own store folder, which contains all redux-specific functionality. Also an own folder for queries, in case we might get more files for queries in the future. Lastly you see the utils-folder where you can find functions that convert numbers to another format and this could be expanded to contain more information.  
  
Using folders to contain information that don't overlap with other files is something we wanted to do because it helps us keep track of what is what and what each file affects.

### Overview

In the project, we've used React, as specified in the requirements for the project-description. We've chosen to make a "multi-page"-application for this project, because we didn't want to collect all the information of the page into one view, as it wouldn't feel so much like a complete page if it were. To make this possible, we used an npm-package called **react-router-dom** that lets us route urls to different components. As a result, we have 3 "page-components" that won't be rendered at the same time. These are the following:
* The Main-page, where you can see a list of all products, filter, and sort.
* The Product-page, where you can see more information about a specific product
* The Overview-page, where you can see your user’s favorites and charts of visits on product types and product countries.  

Our React is written with only function-based components because we wanted to adapt to the current trends within the technology, to not waste time on something that might be outdated in a couple of years. To use local states with function-based components, we've used simple React Hooks, which provides slight performance boosts and cleaner code than states in a class-based component.

For styling the page, we've used a combination of **Bootstrap 4** and css-modules. Bootstrap gives us a lot of styling for free, and css-modules let's us easily write specific css for our components without worrying about the same classname giving overlapping css. We chose to use a lot of time and resources on the design and responsiveness of the page, because we think it gives the page a better overall feel and experience.  

### State Management
* We've used **Redux** for state management because we wanted experience with highly relevant tecnhology and because it provides a scalable solution. 
* We kept both local states in some components where other components wouldn't use the state and a redux store for states that we wanted to utilize in multiple components, and that was more central for our application.
* We only had one reducer-function, because the application wasn’t that big, and to simplify the code for ourselves.
* We collected the actions into its own file to keep things tidy and centralized.


### Server Access
We chose to use Apollo Client for queries to the server because Apollo Client made it easy for us to handle the results we get from the database and to easily send queries to the backend.  
  
We separated all our queries to it's own file to give us easy control over what information we're querying from the database.

### Testing the client (Frontend)
To test our client thoroughly, we made multiple types of tests with multiple libraries. We focused on writing test on the parts of the code who where written by us. An example of this is verifying that props and states are passed correctly in our application, and not testing that third-party applications worked as intended, because this is already tested by the developers of the library).

For our testing in the frontend, we used **Jest**, **Enzyme** and **Cypress**. These are all well documented and highly used libraries for testing React-applications, which is why we went with these technologies. As we didn't have much experience with testing in React from earlier, this was essential for us to find good guides and help online.  
  
We decided to only implement a couple of each types of tests, after making a couple of each test, it became really repetitive and didn't offer much learning for the team. To fully test our application, we could add more similar tests to test all functionality. 
  
As we prioritized functionality over testing and due to not having a lot of time, we didn't implement any Mock-tests.

### End-to-end testing
To test that our application as a whole worked as intended, we used Cypress. Cypress is a great tool because of it's easy syntax and its great user interface. We wrote our tests to match realistic scenarios/use cases, such as trying to favorite a product and checking that it's actually favorited. Cypress gave us great support throughout the project for automatically doing all our manual testing whenever we did a change. 

#### Testing Redux-state
To test that our reducers were defined with accurate logic, we decided to implement redux-reducer testing. To do this, we used the **Jest** framework, because this is usually done for testing redux-reducers. While using this we revealed a couple of bugs, which helped us with some of the bugs we couldn't understand. 

#### Snapshottesting
We also used Jest to verify that our application is deterministic and renders equally every time. These snapshot-tests made it convenient for us to determine if our application had gotten an unpredicted changes in the DOM. Also we used Jest and Enzyme to test that some of the different components received the expected props.

## Use of Git and GitLab
We used GitLab issues for keeping track of what needs to be done. All branches and commits were marked with what issue they were affecting and most issues were closed by using the "closing" operand in the commit-messages. Our issues were related to both one specific task and assigned to one specific person. This way we were able to easily get control over who had done what and when a specific issue/task was closed, without having to ask each other how far we got. We mostly used one branch for each issue, but sometimes we put more issues in one branch if they were smaller ones.  
  
These measures were made to make it easy for the team to keep track of what was done and what needs to be done. Also we could easily see what parts of the program were creating bugs by finding the issue and commit that it came from. The team learned a lot by using github and gitlab in this fashion