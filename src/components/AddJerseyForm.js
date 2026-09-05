import React, { useState } from 'react';

function AddJerseyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    team: '',
    type: 'Club',
    color: '',
    size: 'M',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.team || !formData.color || !formData.price) {
      alert('Please fill all required fields');
      return;
    }
    onAdd({
      ...formData,
      id: Date.now(),
      price: parseFloat(formData.price)
    });
    setFormData({
      team: '',
      type: 'Club',
      color: '',
      size: 'M',
      price: '',
      description: ''
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Jersey</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Team Name *</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            placeholder="e.g., Barcelona, Bangladesh National Team"
            required
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option>Club</option>
            <option>National</option>
            <option>Vintage</option>
          </select>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Color *</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g., Blue & Red, Green"
            required
          />
        </div>

        <div className="form-group">
          <label>Size</label>
          <select name="size" value={formData.size} onChange={handleChange}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Price (BDT) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g., 2500"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Jersey details..."
          rows="3"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Jersey
      </button>
    </form>
  );
}

export default AddJerseyForm;
