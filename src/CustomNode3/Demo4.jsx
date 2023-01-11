import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const initialNodes = [
    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 0, y: 0 },
        data: { label: 123 }
    },
    {
        id: 'node-2',
        type: 'textUpdater',
        targetPosition: 'top',
        position: { x: -200, y: 200 },
        data: { label: 'node 2' },
    },
    {
        id: 'node-3',
        type: 'default',
        targetPosition: 'top',
        position: { x: 200, y: 200 },
        data: { label: 'node 3' },
    },
    {
        id: 'node-4',
        type: 'output',
        targetPosition: 'top',
        position: { x: -200, y: 400 },
        data: { label: 'node 3' },
    },
];

const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
    { id: 'edge-2', source: 'node-2', target: 'node-4', sourceHandle: 'b' },

];


const nodeTypes = { textUpdater: TextUpdaterNode };

function Demo4() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
        />
    );
}

export default Demo4;
