import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !file) {
      setMessage('Please fill in all fields and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(" ")
        setAge("")
        setName("")
        setFile("")
      }, 5000);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Error submitting data.');

      setTimeout(() => {
        setMessage(" ")
      }, 5000);
    }
  };

  return (
    <div className="App">
      <Navbar/>
      <h1>Healthcare Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="input-wrapper">
            <input
              id="name"
              type="text"
              value={name}
              name="name"
              className="input-field"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="input-label">
              Enter your name
            </label>
          </div>
        </div>
{/*  */}
        <div className="container">
          <div className="input-wrapper">
            <input
              id="age"
              type="number"
              min="0"
              max="130"
              value={age}
              name="age"
              className="input-field"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="age" className="input-label">
              Enter your age
            </label>
          </div>
        </div>

        <div className="upload-container">
          <label htmlFor="upload" className="upload-label">
            Upload file
          </label>
          <input
            id="upload"
            type="file"
            className="hidden-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <span className='spanTag'>

        {file && <p>File selected: {file.name}</p>} {/* Render file name */}
        </span>

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

