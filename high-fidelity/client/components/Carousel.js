import { Component } from 'react'
import ReactSwipe from 'react-swipe'

export default class Carousel extends Component {
  constructor() {
    super()
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render() {
    return (
      <div className="carousel column section card">
        <ReactSwipe ref="reactSwipe">
          {this.props.children}
        </ReactSwipe>
        <a onClick={() => this.prev()} className="icon is-medium carousel-left">
          <i className="fa fa-chevron-left"></i>
        </a>
        <a onClick={() => this.next()} className="icon is-medium carousel-right">
          <i className="fa fa-chevron-right"></i>
        </a>
      </div>
    );
  }
}
