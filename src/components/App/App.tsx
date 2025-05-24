import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const handleSearch = (query: string) => {
    console.log("Пошуковий запит:", query);
    // Тут твоя логіка пошуку або обробки запиту
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
