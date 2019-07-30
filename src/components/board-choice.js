import React from 'react';
import Button from '@material-ui/core/Button';
import AliceCarousel from 'react-alice-carousel';
import asymmetrical from '../media/asymmetrical.png';
import diamond from '../media/diamond.png';
import german from '../media/german.png';
import english from '../media/english.png';
import square from '../media/square.png';
import european from '../media/european.png';

class BoardChoice extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      items: [english, european, german, asymmetrical, square, diamond],
      itemsNames: ['English', 'European', 'German', 'Asymmetrical', 'Square', 'Diamond'],
    };
  }

  slideTo = (i) => this.setState({ currentIndex: i });

  onSlideChanged = (e) => this.setState({ currentIndex: e.item });

  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 });

  renderGallery() {
    const {currentIndex, items, itemsNames} = this.state;

    return (<AliceCarousel
      fadeOutAnimation={true}
      dotsDisabled={true}
      buttonsDisabled={true}
      slideToIndex={currentIndex}
      startIndex={currentIndex}
      onSlideChanged={this.onSlideChanged}
    >
      { items.map((item, i) => <div key={i}> <h3>{itemsNames[i]}</h3> <img className="board-img" src={item} alt={itemsNames[i]}/> </div>) }
    </AliceCarousel>);
  }

  render() {
    if(this.props.value) {
      return (
        <div>
          <div className="dialog-container" onClick={this.props.onClose}></div>
          <div className="dialog">
            <h2>Play on a different board</h2>
            <Button className="close-btn" onClick={this.props.onClose}><i className="material-icons">close</i></Button>
            <Button className="carousel-btn" onClick={() => this.slidePrev()}><i className="material-icons">chevron_left</i></Button>
            <Button className="carousel-btn" onClick={() => this.slideNext()}><i className="material-icons">chevron_right</i></Button>
            { this.renderGallery() }
            <Button variant="contained" onClick={() => this.props.onClick(this.state.currentIndex)}>Play</Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BoardChoice;
