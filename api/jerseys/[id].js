import { jerseyData } from './data';

// DELETE or GET specific jersey
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const jersey = jerseyData.find(j => j.id === parseInt(id));
    if (jersey) {
      res.status(200).json(jersey);
    } else {
      res.status(404).json({ error: 'Jersey not found' });
    }
  } else if (req.method === 'DELETE') {
    const index = jerseyData.findIndex(j => j.id === parseInt(id));
    if (index > -1) {
      jerseyData.splice(index, 1);
      res.status(200).json({ message: 'Jersey deleted' });
    } else {
      res.status(404).json({ error: 'Jersey not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
