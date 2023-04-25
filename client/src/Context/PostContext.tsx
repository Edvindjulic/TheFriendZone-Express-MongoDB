
import { createContext, useEffect, useState } from "react";


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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchData();
  }, []);

 async function addPost(newPost: Post) {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful, user:", data);
    } else {
      const message = await response.text();
      throw new Error(message);
    } 
  }catch (error) {
      console.error("Error registering user:", error);
    }
    setPosts([newPost, ...posts]);

  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
