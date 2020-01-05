import React from 'react';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.width =  window.innerWidth || 1440;
    this.height =  window.innerHeight || 900;
    this.count = Math.floor((this.width + this.height) / 10);
    
    this.flakes = [];
    for(let i = 0; i < this.count; i++) {
      this.flakes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: 1 + Math.random() * (5 - 1 + 1),
        o: 0.2 + Math.random() * (0.6 - 0.2 + 1),
      });
    }
  }

  componentDidUpdate() {
    const { angle } = this.props;
    const { width, height, flakes } = this;
    const ctx = this.canvasRef.current.getContext('2d');
    
    flakes.forEach(flake => {
      flake.y += (flake.o + flake.r) * 0.5;
      flake.x += Math.sin(angle + flake.r * 100);

      if (flake.y > this.height) {
        flake.y = -10;
        flake.x = Math.random() * width;
      }
    })
    
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    flakes.forEach(flake => {
      ctx.fillStyle = "rgba(255, 255, 255, " + flake.o + ")";
      ctx.beginPath();
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.r, 0, 2 * Math.PI);
      ctx.fill();
    })
  }
  
  render() {    
    return <canvas className="snow-container" width={this.width} height={this.height} ref={this.canvasRef} />;
  }
}

class Snow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.raf = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 0.01 }));
    this.raf = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    return <Canvas angle={this.state.angle} />;
  }
}

export default Snow;