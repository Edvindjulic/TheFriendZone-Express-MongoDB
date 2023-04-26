import { createContext, useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

export const PostContext = createContext(
  {} as {
    posts: Post[];
    addPost: (post: Post) => void;
    deletePost: (id: string, index: number) => void;
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
    } catch (error) {
      console.error("Error registering user:", error);
    }

    setPosts([...posts, newPost]);

   
  }

  async function deletePost(id: string, index: Number) {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("post deleted succesfully");
        const updatedPosts = posts.filter((post, i) => i !== index);
        setPosts(updatedPosts);
      } else {
        console.log("error deleting");
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error("error deleting post", error);
    }

  }

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>{children}</PostContext.Provider>
  );
};
