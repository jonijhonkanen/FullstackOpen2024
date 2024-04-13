const SearchFilter = ({ countryFilter, handleFilterChange }) => {
  return (
    <div>
      find countries{' '}
      <input value={countryFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default SearchFilter;
