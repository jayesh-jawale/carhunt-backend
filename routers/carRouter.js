import express from "express";
const router = express.Router();

import {createCar, getCars, getMarutiCars, searchCars, getCarById} from "../models/carModel.js"

router.all('/', (req, res, next) => {
    // res.send("Message from ticket Router");
    next();
})

// Create car
router.post('/create-car', async (req, res) => {
    const carData = req.body;

    const result = await createCar(carData)

    if (result) {
        return res.json({
          status: "success",
          message: "New car has been created!",
        });
      }
  
      res.json({
        status: "error",
        message: "Unable to create the car",
      });
})

// Get all cars
router.get('/get-cars', async (req, res) => {
    const result = await getCars()

    if (result) {
        return res.json({
          status: "success",
          result,
        });
      }
  
      res.json({
        status: "error",
        message: "Cannot get cars",
      });
})

// Get maruti suzuki cars
router.get('/get-cars/maruti', async (req, res) => {
  const companyName = req.query;

  const result = await getMarutiCars(companyName)

  if (result) {
      return res.json({
        status: "success",
        result,
      });
    }

    res.json({
      status: "error",
      message: "Cannot get cars",
    });
})

// Search cars
router.get('/get-cars/car', async (req, res) => {
  const searchCar = req.query;

  const result = await searchCars(searchCar)

  if (result) {
      return res.json({
        status: "success",
        result,
      });
    }

    res.json({
      status: "error",
      message: "Cannot get cars",
    });
})

// Get car by Id
router.get('/get-cars/:_id', async (req, res) => {
  const {_id} = req.params;

  const data = await getCarById(_id)

  if (data) {
      return res.json({
        status: "success",
        data,
      });
    }

    res.json({
      status: "error",
      message: "Cannot get car",
    });
})

export const carRouter = router;