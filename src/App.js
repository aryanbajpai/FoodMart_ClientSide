import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import { AdminLogin } from './PAGES/Login/AdminLogin';
import { ManagerLogin } from './PAGES/Login/ManagerLogin';
import { AddVendors } from './PAGES/FORMS/AddVendors';
import { AdminHome } from './PAGES/HomePage/AdminHome';
import { AuthContext } from './HELPERS/AuthContext';
import { AddItems } from './PAGES/FORMS/AddItems';
import { AddReciepe } from './PAGES/FORMS/New Recipe/AddReciepe';
import { CreateReciepe } from './PAGES/FORMS/New Recipe/CreateReciepe';
import { HomePage } from './PAGES/HomePage/HomePage';
import { AddUpdtRecipe } from './PAGES/FORMS/AddUpdtRecipe';
import { UpdtRecipe } from './PAGES/FORMS/Old Recipe/UpdtRecipe';
import { OldRecipeUpdt } from './PAGES/FORMS/Old Recipe/OldRecipeUpdt';
import {ViewRecipe} from './PAGES/HomePage/ViewRecipe';

function App() {

  const [authState, setAuthState] = useState({
    username: '',
    password: '',
    status: false,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>

        <nav className='navbar w-screen'>
          <Link to={'/'} className='link'><h1 className='md:text-[32px] lg:text-[35px] font-bold'><i>Jagdai<span className='text-yellow-300'>Foods</span></i></h1></Link>
          {authState.status ? (
            <div className='subNav'>
              <button className='btn rounded-xl hover:bg-orange-500'>
                <Link to={'/addvendor'} className='link font-semibold md:text-xl lg:text-[22px]'>Add Vendors</Link>
              </button>
              <button className='btn rounded-xl hover:bg-orange-500'>
                <Link to={'/additems'} className='link font-semibold md:text-xl lg:text-[22px]'>Add Items</Link>
              </button>
              <button className='btn rounded-xl hover:bg-orange-500'>
                <Link to={'/addUpdt'} className='link font-semibold md:text-xl lg:text-[22px]'>Create Recipe</Link>
              </button>
            </div>
          ) : (
            <div className='subNav'>
              <button className='btn rounded-xl hover:bg-orange-500'>
                <Link to={'/adminLog'} className='link font-semibold md:text-xl lg:text-[22px] px-4'>Login</Link>
              </button>
            </div>
          )}
        </nav>

        <Routes >
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/adminHome' element={<AdminHome />} />
          <Route exact path='/adminLog' element={<AdminLogin />} />
          <Route path='/managerLog' element={<ManagerLogin />} />
          <Route path='/addvendor' element={<AddVendors />} />
          <Route path='/additems' element={<AddItems />} />
          <Route path='/addreciepe' element={<AddReciepe />} />
          <Route path='/updtreciepe' element={<UpdtRecipe />} />
          <Route path='/createreciepe/:reciepeId' element={<CreateReciepe />} />
          <Route path='/oldreciepe/:reciepeId' element={<OldRecipeUpdt />} />
          <Route path='/addUpdt' element={<AddUpdtRecipe />} />
          <Route path='/viewRecipe' element={<ViewRecipe />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
