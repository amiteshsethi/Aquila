import { createContext } from "react";
import { useProvidePosts } from "../hooks";
import React from "react";

const initialState = {
  posts: [],
  loading: true,
  addPostToState : () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>;
};
