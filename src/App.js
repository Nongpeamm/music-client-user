// import {v4 as uuidv4} from 'uuid';
// import Formcomponent from './components/formcomponent'
// import Items from './components/Items';
// import './App.css';

//Pages
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Home from './components/pages/homepage';

//Layouts
import Navbar from './components/layouts/navbar';

import {Routes, Route} from 'react-router-dom'

// const Title = () => <h1>Title</h1>;
// const Description = () => <h3>Description</h3>
// const Transaction = () => {
//   const Translist = [
//     {title: "ค่าบ้าน1", amount: 100},
//     {title: "ค่ารถ", amount: 10000},
//     {title: "ค่าบ้าน", amount: 100000},
//     {title: "ค่าน้ำ", amount: 10000000},
//     {title: "ค่าไฟ", amount: 10}
//   ];

//     return(
//         <ul className="list-group">
//           {
//             Translist.map(e => {
//               return <Items title={e.title} amount={e.amount} key = {uuidv4()}/>
//             })
//           }
//         </ul>
//     )
// }

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element = {<Home /> } />
          <Route path="/register" element = {<Register />} />
          <Route path="/login" element = {<Login />} />
      </Routes>
    </div>
  );
}

export default App;
