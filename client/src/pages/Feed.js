import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {Header } from '../components/Index';
import MasonryGrid from '../components/Masonry';

const Feed = () => {
    const [quotes, setQuotes] = useState();

    const [loading, setLoading] = useState(true);
    const {id} = useParams();
   
    const slugToText = (slug) => {
        return slug.toLowerCase().replace(/-/g,' ')
    }
    useEffect(()=> {
        setLoading(true)
        if(id){
            
        }
        setLoading(false)
    },[id])
    if(loading) return <Spinner message="we are adding new details to your feed" />


    return (
        <div className='flex-1 px-2 md:px-5'>
           {console.log(quotes)}
            <div className='bg-gray-50'>
                <Header />
            </div>
            <div className='h-full'>
                
            {quotes?.length > 0 ? <MasonryGrid quotes={quotes} />
            :<div className='flex font-bold text-gray-700 tex-2xl justify-center items-center'>Opps No Quotes yet, create one! </div>
            }

            </div>
        </div>
    );
};

export default Feed;