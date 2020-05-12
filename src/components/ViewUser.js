import React, { Component } from "react";

class ViewUser extends Component {

    state = {
        user: [],
        userMessages: []
    }

    componentDidMount() {
        this.getUser()
        this.getUserMessages()
    }
    getUser = () => {
        fetch('http://localhost:3000' + this.props.history.location.pathname)
        .then(res => res.json())
        .then(jsonedUser => this.setState({user: jsonedUser}))
        .catch( error => console.error(error))
    }

    getUserMessages = () => {
        fetch('http://localhost:3000' + this.props.history.location.pathname + "/messages")
        .then(res => res.json())
        .then(jsonedUserMessages => this.setState({userMessages: jsonedUserMessages}))
        .catch( error => console.error(error))
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.userMessages)
      return (
        <div className="view-user-container">
                <div key={this.state.user.id}>
                    <div className="profile-left-container">
                        <img src={this.state.user.img} alt={this.state.user.name} className="profile-image"/>
                        <h5 className="profile-description">{this.state.user.objective}</h5>
                    </div>
                    <div className="profile-right-container">
                        <h4 className="profile-name">{this.state.user.name}</h4>
                        <h5 className="profile-description">Hours in Chronos Bank: {this.state.user.time_bank}</h5>
                        <h5 className="profile-description">{this.state.user.location}</h5>
                        <h5 className="profile-description">Specializes in {this.state.user.specialization}</h5>
                        <h5 className="profile-description">{this.state.user.email}</h5>
                        <h5 className="profile-description">{this.state.user.phone}</h5>
                    </div>
                </div>
                <hr/>
                <div className="messages-board-container">
                    <h4>Reach out to {this.state.user.name} on his public message board.</h4>
                </div>
        </div>
      );
    }
  }



export default ViewUser;