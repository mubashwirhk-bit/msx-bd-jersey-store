import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JerseyList from './components/JerseyList';
import AddJerseyForm from './components/AddJerseyForm';

function App() {
  const [jerseys, setJerseys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch jerseys from API
  useEffect(() => {
    fetchJerseys();
  }, []);

  const fetchJerseys = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jerseys');
      setJerseys(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching jerseys:', err);
      setError('Failed to load jerseys');
    } finally {
      setLoading(false);
    }
  };

  const handleAddJersey = async (newJersey) => {
    try {
      const response = await axios.post('/api/jerseys', newJersey);
      setJerseys([...jerseys, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding jersey:', err);
      alert('Failed to add jersey');
    }
  };

  const handleDeleteJersey = async (id) => {
    try {
      await axios.delete(`/api/jerseys/${id}`);
      setJerseys(jerseys.filter(j => j.id !== id));
    } catch (err) {
      console.error('Error deleting jersey:', err);
      alert('Failed to delete jersey');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🏆 MSX BD - Jersey Store</h1>
        <p>Top Clubs & National Teams Jerseys</p>
      </header>

      <main className="container">
        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New Jersey'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={fetchJerseys}
          >
            🔄 Refresh
          </button>
        </div>

        {showForm && (
          <AddJerseyForm onAdd={handleAddJersey} />
        )}

        {loading && <div className="loading">Loading jerseys...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <JerseyList 
            jerseys={jerseys} 
            onDelete={handleDeleteJersey}
          />
        )}
      </main>

      <footer className="footer">
        <p>Made with ❤️ for n8n Integration Practice</p>
      </footer>
    </div>
  );
}

export default App;
