import React from 'react';
import {SceneManagerConsumer} from "../App";

const Cube = () => {
  return (
    <SceneManagerConsumer>
      {({orthoCube}) => (
        <div className="w-1/6 bg-gray-500">polygons
          <button onClick={() => orthoCube.addCube()}>Add cube</button>
        </div>
      )}
    </SceneManagerConsumer>
  );
};

export default Cube;