import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      things : [
        {
          id: 1,
          name: 'shovel',
          type: 'tool',
        },
        {
          id: 2,
          name: "rake",
          type: "tool"
        }
      ],
      latestThing: null
    }
    this.thingCreatedHandler = this.thingCreatedHandler.bind(this)
    
    this.state.latestThing = this.state.things[this.state.things.length - 1]

  //   this.setState({
  //     latestThing : this.state.things[-1]
  //   })
  }

  /// how do i get this thing into my snack list. Create a new dictionary then append it??
  thingCreatedHandler(thing) {
    // alert(thing.name)
    const updatedThings = this.state.things;
    updatedThings.push({name:thing.name, type:"tool", id:Math.floor(Math.random() * 1000)})
    this.setState({
      things : updatedThings,
      latestThing : thing, 
      
    })
  }

  render() {
    return (
    <div className="App">
      {/* <Header latestThing={this.state.latestThing}/> */}
      <Header count={this.state.things.length}/>
      <main>
        <ThingList things={this.state.things} onThingCreate={this.thingCreatedHandler}/>
        <ThingForm onThingCreate={this.thingCreatedHandler} />
      </main>
      <Footer text="yeahhhhhhh buddy"/>
    </div>
    )
  }

}

function ThingList(props) {
  return(
    <>
    <h2>Things</h2>
    <ul>
      <li>
        {props.things.map(thing => <Thing item={thing} key={thing.id} />)}
      </li>
    </ul>
    </>
  ) 
}


class ThingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      name : '???',
      thingType : '???',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newName = event.target.value;
    this.setState({
      name : newName,
    })
  }


  handleSubmit(event){
    event.preventDefault();
    this.props.onThingCreate(this.state);
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input 
        type="text" value={this.state.name} onChange={this.handleChange}>
        </input>
      </label>
    </form>
    )
  }
}



function Thing(props) {
  return <li>I am a thing {props.item.name}</li>
}



function Header(props) {
  // return <h2>First thing: {props.latestThing.name}</h2>
  return <h2>length of list: {props.count}</h2>
}

function Footer(props) {
  return <footer><small>{props.text}</small></footer>
}

export default App;
