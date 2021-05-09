import React from 'react';
import { Characters } from '../views/Characters';
import { Character } from '../views/Character';
import { Episodes } from '../views/Episodes';
import { Episode } from '../views/Episode';
import { Locations } from '../views/Locations';
import { Location } from '../views/Location';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="ui container">
                    <div className="ui three item menu">
                        <Link to="/characters" className="item">Characters</Link>
                        <Link to="/episodes" className="item">Episodes</Link>
                        <Link to="/locations" className="item">Locations</Link>
                    </div>
                    <Route path={["/characters", "/"]} exact component={Characters} />
                    <Route path="/episodes" component={Episodes} />
                    <Route path="/locations" component={Locations} />
                    <Route path="/character/:id" component={Character} />
                    <Route path="/episode/:id" component={Episode} />
                    <Route path="/location/:id" component={Location} />
                </div>
            </Router>
        </ApolloProvider>
    )
}

export default App;