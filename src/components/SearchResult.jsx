import React, { Component } from "react";
import { Container, Alert, Dropdown } from "react-bootstrap";
import Gallery from "./Gallery";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      harryPotterMovies: [],
      spiderManMovies: [],
      starWarsMovies: [],
      searchedMovies: [],
      loading: true,
      error: false,
      //comments: [],
    };
  }

  url = "http://www.omdbapi.com/?apikey=f2f0ec42";

  componentDidMount = () => {
    Promise.all([
      fetch(this.url + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ harryPotterMovies: responseObject.Search })
        ),
      fetch(this.url + "&s=spider%20man")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ spiderManMovies: responseObject.Search })
        ),
      fetch(this.url + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) =>
          this.setState({ starWarsMovies: responseObject.Search })
        ),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
  };

  render() {
    console.log(this.props.item)
    return (

        <div>
          <Container fluid className="px-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h2 className="mb-4">TV Shows</h2>
                <div className="ml-4 mt-1">
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ backgroundColor: "#221f1f" }}
                      id="dropdownMenuButton"
                      className="btn-secondary btn-sm dropdown-toggle rounded-0"
                    >
                      Genres
                    </Dropdown.Toggle>
                    <Dropdown.Menu bg="dark">
                      <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div>
                <i className="fa fa-th-large icons"></i>
                <i className="fa fa-th icons"></i>
              </div>
            </div>
            {this.state.error && (
              <Alert variant="danger" className="text-center">
                An error has occurred, please try again later
              </Alert>
            )}
            {this.props.item.length > 0 && (
              <Gallery
                title="Search results"
                movies={this.props.item}
              />
            )}
            {!this.state.error && !this.props.item.length > 0 && (
              <>
                <Gallery
                  title="Harry Potter"
                  loading={this.state.loading}
                  movies={this.state.harryPotterMovies.slice(0, 6)}
                />
                <Gallery
                  title="Spider Man"
                  loading={this.state.loading}
                  movies={this.state.spiderManMovies.slice(0, 6)}
                />
                <Gallery
                  title="Star Wars"
                  loading={this.state.loading}
                  movies={this.state.starWarsMovies.slice(0, 6)}
                />
              </>
            )}
          </Container>
        </div>
    );
  }
}

export default SearchResult;
