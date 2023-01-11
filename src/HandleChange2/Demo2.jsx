import React,{useCallback,useState} from 'react'
import ReactFlow, { Controls, Background ,applyNodeChanges,applyEdgeChanges} from 'reactflow';
import 'reactflow/dist/style.css';
function Demo2() {
    const initialNodes = [
        {
            id: '1', 
            sourcePosition: 'left',
            position: { x: 400, y: 0 }, 
            data: { label: 'Node 1' },
            type: 'default',
            targetPosition:'left'
        },
        {
            id: '2', 
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 400, y: 100 }, 
            data:{label:'Node 2'},
            type:'default'
        },
        {
            id: '3', 
            position: { x: 400, y: 200 }, 
            targetPosition:'left',
            data:{label:'Node 3'},
            type:'output'
        },
    ];
    const initialEdges = [
        { id: '1-2', source: '1', target: '2', type: 'step'  },
        { id: '2-3', source: '2', target: '3', type: 'step'  },
];

const [nodes, setNodes] = useState(initialNodes);
const [edges, setEdges] = useState(initialEdges);

const onNodesChange = useCallback(
  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  []
);
const onEdgesChange = useCallback(
  (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  []
);
    return (
        <>
            <div style={{ height: '100%' }}>
                <ReactFlow 
                nodes={nodes} 
                onNodesChange={onNodesChange} 
                edges={edges}
                onEdgesChange={onEdgesChange}
                >
                    
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    )
}
export default Demo2;