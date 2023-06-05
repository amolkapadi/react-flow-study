import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import ShapeNode from './ShapeNode';


import './style.css';


const nodeTypes = {
  shape: ShapeNode,
};
const proOptions = { account: "paid-pro", hideAttribution: true };
const handleStyle = { opacity: "10px "};

export const defaultNodes: Node[] = [
  // {
  //   id: '1',
  //   type: 'shape',
  //   position: { x: 0, y: 0 },
  //   data: { shape: 'round-rect', width: 150, height: 50, label: 'Round Rectangle', color: '#668de3' },
  // },
  // {
  //   id: '2',
  //   type: 'shape',
  //   position: { x: 25, y: 120 },
  //   data: { shape: 'diamond', width: 100, height: 100, label: 'Diamond', color: '#ff6700' },
  // },
  // {
  //   id: '3',
  //   type: 'shape',
  //   position: { x: -150, y: 135 },
  //   data: { shape: 'circle', width: 70, height: 70, label: 'Circle', color: '#6ede87' },
  // },
  // {
  //   id: '4',
  //   type: 'shape',
  //   position: { x: 220, y: 145 },
  //   data: { shape: 'circle', width: 150, height: 50, label: 'Ellipse', color: '#ff0072' },
  // },
  // {
  //   id: '5',
  //   type: 'shape',
  //   position: { x: 380, y: 280 },
  //   data: { shape: 'hexagon', width: 120, height: 60, label: 'Hexagon', color: '#00d7ca' },
  // },
  // {
  //   id: '6',
  //   type: 'shape',
  //   position: { x: -250, y: 310 },
  //   data: { shape: 'arrow-rect', width: 130, height: 50, label: 'Arrow Rectangle', color: '#784be8' },
  // },
  // {
  //   id: '7',
  //   type: 'shape',
  //   position: { x: 15, y: 350 },
  //   data: { shape: 'database', width: 100, height: 80, label: 'Database', color: '#9ca8b3' },
  // },
  // {
  //   id: '8',
  //   type: 'shape',
  //   position: { x: 15, y: 500 },
  //   data: {
  //     shape: 'triangle',
  //     width: 100,
  //     height: 70,
  //     label: <div style={{ marginTop: 30 }}>Triangle</div>,
  //     color: '#ff6700',
  //   },
  // },
  // {
  //   id: '9',
  //   type: 'shape',
  //   position: { x: 200, y: 390 },
  //   data: { shape: 'parallelogram', width: 150, height: 70, label: 'Parallelogram', color: '#668de3' },
  // },
];

const defaultEdges: Edge[] = [
 
];

// const initialNodes = [
 
// ];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlowPro = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  //background 
  const [variant, setVariant] = useState('lines');

  //update Node 
  const [editValue, setEditValue] = useState()
  const [id, setId] = useState()

  //edit function
  const onNodeClick = (e, val) => {
    setEditValue(val.data.label)
    setId(val.id)
  }

  //handle Change
  const handleChange=(e)=>{
    e.preventDefault();
    setEditValue( e.target.value);
  }
  
  //handle Function
  const handleEdit =()=>{
    const res=nodes.map((item)=>{
      if(item.id===id){
        item.data={
          ...item.data,
          label:editValue
        }
      }
      return item
    })
    setNodes(res)
    setEditValue('')
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
     
  //onDrop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
       const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");
      const shapeName = event.dataTransfer.getData("shapeName");
      const nodeData = event.dataTransfer.getData("nodedata");
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: label, nodeData: nodeData, shape: shapeName },

      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
    
  return (
    <div className="dndflow">
      <div className="updatenode__controls">

        <label>label:</label><br />
        <input type="text" value={editValue} onChange={handleChange} /> <br />
        <button onClick={handleEdit} className="btn">Update</button>
      </div>

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
              <Background color="" variant={variant} className="Demo"/>
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlowPro;
