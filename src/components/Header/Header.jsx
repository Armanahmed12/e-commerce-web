import React, { useContext, useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FaBars, FaUser } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AuthenticationData } from '../../inforProviders/AuthInfoProvider';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
   const navTag = useRef('nav-tag');
   let [showLinks, setShowlinks] = useState(false);
   const {navBarIconCliked,setNavBarIconClicked,user,userLogOut} = useContext(AuthenticationData);

   useEffect((() => {

      if (showLinks) {
         navTag.current.parentNode.parentNode.setAttribute('class', 'fixed md:static w-full');
      } else {

         navTag.current.parentNode.parentNode.removeAttribute('class');
      }

   }), [showLinks]);

   const handleUserLogOut = () =>{

      userLogOut()
      .then(()=>{

          toast.success(`User has logged out successfully.`, {

             position: "top-center"

        });
       

     }).catch(()=>{})
        
   };

   return (
      <nav className={`md:flex md:justify-between md:items-center md:bg-[#1c2b35] sticky top-0`}>
         
         <div ref={navTag} className={`px-4 flex justify-between items-center py-3 sticky top-0 bg-[#1c2b35] md:bg-[#1c2b35] z-30`}>
            <img src={logo} alt="" />
            {
               showLinks ? <RxCross2 onClick={() =>{
                  setShowlinks(!showLinks)
                  setNavBarIconClicked(!navBarIconCliked)
               }} className='text-white md:hidden text-2xl' /> :
                  <FaBars onClick={() => {
                     setShowlinks(!showLinks)
                     setNavBarIconClicked(!navBarIconCliked)}
                  } className='text-white md:hidden text-2xl' />
            }
         </div>
         <ul className={`md:flex ${showLinks ? ' top-[67px]' : ' -top-[100vh]'} justify-center md:justify-end items-center gap-5 duration-1000 md:duration-0 text-white absolute md:static left-0 z-20 w-full md:h-auto h-[100vh] md:px-4 text-center font-bold  md:bg-none bg-[#1c2b35]`}>
            <li onClick={() => setShowlinks(!showLinks)} className='pt-5 md:pt-0'><Link to="/">Home</Link></li>
            <li onClick={() => setShowlinks(!showLinks)} ><Link onClick={() => setShowlinks(!showLinks)} to="/order-review">Order Review</Link></li>
            <li onClick={() => setShowlinks(!showLinks)}><Link to="#">Manage Inventory</Link></li>
            {
                user ? <li className='flex justify-center items-center md:mx-1 lg:mx-0 mx-4 mt-2 md:mt-0 gap-2 border-[1px] p-2 rounded-md hover:bg-black' onClick={() =>{
                  setShowlinks(!showLinks)
                   handleUserLogOut()
                }}> <Link id='last-li'>Log Out</Link><FaUser className='md:mx-auto m-0 p-0'/></li> : <><li onClick={() => setShowlinks(!showLinks)}><Link to="/login" id='last-li'>Login</Link></li>  <li onClick={() => setShowlinks(!showLinks)}><Link to="/register" id='last-li'>Register</Link></li></>
            }
            <ToastContainer/>
         </ul>
      </nav>
   );
};

export default Header;