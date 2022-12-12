import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const key = 'defcd8c218d22d863f39161dc4c1c897';

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const movRates = async (dataRow) => {
    // idMovie();
    // const dataMovies = await fetch(`https://api.themoviedb.org/3/movie/1018403?language=en-US&api_key=${key}`)
    const findApiMovie = await fetch(`https://api.themoviedb.org/3/movie/${dataRow}?language=en-US&api_key=${key}`)
    const valMovie = await findApiMovie.json();
    const resMovie = valMovie.vote_average;
    // const resMovie = valMovie;
    return resMovie;
    // console.log(resMovie);
    // console.log(dataMovie);
  }

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), async (doc) => {
      // setMovies(doc.data()?.savedShows);
      const apiArrayMovie = doc.data()?.savedShows
      
      const dataLength = doc.data()?.savedShows.map((item) => (item.id));
      if (dataLength !== undefined) {
        // console.log(dataLength)
        let dataArrayMovie = []
        for (let i = 0; i < dataLength.length; i++) {
          const dataRow = dataLength[i];
          const resData = await movRates(dataRow);
          // console.log(dataRow);
          // console.log(resData);

          // apiArrayMovie = { ...apiArrayMovie, ['vote']: resData}

          dataArrayMovie = apiArrayMovie[i]
          dataArrayMovie['vote'] = resData

        }
        setMovies(apiArrayMovie)
        // console.log(apiArrayMovie)

      }
      // setRates(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)

  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result
      })
    } catch (error) {
      console.log(error)
    }
  }  

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movies?.map((item) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='whitespace-pre-line text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                <span className='absolute top-4 left-4 text-white'>
                  Rated &nbsp;
                  <span className='p-1 border border-red-700 rounded-full'>
                    {item?.vote}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;