import { Link } from "react-router-dom";

const PodcastsList = ({ filteredPodcasts }) => {
    return (
        <div className="podcasts-container">
            <ol className="podcasts-list">
                {filteredPodcasts.map((podcast) => (
                    <Link to={`/podcast/${podcast.id.attributes["im:id"]}`}>
                        <li className="podcast" key={podcast.id.attributes["im:id"]}>
                            <img src={podcast["im:image"][1].label} alt="podcast-image" />
                            <div class="text">
                                <h3>{podcast["im:name"].label}</h3>
                                <p>Author: {podcast["im:artist"].label}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ol>
        </div>
    );
}

export default PodcastsList;