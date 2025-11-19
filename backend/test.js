const supabase = require("./utils/supabaseClient");

async function test() {
  const { data, error } = await supabase.from("BathroomRating").select("*");
  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("Data:", data);
  }
}

test();
