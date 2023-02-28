import { useParams } from "react-router-dom";

const EpisodeDetails = () => {
    const { episodeId } = useParams();
    console.log("LINK TO {episodeId}: " + episodeId);
    return (
        <div className="main">
            <h2>Episode ID: {episodeId}</h2>
            <div className="episode-container">
                Episode Container
            </div>
        </div>
    );
}

export default EpisodeDetails;