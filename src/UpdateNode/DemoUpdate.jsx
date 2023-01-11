import React, { useEffect, useState ,useCallback} from 'react';
import ReactFlow, { useNodesState, addEdge ,
  applyNodeChanges,
  applyEdgeChanges, } from 'reactflow';
import 'reactflow/dist/style.css';

import './updatenode.css';

const initialNodes = [
    { id: '1',
     type:'input',
     data: { label: 'Node 1' },
      position: { x: 400, y: 100 } ,
      className: 'circle',
      style: {
        background: '#2B6CB0',
        color: 'white',
      },
    },
    { id: '2', data: { label: 'Node 2' }, position: { x: 400, y: 200 } },
    { id: '3',
     type:'output', 
     data: { label: 'Node 3' }, 
     position: { x: 400, y: 300 },
     className: 'circle',
     style: {
       background: 'green',
       color: 'white',
     },
     },
];
const initialEdges = [];

const DemoUpdate = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeName, setNodeName] = useState('node 1');
  const [nodeNames,setNodeNames]=useState('node 2')
  const [nodeout,setNodeOut]=useState('node 3')


  //node 1
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);
  //node 3
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '2') {
         
          node.data = {
            ...node.data,
            label: nodeNames,
          };
        }

        return node;
      })
    );
  }, [nodeNames, setNodes]);
  //node 3
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '3') {
         
          node.data = {
            ...node.data,
            label: nodeout,
          };
        }

        return node;
      })
    );
  }, [nodeout, setNodes]);
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  
  const onNodeClick = (node) => {
    console.log(node)
  }
  return (
    <ReactFlow
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
     nodes={nodes}
     onNodeClick={onNodeClick}
      minZoom={0.2}
      edges={edges}
      maxZoom={4}
      onConnect={onConnect}
      attributionPosition="bottom-left"
    >
      <div className="updatenode__controls">
        <label>Input Node</label>
        <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
        <br /><br />
        <label>Default Node</label>
        <input value={nodeNames} onChange={(evt) => setNodeNames(evt.target.value)} />
        <br /><br />
        <label>Output Node</label>
        <input value={nodeout} onChange={(evt) => setNodeOut(evt.target.value)} />
      </div>
    </ReactFlow>
  );
};

export default DemoUpdate;
