import { jerseyData } from './data';

// GET all jerseys
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(jerseyData);
  } else if (req.method === 'POST') {
    const newJersey = req.body;
    jerseyData.push(newJersey);
    res.status(201).json(newJersey);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
