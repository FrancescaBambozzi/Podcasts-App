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
        <div className="podcast-details">
            <Header />
            <div className="podcast-card">
                <img src={podCastDetails.artworkUrl100} alt="podcast-image" />
                <div className="description">
                    <h4>{podCastDetails.trackName}<br /><span className="artist">By {podCastDetails.artistName}</span></h4>
                    <div><strong>Description:</strong><br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PodcastDetails;