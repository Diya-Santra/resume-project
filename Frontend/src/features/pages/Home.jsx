import React from 'react';
import './Home.css';
import { useState,useRef } from 'react';
import { useInterview } from '../hooks/useInterView';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {loading,generateReport}=useInterview()
    const [jobDescription,jobDescriptionRef]=useState('')
    const [selfDescription,selfDescriptionRef]=useState('')
    const resumeRef=useRef()

    const navigate=useNavigate()

    const handleGenerateReport=async()=>{
        const resumeFile=resumeRef.current.files[0]
        const data=await generateReport({jobDescription,selfDescription,resumeFile})
        navigate(`interview/${data.id}`);
    }

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
                onChange={(e)=>jobDescription(e.target.value)}
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
              <input ref={resumeRef} type="file" id="resume" name="resume" accept=".pdf" />
            </div>
            <div className="input-group"> 
              <label htmlFor="selfDescription">Describe yourself</label>
              <textarea 
                onChange={(e)=>{selfDescription(e.target.value)}}
                name="selfDescription" 
                id="selfDescription" 
                placeholder="Enter a brief self description here..."
              ></textarea>
            </div>
            <button onClick={handleGenerateReport} className="generate-btn">Generate Interview Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
