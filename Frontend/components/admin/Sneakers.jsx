import React, { useState, useEffect } from "react";
import axios from "axios";

const Sneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [sneaker, setSneaker] = useState({ name: "", brand: "", price: "", size: "", image: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/sneaker");
      setSneakers(res.data);
    } catch (error) {
      console.error("Failed to fetch sneakers:", error);
    }
  };

  const handleChange = (e) => {
    setSneaker({ ...sneaker, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSneaker({ ...sneaker, image: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", sneaker.name);
    formData.append("brand", sneaker.brand);
    formData.append("price", sneaker.price);
    formData.append("size", sneaker.size);
    formData.append("image", sneaker.image);

    try {
      await axios.post("http://localhost:5001/sneaker/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchSneakers();
      alert("Sneaker added successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/sneaker/${id}`);
      fetchSneakers();
    } catch (error) {
      console.error("Failed to delete sneaker:", error);
    }
  };

  return (
    <div>
      <h2>Add Sneaker</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Sneaker Name" onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="size" placeholder="Size" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {preview && <img src={preview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
        <button type="submit">Add Sneaker</button>
      </form>

      <h2>Available Sneakers</h2>
      <ul className="available-sneakers">
        {sneakers.map((s) => (
          <li key={s._id}>
            <img className="available-img" src={`http://localhost:5001${s.imageUrl}`} alt={s.name}  />
            {s.name} - {s.brand} - ${s.price} - Size: {s.size}
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sneakers;
