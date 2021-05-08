import React, { useState } from 'react';
import Episodes from './Episodes';
import Characters from './Characters';
import Locations from './Locations';
import Character from './Character';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    const [selectedNav, setSelectedNav] = useState("characters");

    const onNavClick = (e, type) => {
        setSelectedNav(type);
    };

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="ui container">
                    <div className="ui three item menu">
                        <Link to="/characters" className={`item ${selectedNav === "characters" ? "active" : ""}`} onClick={(e) => onNavClick(e, "characters")}>Characters</Link>
                        <Link to="/episodes" className={`item ${selectedNav === "episodes" ? "active" : ""}`} onClick={(e) => onNavClick(e, "episodes")}>Episodes</Link>
                        <Link to="/locations" className={`item ${selectedNav === "locations" ? "active" : ""}`} onClick={(e) => onNavClick(e, "locations")}>Locations</Link>
                    </div>
                    <Route path={["/characters", "/"]} exact component={Characters} />
                    <Route path="/episodes" component={Episodes} />
                    <Route path="/locations" component={Locations} />
                </div>
            </Router>
        </ApolloProvider>
    )
}

export default App;