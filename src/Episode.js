import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Episode = () => {
    const { id } = useParams();
    const location = useLocation();
    const episode = location.state.episode;

    return (
        <div className="main">
            <h2>{episode.title._text}</h2>
            <div className="episodes-container">
                <div>
                    {episode.description._cdata ? (
                        <div dangerouslySetInnerHTML={{ __html: "" + episode.description._cdata + "" }} />
                    ) : (
                        <p>{episode.description._text}</p>)}
                </div>
                <audio controls>
                    <source src={episode.enclosure._attributes.url} type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
}

export default Episode;