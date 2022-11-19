import React,{useState,useCallback, useRef, useEffect} from 'react';
import { Link, redirect, useNavigate, useOutletContext } from 'react-router-dom';
import {FcDownload} from 'react-icons/fc';
import {v4 as uuidv4} from 'uuid';
import {AiFillDelete} from 'react-icons/ai';
import logo from '../assets/img/quotelogo.png';
import {BsFillBookmarkPlusFill} from 'react-icons/bs';
import {BsFillBookmarkDashFill} from 'react-icons/bs';
import { toJpeg } from 'html-to-image';
import axios from '../utils/axios';



const Quote = ({quote:{_id, image,quote,postedBy,save}}) => {
    
    const [postHovered, setPostHovered] = useState(false);
    const {user} = useOutletContext();
    const [postBy, setPostBy] = useState(false);
    const [imgH, setImgH] = useState('');
    const ref = useRef();
    const imgElement = useRef();
    
    const navigate = useNavigate()
  
    const alreadySaved = !!(save?.filter(item => item.postedBy === user.id))?.length

    const saveQuote = e => {
        e.stopPropagation()
    }
    const unsaveQuote = e => {
        e.stopPropagation()

    }
  
    const fetchProfile = async (id) => {
        const res = await axios.get(`user/${id}`);
        setPostBy(res.data)
    }

  useEffect(() => {
    fetchProfile(postedBy)
  }, [_id])
     
        return (
    
    <div className='mt-2 p-2'>
        <div 
                ref={ref}
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/Quote/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out" >

<img src={image} className='rounded-lg w-full' alt="" ref={imgElement}
      onLoad={() => setImgH(imgElement.current.height)}/>
<div className='flex flex-col justify-center px-3 absolute rounded-lg w-full gap-2 items-center top-0 left-0 bottom-0 right-0 bg-hQuotes'>
                     
                        <h1 className={` text-gray-100 uppercase text-base md:textlg mt-10 text-center text-bold z-20 `}>{quote}</h1>
                       <div className='flex   flex-col  justify-center items-center'>
                        <img src={logo} alt="" width='20px' />
                        <small className='text-white text-xsm pb-3 '>QuoteHut</small>
        </div>
     
                        </div>
                  
                      
   {postHovered && (
    <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-0' style={{height:'100%'}} >
        <div className='flex items-center justify-between'>
     
            <div className='flex ml-auto px-1'>
            {alreadySaved? 
                         <div className='flex  justify-center gap-1 items-center'>
                         <div className='text-white text-sm'>{save?.length}</div>
                          <BsFillBookmarkDashFill onClick={e => unsaveQuote(e)}  className='cursor-pointer h-5 w-5 text-red-500'/>
          </div>
          :
                <div className='flex  justify-center gap-1 items-center'>
                <div className='text-white text-sm'>{save?.length}</div>
                 <BsFillBookmarkPlusFill onClick={e => saveQuote(e)}  className='cursor-pointer h-5 w-5 text-orange-500'/>
 </div>
 }
 </div> 
            </div>
  
        </div>
   )}
        </div>

        <Link 
        to={`profile/${postBy?._id}`}
        className='flex gap-2 mt-4 items-center '
         >
            <img src={postBy?.picture} 
            className='w-6 rounded-full object-contain' alt=""/>
            <p className='font semibold capitalize text-sm'>{postBy?.username}</p>
         </Link>
     </div>  


    );
};

export default Quote;