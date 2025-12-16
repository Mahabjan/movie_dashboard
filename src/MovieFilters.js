import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

function MovieFilters() {
  const {
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
    setCurrentPage,
  } = useContext(MovieContext);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="filters">
      <input
        className="search-input"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearchChange}
      />
      <select value={genreFilter} onChange={handleGenreChange}>
        <option value="All">All genres</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
    </div>
  );
}

export default MovieFilters;
