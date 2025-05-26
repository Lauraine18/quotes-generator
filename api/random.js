// /api/random.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.quotable.io/random");

    // Defensive check if response isn't OK
    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Serverless function error:", error);
    res
      .status(500)
      .json({ error: "A server error occurred while fetching quote." });
  }
}
