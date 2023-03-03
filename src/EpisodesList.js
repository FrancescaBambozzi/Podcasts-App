import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EpisodesList = ({ feedData, handleShowEpisode }) => {
    const { id } = useParams();
    const episodes = feedData.item;

    //date options to format the date string
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit'
    };

    //convert episode audio duration string in hours
    function secondsToHms(timeString) {
        let hours = Math.floor(timeString / 3600);
        let minutes = Math.floor((timeString % 3600) / 60);
        let seconds = timeString % 60;
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div>
            <div className="main">
                <h2>Episodes: {episodes.length}</h2>
                <div className="episodes-container">
                    <div className="episodes-list-header">
                        <p>Title</p>
                        <p>Date</p>
                        <p>Duration</p>
                    </div>
                    <ol className="episodes-list">
                        {episodes.map((episode) => (
                            <Link to={{
                                pathname: `/podcast/${id}/episode/${episode.guid._text}`,
                                state: { episode }
                            }}
                                key={episode.guid._text}
                                onClick={handleShowEpisode}>
                                <li>
                                    <p>{episode.title._text}</p>
                                    <p>{new Date(episode.pubDate._text).toLocaleString('en-US', dateOptions)}</p>
                                    <p>{secondsToHms(parseInt(episode["itunes:duration"]._text))}</p>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default EpisodesList;