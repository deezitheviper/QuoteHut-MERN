import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import MasonryGrid from '../components/Masonry';
import { useOutletContext } from 'react-router-dom';

const Search = () => {

    const [quotes, setQuotes] = useState();
    const [loading, setLoading] = useState();
    const {searchTerm} = useOutletContext()

    useEffect(()=>{
        if(searchTerm) {
            setLoading(true);

        }else{
        
        }

    },[searchTerm])


    return (
        <div className='flex-1 px-2 md:px-5'>
           
        <div className='bg-gray-50'>
            <Header/>
        </div>
        <div className='h-full'>
         
        {loading&&(<Spinner message="Searching quotes..." />)}
        {quotes?.length > 0 && <MasonryGrid quotes={quotes} /> }
        {quotes?.length === 0 && searchTerm !== '' && !loading && (
            <div className='flex font-bold text-gray-700 tex-2xl justify-center items-center'>
            No Quotes
            </div>
        )}

        </div>
    </div>
    );
};

export default Search;