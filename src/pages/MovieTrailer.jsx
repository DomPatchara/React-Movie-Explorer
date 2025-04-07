import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../API";
import { MovieContext } from "../context/MovieContext";
import Spinner from "../components/Spinner";

const MovieTrailer = () => {
  const { active, movieList, trendingMovies, isLoading, setIsLoading, errorMessage, setErrorMessage } =
    useContext(MovieContext);
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    // Ensure movieList is not empty
    if (movieList.length > 0) {
      const allmovie = [...movieList, ...trendingMovies];
      const movie = allmovie.find((movie) => movie.id === parseInt(movieId));

      if (movie) {
        if (active === "movie") {
          setMovieName(movie.title); // Name for Movie
        } else {
          setMovieName(movie.name); // Name for TV Shows
        }
      } else {
        console.log("Movie not found");
      }
    }
  }, [movieId]);

  // ---- Fetch Movie Video --------//
  const fetchMovieVideo = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const endpoint =
      active === "movie" ? `/movie/${movieId}/videos` : `/tv/${movieId}/videos`;

    try {
      const { data } = await apiClient.get(endpoint);
      console.log("video:", data);

      if(data.results.length === 0) {
        setErrorMessage('No video trailer available :(')
      } else {
        setVideos(data.results.slice(0, 4)); // select only 4 videos
      }


    } catch (err) {
      console.error("Error fetch Video:", err);
      setErrorMessage('No video trailer available :(')
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchMovieVideo();
    console.log("movieId:", movieId);
    console.log("video", videos)
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner/>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col py-16">
          <h1 className="text-3xl text-white">"{movieName}"</h1>
          <p className="text-3xl text-red-500 font-bold mx-auto">
            {errorMessage}
          </p>
        </div>
      ) : (
        <div>
          <div className="mt-10 mb-5">
            <h1>
              {movieName} : <span className="text-gradient">Trailers</span>
            </h1>
          </div>

          <div className="w-full flex flex-row overflow-x-scroll hide-scrollbar items-center space-x-4">
            {videos.map((video, index) => (
              <div key={index}>
                <iframe
                  className="w-100 h-64 sm:w-128 md:w-160 md:h-120 lg:w-256 lg:h-128 rounded-3xl"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MovieTrailer;
