import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { auth } from '../firebase';

const Leaderboard = () => {
  const { leagueId } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setMessage('User not authenticated');
          return;
        }
    
        const response = await fetch(`https://limitless-caverns-43471-220b25c991c2.herokuapp.com/api/leagues/${leagueId}`);
    
        if (!response.ok) {
          const errorData = await response.json();
          setMessage(`Error fetching league details: ${errorData.message}`);
          return;
        }
    
        const leagueData = await response.json();
        const teamIds = leagueData.data.team_ids || [];

        if (teamIds.length === 0) {
          // If teams don't exist, show the user IDs from leagueData.data.user_ids with a score of 0
          const userScores = leagueData.data.user_ids.map((userId, index) => ({ user_id: `User ${index + 1}`, score: 0 }));
          setTeams(userScores);
          setLoading(false);
          return;
        }
    
        // Fetch details for each team
        const teamsWithDetails = await Promise.all(
          teamIds.map(async (teamId) => {
            const teamDetailsResponse = await fetch(`https://limitless-caverns-43471-220b25c991c2.herokuapp.com/api/teams/${teamId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!teamDetailsResponse.ok) {
              console.error(`Error fetching team details for team ${teamId}: ${teamDetailsResponse.statusText}`);
              return null;
            }
    
            const teamDetailsData = await teamDetailsResponse.json();
            return teamDetailsData.data;
          })
        );
    
        // Remove null entries (failed fetches) and set the teams state
        setTeams(teamsWithDetails.filter((team) => team !== null));
        setLoading(false);
      } catch (error) {
        setMessage(`Error fetching teams: ${error.message}`);
      }
    };

    fetchLeaderboard();
  }, [leagueId]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.team_id}>
              {team.name ? (
                <>
                  <strong>Team:</strong> {team.name} <strong>Score:</strong> {team.score}
                </>
              ) : (
                <>
                  <strong>Team:</strong> {team.user_id} <strong>Score:</strong> {team.score}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <p id="message">{message}</p>
    </div>
  );
};

export default Leaderboard;
