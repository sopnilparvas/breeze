import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import Pages from "./components/pages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
