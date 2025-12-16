import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

function MovieList() {
  const {
    paginatedMovies,
    setEditingMovie,
    setOpenAddForm,
  } = useContext(MovieContext);

  if (paginatedMovies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Rating</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.map((m) => (
          <tr key={m.id}>
            <td>{m.title}</td>
            <td>{m.genre}</td>
            <td>{m.year}</td>
            <td>{m.rating}</td>
            <td>
              <button
                className="secondary-btn"
                onClick={() => {
                  setEditingMovie(m);
                  setOpenAddForm(false);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MovieList;
