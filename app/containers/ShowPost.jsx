import React from 'react';
import { Link } from 'react-router'
import 'whatwg-fetch'

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class ShowPost extends React.Component {
  componentWillMount() {
    var self = this
    fetch('/api/v1/blogPost/' + this.props.params.slug)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      return self.setState({blog: json})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  updatePost() {
    fetch('/api/v1/blogPost/' + this.props.params, {
      method: 'PUT',
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


  constructor(props) {
    super(props);
    this.state = {
      blog: {}
    }
  }
  render() {
    console.log(this.state.blog)
    return (
      <div>
      {this.state.blog.map((post) => (
        <div>

          {post.body}
        </div>

        )

      )}
      </div>
    );
  }
  
};
          // {this.state.blog.map((post) => (
          //   <div>
          //     <h1>{post.title}</h1>
          //     <p>By {post.author}</p>
          //     <p>{post.body} </p>
          //   </div>
          //   )
          // )}
