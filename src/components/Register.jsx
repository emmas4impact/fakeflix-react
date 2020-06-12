import React from "react";
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import Cards from 'react-credit-cards';

 


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {
        name: "",
        surname: "",
        email: "",
        password: "",
        address: "",
        yob: "",
        city: "",
        postal: "",
        creditCard:{
          cvc: '',
          expiry: '',
          focus: '',
          name: '',
          number: '',
        }
      },
      isLoading: false,
      errMess: "",
      changeCount: 0,
    };
  }

  submitReservation = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });

    try {
      let response = await fetch("https://striveschool.herokuapp.com/api/reservation", {
        method: "POST",
        body: JSON.stringify(this.state.reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        alert('Full registered!');
        this.setState({
          isLoading: false,
          errMess: "",
          changeCount: 0,
          reservation: {
            name: "",
            surname: "",
            email: "",
            password: "",
            address: "",
            yob: "",
            city: "",
            postal: "",
            creditCard:{
              cvc: '',
              expiry: '',
              focus: '',
              name: '',
              number: '',
            }
          }
        });
      } else {
        let json = await response.json();
        this.setState({
          errMess: json.message,
          isLoading: false,
         
          
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errMess: err.message,
        isLoading: false
      });
    }
  };

  updateReservationField = input => {
    let reservation = this.state.reservation;
    let currentId = input.currentTarget.id;

    if(currentId) {
      
        reservation[currentId] = input.currentTarget.value;
    }

    this.setState((prevState, props)=>{
      return {
        reservation: reservation, 
        changeCount: prevState.changeCount + 1
      }
    });
  };

  render() {
    return (
      <div className="mb-3">
        <Cards
          cvc={this.state.reservation.creditCard.cvc}
          expiry={this.state.reservation.creditCard.expiry}
          focused={this.state.reservation.creditCard.focus}
          name={this.state.reservation.creditCard.name}
          number={this.state.reservation.creditCard.number}
        />
        {this.state.errMess.length > 0 && (
          <Alert variant="danger">
            We encountered a problem while processing your request:{" "}
            {this.state.errMess}
          </Alert>
        )}
        <h3 className="bg-info">Register to be member Now!!</h3>
        {
          this.state.isLoading && (
            <div className="d-flex justify-content-center my-5">
              Reserving your table, please wait
              <div className="ml-2">
                <Spinner animation="border" variant="success" />
              </div>
            </div>
          )
        }
        <Form onSubmit={this.submitReservation}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First name"
                  value={this.state.reservation.name}
                  onChange={this.updateReservationField}
                />
              </Form.Group>
            </Col>
            <Form.Group className="col-md-6">
              <Form.Label htmlFor="lname">Surname</Form.Label>
              <Form.Control
                required
                type="text"
                name="lname"
                id="surname"
                placeholder="Last name"
                value={this.state.reservation.surname}
                onChange={this.updateReservationField}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col md={5}>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    id="email"
                    value={this.state.reservation.email}
                    onChange={this.updateReservationField}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Address </Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor"
                    id="address"
                    value={this.state.reservation.address}
                    onChange={this.updateReservationField} />
                </Form.Group>
                
                        
            </Col>
            <Col md={5}>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    id="password"
                     value={this.state.reservation.password}
                     onChange={this.updateReservationField}/>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="dateTime">Date and Time</Form.Label>
                <Form.Control
                  type="date"
                  name="dateTime"
                  id="yob"
                  placeholder="Date and Time"
                  value={this.state.reservation.yob}
                  onChange={this.updateReservationField}
                />
              </Form.Group>
            </Col>
          </Row>
         <Form.Row>
                <Form.Group as={Col} md="6" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" required 
                id="city"
                 value={this.state.reservation.city}
                 onChange={this.updateReservationField}/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
               
                <Form.Group as={Col} md="3" >
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zip" required 
                 id="postal"
                 value={this.state.reservation.postal}
                 onChange={this.updateReservationField}/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                </Form.Control.Feedback>
                </Form.Group>
        </Form.Row>
        <Row>
        <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </Row>
       
        
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Register;