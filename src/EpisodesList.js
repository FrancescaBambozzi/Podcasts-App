import { Link } from "react-router-dom";

const EpisodesList = ({ episodes }) => {

    return (
        <div className="main">
            <h2>Episodes: {episodes.length}</h2>
            <div className="episodes-container">
                <ol className="episodes-list">
                    <li className="colHeaders">
                        <p>Title</p>
                        <p>Date</p>
                        <p>Duration</p>
                    </li>
                    {episodes.map((episode) => (
                        <Link to={{ pathname: `/episode/${episode.guid._text}` }} key={episode.guid._text}>
                            <li>
                                <p>{episode.title._text}</p>
                                <p>{episode.pubDate._text}</p>
                                <p>{episode["itunes:duration"]._text}</p>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default EpisodesList;