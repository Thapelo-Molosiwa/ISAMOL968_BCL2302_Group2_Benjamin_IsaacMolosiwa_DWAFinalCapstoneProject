import React, { useState, useEffect } from "react";
import {
  SlCard,
  SlRating,
  SlDetails,
  SlInput,
  SlButton,
  SlButtonGroup,
  SlDropdown,
  SlMenu,
  SlMenuItem,
  SlTree,
  SlTreeItem,
} from "@shoelace-style/shoelace/dist/react";
import "./middle.css";
import "./Buttons.css";

// Define the genres array with different categories of shows
const genres = [
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
];

/**
 * Get the genre names based on genre IDs.
 * @param {number|number[]} genreIds - Genre ID(s) to be converted to names.
 * @returns {string} - Comma-separated genre names.
 */
const getGenres = (genreIds) => {
  if (!Array.isArray(genreIds)) {
    genreIds = [genreIds];
  }
  return genreIds.map((id) => genres[id - 1]).join(",");
};

const PodcastCard = ({ show, handleAddToFavorites, handleRemoveFromFavorites, isFavorite }) => {
  const [showSeasons, setShowSeasons] = useState(false); // State variable to control seasons visibility

  const handleShowSeasons = () => {
    setShowSeasons(!showSeasons); // Toggle the value of showSeasons
  };

  return (
    <div className="podcast-card">
      <SlCard className="card-overview">
        {show.image && <img src={show.image} alt={show.title} />}
        <strong>{show.title}</strong>
        <br />
        <medium>Genre : {getGenres(show.genres)} </medium>
        <br />
        <br />
        <small>
          Last Updated:{" "}
          {new Date(show.updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>
      </SlCard>
      {show.seasons && (
        <div className="seasons-dropdown">
          <SlButton variant="neutral" onClick={handleShowSeasons}>
            {showSeasons ? "Hide Seasons" : "Show Seasons"}
          </SlButton>
          {showSeasons && (
            <SlTree>
              <SlTreeItem>
                Seasons
                {show.seasons.map((season) => (
                  <SlTreeItem key={season.id}>
                    {season.name}
                    {season.episodes && (
                      <SlTreeItem>
                        {season.episodes.map((episode) => (
                          <SlTreeItem key={episode.id}>{episode.name}</SlTreeItem>
                        ))}
                      </SlTreeItem>
                    )}
                  </SlTreeItem>
                ))}
              </SlTreeItem>
            </SlTree>
          )}
        </div>
      )}
      <div className="card-footer">
        <SlDetails summary="Show Description">
          {show.description}
        </SlDetails>
        <br />
        <SlRating
          label="Rating"
          getSymbol={() => '<sl-icon name="heart-fill"></sl-icon>'}
          style={{ "--symbol-color-active": "#ff4136" }}
          onClick={() => {
            if (isFavorite(show.id)) {
              handleRemoveFromFavorites(show.id);
            } else {
              handleAddToFavorites(show.id);
            }
          }}
          interactive // Make the rating component clickable
        />
      </div>
    </div>
  );
};

export default function Middle() {
  // State hooks for managing the component's state
  const [favorites, setFavorites] = useState([]);
  const [showsData, setShowsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // State variable to control favorites visibility

  // Fetch the shows data from the API using useEffect
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then(async (data) => {
        const completeDataPromises = data.map(async (show) => {
          const episodesResponse = await fetch(
            `https://podcast-api.netlify.app/id/${show.id}`
          );
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

  // Handler for input change in the search box
  const handleInputChange = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]); // Reset search results when input is empty
    } else {
      const filteredResults = showsData.filter((show) =>
        show.title.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
    }
  };

  // Handler for changing the sort criteria
  const handleSortChange = (selectedSort) => {
    if (selectedSort === "Sort") {
      setSearchResults([...showsData]); // Reset to original order when "Sort" is selected
      return;
    }

    let sortedResults;
    if (selectedSort === "A-Z") {
      sortedResults = [...showsData].sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "Z-A") {
      sortedResults = [...showsData].sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedSort === "Latest") {
      sortedResults = [...showsData].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (selectedSort === "Oldest") {
      sortedResults = [...showsData].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }
    setSearchResults(sortedResults);
  };

  // Handler for adding a show to favorites
  const handleAddToFavorites = (showId) => {
    if (!favorites.includes(showId)) {
      setFavorites([...favorites, showId]);
    }
  };

  // Handler for removing a show from favorites
  const handleRemoveFromFavorites = (showId) => {
    const updatedFavorites = favorites.filter((favId) => favId !== showId);
    setFavorites(updatedFavorites);
  };

  // Check if a show is in favorites
  const isFavorite = (showId) => favorites.includes(showId);

  // Handler for showing/hiding favorites list
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites); // Toggle the value of showFavorites
  };

  return (
    <div className="Middle-con">
      {/* Search and Sort buttons */}
      <div className="ButtonCon">
        <div className="searchButton">
          <SlInput
            type="text"
            placeholder="Search Podcast"
            value={searchQuery}
            onSlChange={handleInputChange}
          />
          <SlButton onClick={() => {}}>Search</SlButton>
        </div>
        <div className="Favs">
          {/* Favorites button */}
          <SlButton variant="neutral" onClick={handleShowFavorites}>
            Favorites
          </SlButton>
        </div>
        <div className="Sort">
          {/* Sort dropdown */}
          <SlButtonGroup label="Example Button Group">
            <SlButton onClick={() => handleSortChange("Sort")} variant="primary">
              Sort
            </SlButton>
            <SlDropdown placement="bottom-end">
              <SlButton slot="trigger" variant="primary" caret>
                Sort
              </SlButton>
              <SlMenu>
                <SlMenuItem onClick={() => handleSortChange("A-Z")}>A-Z</SlMenuItem>
                <SlMenuItem onClick={() => handleSortChange("Z-A")}>Z-A</SlMenuItem>
                <SlMenuItem onClick={() => handleSortChange("Latest")}>Latest</SlMenuItem>
                <SlMenuItem onClick={() => handleSortChange("Oldest")}>Oldest</SlMenuItem>
              </SlMenu>
            </SlDropdown>
          </SlButtonGroup>
        </div>
      </div>
      <br />
      <br />
      <div className="podcast-list">
        {searchResults.length > 0 ? (
          // Render search results
          searchResults.map((show) => (
            <PodcastCard
              key={show.id}
              show={show}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              isFavorite={isFavorite}
            />
          ))
        ) : (
          // If no search query, display all the cards
          showsData.map((show) => (
            <PodcastCard
              key={show.id}
              show={show}
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              isFavorite={isFavorite}
            />
          ))
        )}
      </div>

      {/* Favorites section */}
      {showFavorites && (
        <div className="favorites-list">
          <h2>Favorites</h2>
          {favorites.length > 0 ? (
            favorites.map((showId) => {
              const favoriteShow = showsData.find((show) => show.id === showId);
              return (
                <PodcastCard
                  key={favoriteShow.id}
                  show={favoriteShow}
                  handleAddToFavorites={handleAddToFavorites}
                  handleRemoveFromFavorites={handleRemoveFromFavorites}
                  isFavorite={isFavorite}
                />
              );
            })
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
