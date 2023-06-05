// import Demo6 from './AddNodebtn5/Demo6';
import "./App.css";
import DnDFlowPro from "./Reactflow/DnDFlowPro";
import Emp from "./Json/Emp";
import Empform from "./Json/Empform";
import Navbar from "./CRUDAPP/Component/Navbar";
import { Routes, Route } from "react-router-dom"
import Alldata from "./CRUDAPP/Pages/Alldata";
import AddUser from "./CRUDAPP/Pages/AddUser";
import EditUser from "./CRUDAPP/Pages/EditUser";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Alldata/> } />
        <Route path="/adduser" element={ <AddUser /> } />
        <Route path="/edituser/:id" element={<EditUser /> } />
      </Routes>
    </>
  );
}

export default App;
