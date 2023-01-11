const nodes = [
    {
        id: 'A',
        type: 'group',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 140,
        },
    },
    {
        id: 'A-1',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'A-2',
        data: { label: 'child node 2' },
        position: { x: 10, y: 90 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'B',
        data: { label: 'child node 3' },
        type: 'output',
        position: { x: -100, y: 200 },
    },
    {
        id: 'C',
        data: { label: 'child node 4' },
        type: 'default',
        position: { x: 100, y: 200 },
    },
    {
        id: 'D',
        data: { label: 'child node 5' },
        type: 'default',
        position: { x: 100, y: 300 },
    },
    {
        id: 'E',
        type: 'group',
        data: { label: null },
        position: { x: 200, y: 400 },
        style: {
            width: 170,
            height: 140,
        },
    },
    {
        id: 'E-1',
        type: 'default',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'E',
        extent: 'parent',
    },
];
export default nodes;