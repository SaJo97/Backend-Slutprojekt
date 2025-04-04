const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const categoryMap = {
    All: "All",
    TV: "TV",
    "Mobile Phones": "mobiltelefoner",
    Laptops: "laptop",
    "Vacuum Cleaners": "dammsugare",
  };

  const categories = Object.keys(categoryMap);

  const handleChange = (event) => {
    setSelectedCategory(categoryMap[event.target.value]);
  };

  return (
    <div className="filter">
      <p>Filter by Category</p>
      <select value={categoryMap[selectedCategory]} onChange={handleChange}>
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
