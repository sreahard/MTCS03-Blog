import React from 'react';
import 'whatwg-fetch';
import classNames from 'classnames/bind';
import styles from 'css/components/home';



const cx = classNames.bind(styles);



/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class AddBlog extends React.Component {
  submitPost() {
    fetch('/api/v1/blogPost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
      <div className={cx('home')}>
        <h1 className={cx('home__header')}>Sup world! You da bomb.</h1>
        <p> Title </p>
        <input onChange={(e) => this.setState({title: e.target.value})} />
        <p> Author </p>
        <input onChange={(e) => this.setState({author: e.target.value})} />
        <p> Slug </p>
        <input onChange={(e) => this.setState({slug: e.target.value})} />
        <p> Blog Post </p>
        <textarea rows="10" cols="30" onChange={(e) => this.setState({body: e.target.value})} /><br />
        <button onClick={() => this.submitPost()}> Sumbit That Shit! </button>
        <button onClick={() => this.getBlogPosts()}> Get those posts! </button>
      </div>
    );
  }
  
};
