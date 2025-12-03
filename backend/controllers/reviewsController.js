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

// TOP RATED BATHROOMS
async function getTopBathrooms(req, res) {
  try {
    const limit = Number(req.query.limit) || 5;

    const { data, error } = await supabase
      .from("BathroomRating")
      .select("*")
      .order("overallRating", { ascending: false })
      .limit(limit);

    if (error) throw error;
    const bathrooms = data.map((row) => ({
      id: row.id,
      name: `${row.building} Bathroom`,
      building: row.building,
      averageRating: row.overallRating,
      amenities: [], 
    }));

    res.json(bathrooms);
  } catch (err) {
    console.error("getTopBathrooms error:", err);
    res.status(500).json({ message: "Failed to load top bathrooms" });
  }
}

// SEARCH BATHROOMS
async function searchBathrooms(req, res) {
  try {
    const term = (req.query.search || "").trim();

    if (!term) {
      return getTopBathrooms(req, res);
    }

    const { data, error } = await supabase
      .from("BathroomRating")
      .select("*")
      .or(
        `building.ilike.%${term}%,comment.ilike.%${term}%`
      )
      .order("overallRating", { ascending: false });

    if (error) throw error;

    const bathrooms = data.map((row) => ({
      id: row.id,
      name: `${row.building} Bathroom`,
      building: row.building,
      averageRating: row.overallRating,
      amenities: [],
    }));

    res.json(bathrooms);
  } catch (err) {
    console.error("searchBathrooms error:", err);
    res.status(500).json({ message: "Failed to search bathrooms" });
  }
}

module.exports = {
    getCountReviews,
    getAverageRating,
    getAllReviews,
    getTopBathrooms, 
    searchBathrooms,   
};
