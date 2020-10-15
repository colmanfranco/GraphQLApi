const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema");
const graphqlresolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlresolvers,
        graphiql: true,
    })
);

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vsdrx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options)
.then(() => app.listen(3000, () => console.log("Server is running")))
.catch(error => {
    throw error;
});

