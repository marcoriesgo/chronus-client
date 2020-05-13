import React, { Component } from "react";

let baseURL = process.env.REACT_APP_BASEURL
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3000'
  } else {
    baseURL = 'https://chronos-app-api.herokuapp.com'
  }

class ViewUser extends Component {

    state = {
        user: [],
        userMessages: [],
        writeMessage: false,
        editMessage: false,
        author: '',
        title: '',
        content: '',
        messageId: ''
        
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    componentDidMount() {
        this.getUser()
        this.getUserMessages()
    }
    getUser = () => {
        fetch(baseURL + this.props.history.location.pathname)
        .then(res => res.json())
        .then(jsonedUser => this.setState({user: jsonedUser}))
        .catch( error => console.error(error))
    }

    getUserMessages = () => {
        fetch(baseURL + this.props.history.location.pathname + "/messages")
        .then(res => res.json())
        .then(jsonedUserMessages => this.setState({userMessages: jsonedUserMessages}))
        .catch( error => console.error(error))
    }

    handleOpenMessageUser = () => {
        this.setState({writeMessage: true})
    }
    handleCloseMessageUser = () => {
        this.setState({writeMessage: false})
    }

    handleOpenEditMessageUser = (message) => {
        this.setState({editMessage: true, author: message.author, title: message.title, content: message.content, messageId: message.id})
    }
    handleCloseEditMessageUser = () => {
        this.setState({editMessage: false})
    }


    handleMessageSubmit = (event) => {
        event.preventDefault()
        fetch(baseURL + this.props.history.location.pathname + '/messages',{
        body: JSON.stringify({
          author: this.state.author,
          title: this.state.title,
          content: this.state.content,
          user_id: this.state.user.id
        }),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
            author: '',
            title: '',
            content: ''
        })
      })
      .then(this.handleCloseMessageUser)
      .then(this.getUserMessages)
      .catch(error => console.error({ Error: error }));
    }

    handleEditMessageSubmit = () => {
        fetch(baseURL + this.props.history.location.pathname + '/messages/' + this.state.messageId,{
        body: JSON.stringify({
          author: this.state.author,
          title: this.state.title,
          content: this.state.content
        }),
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
            author: '',
            title: '',
            content: ''
        })
        console.log(res)
      })
      
      .then(this.handleCloseEditMessageUser)
      .then(this.getUserMessages)
      .catch(error => console.error({ Error: error }));
    }

    deleteMessage = id => {
        fetch(baseURL + this.props.history.location.pathname + '/messages/' + id, {
          method: 'DELETE'
        }).then( res => {
          const messageArr = this.state.userMessages.filter( message => {
            return message.id !== id
          })
          this.setState({
            userMessages: messageArr
          })
        })
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.userMessages)
      return (
        <div className="view-user-container">
                <div key={this.state.user.id}>
                    <div className="profile-left-container">
                        <img src={this.state.user.img} alt={this.state.user.name} className="profile-image"/>
                        <h4 className="profile-name">{this.state.user.name}</h4>
                    </div>
                    <div className="profile-right-container">
                        <h5 className="profile-description">{this.state.user.objective}</h5>
                        <h5 className="profile-description">Hours in Chronos Bank: {this.state.user.time_bank}</h5>
                        <h5 className="profile-description">{this.state.user.location}</h5>
                        <h5 className="profile-description">Specializes in {this.state.user.specialization}</h5>
                        <h5 className="profile-description">{this.state.user.email}</h5>
                        <h5 className="profile-description">{this.state.user.phone}</h5>
                    </div>
                </div>
                <hr/>
                <div className="messages-board-container">
                    <div className="messages-navigation">
                        <h4 className="message-board-title">{this.state.user.name}'s Message Board.</h4>
                        <button onClick={this.handleOpenMessageUser} className="btn btn-primary add-message-button">Send Message</button>
                    </div>
                    { this.state.writeMessage ? 
                    <div className="message-form-container">
                        <form onSubmit={this.handleMessageSubmit} className="post-form">
                            <input type="text" id="title" className="message-input" name="title" onChange={this.handleChange} placeholder="Title"/> <br />
                            <input type="text" id="author" className="message-input" name="author" onChange={this.handleChange} placeholder="Your Name"/> <br />
                            <input type="text" id="content" className="message-message" name="content" onChange={this.handleChange} placeholder="Message"/> <br />
                            <input type="submit" className="btn btn-success" id="submit-message-button" value="Submit Message"/> <br />
                            <button onClick={this.handleCloseMessageUser} id="submit-cancel-button" className="btn btn-outline-danger">Cancel</button>
                        </form>
                    </div>
                    :null }
                    { this.state.editMessage ? 
                    <div className="message-form-container">
                        <form onSubmit={this.handleEditMessageSubmit} className="post-form">
                            <input type="text" id="title" className="message-input" name="title" onChange={this.handleChange} value={this.state.title}/> <br />
                            <input type="text" id="author" className="message-input" name="author" onChange={this.handleChange} value={this.state.author}/> <br />
                            <input type="text" id="content" className="message-message" name="content" onChange={this.handleChange} value={this.state.content}/> <br />
                            <input type="submit" className="btn btn-success" id="submit-message-button" value="Submit Edit"/> <br />
                            <button onClick={this.handleCloseEditMessageUser} id="submit-cancel-button" className="btn btn-outline-danger">Cancel</button>
                        </form>
                    </div>
                    :null }
                    {this.state.userMessages.map( message => {
                        return (
                        <div>
                        <div className="user-message-card">
                            <div key={message.id}>
                                <button onClick={() => this.deleteMessage(message.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                <button onClick={() => this.handleOpenEditMessageUser(message)} className="btn btn-outline-info btn-sm">Edit</button>
                                <h4 className="message-author">{message.title}</h4>
                                <h6 className="message-title">From: {message.author}</h6>
                                <h5 className="message-content"> {message.content}</h5>
                            </div> 
                        </div>
                        <br />
                        </div>
                        )
                    })}
                </div>
        </div>
      );
    }
  }



export default ViewUser;