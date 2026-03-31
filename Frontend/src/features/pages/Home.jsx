import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-card">
        <div className="home-header">
          <h2>Generate Interview Report</h2>
          <p>Provide the job description and your resume to get started.</p>
        </div>
        <div className="home-content">
          <div className="left-panel">
            <div className="input-group">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea 
                className="jobDescription" 
                id="jobDescription" 
                placeholder="Enter job description here..."
              ></textarea>
            </div>
          </div>
          <div className="right-panel">
            <div className="input-group">
                <p>Resume<small className='highlight'>(use Resume and self description together for best result)</small></p>
              <label htmlFor="resume">Upload your resume</label>
              <input type="file" id="resume" name="resume" accept=".pdf" />
            </div>
            <div className="input-group"> 
              <label htmlFor="selfDescription">Describe yourself</label>
              <textarea 
                name="selfDescription" 
                id="selfDescription" 
                placeholder="Enter a brief self description here..."
              ></textarea>
            </div>
            <button className="generate-btn">Generate Interview Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
