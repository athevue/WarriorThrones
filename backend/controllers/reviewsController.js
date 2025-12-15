const supabase = require("../utils/supabaseClient");

// Fetch count of reviews
async function getCountReviews(req, res) {
    try {
        const { count, error } = await supabase
            .from("BathroomRatings")
            .select("*", { count: "exact", head: true });

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
      .from("BathroomRatings")
      .select("OverallRating", { count: "exact" });

    if (error) throw error;

    const totalRatings = data.reduce((sum, review) => sum + review.OverallRating, 0);
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
    const { data, error } = await supabase.from("BathroomRatings").select("*");
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
      .from("BathroomRatings")
      .select("*")
      .order("OverallRating", { ascending: false })
      .limit(limit);

    if (error) throw error;
    const bathrooms = data.map((row) => ({
      id: row.id,
      name: `${row.building_name} Bathroom`,
      building: row.building_name, // unsure of this field name
      averageRating: row.OverallRating,
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
      .from("BathroomRatings")
      .select("*")
      .or(
        `building_name.ilike.%${term}%`
      )
      .order("OverallRating", { ascending: false });

    if (error) throw error;

    const bathrooms = data.map((row) => ({
      id: row.id,
      name: `${row.building_name} Bathroom`,
      building: row.building_name,
      averageRating: row.overallRating,
      amenities: [],
    }));

    res.json(bathrooms);
  } catch (err) {
    console.error("searchBathrooms error:", err);
    res.status(500).json({ message: "Failed to search bathrooms" });
  }
}

// RANDOM BATHROOM (Bathroom of the Week)
async function getRandomBathroom(req, res) {
  try {
    const { data, error } = await supabase
      .from("BathroomRatings")
      .select("*");

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No bathrooms found" });
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const row = data[randomIndex];

    const bathroom = {
      id: row.id,
      name: `${row.building_name} Bathroom`,
      building: row.building_name,
      averageRating: row.OverallRating ?? 0,
      amenities: [],
    };

    res.json(bathroom);
  } catch (err) {
    console.error("getRandomBathroom error:", err);
    res.status(500).json({ message: "Failed to fetch random bathroom" });
  }
}

// RECENT ACTIVITY 
async function getRecentActivity(req, res) {
  try {
    const { data, error } = await supabase
      .from("BathroomRatings")
      .select("building_name, OverallRating, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;

    const activity = data.map((row) => ({
      building: row.building_name,
      rating: row.OverallRating,
      createdAt: row.created_at,
    }));

    res.json(activity);
  } catch (err) {
    console.error("getRecentActivity error:", err);
    res.status(500).json({ message: "Failed to load recent activity" });
  }
}

module.exports = {
    getCountReviews,
    getAverageRating,
    getAllReviews,
    getTopBathrooms, 
    searchBathrooms,   
    getRandomBathroom,
    getRecentActivity,
};
