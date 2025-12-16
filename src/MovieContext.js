import React, { createContext, useState, useMemo } from "react";

export const MovieContext = createContext();

const initialMovies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, rating: 9 },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: 8.5 },
  { id: 3, title: "Jab We Met", genre: "Romance", year: 2007, rating: 8 },
  { id: 4, title: "Avengers: Endgame", genre: "Action", year: 2019, rating: 8.4 },
];

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(initialMovies);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const [notification, setNotification] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const addMovie = (movie) => {
    const id = Date.now();
    setMovies((prev) => [...prev, { ...movie, id }]);
    showNotification("success", "Movie added successfully!");
  };

  const updateMovie = (id, updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedMovie } : m))
    );
    showNotification("success", "Movie updated successfully!");
  };

  const filteredMovies = useMemo(() => {
    let data = [...movies];
    if (search.trim()) {
      data = data.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genreFilter !== "All") {
      data = data.filter((m) => m.genre === genreFilter);
    }
    return data;
  }, [movies, search, genreFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / pageSize));

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMovies.slice(start, start + pageSize);
  }, [filteredMovies, currentPage]);

  const value = {
    movies,
    addMovie,
    updateMovie,
    editingMovie,
    setEditingMovie,
    openAddForm,
    setOpenAddForm,
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedMovies,
    notification,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
