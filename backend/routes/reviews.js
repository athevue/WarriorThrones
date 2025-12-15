const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getCountReviews,
  getAverageRating,
  getTopBathrooms,
  searchBathrooms,
  getRandomBathroom,
  getRecentActivity,
} = require("../controllers/reviewsController");

// Get count of reviews
router.get("/count", (req, res) => {
    console.log("GET /api/reviews/count called");
    getCountReviews(req, res); 
});

router.get("/average", (req, res) => {
    console.log("GET /api/reviews/average called");
    getAverageRating(req, res); 
});

// route to get all reviews
router.get("/all", (req, res) => {
    console.log("GET /api/reviews/all called"); // <-- put it here
    getAllReviews(req, res); // call your controller
  }
);

// GET /api/reviews/top?limit=5
router.get("/top", (req, res) => {
  console.log("GET /api/reviews/top called");
  getTopBathrooms(req, res);
});

router.get("/random", getRandomBathroom);

router.get("/recent", getRecentActivity);

// GET /api/reviews?search=term
router.get("/", (req, res) => {
  console.log("GET /api/reviews?search called");
  searchBathrooms(req, res);
});




module.exports = router;