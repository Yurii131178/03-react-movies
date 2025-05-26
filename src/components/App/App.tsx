// import { Toaster } from "react-hot-toast";
// import SearchBar from "../SearchBar/SearchBar";
// import MovieGrid from "../MovieGrid/MovieGrid";
// import { useState } from "react";
// import { type Movie } from "../../types/movie";

// export default function App() {
//   const [movies, setMovies] = useState<Movie[]>([]); // Додай типізацію масиву

//   const handleSearch = (query: string) => {
//     console.log(query);
//     // Тут буде моя логіка пошуку або обробки запиту :)
//     setMovies([]); // Поки що порожній масив
//   };

//   const handleSelectMovie = (movie: Movie) => {
//     console.log("Selected movie:", movie);
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearch} />
//       <Toaster />
//       <MovieGrid onSelect={handleSelectMovie} movies={movies} />
//     </>
//   );
// }
///////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);
    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // --- Блокування скролу та закриття модалки по ESC ---
  useEffect(() => {
    if (!selectedMovie) {
      // Якщо модалка закрита — відновити прокрутку сторінки
      document.body.style.overflow = "";
      return;
    }

    // Заборонити прокрутку тіла сторінки
    document.body.style.overflow = "hidden";

    // Обробник натискання ESC
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Очищення слухача при розмонтуванні / зміні selectedMovie
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedMovie]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
