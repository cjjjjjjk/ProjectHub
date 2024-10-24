import React from 'react';
import { Route, Routes, Link, BrowserRouter,NavLink } from 'react-router-dom';
import Home from './page/Home';
import Project from './page/Project';
import Login from './page/Login';
import Profile from './page/Profile';

import { useState } from 'react';
import { Drawer,Popover} from 'antd';

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const closeMenu = () => {
    setOpenMenu(false);
  }
  const [openNotification, setOpenNotification] = useState(false);
  const hide = () => {
    setOpenNotification(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpenNotification(newOpen);
  };
  return (
  <div> 
  <BrowserRouter>
    <nav className="border-y-2 border-gray-200 h-14">
      <Drawer open={openMenu} onClose={closeMenu} placement='left' width={300}  title="Menu" 
      >
        <div className="flex flex-col gap-4 font-medium">
          <div>
            <NavLink to="page/Profile"  className={({ isActive }) =>`text-base p-2 ${isActive ? 'flex text-white bg-blue-400  h-8 w-56 rounded-md font-bold items-center ' : 'text-black'}`}>
            Profile
            </NavLink>
          </div>
          <div>
          <NavLink to="page/Project"  className={({ isActive }) =>`text-base p-2 ${isActive ? 'flex text-white bg-blue-400  h-8 w-56 rounded-md font-bold items-center' : 'text-black'}`}>
             Your Project
          </NavLink>
          </div>
          <div>
            <button className="text-base pl-2 hover:opacity-50">
            Sign out
            </button>
          </div>
        </div>
      </Drawer>
      <div className="max-w-screen-xl grid grid-cols-2 items-center p-4">
        <div className="flex flex-row gap-2">
          <button onClick={()=>{setOpenMenu(true)}} className="hover:opacity-30">
            <img className="h-8 w-8"src="https://i.imgur.com/ghrAiTG_d.webp?maxwidth=128&shape=square"></img>
          </button>
          <div>Logo</div>
          <div className="text-xl font-bold">ProjectHub</div>
        
        </div>
        <div className="flex flex-row gap-6 justify-end relative right-8 font-medium" >
            <NavLink to="/page/Home"className={({ isActive }) =>`text-base ${isActive ? 'text-blue-500 font-bold' : 'text-black'}`}>
                Home
            </NavLink>
            <NavLink to="/page/Project"
            className={({ isActive }) =>`text-base ${isActive ? 'text-blue-500 font-bold' : 'text-black'}`}>
                Project
            </NavLink>
            <NavLink to="/page/Login"className={({ isActive }) =>`text-base ${isActive ? 'text-blue-500 font-bold' : 'text-black'}`}>
                Login
            </NavLink>
            <Popover
              content={<div>
                <div className="flex flex-col">
                  <div>noti 1</div>
                  <div>noti 1</div>
                  <div>noti 1</div>
                </div>
              </div>}
              title="Notification"
              trigger="click"
              open={openNotification}
              onOpenChange={handleOpenChange}
              overlayStyle={{ width: '400px', height: '100px' }}
            >
              <button >
                <img src="https://i.imgur.com/yccAamQ_d.webp?maxwidth=128&shape=square" className="w-5 h-5 hover:opacity-35"></img>
              </button>
            </Popover>
        </div>
      </div>
    </nav>
   

    <Routes>
      <Route path="/page/Home" element={<Home/>}/>
      <Route path="/page/Project" element={<Project/>}/>
      <Route path="/page/Login" element={<Login/>}/>
      <Route path="/page/Profile" element={<Profile/>}/>
    </Routes>
  </BrowserRouter>

  </div>
  );
}

export default App;
