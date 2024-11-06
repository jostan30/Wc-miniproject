const Ride = require('../models/Ride');
// Create a new ride
const createRide =  async (req, res) => {
    const { source, destination, timing, description } = req.body;

    try {
        const newRide = new Ride({
            user: req.user._id, // Assuming req.user is set by your authentication middleware
            source,
            destination,
            timing,
            description,
        });

        const savedRide = await newRide.save();
        res.status(201).json(savedRide);
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all rides
const getRides = async (req, res) => {
    try {
        const rides = await Ride.find().populate('user', 'name');
        res.json(rides);
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getRideById = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }
        res.json(ride);
    } catch (error) {
        console.error('Error fetching ride:', error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    createRide,
    getRides,
    getRideById,
};
