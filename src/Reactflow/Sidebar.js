import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import defaultNodes from './DnDFlowPro'


export default () => {
  const onDragStart = (event, nodeType, label, nodedata,shapeName) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("label", label);
    event.dataTransfer.setData("nodedata", nodedata);
    event.dataTransfer.setData("shapeName",shapeName);
    event.dataTransfer.effectAllowed = "move";
    console.log(nodedata);
  };
  
  return (
    <aside>
      <h1 className="offcanvas-label">Shapes</h1>
      <div className="dndnode"   onDragStart={(event) => onDragStart(event, "shape","Round Rectangle","data","round-rect")}  draggable>
      Round Rectangle
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "shape","Diamond", "data1","diamond")} draggable>
      Diamond
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "shape","hexagon", "data","hexagon")} draggable>
      hexagon
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "shape","voice Processer", "data" ,"parallelogram")} draggable>
      parallelogram
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "shape","Arrow-rect", "data","arrow-rect")} draggable>
      Arrow Rectangle
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, "shape","Database", "data","database")} draggable>
      Database
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, "shape","Triangle", "data","triangle")} draggable>
      Triangle
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, "shape","Circle", "data","circle")} draggable>
      Circle
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, "shape","Ellipse", "data","circle")} draggable>
      Ellipse
      </div>
  
    </aside>
  );
};
