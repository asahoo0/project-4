// Education.js

import React from 'react';
import './Education.css'; // Import the CSS file for specific styling

const Education = () => (
  <div className="education-container">
    <h2 className="section-title">Education</h2>

    <div className="education-item">
      <h3 className="education-title">University of Illinois at Urbana-Champaign</h3>
      <p className="education-details">Bachelor of Science in Computer Science + Linguistics
      <br/>Minor in Business
      <br/>Data Science Certificate</p>
      <p className="education-details">
        GPA: 3.63/4.0
      </p>
      <p className="education-details">
        Relevant Coursework: Database Systems, Data Visualization, Applied Statistics, Machine
        Learning, Computational Linguistics, Data Structures, Algorithms
      </p>
    </div>

    {/* Add more education items as needed */}
  </div>
);

export default Education;
