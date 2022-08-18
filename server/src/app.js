const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
require("dotenv").config();

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const cookieParser = require('cookie-parser');
const { User } = require("./models/models");


const SECRET = "mysecretsshhhh";
const PORT = 4000;
const FRONTEND = "http://localhost:3000";

const DB = process.env.DB || "PROD";
let URI = null;

// Fetches from the script what database the app should use, and uses the correct connection-string.

switch(DB.trim()) {
    case "TEST":
        URI = process.env.TEST_DB; break;
    default:
        URI = process.env.PROD_DB; break; 
}



// Connecting to MongoDB database through mongoose
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

const app = express();

// Telling express to use CORS to avoid issues with Cross-Origin requests
// Also declaring the origin to make the system more secure
app.use(cors({ 
    origin: FRONTEND,
    credentials: true
}));

// Used in order to read the cookies from the request
app.use(cookieParser());

app.use(async (req, res, next) => {

    // Get the token from the request-cookies
    let { userTokenWebdev } = req.cookies;


    if(userTokenWebdev) {
        
        // Extract userId from token
        let userId = jwt.verify(userTokenWebdev, SECRET).userId;

        
        // If it can find a userId from the token
        if(userId) {

            const user = await User.findById(userId);

            // If it can find a user with this userId
            if(user) {
                req.userId = userId;
                
                return next();
            }
        }


        //If no user were found with the token, it will proceed to run the code below
    }
    
    // Creates new User and adds ID to the request.
    const user = await new User().save();
    req.userId = user.id;

    
    // Create new token with the userId
    userTokenWebdev = jwt.sign({ userId: req.userId }, SECRET);
    
    // Add the token to the response. httpOnly makes the user unable to edit the token, the user can only delete it
    res.cookie("userTokenWebdev", userTokenWebdev, { httpOnly: true });
    
    next();
})

// Token is passed down to the server-context, makes us able to use the userId in our queries
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ userId: req.userId }),
    playground: {
        settings: {
            'request.credentials': 'same-origin'
        }
    }
});

// Connecting the apollo-server to express and disabling the default Apollo cors-settings (because we're using the express-settings)
server.applyMiddleware({ 
    app, 
    path: "/", 
    cors: false 
});


// Starts to listen to port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

module.exports = app;