import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";

const emptyMovie = {
  title: "",
  genre: "",
  year: "",
  rating: "",
};

function MovieForm() {
  const {
    addMovie,
    updateMovie,
    editingMovie,
    setEditingMovie,
    setOpenAddForm,
  } = useContext(MovieContext);

  const [values, setValues] = useState(emptyMovie);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingMovie) {
      setValues({
        title: editingMovie.title,
        genre: editingMovie.genre,
        year: editingMovie.year,
        rating: editingMovie.rating,
      });
    } else {
      setValues(emptyMovie);
    }
  }, [editingMovie]);

  const validate = () => {
    const err = {};
    if (!values.title.trim()) err.title = "Title is required";
    if (!values.genre.trim()) err.genre = "Genre is required";

    const yearNum = Number(values.year);
    if (!yearNum) err.year = "Year is required";
    else if (yearNum < 1900 || yearNum > new Date().getFullYear())
      err.year = "Year must be between 1900 and current year";

    const ratingNum = Number(values.rating);
    if (!ratingNum && ratingNum !== 0) err.rating = "Rating is required";
    else if (ratingNum < 0 || ratingNum > 10)
      err.rating = "Rating must be between 0 and 10";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditingMovie(null);
    setOpenAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingMovie) {
      updateMovie(editingMovie.id, {
        ...values,
        year: Number(values.year),
        rating: Number(values.rating),
      });
      setEditingMovie(null);
    } else {
      addMovie({
        ...values,
        year: Number(values.year),
        rating: Number(values.rating),
      });
      setOpenAddForm(false);
    }
    setValues(emptyMovie);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Movie title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-row">
        <label>Genre</label>
        <input
          name="genre"
          value={values.genre}
          onChange={handleChange}
          placeholder="Action / Drama / Sci-Fi ..."
        />
        {errors.genre && <span className="error">{errors.genre}</span>}
      </div>

      <div className="form-row">
        <label>Year</label>
        <input
          type="number"
          name="year"
          value={values.year}
          onChange={handleChange}
          placeholder="2019"
        />
        {errors.year && <span className="error">{errors.year}</span>}
      </div>

      <div className="form-row">
        <label>Rating (0 - 10)</label>
        <input
          type="number"
          step="0.1"
          name="rating"
          value={values.rating}
          onChange={handleChange}
          placeholder="8.5"
        />
        {errors.rating && <span className="error">{errors.rating}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingMovie ? "Update" : "Add"}
        </button>
        <button type="button" className="secondary-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
