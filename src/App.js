import React from 'react';
import threeEntryPoint from "./threejs/threeEntryPoint";
import Cube from "./components/cube";
import ElementContainer from "./components/ElementContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeIsAdded: false
    }
  }
  componentDidMount() {
    this.sm = threeEntryPoint(this.containerElement)
  }

  componentDidUpdate(prevProps, prevState) {
    this.sm.sceneManger.onAppDidUpdate(prevProps, prevState, this.props, this.state);
  }

  addCube = () => {
    this.sm.start();
    this.setState({
      cubeIsAdded: true
    })
  };

  render() {
    console.log(this.sm)
        return(
            <div className="w-full h-full flex">
              <div className="w-1/6 bg-gray-500">polygons
                <button onClick={this.addCube}>Add cube</button>
              </div>
              <div className="w-5/6">
                <div ref={element => this.containerElement = element} className="w-full h-full"/>
              </div>
            </div>
        );
    }
}

export default App