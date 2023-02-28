import { Link } from "react-router-dom";

const EpisodesList = ({ episodes }) => {
    return (
        <div className="main">
            <h2>Episodes: {episodes.length}</h2>
            <div className="episodes-container">
                <ol className="episodes-list">
                    {episodes.map((episode) => (
                        <Link to={{ pathname: `/episodes/${episode.guid._text}` }} key={episode.guid._text}>
                            <li className="episode">
                                {episode.title._text}
                            </li>
                        </Link>
                    ))}
                </ol>
                {/* <table>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                    {
                        episodes.map((episode) => (
                            <tr>
                                <td>{episode.guid._text}</td>
                                <td>{episode.title._text}</td>
                                <td>{episode.pubDate._text}</td>
                                <td>{episode["itunes:duration"]._text}</td>
                            </tr>
                        ))
                    }
                </table> */}
            </div>
        </div>
    );
}

export default EpisodesList;