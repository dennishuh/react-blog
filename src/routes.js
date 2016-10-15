import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import PostsIndex from './components/PostIndex';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={PostsIndex} />
    <Route path="posts" >
      <Route path="new" component={PostsNew} />
    <Route path=":id" component={PostsShow} />
    </Route>
  </Route>
)
