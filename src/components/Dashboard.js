import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        this.getAllCategories()
    }

    getAllCategories = () => {
        fetch('https://chronos-app-api.herokuapp.com/categories')
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
        </div>
        );
    }
}



export default Dashboard;