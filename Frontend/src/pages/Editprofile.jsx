import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

function EditProfile() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        location: "",
        pincode: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch user details when component mounts
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5001/user/profile", {
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching user data. Please try again.");
                setLoading(false);
            });
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("http://localhost:5001/user/profile/update", user, {
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Profile updated successfully!");
            navigate("/profile"); // Redirect to profile page
        } catch (error) {
            setError("Profile update failed! Please try again.");
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className="edit-profile-container">
            <h1 className="edit-profile-heading">Edit Profile</h1>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    {error && <p className="error-message">{error}</p>}
                    <h3>username:</h3>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <h3>Email:</h3>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <h3>Phone:</h3>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        title="Phone number must be 10 digits"
                        className="input-field"
                    />

                    <h3>Location:</h3>
                    <input
                        type="text"
                        name="location"
                        value={user.location}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <h3>Pincode:</h3>
                    <input
                        type="text"
                        name="pincode"
                        value={user.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        title="Pincode must be 6 digits"
                        className="input-field"
                    />

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditProfile;
