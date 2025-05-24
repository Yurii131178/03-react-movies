import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/Moviegrid";
import { useState } from "react";
import { type Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]); // Додай типізацію масиву

  const handleSearch = (query: string) => {
    console.log(query);
    // Тут буде моя логіка пошуку або обробки запиту :)
    setMovies([]); // Поки що порожній масив
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log("Selected movie:", movie);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <MovieGrid onSelect={handleSelectMovie} movies={movies} />
    </>
  );
}
