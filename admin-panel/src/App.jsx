import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:9000/";

  return (
    <div>
    <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        {/* setting up react routes */}
        <Routes>
          <Route path="/" element={<Add url={url} />}/>
          <Route path="/list" element={<List url={url} />}/>
          <Route path="/order" element={<Order url={url} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App



// axios: A promise-based HTTP client for making API requests.
// react-toastify: A library to add beautiful notifications or toast messages in your app.
// react-router-dom: A library for routing in React apps, allowing for declarative navigation between different components or pages.

//React toastify for notification
