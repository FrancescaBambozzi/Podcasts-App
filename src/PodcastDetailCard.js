import { Link } from "react-router-dom";

const PodcastDetailCard = ({ podCastDetails, description }) => {
    return (
        <div className="side">
            <Link to={{ pathname: `/podcast/${podCastDetails.collectionId}` }}>
                <div className="podcast-content">
                    <img src={podCastDetails.artworkUrl600} alt="podcast" />
                    <div className="podcast-text">
                        <h3>{podCastDetails.trackName}<br /><span>By: {podCastDetails.artistName}</span></h3>
                        <p><strong>Description:</strong><br />
                            <div dangerouslySetInnerHTML={{ __html: "" + description + "" }} />
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PodcastDetailCard;