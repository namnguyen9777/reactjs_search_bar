import React from "react";
import "./styles.css";
// import SearchEngine from "./Search";
import SearchEngine from "./SearchComponent";
import './SearchComponent.css';

export default function App() {
    return (
        <div>
            <div className="App">
                <h1>Hello Sir!</h1>
                <h2>Please input what you want to find in below</h2>
            </div>
            <div className="main-search-input-wrap">
                <SearchEngine/>
            </div>
        </div>
    );
}
