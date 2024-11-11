import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'

import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

 
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjQyZmE1MTMwOTM0MzJiNTU0MTQwMjI3NDM0MDdjYiIsIm5iZiI6MTczMDkwMTYyNi41MTk2MzYsInN1YiI6IjY3MmI3NTU5Nzk2N2UwNjExMGVjYzZkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.duBpiet0iFy2gyq5p8rWEm_HRhxWHqTeLO6R6WytG9M'
  }
};




const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
};


useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then((res) => res.json())
    .then((res) => setApiData(res.results))
    .catch((err) => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }
  
  // Clean up the event listener to avoid memory leaks
  return () => {
    cardsRef.current?.removeEventListener("wheel", handleWheel);
  };
}, [category]);



  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards