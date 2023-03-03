const Podcast = ({ podcastDetails, feedData, handleReset }) => {
    return (
        <div className="side" onClick={handleReset}>
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
        </div>
    );
}

export default Podcast;