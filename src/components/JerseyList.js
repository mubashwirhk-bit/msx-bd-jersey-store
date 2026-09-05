import React from 'react';

function JerseyList({ jerseys, onDelete }) {
  if (jerseys.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
        <h2>No jerseys available yet</h2>
        <p>Add your first jersey to get started!</p>
      </div>
    );
  }

  return (
    <div className="jersey-list">
      {jerseys.map(jersey => (
        <div key={jersey.id} className="jersey-card">
          <div className="jersey-image">👕</div>
          <div className="jersey-content">
            <h3>{jersey.team}</h3>
            <p><strong>Type:</strong> {jersey.type}</p>
            <p><strong>Color:</strong> {jersey.color}</p>
            <div className="jersey-meta">
              <span>Size: {jersey.size}</span>
              <span className="jersey-price">৳ {jersey.price}</span>
            </div>
            <p>{jersey.description}</p>
            <div className="jersey-footer">
              <button 
                className="btn btn-danger"
                onClick={() => onDelete(jersey.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JerseyList;
