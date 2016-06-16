import React from 'react';
import { Link } from 'react-router'
import 'whatwg-fetch'

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class Home extends React.Component {
  componentWillMount() {
    var self = this
    fetch('/api/v1/blogPost')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      return self.setState({posts:json})
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  render() {

    return (
      <div>
        <h1>All of these really cool blogs!</h1>
        <ul>
          {this.state.posts.map((post) => (
            <li><Link to={`post/${post.slug}`}>{post.title} </Link> and BODY: {post.body} </li>
            )
          )}
        </ul>
      </div>
    );
  }
  
};
