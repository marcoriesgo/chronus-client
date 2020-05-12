import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        users: [],
        categories: []
    }

    componentDidMount() {
        this.getAllUsers()
        this.getAllCategories()
    }
    getAllUsers = () => {
        fetch('http://localhost:3000/users'
        )
        .then(res => res.json())
        .then(jsonedUsers => this.setState({users: jsonedUsers}))
        .catch( error => console.error(error))
    }

    getAllCategories = () => {
        fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(jsonedCategories => this.setState({categories: jsonedCategories}))
        .catch( error => console.error(error))
    }

    // onAddUserClick = () => {

    // }

    getCategory = (category) => {
        this.props.history.push("/categories/" + category.id)
    }

    render() {
        console.log(this.state.users)
        console.log(this.state.categories)
        return (
        <div className="dashboard">
            <h4 className="dashboard-intro-message">What are you looking for today?</h4>
            <div className="category-dashboard-container">
                {this.state.categories.map( category => {
                    return (
                    <div className="category-dashboard-card">
                        <div key={category.id} onClick={() => this.getCategory(category)}>
                            {/* <div className="category-img-container">
                                <img src={category.icon} alt={category.name} className="category-image"/>
                            </div> */}
                            <div className="category-text-container">
                                <h4 className="category-name">{category.name}</h4>
                            </div>
                        </div>
                    </div>
                    )
                    })}
            </div>
            <div className="dashboard-navigation">
                <h4 className="members-intro-message">Chronos Community Members</h4>
                <Link to="/createmember" className="btn btn-primary btn-sm add-member-button">Add Member</Link>
            </div>
            <div className="user-dashboard-container">
                {this.state.users.map( user => {
                    return (
                    <div className="user-dashboard-card">
                    <div key={user.id}>
                        <img src={user.img} alt={user.name} className="user-image"/>
                        <h4 className="user-name">{user.name}</h4>
                        <h5 className="user-description">Hours Accumulated: {user.time_bank}</h5>
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



export default Dashboard;