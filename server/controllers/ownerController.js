import imagekit from "../configs/imagekit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// API to change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list your cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list all cars
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer, //required
      fileName: imageFile.originalname, //required
      folder: "/cars",
    });

    // Optimization through imagekit URL transformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Width Resizing
        { quality: "auto" }, // Quality Optimization
        { format: "webp" }, // Format Conversion
      ],
    });

    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
  
    // Check if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "You cannot change availability of this car" });
    }
  
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({ success: true, message: "Car availability updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });    
  }
};

// API to Delete Car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
  
    // Check if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "You cannot change availability of this car" });
    }
  
    car.owner = null; // Set owner to null instead of deleting the car
    car.isAvailable = false; // Make the car unavailable
    await car.save();
    
    res.json({ success: true, message: "Car Removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });    
  }
}

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Only owners can access dashboard data" });
    }

    const cars = await Car.find({ owner: _id });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}