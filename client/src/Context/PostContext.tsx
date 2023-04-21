import { createContext, useState } from "react";

interface Post {
  title: string;
  content: string;
}

export const PostContext = createContext(
  {} as {
    posts: Post[];
    addPost: (post: Post) => void;
  }
);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
