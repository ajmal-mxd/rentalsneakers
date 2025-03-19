const Sneaker = require("../models/Sneaker");

// Add a new sneaker
const addSneaker = async (req, res) => {
    try {
        const { name, brand, price, size } = req.body;

        if (!name || !brand || !price || !size) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        const newSneaker = new Sneaker({ name, brand, price, size, imageUrl });
        await newSneaker.save();

        res.status(201).json({ message: "Sneaker added successfully", sneaker: newSneaker });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all sneakers
const getSneakers = async (req, res) => {
    try {
        const sneakers = await Sneaker.find();
        res.status(200).json(sneakers);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete a sneaker
const deleteSneaker = async (req, res) => {
    try {
        const { id } = req.params;
        const sneaker = await Sneaker.findByIdAndDelete(id);

        if (!sneaker) {
            return res.status(404).json({ message: "Sneaker not found" });
        }

        res.status(200).json({ message: "Sneaker deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { addSneaker, getSneakers, deleteSneaker };
