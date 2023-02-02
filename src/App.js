import './App.css';
import { useState, useEffect, useRef } from 'react';
import Circle from './components/Circle';

export default function App() {


  const [width, setWidth] = useState(50); // value for the width of the circle
  const [height, setHeight] = useState(50); // value for the height of the circle
  const [color, setColor] = useState("#ffffff"); // value for the color

  const [elements, setElements] = useState([]); // the elements that are going to be shown as the drawing
  const [mouseDown, setMouseDown] = useState(false); // the state which shows whether the mouse is down or not

  const windowSize = useRef([window.innerWidth, window.innerHeight]); // the ref which gets the height and the width of the window 

  useEffect(() => {

    // function which checks if the cursor is in the drawing area
    function checkBorder(e) {
      if (e.clientX < windowSize.current[0] * 0.1 || e.clientY > windowSize.current[1] * 0.88 || e.clientX > windowSize.current[0] * 0.98) return false;
      return true;
    }


    ////////////////////////////////////
    //////////////// HANDLERS START 


    /// Handler for mouse move event
    const handleMouseMove = (event) => {
      if (mouseDown && checkBorder(event)) {
        console.log(color);
        setElements(elements.concat(<Circle height={height} width={width} color={color} x={event.clientX} y={event.clientY} />));
      }
    };

    /// Handler for mouse down event
    const handleMouseDown = (event) => {
      setMouseDown(true);
    }

    /// Handler for mouse up event
    const handleMouseUp = (event) => {
      setMouseDown(false);
    }

    //////////////// HANDLERS END
    ///////////////////////////////////////

    ///////////////////////////////////////
    //////////////// EVENT LISTENERS START 
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    //////////////// EVENT LISTENERS END
    //////////////////////////////////////

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  })





  return (
    <div className="App">
      <h1>Painter</h1>
      <p>By Mihai Mihaila</p>

      {/* THE AREA FOR THE DRAWINGS */}
      <div className='area' style={{ left: windowSize.current[0] * 0.1, top: 0, width: windowSize.current[0] * 0.89, height: windowSize.current[1] * 0.9 }}>

      </div>
      {elements}


      {/* THE COLOR SELECTOR */}
      <input className='color-selector' type="color" value={color} onChange={(e) => { setColor(e.target.value) }}
        style={{ left: windowSize.current[0] * 0.1, top: windowSize.current[1] * 0.94, width: "100px" }}
      />

      {/* THE CLEAR ALL BUTTON */}
      <button className='clear-all' onClick={() => { setElements([]) }}
        style={{ left: windowSize.current[0] * 0.3, top: windowSize.current[1] * 0.944, width: "100px" }}
      >Clear all</button>

      {/* THE SIZE CHANGER SLIDER */}
      <input className='size' type="range" min="0" max="100" value={height} onChange={(e) => { setHeight(e.target.value); setWidth(e.target.value) }}
        style={{ left: windowSize.current[0] * 0.5, top: windowSize.current[1] * 0.944, width: "300px" }}
      />


    </div>
  );
}

