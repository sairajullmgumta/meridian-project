import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*") // include what you need
      .limit(20);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ appointments: data });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}