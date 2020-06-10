import React, { Component } from "react";
import { Col,} from "react-bootstrap";
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    return (
      <Col className="mb-2" key={this.props.data.imdbID}>
      <Link to={'/details/' + this.props.data.imdbID}>
        <img
          className="img-fluid"
          src={this.props.data.Poster}
          alt="movie"
        />
        </Link>
      </Col>
    );
  }
}

export default Movie;
