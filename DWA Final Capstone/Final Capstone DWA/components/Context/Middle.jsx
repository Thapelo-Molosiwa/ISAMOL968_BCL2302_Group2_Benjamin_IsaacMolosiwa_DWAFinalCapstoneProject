import React, { useState, useEffect } from "react";
import "./middle.css";
import { SlButton, SlCard, SlRating, SlDetails } from '@shoelace-style/shoelace/dist/react';

export default function Middle() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fetch episodes for each show and update the state with complete data
        const completeDataPromises = data.map(async (show) => {
          const episodesResponse = await fetch(`https://podcast-api.netlify.app/id/${show.id}`);
          const episodesData = await episodesResponse.json();
          return {
            ...show,
            seasons: episodesData.seasons,
          };
        });

        const completeData = await Promise.all(completeDataPromises);
        setShowsData(completeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    

  return (
    <div className="Middle-con">
      <div className="ButtonCon">

        

      </div>


      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <SlCard className="card-overview">
              {podcast.image && <img src={podcast.image} alt={podcast.title} />}
              <strong>{podcast.title}</strong>
              <br />
              <small>!!!!!</small>
              <SlDetails summary="Show Description">
                {podcast.description}
              </SlDetails>
              <SlRating></SlRating>
            </SlCard>
          </div>
        ))}
      </div>
    </div>
  );
}
