import React, { Component } from "react";
import "./App.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetail from './components/ShowDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SearchResult from "./components/SearchResult";
import Register from './components/Register'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedMovies: [],
    };
  }

  url = "http://www.omdbapi.com/?apikey=f2f0ec42";

  showSearchResult = (searchString) => {
    fetch(this.url + "&s=" + searchString)
      .then((response) => response.json())
      .then((responseObject) =>
        this.setState({ searchedMovies: responseObject.Search })
      );
  };


  render() {
    return (
      <Container>
        <Router>
          <Navbar showSearchResult={this.showSearchResult} />
          <Route path="/" exact render={(props) => <SearchResult {...props} item={this.state.searchedMovies} />} />
          <Route path="/details/:id" component={MovieDetail} />
          <Route path="/register" component={Register} />
          <Footer />
        </Router>
      </Container>

    );
  }
}

export default App;
