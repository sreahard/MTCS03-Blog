import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import AddBlog from 'containers/AddBlog';
import Home from 'containers/Home';
import ShowPost from 'containers/ShowPost'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="add-blog" component={AddBlog} />
      <Route path="post/:slug" component={ShowPost} />
    </Route>
  );
};
