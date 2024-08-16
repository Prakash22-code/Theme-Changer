// src/ImageWithDynamicBackground.js

import React, { useState, useEffect, useRef } from 'react';
import FastAverageColor from 'fast-average-color';

export default function ImageWithDynamicBackground({ imageUrl }) {
    const [bgColor, setBgColor] = useState('#fff'); // Default background color
    const imageRef = useRef(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        
        if (imageRef.current) {
            fac.getColorAsync(imageRef.current)
                .then((color) => {
                    const { isDark } = color;
                    // Set the background to the opposite of the image's background color
                    setBgColor(isDark ? '#fff' : '#000');
                })
                .catch((e) => {
                    console.error(e);
                });
        }

        // Cleanup
        return () => {
            fac.destroy();
        };
    }, [imageUrl]);

    return (
        <div style={{ backgroundColor: bgColor, padding: '20px' }}>
            <img
                src={imageUrl}
                ref={imageRef}
                alt="Dynamic Background"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
    );
}
