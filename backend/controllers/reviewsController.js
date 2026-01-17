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

// Get review by ID (Supabase)
async function getReview(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("BathroomRatings")
      .select("*")
      .eq("id", id) // changed id
      .single(); // makes sure of one row

    if (error) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(data);
  } catch (err) {
    console.error("getReview error:", err);
    res.status(500).json({ message: "Failed to fetch review" });
  }
}

const addBathroom = async (req, res) => {
  try {
    const {
      building_name,
      location_room,
      gender_type,
      num_of_stalls,
      // Existing ratings
      cleanliness_1_10,
      odor_1_10,
      lighting_1_10,
      privacy_1_10,
      // New ratings from RATING_FIELDS
      traffic_1_10,
      sink_water_pressure_1_10,
      urinal_spacing_privacy_male_only_1_10,
      room_temperature_hot_cold_1_10,
      aesthetics_1_10,
      general_noise_level_1_10,
      ventilation_air_flow_1_10,
      nonslip_floor_1_10,
      // Amenities
      soap_1_0,
      paper_towel_1_or_0,
      air_dryer_1_or_0,
      changing_table_1_or_0,
      touchless_tap_1_or_0,
      disposable_seat_covers_1_or_0,
      occupancy_indicators_1_or_0,
      trash_can_1_or_0,
      mirror_1_or_0,
      automatic_door_push_button_1_or_0,
      automatic_flushing_toilets_1_or_0,
      motion_activated_lights_1_or_0,
      toilet_paper_1_or_0,
      menstrual_products_female_bathrooms_only_1_or_0,
      ada_compliant_stall_s_with_grab_bar,
      braille_singage_1_or_0,
      accessible_sink_dryer_height,
      coat_hanger,
      shower,
      speakers_music_1_or_0,
      sanitization_schedule_posted,
      Comments,
      OverallRating
    } = req.body;

    if (!building_name?.trim() || !location_room?.trim()) {
      return res.status(400).json({ error: "Building and Location are required" });
    }

    const { data, error } = await supabase
      .from("BathroomRatings")
      .insert([
        {
          building_name: building_name.trim(),
          location_room: location_room.trim(),
          gender_type: gender_type || null,
          num_of_stalls: num_of_stalls || null,
          cleanliness_1_10: cleanliness_1_10 || null,
          odor_1_10: odor_1_10 || null,
          lighting_1_10: lighting_1_10 || null,
          privacy_1_10: privacy_1_10 || null,
          traffic_1_10: traffic_1_10 || null,
          sink_water_pressure_1_10: sink_water_pressure_1_10 || null,
          urinal_spacing_privacy_male_only_1_10: urinal_spacing_privacy_male_only_1_10 || null,
          room_temperature_hot_cold_1_10: room_temperature_hot_cold_1_10 || null,
          aesthetics_1_10: aesthetics_1_10 || null,
          general_noise_level_1_10: general_noise_level_1_10 || null,
          ventilation_air_flow_1_10: ventilation_air_flow_1_10 || null,
          nonslip_floor_1_10: nonslip_floor_1_10 || null,
          soap_1_0: soap_1_0 || 0,
          paper_towel_1_or_0: paper_towel_1_or_0 || 0,
          air_dryer_1_or_0: air_dryer_1_or_0 || 0,
          changing_table_1_or_0: changing_table_1_or_0 || 0,
          touchless_tap_1_or_0: touchless_tap_1_or_0 || 0,
          disposable_seat_covers_1_or_0: disposable_seat_covers_1_or_0 || 0,
          occupancy_indicators_1_or_0: occupancy_indicators_1_or_0 || 0,
          trash_can_1_or_0: trash_can_1_or_0 || 0,
          mirror_1_or_0: mirror_1_or_0 || 0,
          automatic_door_push_button_1_or_0: automatic_door_push_button_1_or_0 || 0,
          automatic_flushing_toilets_1_or_0: automatic_flushing_toilets_1_or_0 || 0,
          motion_activated_lights_1_or_0: motion_activated_lights_1_or_0 || 0,
          toilet_paper_1_or_0: toilet_paper_1_or_0 || 0,
          menstrual_products_female_bathrooms_only_1_or_0: menstrual_products_female_bathrooms_only_1_or_0 || 0,
          ada_compliant_stall_s_with_grab_bar: ada_compliant_stall_s_with_grab_bar || 0,
          braille_singage_1_or_0: braille_singage_1_or_0 || 0,
          accessible_sink_dryer_height: accessible_sink_dryer_height || 0,
          coat_hanger: coat_hanger || 0,
          shower: shower || false,
          speakers_music_1_or_0: speakers_music_1_or_0 || 0,
          sanitization_schedule_posted: sanitization_schedule_posted || 0,
          Comments: Comments || null,
          OverallRating: OverallRating || null
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Error adding bathroom:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new bathroom report
const postBathroomReport = async (req, res) => {
  try {
    const {
      reporter_name,
      description,
      urgency,
      building_name,
      location_room,
      floor,
    } = req.body;

    // Basic validation
    if (!building_name || !reporter_name || !urgency || !description || !floor) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("BathroomReports")
      .insert([
        { reporter_name, description, urgency, building_name, location_room, floor }
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to insert report" });
    }

    res.status(201).json({ message: "Bathroom report created", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
    getCountReviews,
    getAverageRating,
    getAllReviews,
    getTopBathrooms, 
    searchBathrooms,   
    getRandomBathroom,
    getRecentActivity,
    getReview,
    addBathroom,
    postBathroomReport
};