import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <ArticleList />
    </div>
  );
}
