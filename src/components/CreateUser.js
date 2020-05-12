import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

class CreateUser extends Component {

    state = {
        category: [],
        name: '',
        time_bank: 1,
        location: '',
        specialization: '',
        email: '',
        phone: '',
        objective: '',
        category_id: this.props.match.params.id,
        img: ''
    }

    handleChange = event => {
      this.setState({ [event.target.id]: event.target.value });
    };

    componentDidMount() {
        this.getCategory()
    }
    
    getCategory = () => {
        fetch('http://localhost:3000/categories/' + this.props.match.params.id)
        .then(res => res.json())
        .then(jsonedCategory => this.setState({category: jsonedCategory}))
        .catch( error => console.error(error))
    }

    handleSubmit = (event) => {
      event.preventDefault()
      fetch('http://localhost:3000/categories/' + this.props.match.params.id + '/users',{
      body: JSON.stringify({
        name: this.state.name,
        time_bank: 1,
        location: this.state.location,
        specialization: this.state.specialization,
        email: this.state.email,
        phone: this.state.phone,
        objective: this.state.objective,
        category_id: this.props.match.params.id,
        img: this.state.img
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        name: '',
        time_bank: 1,
        location: '',
        specialization: '',
        email: '',
        phone: '',
        objective: '',
        img: ''
      })
    })
    .then(this.props.history.push("/categories/" + this.state.category.id))
    .catch(error => console.error({ Error: error }));
    }
    
    render() {
        console.log(this.state.category)
    return (
      <div className="new-user-form-container">
        <h2>Add Member to the Chronos {this.state.category.name} Community</h2>
        <form onSubmit={this.handleSubmit} className="post-form">
              <input type="text" id="name" name="name" onChange={this.handleChange} placeholder="Name"/>
              <input type="text" id="location" name="location" onChange={this.handleChange} placeholder="City, State"/>
              <input type="text" id="specialization" name="specialization" onChange={this.handleChange} placeholder="Specialization"/>
              <input type="text" id="email" name="email" onChange={this.handleChange} placeholder="Email Address"/>
              <input type="text" id="phone" name="phone" onChange={this.handleChange} placeholder="Phone Number"/>
              <input type="text" id="img" name="img" onChange={this.handleChange} placeholder="Image URL"/>
              <input type="text" id="objective" name="objective" onChange={this.handleChange} placeholder="What Services Are You looking For On Chronos?"/> <br />
              <input type="submit" className="btn btn-primary" id="submit-button" value="Submit Member"/>
        </form>
      </div>
    );
    }
  }
  
  export default CreateUser;