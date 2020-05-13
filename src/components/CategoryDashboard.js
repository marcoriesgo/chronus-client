import React, { Component } from "react";
import { Router, Link } from "react-router-dom";


class CategoryDashboard extends Component {

    state = {
        categoryUsers: [],
        category: []
    }

    componentDidMount() {
        this.getCategoryUsers()
        this.getCategory()
    }

    getCategory = () => {
        fetch('https://chronos-app-api.herokuapp.com/categories/' + this.props.match.params.id)
        .then(res => res.json())
        .then(jsonedCategory => this.setState({category: jsonedCategory}))
        .catch( error => console.error(error))
    }

    getCategoryUsers = () => {
        fetch('https://chronos-app-api.herokuapp.com/categories/' + this.props.match.params.id + "/users")
        .then(res => res.json())
        .then(jsonedCategoryUsers => this.setState({categoryUsers: jsonedCategoryUsers}))
        .catch( error => console.error(error))
    }

    handleAddUser = () => {
        this.props.history.push("/categories/" + this.state.category.id + "/createmember")
    }

    getUser = (user) => {
        this.props.history.push("/categories/" + this.state.category.id + "/users/" + user.id)
    }

    render() {
        console.log(this.state.categoryUsers)
        console.log(this.state.category)
    return (
      <div className="new-user-form-container">
        <div className="category-navigation">
            <h3 className="category-title">{this.state.category.name}</h3>
            <button onClick={this.handleAddUser} className="btn btn-primary add-user-button">Add A Member</button>
        </div>
        <div className="category-description">
            <h4 >{this.state.category.description}</h4>
        </div>
        <div className="user-dashboard-container">
            {this.state.categoryUsers.map( user => {
                return (
                <div className="user-dashboard-card">
                <div key={user.id} onClick={() => this.getUser(user)}>
                    <img src={user.img} alt={user.name} className="user-image"/>
                    <h4 className="user-name">{user.name}</h4>
                    <h5 className="user-description">Hours in Bank: {user.time_bank}</h5>
                    <h5 className="user-description">{user.location}</h5>
                    <h5 className="user-description">{user.specialization}</h5>
                </div>
                </div>
                )
            })}
        </div>
      </div>
    );
    }
  }
  
  export default CategoryDashboard;