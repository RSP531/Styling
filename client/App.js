import React from 'react';
import GroceryItem from './GroceryItem.jsx';
import $ from 'jquery';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super()
    this.state = {
      groceryInput: '',
      groceryList: ['broccoli', 'queso', 'oreos']
    }
  }

  componentDidMount(){
    this.getInformation()
  }

  deleteItem(event){
    let tempArry = this.state.groceryList
    tempArry.splice(event.target.value, 1)
    this.setState({
      groceryList: tempArry
    })
  }

  getInformation(){
    //Three technologies for HTTP request: Axios, Fetch, AJAX
    //axios get request
    //DON'T FORGET TO IMPORT AXIOS
    axios.get('http://jservice.io/api/clues')
      .then( (response) => {
        console.log(response)
        this.setState({
          question: response.data[0].question,
          answer: response.data[0].answer
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    //FETCH
    //Don't need to import anything
    // fetch('http://jservice.io/api/clues')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((myJson) => {
    //     this.setState({
    //       question: myJson[1].question,
    //       answer: myJson[1].answer
    //     })
    //   });

    //AJAX
    //IMPORT & install jquery
    //BARF 
    $.ajax({
      url: "http://jservice.io/api/clues",
      type: "GET",
      success: (result)=>{
        this.setState({
          question: result[2].question,
          answer: result[2].answer
        })
      },
    error: (error) => {
      console.log(error)
    }})
  }

  handleChange(event){
    this.setState({groceryInput: event.target.value})
  }

  submitItem(){
    if(this.state.groceryInput===''){
      return
    }
    let temp = this.state.groceryList;
    temp = temp.push(this.state.groceryInput)
    this.setState({
      groceryInput: temp,
      groceryInput: ''
    })
  }

  render(){
    return (
      <div>
        <h1>Grocery List</h1>
        <input onChange={this.handleChange.bind(this)} value={this.state.groceryInput}></input>
        <button onClick={this.submitItem.bind(this)}>Submit Item</button>
        {this.state.groceryList.map((item,index) => (
              <GroceryItem key={index} indexValue={index} oneItem={item} deleteItem={this.deleteItem.bind(this)}/>
        ))}

        <h1>It's Trivia Time</h1>
        <div>Question:  {this.state.question}</div>
        <div>Answer:  {this.state.answer}</div>
      </div>
    )
  }
}