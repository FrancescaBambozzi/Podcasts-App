import { Link } from "react-router-dom";

const PodcastsList = ({ podcasts }) => {
    return (
        <div className="podcasts-container">
            {podcasts.map((podcast) => (
                <ol className="podcasts-list" key={podcast.id.attributes["im:id"]}>
                    <Link to={`/podcast/${podcast.id.attributes["im:id"]}`}>
                        <li className="podcast">
                            <p>Title: {podcast.title.label}</p>
                            <p>Artist: {podcast["im:artist"].label}</p>
                        </li>
                    </Link>
                </ol>
            ))}
        </div>
    );
}

export default PodcastsList;