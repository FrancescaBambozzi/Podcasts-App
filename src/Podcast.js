import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PodcastPage from "./PodcastPage";
import { useState } from "react";

const Podcast = ({ podcastDetails, feedData }) => {
    const { id } = useParams();

    return (
        <div className="side">
            <Link to={"/"}>
                <div className="podcast-content">
                    <img src={podcastDetails.artworkUrl600} alt="podcast" />
                    <div className="podcast-text">
                        <h3>{podcastDetails.trackName}<br /><span>By: {podcastDetails.artistName}</span></h3>
                        <div><strong>Description:</strong><br />
                            {feedData.description._cdata ? (
                                <div dangerouslySetInnerHTML={{ __html: "" + feedData.description._cdata + "" }} />
                            ) : (
                                <p>{feedData.description._text}</p>)}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Podcast;