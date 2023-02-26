import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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

    return (
        <div className="podcast-details">
            <h2>PodCast Detail Page - {id}</h2>
            <div className="podcast-detail">
                {podCastDetails.artistName}
            </div>
        </div>
    );
}

export default PodcastDetails;