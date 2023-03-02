import { Link } from "react-router-dom";

const PodcastDetailCard = ({ podCastDetails, jsonData }) => {

    let description = jsonData.rss.channel.description._cdata || jsonData.rss.channel.description._text;
   
    return (
        <div className="side">
            <Link to={`/podcast/${podCastDetails.collectionId}`}>
                <div className="podcast-content">
                    <img src={podCastDetails.artworkUrl600} alt="podcast" />
                    <div className="podcast-text">
                        <h3>{podCastDetails.trackName}<br /><span>By: {podCastDetails.artistName}</span></h3>
                        <div><strong>Description:</strong><br />
                            <div dangerouslySetInnerHTML={{ __html: "" + description + "" }} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PodcastDetailCard;