import React from 'react';

interface ResetFiltersArgs {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCountry?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenre?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedOrder?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedType?: React.Dispatch<React.SetStateAction<string>>;
  setRatingFrom?: React.Dispatch<React.SetStateAction<string>>;
  setRatingTo?: React.Dispatch<React.SetStateAction<string>>;
  setYearFrom?: React.Dispatch<React.SetStateAction<string>>;
  setYearTo?: React.Dispatch<React.SetStateAction<string>>;
}

export const resetFilters = ({
  setSearchTerm,
  setSelectedCountry,
  setSelectedGenre,
  setSelectedOrder,
  setSelectedType,
  setRatingFrom,
  setRatingTo,
  setYearFrom,
  setYearTo,
}: ResetFiltersArgs) => {
  setSelectedCountry && setSelectedCountry('');
  setSelectedGenre && setSelectedGenre('');
  setSelectedOrder && setSelectedOrder('');
  setSelectedType && setSelectedType('');
  setRatingFrom && setRatingFrom('');
  setRatingTo && setRatingTo('');
  setYearFrom && setYearFrom('');
  setYearTo && setYearTo('');

  setSearchTerm('');
};
