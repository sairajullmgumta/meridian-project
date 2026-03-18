// /api/warmup.js

export default async function handler(req, res) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return res.status(500).json({ message: 'Supabase environment variables not set' });
    }

    // Built-in fetch in Vercel
    const response = await fetch(`${SUPABASE_URL}/rest/v1/appointments?select=id&limit=1`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned status ${response.status}`);
    }

    res.status(200).json({ message: 'Supabase pinged successfully!' });
  } catch (error) {
    console.error('Error pinging Supabase:', error.message);
    res.status(500).json({ message: 'Failed to ping Supabase', error: error.message });
  }
}