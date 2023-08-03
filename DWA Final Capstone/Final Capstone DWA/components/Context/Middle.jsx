// import React, { useState, useEffect } from "react";
// import "./middle.css"
// import { SlButton, SlCard, SlRating } from '@shoelace-style/shoelace/dist/react';

// export default function Middle () {
//   const [podcasts, setPodcasts] = useState([]);

  


//   useEffect(() => {
//     fetch("https://podcast-api.netlify.app/shows")
//       .then((response) => response.json())
//       .then((data) => setPodcasts(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);
//   return (
    
//     <div className="Middle-con">
//       <div className="podcast-list">
//         {podcasts.map((podcast) => (
//           <div key={podcast.id} className="podcast-card">
//             {podcast.image && <img src={podcast.image} alt={podcast.title} />}
//             <h2>{podcast.title}</h2>
            
//             {/* <p>{podcast.description}</p> */}

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import "./middle.css"
import { SlButton, SlCard, SlRating } from '@shoelace-style/shoelace/dist/react';
import { SlDetails } from '@shoelace-style/shoelace/dist/react';

export default function Middle () {
  const [podcasts, setPodcasts] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => {
    setShowDescription((prevValue) => !prevValue);
  };


  


  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    
    <div className="Middle-con">
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
             <SlCard className="card-overview">
             {podcast.image && <img src={podcast.image} alt={podcast.title} />}
      <strong>{podcast.title}</strong>
      <br />
      
      <small>!!!!!</small>
      <div slot="footer">
      <SlDetails summary="show Description">
          {podcast.description}
  </SlDetails>
        <SlRating></SlRating>
      </div>
    </SlCard>
          </div>
        ))}
      </div>
    </div>
  );
};

