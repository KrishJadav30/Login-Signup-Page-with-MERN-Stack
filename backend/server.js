/* eslint-env node */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from React
app.use(express.json()); // Parse JSON data from request body

// --- DATABASE CONNECTION ---
// Connect to MongoDB (Ensure you have MongoDB installed locally or use an Atlas URL)
mongoose.connect('mongodb://127.0.0.1:27017/myLoginApp')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// --- USER MODEL ---
// This defines what a "User" looks like in the database
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// 1. Signup Route (Create a new user)
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save(); // Save to database

        console.log("User Registered:", email);
        res.json({ status: "ok", message: "User registered successfully" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Error registering user" });
    }
});

// 2. Login Route (Check if user exists)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        // Check if user exists AND password matches
        if (user && user.password === password) {
            console.log("Login Successful:", email);
            res.json({ status: "ok", message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});