import React, { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import { Link, Routes,Route, useNavigate } from 'react-router-dom';
import {useOutletContext} from 'react-router-dom';
import {BsFillPenFill} from 'react-icons/bs';
import Search from '../pages/Search';

const Header = () => {
    const naviagte = useNavigate(); 
    const {user} = useOutletContext();
   
    const {searchTerm, setSearchTerm} = useOutletContext();
    //if(!user) return null;
  
    return (
        <div className='flex gap-2 w-full md:gap-5  mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
                <AiOutlineSearch fontSize={21} className="ml-1" />
                <input 
                type="text"
                onInput={e =>{
                    setSearchTerm(e.target.value)
                }}
                placeholder="Search"
                value={searchTerm}
                onFocus={() => naviagte('/search')}
                className="p-2 w-full bg-white outline-none"
                />
            </div>
        <div className='flex gap-3'>
            <Link to={`/profile/${user?.id}`} className="hidden md:block" >
                <img src={user?.picture} referrerPolicy="no-referrer" alt="" className='w-10 rounded-full' />
    
            </Link> 
            <Link 
            to='/create'
            className="hidden md:block"><BsFillPenFill fontSize={24} /></Link>
        </div>
     
        </div>
    );
};

export default Header;