import React from 'react';
import './App.css';
import ListItems from './ListItems.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    }
  }

  handleInput(e){
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text!==""){
      const newItems=[...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem:{
          text: '',
          key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item =>
      item.key!==key);
      this.setState({
        items:filteredItems
      })
  }

  setUpdate(text, key){
    const items = this.state.items;
    // eslint-disable-next-line
    items.map(item => {
      if(item.key === key){
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }

  render(){
    return (
      <div className="App">
        <header>
          <form id="todo-form" onSubmit={(e)=>{this.addItem(e)}}>
            <input 
              type="text" 
              placeholder="Masukkan Text"
              value={this.state.currentItem.text}
              onChange={(e)=>this.handleInput(e)}
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItems 
          items = {this.state.items}
          deleteItem = {(key) => {this.deleteItem(key)}}
          setUpdate = {(text, key) => {this.setUpdate(text, key)}}
        />
      </div>
    );
  }
}

export default App;
