import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Form from "./components/Form"

/*
  using github public rest api
  build simple github card component

  Eample Users for valid input: 
  jordwalke
  sophiebits
  zpao
  azat-co
  kpetski
*/

const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} alt=""/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name || props.login}
        </div>
        <div>{props.company}</div>
        <div># of pulic repos: {props.public_repos}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
  console.log(props.cards)
  return (
    <div>
      {props.cards.map((card, index) => <Card {...card} key={index}/>)}
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount() { //populate initially with my id
    axios.get(`https://api.github.com/users/kpetski`)
    .then(resp => {
      this.addNewCard(resp)
    })
  }

  addNewCard =(cardInfo) => {
    console.log(cardInfo)
    this.setState(prevState =>({
      cards: prevState.cards.concat(cardInfo.data)
    }) )
  }
  
  render() {
    return (
      <div style={{margin: '1em'}}>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
