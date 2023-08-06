import React, { useState, useEffect } from "react";
import "./middle.css";
import { SlCard, SlRating, SlDetails } from '@shoelace-style/shoelace/dist/react';

export default function Middle() {
  const [showsData, setShowsData] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then(async (data) => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="Middle-con">
      <div className="ButtonCon">
        {/* Your buttons or any other components */}
      </div>

      <div className="podcast-list">
        {showsData.map((show) => (
          <div key={show.id} className="podcast-card">
            <SlCard className="card-overview">
              {show.image && <img src={show.image} alt={show.title} />}
              <strong>{show.title}</strong>
              <br />
              
              <SlDetails summary="Show Description">
                {show.description}
              </SlDetails>
              <SlRating></SlRating>
            </SlCard>
          </div>
        ))}
      </div>
    </div>
  );
}
