import { useLocation } from "react-router-dom";

const Episode = () => {
    const location = useLocation();
    const episode = location.state.episode;
   
    return (
        <div className="main">
            <div>{episode.title._cdata ? (
                <h2 dangerouslySetInnerHTML={{ __html: "" + episode.description._cdata + "" }} />
            ) : (
                <h2>{episode.title._text}</h2>)}</div>
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