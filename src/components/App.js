import React from 'react';
import Characters from './Characters';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <div className="ui container">
                <Characters />
            </div>
        </ApolloProvider>
    )
}

export default App;