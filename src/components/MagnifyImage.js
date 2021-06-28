import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import './MagnifyImage.css';

function MagnifyImage({ src, alt, onError, ...props }) {
    const [backgroundImage, setBackgroundImage] = useState(`url(${src})`);
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        setBackgroundPosition(`${x}% ${y}%`);
    }
    return (
        <figure 
            onMouseMove={handleMouseMove} 
            style={{ backgroundImage: backgroundImage, backgroundPosition: backgroundPosition }}
        >
            <img src={src} alt={alt} onError={onError} />
        </figure>
    )
}

MagnifyImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onError: PropTypes.func
}

export default MagnifyImage;
