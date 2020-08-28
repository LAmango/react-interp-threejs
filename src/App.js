import React from 'react';
import threeEntryPoint from "./threejs/threeEntryPoint";
import Cube from "./components/cube";

const SceneMangerContext = React.createContext({});

class App extends React.Component {
  componentDidMount() {
      this.sm = threeEntryPoint(this.threeRootElement);
    console.log(this.sm)
  }


  render() {
        return(
          <SceneMangerContext.Provider value={{orthoCube: this.sm ? this.sm.sceneSubjects.orthoCube: {}}}>
            <div className="w-full h-full flex">
              <Cube/>
              <div className="w-5/6">
                <div ref={element => this.threeRootElement = element} className="w-full h-full"/>
              </div>
            </div>
          </SceneMangerContext.Provider>
        );
    }
}

export const SceneManagerConsumer = SceneMangerContext.Consumer;

export default App