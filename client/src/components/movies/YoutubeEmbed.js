import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css"; // Make sure to create this CSS file or add the styles in your existing CSS.

const YoutubeEmbed = ({ url }) => {
    let embedId = null;
    try{
        const urlObject = new URL(url);
        embedId = urlObject.searchParams.get("v");
    }catch (error){
        console.error("Invalid URL:", error);
    }
    return (
        <div className="video-responsive">
            <iframe
                src={`https://www.youtube.com/embed/${embedId}`}
                className="youtube-iframe" // Add a class for styling
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
