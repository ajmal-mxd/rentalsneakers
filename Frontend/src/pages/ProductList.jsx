import { useEffect, useState, useMemo } from "react";
import "../App.css"; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/user/product") // Adjust API URL if needed
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setProducts([]); // Fallback to empty array
        setLoading(false);
      });
  }, []);

  // Filter products based on search and selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (brandFilter === "" || product.brand.toLowerCase() === brandFilter.toLowerCase()) &&
        (sizeFilter === "" || product.size === Number(sizeFilter)) &&
        (statusFilter === "" || product.status.toLowerCase() === statusFilter.toLowerCase())
      );
    });
  }, [products, searchTerm, brandFilter, sizeFilter, statusFilter]);
  
  const handleClearFilters = () => {
    setSearchTerm("");
    setBrandFilter("");
    setSizeFilter("");
    setStatusFilter("");
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Available Sneakers</h2>

      {/* Search Bar */}
      <div className="product-search-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="product-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {/* Filter Section */}
      <div className="product-filter-container">
        {/* Brand Filter */}
        <select
          className="product-filter-dropdown"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          aria-label="Filter by brand"
        >
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>

        {/* Size Filter */}
        <select
          className="product-filter-dropdown"
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          aria-label="Filter by size"
        >
          <option value="">All Sizes</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>

        {/* Status Filter */}
        <select
          className="product-filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select>

        {/* Clear Filters Button */}
        <button onClick={handleClearFilters} className="clear-filters-button">
          Clear Filters
        </button>
      </div>

      {loading && <p className="product-loading-text">Loading products...</p>}
      {error && <p className="product-error-text">{error}</p>}

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5001${product.imageUrl}`} // Adjust API URL if needed
                alt={product.name}
                className="product-image"
                aria-label={product.name}
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-price">${product.price}</p>
              <p className="product-size">Size: {product.size}</p>

              {/* Status Field */}
              <p className={`product-status ${product.status ? product.status.toLowerCase() : "unknown"}`}>
  {product.status || "Unknown"}
</p>


              <button
                className="product-rent-button"
                disabled={product.status === "Rented"}
              >
                Rent Now
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="product-no-data">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
