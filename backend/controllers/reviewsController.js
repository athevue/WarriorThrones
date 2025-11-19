const supabase = require("../utils/supabaseClient");

// Fetch count of reviews
async function getCountReviews(req, res) {
    try {
        const { count, error } = await supabase
            .from("BathroomRating")
            .select("id", { count: "exact", head: true });

        if (error) throw error;

        res.json({ count }); // use the Supabase count directly
    } catch (err) {
        console.error("Error fetching review count:", err);
        res.status(500).json({ error: "Failed to fetch review count" });
    }
}

// Get average rating
async function getAverageRating(req, res) {
  try {
    const { data, error } = await supabase
      .from("BathroomRating")
      .select("overallRating", { count: "exact" });

    if (error) throw error;

    const totalRatings = data.reduce((sum, review) => sum + review.overallRating, 0);
    const averageRating = data.length ? totalRatings / data.length : 0;

    res.json({ averageRating });
  } catch (err) {
    console.error("Error fetching average rating:", err);
    res.status(500).json({ error: "Failed to fetch average rating" });
  }
}

// NEW: Fetch all reviews
async function getAllReviews(req, res) {
  try {
    const { data, error } = await supabase.from("BathroomRating").select("*");
    if (error) throw error;

    res.json(data); // return all reviews as JSON
  } catch (err) {
    console.error("Error fetching all reviews:", err);
    res.status(500).json({ error: "Failed to fetch all reviews" });
  }
}

module.exports = {
    getCountReviews,
    getAverageRating,
    getAllReviews
};
