const Filter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  return (
    <div className="filter">
      <p>Filter by Category</p>
      <select value={selectedCategory} onChange={handleChange}>
        <option value="All">All</option> {/* Default option */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;