import fetch from "node-fetch";

export const fetchFromIGDB = async (endpoint, query, accessToken) => {
  const res = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });

  if (!res.ok) {
    throw new Error(`IGDB error: ${res.status}`);
  }

  return res.json();
};