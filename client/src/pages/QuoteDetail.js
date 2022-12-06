import React,{useEffect,useCallback, useState,useRef} from 'react';
import Header from '../components/Header';
import {v4 as uuidv4} from 'uuid';
import Spinner from '../components/Spinner';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { HiDocumentDownload } from 'react-icons/hi';
import MasonryGrid  from '../components/Masonry';
import logo from '../assets/img/viperHut.png'
import {AiFillDelete} from 'react-icons/ai';
import { toJpeg } from 'html-to-image';
import {BsFillBookmarkPlusFill} from 'react-icons/bs';
import {BsFillBookmarkDashFill} from 'react-icons/bs';
import {AiFillTags} from 'react-icons/ai';
import {FcInfo} from 'react-icons/fc';
import Modal from '../components/Modal';
import instance from '../utils/axios';
import moment from 'moment';


const QuoteDetail = () => {
    const [details, setDetails] = useState();
    const [saveLoading,setSaveLoading] = useState(false)
    const [similarquote, setSimilarQuote] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [imgH, setImgH] = useState('');
    const {user} = useOutletContext();
    const ref = useRef();
    const imgElement = useRef();
    const navigate = useNavigate();
    const [quotemodal, showQuoteModal] = useState(false);
    const [commentmodal, showCommentModal] = useState(false);
    const [cid, setCid] = useState('');
    const alreadySaved = !!(details?.savedBy?.filter(item => item === user._id))?.length

  

    const fetchDetails = async () => {
        const res = await instance.get(`quote/${id}`)
        setDetails(res.data) 
    }
    const addComment = async () => {
        if(comment){
            setLoading(true)
            try {
                await instance.post(`quote/${id}/comment`,{
                comment:comment,
                postedBy:user.id
        })
        fetchDetails()
        setLoading(false)
        }  catch(err ){
            console.log(err)
            setLoading(false)
        }

    }
}

   

    const handleSave = async e => {
        e.stopPropagation()
        setSaveLoading(true)
          try{
           const res = await instance.post(`quote/save/${id}/${user.id}`)
           fetchDetails();
           setSaveLoading(false)
          } catch(err){
            console.log(err)
            setSaveLoading(false)
          }
          
        }

  
    const deleteQuote = async () => {
  
        try{
            await instance.delete(`quote/${id}`)
            navigate('/')
          
        }catch(err){
            console.log(err)
        }
    }

    const deleteComment = async () => {
        try{
       await instance.delete(`quote/${cid}/comment`)
       fetchDetails()
       showCommentModal(false)
        }catch(err){
            console.log(err)
        }
    }

        const onButtonClick = useCallback(() => {
            if (ref.current === null) {
              return
            }
            const title = details?.title || 'saveas'
            toJpeg(ref.current, { quality: 1.0 })
            .then((dataUrl) => {
              const link = document.createElement('a')
              
              link.download = `${title}.jpeg`
              link.href = dataUrl
              link.click()
            })
            .catch((err) => {
              console.log(err)
            })
          }, [ref])

        const onLoad = () => {
            if (ref.current === null) {
              return null
            }
            toJpeg(ref.current, { quality: 1.0 })
              .then((dataUrl) => {
                //const link = document.createElement('a')
                //link.download = 'my-image-name.png'
                //link.href = dataUrl
                //link.click()
              })
              .catch((err) => {
                console.log(err)
              })
          }
    

    useEffect(() => {
        fetchDetails();
    },[])

    if(!details) return <Spinner message="fetching quote..."/>
    return (
        <>
       
        {quotemodal && (
        <Modal showQuoteModal={showQuoteModal} Delete={deleteQuote} />
        )}
         {commentmodal && (
        <Modal showQuoteModal={showCommentModal} Delete={deleteComment} cid={cid} />
        )}
        <div className='flex-1 px-2 md:px-5'>
            
        <div className='bg-gray-50'>
            <Header/>
        </div>
        <div className='flex xl:flex-row flex-col m-auto bg-white' style={{maxWidth: '1500px', borderRadius: '32px'}}>
            <div ref={ref} className='relative flex justify-center items-center  w-full h-full  md:flex-start flex-initial'>
                <img 
                src={details.image} 
                alt=''
                className='rounded-lg w-full'
                ref={imgElement}
                onLoad={() => setImgH(imgElement.current.height)}
               />
                 <div className='flex flex-col absolute rounded-lg w-full gap-5  justify-center items-center top-0 left-0 bottom-0 right-0 bg-quotes'>
                      
                        <h1 className={`text-gray-100 uppercase mt-20 px-5 text-center text-bold items-center z-10`}>{details?.quote}</h1>
                        <div className='opacity-70 bottom-0 flex flex-col justify-center items-center'>
                        <img src={logo} alt="" width='60px' />
                        <small className='text-white text-xs  pb-3 '>QuoteHut</small>
                        </div>
                  
                </div>
               
            </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
            <div className='flex items-center  gap-2 mb-5'>
            <div
           download
           onClick={() => onButtonClick()}
           className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100  hover:shadow-md outline-none  "
           >
             <HiDocumentDownload className='h-6 w-6' color='teal' />
           </div>
         
    {details?.postedBy._id === user.id && (
 <button onClick={e => { e.stopPropagation()
  showQuoteModal(true)}} className='flex items-center justify-center bg-white opacity-70 hover:opacity-100 text-red-600 font-bold rounded-full w-9 h-9  text-base hover:shadow-md outlined-none'>

<AiFillDelete className='h-6 w-6' />
    </button>
    )
 } 
        {alreadySaved? 
                         <div className='flex  justify-center gap-1 items-center'>
                         <div className='text-gray-700 text-sm'>{details?.savedBy?.length}</div>
                      {saveLoading?
                     <p>...</p>:
                      <BsFillBookmarkDashFill onClick={e => handleSave(e)}  className='cursor-pointer h-5 w-5 text-red-500'/>
                       }
          </div>
          :
                <div className='flex  justify-center gap-1 items-center'>
                <div className='text-gray-700 text-sm'>{details?.savedBy?.length}</div>
                {saveLoading? 
                <p>...</p>: 
                <BsFillBookmarkPlusFill onClick={e => handleSave(e)}  className='cursor-pointer h-5 w-5 text-orange-500'/>
}</div>
 }
       <p className='text-gray-600 text-base'> - {"   "}{moment(details?.createdAt).format('MMMM Do YYYY')}</p>
        </div>
        <div>
                    <h1 className='text-2xl font-bold break-words mt-3 capitalize'>
                        {details.title}
                    </h1>
                    <hr class="my-3 w-64 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700" />
                  
                    <p className='flex gap-2 mt-2 text-base'><AiFillTags  /> {details.category}</p>
                    <p className='flex gap-2 mt-2 text-xs'><FcInfo className='mt-1'  /> {details.about}</p>
                    <h1 className='text-lg md:text-4xl text-gray-600 break-words mt-3 capitalize'>
                        "{details.quote}"
                    </h1>

                </div>
  
                
                <Link 
        to={`/profile/${details.postedBy._id}`}
        className='flex gap-2 mt-4 items-center'
         >
            <img src={details.postedBy.picture} 
            className='w-6 h-6 rounded-full object-contain' alt=""/>
            <p className='font semibold capitalize text-sm'>{details.postedBy?.username}</p>
         </Link>

         <hr class="my-3 w-full h-1 bg-gray-100 rounded border-0 dark:bg-gray-700" />
         <h2 className='mt-9 text-base  text-gray-700'>Comments</h2>
         <div className='max-h-370 overflow-y-auto'>
            {details.comments?.map((comment, i) => (
                <div className='flex justify-between'>
                <div className='flex gap-2 mt-5  bg-white rounded-lg' key={i}>
                <Link 
        to={`/profile/${comment.postedBy._id}`}>
                    <img src={comment.postedBy.picture} alt="" className='h-7 w-7 rounded-full cursor-pointer'/>
                    </Link><div className='flex flex-col'>
                        <p className='font-bold text-gray-600'>{comment.postedBy.userName}</p>
                        <p className='text-sm md:text-base text-gray-600'>{comment.comment}</p>
                        <hr class="my-3 w-full h-1 bg-gray-100 rounded border-0 dark:bg-gray-700" />
                </div>       
                </div>
                
                             {comment?.postedBy?._id === user.id &&
                                <div onClick={e => {
                                    setCid(comment._id)
                                    showCommentModal(true)
                                    }} className='flex flex-shrink-0 items-center justify-center bg-white opacity-70 hover:opacity-100 text-red-600 font-bold rounded-full w-9 h-9  text-base hover:shadow-md outlined-none'>
                               <AiFillDelete />
                                   </div>
                                } 
                                </div>
            ))}
            </div>
           
            <div className='flex flex-wrap mt-6 gap-3 '>
                
            <Link 
                to={`/profile/${details.postedBy._id}`}
                className='flex cursor-pointer items-center '
         >
            <img 
            src={details.postedBy.image} 
            className='w-7 h-7 rounded-full object-contain' alt=""
            />
         </Link>
         <input 
         className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' 
         type="text" 
         placeholder='Add Comment'
         value={comment}
         onChange={e => setComment(e.target.value)}
         />
         <div className='flex justify-center items-center ml-auto'>
           <button 
                            onClick={addComment}
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 h-7  text-white outline-none rounded-lg w-20 '
                            >{loading? '....' : 'Publish' }</button></div>
 </div>
</div>
        </div>
        <hr class="my-10 w-full h-1 bg-gray-100 rounded border-0 dark:bg-gray-500" />
    {
        similarquote?.length > 0 && (
            <>
        <h2 className='font-bold text-xl text-gray-700 mt-2'>Similar Quotes</h2>
        <MasonryGrid quotes={similarquote} />
        </>
        )
    }
    
     </div>
    </>
    );
};

export default QuoteDetail;