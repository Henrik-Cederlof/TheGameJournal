import fetch from "node-fetch";

export const fetchAccessToken = async () => {
  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" }
  );

  if (!tokenRes.ok) {
    throw new Error(`Failed to fetch access token: ${tokenRes.status}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
};