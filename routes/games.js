import express from 'express';
import { fetchAccessToken } from '../utils/fetchToken.js';
import { fetchFromIGDB } from '../services/apiCaller.js';

const router = express.Router();

router.post('/games', async (req, res) => {
  try {
    const accessToken = await fetchAccessToken();
    const data = await fetchFromIGDB('games', req.body.query, accessToken);
    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games from IGDB' });
  }
  });

  router.post('/games/search', async (req, res) => {
    try {
      const { searchTerm } = req.body;
      const accessToken = await fetchAccessToken();
      
      const query = `
  search "${searchTerm}";
  fields name, summary, cover.url, platforms.name, platforms.abbreviation, platforms.platform_logo.url;
  where cover != null & summary != null;
  limit 20;
`;
      
      const data = await fetchFromIGDB('games', query, accessToken);
      res.json(data);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Failed to search games' });
    }
  });

  router.post('/platforms', async (req, res) => {
    try {
      const accessToken = await fetchAccessToken();
      const query = `
        fields name, abbreviation, platform_logo.url;
        limit 100;
      `;

      const data = await fetchFromIGDB('platforms', query, accessToken);
      res.json(data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
      res.status(500).json({ error: 'Failed to fetch platforms from IGDB' });
      }
    });

  export default router;