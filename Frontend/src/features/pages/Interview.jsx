import React, { useState } from 'react';
import './Interview.css';

const Interview = () => {
  const [activeTab, setActiveTab] = useState('Technical questions');

  const tabs = [
    { id: 'technical', label: 'Technical questions' },
    { id: 'behavioral', label: 'Behavioral questions' },
    { id: 'roadmap', label: 'Road Map' }
  ];

  const [skillGaps, setSkillGaps] = useState([]); // This will be populated from resume data later
  const [matchScore, setMatchScore] = useState(85); // Example initial match score (percentage)

  // Calculations for the SVG progress ring
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const renderContent = () => {
    switch (activeTab) {
      case 'Technical questions':
        return (
          <div className="main-content-body">
            <p>here will be the main content for Technical questions</p>
          </div>
        );
      case 'Behavioral questions':
        return (
          <div className="main-content-body">
            <p>here will be the main content for Behavioral questions</p>
          </div>
        );
      case 'Road Map':
        return (
          <div className="main-content-body">
            <p>here will be the main content for Road Map</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="interview-container">
      <div className="interview-card">
        {/* Left Sidebar */}
        <div className="interview-sidebar-left">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              className={`sidebar-item ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="interview-main">
          {/* We can hide the header if the wireframe doesn't show one, leaving just the content centered */}
          {renderContent()}
        </div>

        {/* Right Sidebar */}
        <div className="interview-sidebar-right">
          <div className="match-score-section">
            <h3 className="right-sidebar-title text-center">Match Score</h3>
            <div className="match-score-container">
              <div className="progress-ring-container">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring__circle-bg"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="10"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className="progress-ring__circle"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-value">{matchScore}%</div>
              </div>
            </div>
          </div>

          <h3 className="right-sidebar-title">Skill Gaps</h3>
          <div className="skill-gaps-container">
            {skillGaps.length > 0 ? (
              skillGaps.map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>No skill gaps identified yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
