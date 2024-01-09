// Projects.js

import React from 'react';
import './Projects.css';

const projectsData = [
    {
        title: 'Hoop Fantasy Drafting App',
        description: (
          <div>
            <p>
              • Spearheaded React.js frontend development to ensure a seamless user experience in a collaborative group project, specifically addressing issues observed in existing drafting apps, such as the lack of customization options
            </p>
            <p>
              • Developed a robust backend using Node.js and Express.js by implementing a REST API to enhance overall application functionality by ensuring seamless routing
            </p>
            <p>
              • Integrated MongoDB for robust data management, implemented Firebase for authentication, employed Git for version control, fostering a collaborative and organized development process, and successfully deployed the project on Heroku, contributing to the creation of a reliable and user-friendly application with player customization options
            </p>
          </div>
        ),
        repoLink: 'https://github.com/asahoo0/hoop_fantasy',
        deployment:'https://miorr2.gitlab.io/final_project_cs_409'
      },
      {
        title: 'Campus Housing Analysis',
        description: (
          <div>
            <p>
              • Implemented data preprocessing techniques, including data cleaning and feature selection, optimizing the dataset for improved insights and highlighting key aspects within the leasing company reviews
            </p>
            <p>
              • Conducted detailed sentiment analysis using Natural Language Processing (NLP) algorithms, categorizing sentiments within leasing company reviews for prominent campuses, including UIUC, BYU, and UPenn
            </p>
            <p>
              • Leveraged Tableau for advanced data visualization, to facilitate easy exploration and understanding of trends within leasing company reviews, focusing on comparisons across campuses
            </p>
          </div>
        ),
        repoLink: 'https://github.com/asahoo0/campus_housing',
      },
    {
      title: 'S&P 500 Stock Prediction',
      description: (
        <div>
          <p>
            • Optimized a predictive model utilizing Long Short-Term Memory (LSTM) networks in Python, employing TensorFlow and Keras to capture intricate patterns within historical S&P 500 index prices, elevating prediction accuracy
          </p>
          <p>
            • Employed sophisticated deep learning methodologies to substantially enhance the precision of short-term predictions, delivering invaluable insights for investors and financial analysts
          </p>
          <p>
            • Achieved a noteworthy accuracy in predicting dynamic S&P 500 index price changes, evidenced by an average RMSE of 25.95 in k-fold cross-validation
          </p>
        </div>
      ),
      repoLink: 'https://github.com/asahoo0/stock_prediction',
    },
    {
      title: 'Blockchain Data Visualization',
      description: (
        <div>
          <p>
            • Engineered a visually appealing and user-friendly frontend, prioritizing accessibility and ease of use for a diverse user base
          </p>
          <p>
            • Integrated the CoinMarketCap API to dynamically fetch real-time data on the top 10 cryptocurrencies, including prices and market shares
          </p>
          <p>
            • Leveraged JavaScript and Plotly to design engaging and interactive visualizations, such as bar charts and pie charts, enhancing the understanding of cryptocurrency data
          </p>
        </div>
      ),
      repoLink: 'https://github.com/asahoo0/blockchain_visualization',
      deployment:'https://asahoo4.pythonanywhere.com/'
    },
    {
      title: 'Covid-19 Data Visualization',
      description: (
        <div>
          <p>
            • Leveraged the power of JavaScript and D3.js to create captivating animations and interactive graphs, enhancing the visualization of COVID-19 statistics and making data more engaging and comprehensible
          </p>
          <p>
            • Engineered a visually appealing and user-friendly frontend design, ensuring that the interface effectively presents complex data in an accessible manner, offering users a comprehensive and user-friendly platform for exploring COVID-19 data
          </p>
          <p>
            • Enabled in-depth analysis and comparison of COVID-19 statistics among states, covering case rates, vaccination rates, vaccination hesitancy, and population data, fostering informed decision-making and public awareness
          </p>
        </div>
      ),
      repoLink: 'https://github.com/asahoo0/covid_data',
      deployment: 'https://asahoo-4.github.io/data_vis/index.html'
    },
    {
      title: 'Sentiment Analysis Model',
      description: (
        <div>
          <p>
            • Employed Python alongside data science libraries such as Pandas, NumPy, and NLTK to perform sentiment analysis on tweet data, achieving precise sentiment classification into positive or negative categories through the implementation of Naive Bayes and Decision Tree models based on the bag-of-words representation of the dataset
          </p>
          <p>
            • Validated the machine learning model by using k-fold cross-validation, yielding an accuracy rate of over 80 percent
          </p>
        </div>
      ),
      repoLink: 'https://github.com/asahoo0/python_projects/tree/main/Sentiment%20Analysis',
    },
  ];

  const Projects = () => (
    <div className="projects-container">
      <h2 className="section-title">Projects</h2>
  
      {projectsData.map((project, index) => (
        <div className="project-item" key={index}>
          <h3 className="project-title">{project.title}</h3>
          <div className="project-icons">
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-icon">
              <i className="fa fa-github"></i>
            </a>
            {project.deployment && (
              <a href={project.deployment} target="_blank" rel="noopener noreferrer" className="project-icon">
                <i className="fa fa-link"></i>
              </a>
            )}
          </div>
          <p className="project-description">{project.description}</p>
        </div>
      ))}
    </div>
  );
  
  export default Projects;