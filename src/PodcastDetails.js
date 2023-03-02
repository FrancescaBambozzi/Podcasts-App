import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import EpisodesList from "./EpisodesList";
import PodcastDetailCard from "./PodcastDetailCard";
import useFetch from "./useFetch";

const PodcastDetails = () => {
    const { id } = useParams();
    const { podCastDetails, isLoading, description, episodes } = useFetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + `${id}`)}`);

    return (
        <div className="page-container">
            <Header isLoading={isLoading}/>
            <div className="podcast-details-container">
                {<PodcastDetailCard podCastDetails={podCastDetails} description={description} />}
                <EpisodesList id={id} episodes={episodes} />
            </div>
        </div>
    );
}

export default PodcastDetails;