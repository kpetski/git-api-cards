import React, { Component } from 'react'
import axios from 'axios'

class Form extends Component {
    constructor(props) {
      super(props)
      this.state = { 
        userName: ''
      }
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      console.log('event: form submit', this.state.userName)
      axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(resp => {
          this.props.onSubmit(resp)
          this.setState({userName: '', userValid: true})
          document.getElementById('errors').innerHTML=""
        })
        .catch(err => {
          document.getElementById('errors').innerHTML="Please enter a valid username"
        })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
            value={this.state.userName}
            onChange={(event) => this.setState({userName: event.target.value})}
            placeholder="GitHub Username" 
            required/>
          <button type="submit">Add Card</button>
          <div id="errors" style={{backgroundColor: '#F5B7B1'}}></div>
        </form>
      )
    }
  }

  export default Form