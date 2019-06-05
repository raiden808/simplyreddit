import React, { Component } from 'react'
import Pagination from '../controls/pagination'

class Api extends Component {
   constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  //http://www.reddit.com/r/nosleep/hot.json?count=5&after=t3_bwojax
  //after = last thread marker
  //count = the number of items already seen in this listing

  componentDidMount() {
  fetch("http://www.reddit.com/r/nosleep/hot.json?limit=10&count=5")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data.children
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    console.log(items);
    console.log(items.length-1)

    const display_posts = items.map(
      item =>{
        return(
          <li keyData={item.data.name} >{item.data.title}</li>
        )
      }
    );
   
    return (
      <div>
        <ul>{display_posts}</ul>
        <Pagination />
      </div>
    );
  }
}

export default Api