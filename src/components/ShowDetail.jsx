import React from "react";
import { Badge, ListGroup, Container } from "react-bootstrap";
//import { render } from "@testing-library/react";
import {
    Col,
    Row,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button,
    Image,
    Alert
  } from "react-bootstrap";
  import Loader from 'react-loader-spinner';


class MovieDetail extends React.Component{
  state = {
    selected: false,
    newComments: {
        comment: "",
        rate: 0,
        elementId: this.props.match.params.id,
      },
    movieInfo:[],
    comments:[],
    loading: false,
    err: false
  }


  componentDidMount = async () => {
        const movieId = this.props.match.params.id;
        // console.log(movieId)
        // console.log(this.state.newComment.elementId)
        const username ='user9'
        const password = 'sP4YMKhBpqQHAPJN'
        const headers =new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Basic ' + btoa(username + ":" + password),
        });
      const movieUrl = "http://www.omdbapi.com/?apikey=81e7ce97&i="+ movieId
      const commentsUrl = "https://striveschool.herokuapp.com/api/comments/"+ movieId;

      this.setState({ loading: true }, async () => {
      try{
      const movieInfo = await fetch(movieUrl)
      .then((response) => response.json());
      this.setState({ movieInfo, loading: false});
      //console.log(this.state.movieInfo)
      }catch (err) {
        console.log(err);
        this.setState({
            err: true,
            comments: [],
            loading: false
          });
      }
    
    })

    this.setState({ loading: true }, async () => {
        try{
        const comments = await fetch(commentsUrl, {
          headers: headers,
        }).then((response) => response.json());
        this.setState({ comments, loading: false });
        //console.log({comments})
        }catch (err) {
            console.log(err);
            this.setState({
                err: true,
                comments: [],
                loading: false
              });
          }
      

    })
      
}

    submitComment = async (e) => {
        e.preventDefault();
        
        const username ='user9'
        const password = 'sP4YMKhBpqQHAPJN'
        const headers =new Headers({
        "Content-Type" : "application/json",
        'Authorization': 'Basic ' + btoa(username + ":" + password),
        });

        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const response = await fetch(commentsUrl, {
        method: "POST",
        body: JSON.stringify(this.state.newComment),
        headers: headers,
        });
        if (response.ok) {
        alert("Comment added");
        this.setState({
            newComment: {
            comment: "",
            rate: 0,
            elementId: this.props.match.params.id,
            },
        });
        } else {
        alert("An error has occurred");
        }
    };

  handleRadioChange = (e) => {
    let newComment = this.state.newComment;
    newComment.rate = e.currentTarget.id;
    this.setState({ newComment });
  };

  handleCommentText = (e) => {
    let newComment = this.state.newComment;
    newComment.comment = e.currentTarget.value;
    this.setState({ newComment:newComment });
  };


  LoadingIndicator = () => {
    return(
    <div
        style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}
        >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
)};



    LoadingError = () => {
        return(
        <Alert variant="danger" className="my-5">
            Ooops!!! Sorry this is not working at the moment. Please try again later!
        </Alert>
    )};


  displayItems = () => {
    return(
        <Container>
        <Row>
        <Col md={6} className="my-2 w-100 h-50">
          <Image src={this.state.movieInfo.Poster} className="my-2 w-100 h-auto" 
          onClick={() => {            
              this.setState({ selected: !this.state.selected });
            }}
            />
        </Col>
        <Col md={6} className="mt-5">
      <p className="text-white text-center"> {this.state.movieInfo.Title}</p>
      <p className="text-white text-center"> {"Directed by: "+ this.state.movieInfo.Director}</p>
      <p className="text-white text-center"> {"Released in: "+ this.state.movieInfo.Released}</p>
      <p className="text-white text-center"> {this.state.movieInfo.imdbVotes +" Votes"}</p>
      
      {this.state.comments.map((comment)=>{
          let variant = "";
          switch (comment.rate) {
            case 1:
              variant = "danger";
              break;
            case 2:
              variant = "warning";
              break;
            case 3:
              variant = "secondary";
              break;
            default:
              variant = "success";
              break;
          }
          return(
              <ListGroup key={comment._id}>
              <ListGroup.Item>
                  <Badge pill variant={variant} className="mr-3">
                  {comment.rate}
                  </Badge>
                  {comment.comment}
              </ListGroup.Item>
              </ListGroup>
          )
      })}
      </Col>
      </Row>
      
      <Modal
            show={this.state.selected}
            onHide={() => this.setState({ selected: !this.state.selected })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Movie comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="my-3">
                <div className="text-center">
                  <h5 className="my-3">Add a comment</h5>
                  <Form onSubmit={this.submitComment}>
                    <div className="my-3 text-center">
                      <Form.Check
                        inline
                        label="1"
                        type="radio"
                        id="1"
                        name="rating"
                        onClick={this.handleRadioChange}
                      />
                      <Form.Check
                        inline
                        label="2"
                        type="radio"
                        id="2"
                        name="rating"
                        onClick={this.handleRadioChange}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type="radio"
                        id="3"
                        name="rating"
                        onClick={this.handleRadioChange}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type="radio"
                        id="4"
                        name="rating"
                        onClick={this.handleRadioChange}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type="radio"
                        id="5"
                        name="rating"
                        onClick={this.handleRadioChange}
                      />
                    </div>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Write your comment"
                        aria-label="comment"
                        aria-describedby="basic-addon1"
                        onChange={this.handleCommentText}
                        value={this.state.newComments.comment}
                      />
                    </InputGroup>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
  
      </Container>
    )
  }

render (){
    //console.log(this.state.newComment.elementId)
  return(
      <>
      {this.props.match.params.id && this.state.loading &&(
        this.LoadingIndicator()
      )}
      {this.props.match.params.id && !this.state.loading &&(
        <>
        {this.state.comments && this.state.movieInfo && !this.state.err &&(
            this.displayItems()
        )}
        {this.state.err && (
            this.LoadingError()
        )}
        </>
      )}
      </>
      //this.displayItems()
  )
}

}

export default MovieDetail;