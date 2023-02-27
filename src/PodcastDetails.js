import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

const PodcastDetails = () => {
    const { id } = useParams();
    const [podCastDetails, setPodcastDetails] = useState({});

    useEffect(() => {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + id)}`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch details");
                }
                return res.json()
            })
            .then(data => {
                const details = JSON.parse(data.contents);
                setPodcastDetails(details.results[0]);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);


    console.log(podCastDetails)

    return (
        <div className="page-container">
            <Header />
            <div className="podcast-details-container">
                <div className="side">
                    <div className="podcast-content">
                        <img src={podCastDetails.artworkUrl100} alt="podcast-image" />
                        <h3>{podCastDetails.trackName}<br /><span>By: {podCastDetails.artistName}</span></h3>
                        <p><strong>Description:</strong><br /></p>
                    </div>
                </div>
                <div className="main">
                    <h2>Episodes</h2>
                    <div className="episodes-container">
                        <ul>List of Episodes</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PodcastDetails;