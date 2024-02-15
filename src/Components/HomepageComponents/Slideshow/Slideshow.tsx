import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './Slideshow.css';
import ThemeContext from '../../../contextAPI/themeContext';  

interface spot {
  name: string;
  description: string;
  picture: string;
}

const delay = 4000;

export default function Slideshow() {
  const { theme } = useContext(ThemeContext);
  const [spots, setSpots] = useState([]); // State variable to store the spots data
  const [index, setIndex] = useState(0); // State variable to store the current index of the slideshow
  const timeoutRef = useRef<number>(); // Reference to the timeout used for automatic slideshow

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout if it exists
    }
  }

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const sportType = theme === 'snowboard' ? 'snowboard' : 'skateboard';
        const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/sport/${sportType}/spots`);
        setSpots(response.data.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors de la récupération des spots:", error);
      }
    };

    fetchSpots();
  }, [theme]);

  useEffect(() => {
    resetTimeout(); // Reset the timeout when the index or spots length changes
    timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === spots.length - 1 ? 0 : prevIndex + 1), delay); // Update the index after a delay

    return () => {
      resetTimeout(); // Clear the timeout when the component unmounts
    };
  }, [index, spots.length]);
  
  function handleMouseEnter() {
    resetTimeout(); // Reset the timeout when the mouse enters the slideshow
  }

  function handleMouseLeave() {
    resetTimeout(); // Reset the timeout when the mouse leaves the slideshow
    timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === spots.length - 1 ? 0 : prevIndex + 1), delay); // Update the index after a delay
  }

  return (
    <div className="slideshow" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {spots.map((spot: spot, idx: number) => (
          <div className="slide" key={idx} onClick={() => {
            window.location.href = `/spot/${spot.name.toLowerCase().replace(/\s+/g, '-')}`;
          }}>
            <div id="spotlight">
              <h2>SPOTLIGHT : {spot.name}</h2>
              <text id="spotlight-text">{spot.description.length > 150 ? `${spot.description.slice(0, 150)}...` : spot.description}</text>
              <p>Découvrir {'>>'}</p>
            </div>
            <img id="slideshow-img" src={spot.picture} alt="" />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {spots.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => setIndex(idx)}></div>
        ))}
      </div>
    </div>
  );
}