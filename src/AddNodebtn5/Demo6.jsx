
import { useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';
import TextUpdaterNode from './TextUpdaterNode.js';
import './button.css';
const edgeOptions = {
  animated: false,
  style: {
    stroke: 'black',
  },
};

let nodeId = 0;

const nodeTypes = { textUpdater: TextUpdaterNode };

function Demo6() {
  const reactFlowInstance = useReactFlow();
  ///Input Node///
  const InputNode = useCallback(() => {
    const id = `${++nodeId}`;
    console.log(id);

    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      data: {
        label: `Input ${id}`,
      },
      type:'textUpdater',
    
    };
    reactFlowInstance.addNodes(newNode);
  }, []);
  //Deafult Node
  const DefaultNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      data: {
        label: `Default ${id}`,
      },
      type:'textUpdater'
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  //Output Node
  const OutputNode = useCallback(() => {
    const id = `${++nodeId}`;

    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      data: {
        label: `Output ${id}`,
      },
      type:'textUpdater',
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
      />
      <button onClick={InputNode} className="btn-input">
       Input   Node
      </button>
      <button onClick={DefaultNode} className="btn-default">
        Default Node
      </button>
      <button onClick={OutputNode} className="btn-output">
        Output Node
      </button>
    </>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
     <Demo6 />
    </ReactFlowProvider>
  );
}
