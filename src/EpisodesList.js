import { Link } from "react-router-dom";
import { useState } from "react";
import EpisodeDetails from "./EpisodeDetails";

const EpisodesList = ({ id, jsonData }) => {
    let episodes = jsonData.rss.channel.item;
    const [showEpisode, setShowEpisode] = useState(true);

    const showEpisodeDetails = () => {
        setShowEpisode(false);
    };

    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit'
    };

    return (
        <div>
            {showEpisode ? (
                <div className="main">
                    <h2>Episodes: {episodes.length}</h2>
                    <div className="episodes-container">
                        <div className="colHeaders">
                            <p>Title</p>
                            <p>Date</p>
                            <p>Duration</p>
                        </div>
                        <ol className="episodes-list">
                            {episodes.map((episode) => (
                                <Link to={{
                                    pathname: `/podcast/${id}/episode/${episode.guid._text}`,
                                    state: {
                                        title: `${episode.title._text}`,
                                        description: `${episode.description._cdata}`,
                                        audio: `${episode.enclosure._attributes.url}` ? `${episode.enclosure._attributes.url}` : `${episode["media:content"][0]._attributes.url}`
                                    }
                                }}
                                    key={episode.guid._text}
                                    onClick={showEpisodeDetails}>
                                    <li>
                                        <p>{episode.title._text}</p>
                                        <p>{new Date(episode.pubDate._text).toLocaleString('en-US', dateOptions)}</p>
                                        <p>{episode["itunes:duration"]._text}</p>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                </div>) : (
                <div>
                    <EpisodeDetails />
                </div>
            )}
        </div>
    );
}

export default EpisodesList;