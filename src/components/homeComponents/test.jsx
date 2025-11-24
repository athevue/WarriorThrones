// src/components/TestSupabase.jsx
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {
  useEffect(() => {
    const fetchTest = async () => {
      const { data, error } = await supabase.from("test").select("*");
      if (error) console.error("Supabase error:", error);
      else console.log("Supabase data:", data);
    };

    fetchTest();
  }, []);

  return <p>Check your console for Supabase test output!</p>;
}
