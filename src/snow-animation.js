import React, { useEffect, useMemo, useRef, useState } from "react";
import T from "prop-types";

const Canvas = ({ angle }) => {
  const canvasRef = React.createRef();
  const width = window.innerWidth || 1440;
  const height = window.innerHeight || 900;
  const count = Math.floor((width + height) / 10);

  const flakes = useMemo(() => {
    const tempFlakes = [];
    for (let i = 0; i < count; i++) {
      tempFlakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * (3 - 1 + 1),
        o: 0.2 + Math.random() * (0.6 - 0.2 + 1),
      });
    }
    return tempFlakes;
  }, [width, height, count]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    flakes.forEach((flake) => {
      flake.y += (flake.o + flake.r) * 0.5;
      flake.x += Math.sin(angle + flake.r * 100);

      if (flake.y > height) {
        flake.y = -10;
        flake.x = Math.random() * width;
      }
    });

    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    flakes.forEach((flake) => {
      ctx.fillStyle = "rgba(255, 255, 255, " + flake.o + ")";
      ctx.beginPath();
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [angle, canvasRef, flakes, height, width]);

  return <canvas className="snow-container" width={width} height={height} ref={canvasRef} />;
};

Canvas.propTypes = {
  angle: T.number,
};

const Snow = () => {
  const [angle, setAngle] = useState(0);
  const raf = useRef();

  useEffect(() => {
    function updateAnimationState() {
      setAngle((prevAngle) => prevAngle + 0.01);
      raf.current = requestAnimationFrame(updateAnimationState);
    }

    raf.current = requestAnimationFrame(updateAnimationState);

    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <Canvas angle={angle} />;
};

export default Snow;
