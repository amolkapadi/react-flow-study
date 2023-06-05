import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    ConnectionMode,
    Controls,
} from 'reactflow';
import Offcanvas from 'react-bootstrap/Offcanvas';

import 'reactflow/dist/style.css';
import ShapeNode from './ShapeNode';
import Sidebar from './Sidebar';

import './index.css';



const nodeTypes = {
    shape: ShapeNode,
  };
  
  // export const defaultNodes: Node[] = [
  //   {
  //     id: '1',
  //     type: 'shape',
  //     position: { x: 0, y: 0 },
  //     data: { shape: 'round-rect', width: 150, height: 50, label: 'Round Rectangle', color: '#668de3' },
  //   },
  //   {
  //     id: '2',
  //     type: 'shape',
  //     position: { x: 25, y: 120 },
  //     data: { shape: 'diamond', width: 100, height: 100, label: 'Diamond', color: '#ff6700' },
  //   },
  //   {
  //     id: '3',
  //     type: 'shape',
  //     position: { x: -150, y: 135 },
  //     data: { shape: 'circle', width: 70, height: 70, label: 'Circle', color: '#6ede87' },
  //   },
  //   {
  //     id: '4',
  //     type: 'shape',
  //     position: { x: 220, y: 145 },
  //     data: { shape: 'circle', width: 150, height: 50, label: 'Ellipse', color: '#ff0072' },
  //   },
   
   
  // ];
  
  // const defaultEdges: Edge[] = [
   
  // ];
const initialNodes = [
  {
    id: '1',
    type: 'shape',
    position: { x: 0, y: 0 },
    data: { shape: 'round-rect', width: 150, height: 50, label: 'Round Rectangle', color: '#668de3' },
  },
  {
    id: '2',
    type: 'shape',
    position: { x: 25, y: 120 },
    data: { shape: 'diamond', width: 100, height: 100, label: 'Diamond', color: '#ff6700' },
  },
  {
    id: '3',
    type: 'shape',
    position: { x: -150, y: 135 },
    data: { shape: 'circle', width: 70, height: 70, label: 'Circle', color: '#6ede87' },
  },
  {
    id: '4',
    type: 'shape',
    position: { x: 220, y: 145 },
    data: { shape: 'circle', width: 150, height: 50, label: 'Ellipse', color: '#ff0072' },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    //offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //new state

    const [editValue, setEditValue] = useState()
    const [id, setId] = useState()

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeClick = (e, val) => {
        setEditValue(val.data.label)
        setId(val.id)
        setShow(true)

    }

    const handleEdit = () => {
        const res = nodes.map((item) => {
            if (item.id === id) {
                return { ...item, data: { label: editValue } }
            }
            return item
        })
        setNodes(res)
        setEditValue("")
        setShow(true)
    }

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

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
                data: { label: `${type}` },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow">
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update Node</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <label>label:</label><br />
                        <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="input-box" /> <br />
                        <button onClick={handleEdit} className="btn-update">Update</button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
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
                        <Controls />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
