import React from 'react';
import Masonry from 'react-masonry-css';
import Quote from './Quote';



const MasonryGrid = ({quotes}) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    return (
        <div>
            <Masonry breakpointCols={breakpointColumnsObj} className="flex animate-slide-fwd" >
{ quotes.map(quote => ( <Quote key={quote?._id} quote={quote}/> )) }

</Masonry>
        </div>
    );
};

export default MasonryGrid;