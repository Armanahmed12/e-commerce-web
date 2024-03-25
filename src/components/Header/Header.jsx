import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
// bg-[#1c2b35]

const Header = () => {
   const navTag = useRef('nav-tag');
   let [showLinks, setShowlinks] = useState(false);

   useEffect((() => {

      if (showLinks) {
         navTag.current.parentNode.parentNode.setAttribute('class', 'fixed w-full');
      } else {

         navTag.current.parentNode.parentNode.removeAttribute('class');
      }

   }), [showLinks]);

   return (
      <nav className={`md:flex md:justify-between md:items-center md:bg-[#1c2b35]`}>
         <div ref={navTag} className={`px-4 flex justify-between items-center py-3 sticky top-0  bg-[#1c2b35] md:bg-[#1c2b35] z-10`}>
            <img src={logo} alt="" />
            {
               showLinks ? <RxCross2 onClick={() => setShowlinks(!showLinks)} className='text-white md:hidden text-2xl' /> :
                  <FaBars onClick={() => setShowlinks(!showLinks)} className='text-white md:hidden text-2xl' />
            }
         </div>
         <ul className={`md:flex ${showLinks ? 'top-[67px]' : '-top-[100vh]'} justify-center md:justify-end items-center gap-5 duration-1000 md:duration-0 text-white absolute md:static left-0  w-full md:h-auto h-[100vh] md:px-4 text-center font-bold  md:bg-none bg-[#1c2b35]`}>
            <li onClick={() => setShowlinks(!showLinks)} className='pt-5 md:pt-0'><Link to="/">Home</Link></li>
            <li onClick={() => setShowlinks(!showLinks)} ><Link onClick={() => setShowlinks(!showLinks)} to="/order-review">Order Review</Link></li>
            <li onClick={() => setShowlinks(!showLinks)}><Link to="#">Manage Inventory</Link></li>
            <li onClick={() => setShowlinks(!showLinks)}><Link to="/login" id='last-li'>Login</Link></li>
         </ul>
      </nav>
   );
};

export default Header;