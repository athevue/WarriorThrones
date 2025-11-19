const express = require("express");
const router = express.Router();
const {
  getAllReviews, getCountReviews
} = require("../controllers/reviewsController");


// Get count of reviews
router.get("/count", (req, res) => {
    console.log("GET /api/reviews/count called");
    getCountReviews(req, res); 
});

// NEW route to get all reviews
router.get("/all", (req, res) => {
    console.log("GET /api/reviews/all called"); // <-- put it here
    getAllReviews(req, res); // call your controller
  }
);

module.exports = router;
