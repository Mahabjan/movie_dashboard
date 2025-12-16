import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";
import MovieFilters from "./MovieFilters";
import Pagination from "./Pagination";

function App() {
  const {
    notification,
    editingMovie,
    setEditingMovie,
    openAddForm,
    setOpenAddForm,
  } = useContext(MovieContext);

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Dashboard</h1>
        <button
          className="primary-btn"
          onClick={() => {
            setEditingMovie(null);
            setOpenAddForm(true);
          }}
        >
          + Add Movie
        </button>
      </header>

      {notification && (
        <div className={`alert ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {(openAddForm || editingMovie) && (
        <div className="card">
          <h2>{editingMovie ? "Edit Movie" : "Add Movie"}</h2>
          <MovieForm />
        </div>
      )}

      <div className="card">
        <MovieFilters />
      </div>

      <div className="card">
        <MovieList />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
