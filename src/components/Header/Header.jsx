import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FaBars} from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";


const Header = () => {
    const navTag = useRef('nav-tag');
    let [showLinks, setShowlinks] = useState(false);
    useEffect((()=>{

      if(showLinks){
         navTag.current.parentNode.parentNode.setAttribute('class', 'fixed w-full');
      }else{
            
        navTag.current.parentNode.parentNode.removeAttribute('class'); 
      }

    }),[showLinks]);

    return (
        <nav ref={navTag} className={`flex justify-between items-center px-4 py-3 bg-[#1c2b35] ${showLinks && 'fixed w-full'}`}>
            <img src={logo} alt="" />
              {
                 showLinks ? <RxCross2 onClick={()=> setShowlinks(!showLinks)} className='text-white md:hidden text-2xl'/> :
                 <FaBars onClick={()=> setShowlinks(!showLinks)} className='text-white md:hidden text-2xl'/>
              }
             <ul className={`md:flex ${showLinks ? 'block' : 'hidden'} justify-center md:justify-end items-center gap-5 text-white absolute md:static left-0 top-[67px] bg-[#1c2b35] w-full text-center font-bold`}>
                <li><a href="#">Order</a></li>
                <li><a href="#">Order Review</a></li>
                <li><a href="#">Manage Inventory</a></li>
                <li><a id='last-li' href="#">Login</a></li>
             </ul>
        </nav>
    );
};

export default Header;