export const getClassByRate = (rating: number | string) => {
  if (typeof rating === 'string' && rating.endsWith('%')) {
    return 'blue';
  }

  let numericRating: number | null;

  if (typeof rating === 'number') {
    numericRating = rating;
  } else if (typeof rating === 'string') {
    numericRating = parseFloat(rating);
    if (isNaN(numericRating)) {
      return 'default';
    }
  } else {
    numericRating = null;
  }

  if (numericRating !== null) {
    if (numericRating >= 7) {
      return 'green';
    } else if (numericRating > 3) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  return 'default';
};
