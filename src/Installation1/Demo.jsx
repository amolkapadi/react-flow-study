import React from 'react'
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
function Demo() {
    const nodes = [
        {
            id: '1', 
            sourcePosition: 'bottom',
            position: { x: 400, y: 0 }, 
            data: { label: 'Node 1' },
            type: 'input',
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
            data:{label:'Node 3'},
            type:'output'
        },
    ];
    const edges = [
        { id: '1-2', source: '1', target: '2',label: 'Node 1 connect Node 2', type: 'step'  },
        { id: '2-3', source: '2', target: '3',label: 'Node 2 connect Node 3', type: 'step'  }

];


    return (
        <>
            <div style={{ height: '100%' }}>
                <ReactFlow nodes={nodes} edges={edges}>
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    )
}
export default Demo;