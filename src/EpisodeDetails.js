import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EpisodeDetails = () => {
    const { episodeId } = useParams();
    const location = useLocation();
    
    return (
        <div className="main">
            <h2>{location.state.title}</h2>
            <div className="episodes-container">
                <p dangerouslySetInnerHTML={{ __html: "" + location.state.description + "" }} />
                <audio controls>
                    <source src={location.state.audio} type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
}

export default EpisodeDetails;