import styles from './SnackForm.module.css';
import { useState, useEffect } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  // Validation functions
  function validateName(name) {
    return name.trim() !== '';
  }

  function validateRating(rating) {
    return rating !== '';
  }

  function getNameError() {
    if (!validateName(name) && touched.name) {
      return 'Snack name is required';
    }
    return ''; // No error
  }

  function getRatingError() {
    if (!validateRating(rating) && touched.rating) {
      return 'Please select a rating';
    }
    return ''; // No error
  }

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(editingSnack.rating.toString());
      setTouched({ name: false, rating: false });
    } else {
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }, [editingSnack]);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, rating: true });

    if (!validateName(name) || !validateRating(rating)) {
      return; // Don't submit if there are validation errors
    }

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }

  const nameError = getNameError();
  const ratingError = getRatingError();

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      {/* Name field */}
      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {nameError && <div className={styles.error}>{nameError}</div>}
      </div>

      {/* Rating field */}
      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {ratingError && <div className={styles.error}>{ratingError}</div>}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
