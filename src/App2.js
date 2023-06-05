import React, { useState } from 'react';
import ReactFlow, { addEdge, removeElements } from 'reactflow';
import axios from 'axios';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 200, y: 0 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 200, y: 0 },
  },
];

const App = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => {
    const { source, target } = params;
    const newEdge = { id: `${source}-${target}`, source, target };
    setElements(addEdge(newEdge, elements));
  };

  const onElementsRemove = (elementsToRemove) => {
    setElements(removeElements(elementsToRemove, elements));
  };

  const onSave = () => {
    axios.post('http://localhost:4002/Data', { elements })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="dndflow">
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        style={{ height: '100px' }}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default App;
