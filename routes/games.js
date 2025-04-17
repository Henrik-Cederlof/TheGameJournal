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

  export default router;