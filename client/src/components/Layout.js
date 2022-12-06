import React,{useEffect,useRef, useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {CgMenuLeft} from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../assets/img/apelogo.png';
import {SlClose} from 'react-icons/sl';
import {Sidebar} from './Index.js';
import axios from '../utils/axios.js';



const Layout = () => {
    const [toggleNav, setToggleNav] = useState(false);
    const [user, setUser] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
   
    useEffect(()=> {
       
        if(!userInfo ) {
            navigate('/Login')
        }
            setUser(userInfo);
        
    },[])
    return (
  
           
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={user} closeNav={setToggleNav}/>
            </div>

            <div className='flex md:hidden flex-row'>
            <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                <CgMenuLeft fontSize={40} className='cursor-pointer' onClick={() => setToggleNav(true)} />
                <Link to="/">
                    <img src={logo} alt="logo" className='w-24'/>
                </Link>
                <Link to={`/profile/${user?.username}`}>
                    <img src={user?.picture} referrerPolicy="no-referrer" alt="" className='w-12 rounded-full'/>
                </Link>
            </div> 
            {toggleNav && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md animate-slide-in z-50'>
                    <div className='absolute w-full flex justify-end items-center p-2'>
                    <SlClose fontSize={40} className='cursor-pointer' onClick={() => setToggleNav(false)} />
                    </div>
                    <Sidebar user={user} closeNav={setToggleNav}/>
                </div>
            )}
            </div>
          
          
           <Outlet context={{user , setSearchTerm, searchTerm}}/>
        </div> 

    );
};

export default Layout;