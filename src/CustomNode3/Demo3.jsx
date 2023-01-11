import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
    { id: 'node-1', type: 'textUpdater',    position: { x: 200, y: 200 }, data: { value: 123 } },
  { id: 'node-2', type: 'textUpdater', position: { x: 200, y: 300 }, data: { value: 123 } },
  { id: 'node-3', type: 'textUpdater', position: { x: 200, y: 400 }, data: { value: 123 } },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

function Demo3() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

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

export default Demo3;
