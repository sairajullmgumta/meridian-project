// /api/warmup.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    // Ping Supabase to keep it awake
    await fetch(`${SUPABASE_URL}/rest/v1/projects?select=id&limit=1`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    });

    res.status(200).json({ message: 'Supabase pinged successfully!' });
  } catch (error) {
    console.error('Error pinging Supabase:', error);
    res.status(500).json({ message: 'Failed to ping Supabase', error });
  }
}