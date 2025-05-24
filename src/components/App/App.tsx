import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const handleSearch = (query: string) => {
    console.log(query);
    // Тут буде моя логіка пошуку або обробки запиту :)
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
    </>
  );
}
