import { Link } from "react-router-dom";

const PodcastsList = ({ filteredItems }) => {

    return (
        <div className="podcasts-container">
            <ol className="podcasts-list">
                {filteredItems.map(podcast => (
                    <Link to={{ pathname: `/podcast/${podcast.id.attributes["im:id"]}` }} key={podcast.id.attributes["im:id"]}>
                        <li className="card">
                            <div className="card_img">
                                <img src={podcast["im:image"][2].label} alt="podcast" />
                            </div>
                            <div className="card_info">
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