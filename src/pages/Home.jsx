import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDebounce } from "react-use";
import Switch from "../components/Switch";
import TrendingMovie from "../components/TrendingMovie";
import apiClient from "../API"; // New Fetch
import AllMovies from "../components/AllMoives";
import { MovieContext } from "../context/MovieContext";
import NumPages from "../components/NumPages";
import Hero from "../components/Hero";

// Fetch ( Simple Way )
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const {
    active,
    searchTerm,
    numPage,
    genreId,
    setTotalPages,
    genreName,
    setMovieList,
    setErrorMessage,
    setIsLoading,
    showMessage,
  } = useContext(MovieContext);

  // debounce prevent making too many API requests
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]); // ประมาณว่ารอให้ user พิมพ์จบก่อนหลัง 500ms ให้ API request

  // ------------------------------------------------------------------Fetch Data ---------------------------------------------------------------------- //

  // ------ Fetch All Movies ( Simple Way  ) -------//
  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/${active}?query=${encodeURIComponent(
            query
          )}&page=${numPage}`
        : `${API_BASE_URL}/discover/${active}?sort_by=vote_count.desc&page=${numPage}`;

      const res = await fetch(endpoint, API_OPTIONS);
      const data = await res.json();
      console.log("All Movies/TV Shows:", data);

      if (!res.ok) {
        // .ok คือ HTTP response status is in the range of 200-299   ถ้าออกนอกช่วง ( eg. 404, 500 ) ---> res.ok = false ทันที
        throw new Error("Failed to fetch movies"); // "block" flow or furture execution โค้ดอื่นๆ + throw message error
      }

      if (!data.results || data.results.length === 0) {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return; // stop function ตรงนี้ ถ้า data.response "Failed"
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ------ Fetch Movies By GenrcesID ( New Way with Axios intercept ) -- //
  const fetchByGenres = async (genreId) => {
    setErrorMessage("");
    setIsLoading(true);

    const endpoint = `/discover/${active}?sort_by=vote_count.desc&page=${numPage}&with_genres=${genreId}`;
    try {
      const { data } = await apiClient.get(endpoint); // await คือรอ Server Response ข้อมูลมา ถึงจะ flow code ต่อ
      console.log("Response:", data); // Check Response

      if (!data.results || data.results.length === 0) {
        setErrorMessage(data.Error || "No Genre founded !");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------------------- useEffect ------------------------------------------------------------- //
  useEffect(() => {
    if (genreName && genreId) {
      fetchByGenres(genreId);
    } else {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, numPage, active, genreId, genreName]);

  return (
    <div>
      <Hero />
      <Switch />
      <TrendingMovie />
      <AllMovies />
      <NumPages />

      {showMessage && (
        <div className="fixed bottom-3 right-6">
          <div className="bg-blue-900 text-white rounded-xl px-5 py-2 shadow-md">
            ✅ Movie added to Watchlist!
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
