import React from 'react';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 1600;

export default class Snow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      height: window.innerHeight || DEFAULT_HEIGHT,
      width: window.innerWidth || DEFAULT_WIDTH,
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 0.07 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle}/>
  }
}

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
    this.width =  window.innerWidth || DEFAULT_WIDTH;
    this.height =  window.innerHeight || DEFAULT_HEIGHT;

    this.flakesCount = 200;
    this.flakes = [];
    for(let i=0; i<this.flakesCount; i++) {
      this.flakes.push({
        x: Math.random() * this.width,                    // x-coordinate
        y: Math.random() * this.height,                   // y-coordinates
        r: 1 + Math.random() * (5 - 1),              // radius
        o: 0.3 + Math.random() * (0.7 - 0.1),        // opacity
        n: Math.random() * 100,
      });
    }
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  componentDidUpdate() {
    const {angle} = this.props;

    for (let i=0; i<this.flakesCount; i++) {
      const p = this.flakes[i];
      p.y += p.o + p.r;
      p.x += Math.sin(angle + p.n);

      if (p.y > this.height) {
        if (Math.random() > 0.1) {
          this.flakes[i] = {x: Math.random() * this.width, y: -10, r: p.r, o: p.o, n: p.n};
        } else {
          if (Math.sin(angle) > 0) {
            this.flakes[i] = {x: -5, y: Math.random() * this.height, r: p.r, o: p.o, n: p.n};
          } else {
            this.flakes[i] = {x: this.width + 5, y: Math.random() * this.height, r: p.r, o: p.o, n: p.n};
          }
        }
      }
    }

    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i=0; i<this.flakesCount; i++) {
      const p = this.flakes[i];
      this.ctx.fillStyle = "rgba(255,255,255," + p.o + ")";
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} width={this.width} height={this.height}></PureCanvas>;
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    const snowStyles = {
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 0
    };

    return (
      <canvas style={snowStyles} width={this.props.width} height={this.props.height}
        ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
    )
  }
}
