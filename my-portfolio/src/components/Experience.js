// Experience.js

import React from 'react';
import './Experience.css'; // Import the CSS file for specific styling

const Experience = () => (
  <div className="experience-container">
    <h2 className="section-title">Experience</h2>

    <div className="experience-item">
      <h3>Data Fellow | iVenture Accelerator (May 2023 – Aug 2023)</h3>
      <p>
      • Led program participants alongside other fellows by planning activities and preparing for speakers, ensuring a cohesive and
engaging experience<br/><br/>
        • Developed data visualization applications based on demographic and KPI data for 11 startup ventures, enhancing data comprehension and presentation through Python, Plotly, and D3.js visualizations <br /><br />
        • Coordinated with team members to incorporate statistical information into press kit materials by analyzing data using Python, Plotly, and HTML/CSS for interactive and visually appealing data visualizations <br /><br />
        • Established a centralized data repository by migrating Airtable to SQL, involving data source identification, resulting in streamlined access and enhanced data management efficiency
      </p>
    </div>

    <div className="experience-item">
      <h3>Software Engineering Co-op | Navistar (Aug 2022 – Dec 2022)</h3>
      <p>
        • Developed a software solution to convert signals from trucks with competitor’s engines into Navistar signals via Controller Area Network (CAN), enhancing system compatibility and facilitating smooth integration of Predictive Cruise Control <br /><br />
        • Designed the solution to be remotely installable, providing a flexible and efficient approach for deploying the software across a fleet of vehicles <br /><br />
        • Created an extensive back-end test suite to validate signal data transmission, covering scenarios involving speed-altering signals and the detection of invalid signal values
      </p>
    </div>
  </div>
);

export default Experience;
