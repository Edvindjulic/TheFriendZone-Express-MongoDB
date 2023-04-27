import { createContext, useEffect, useState } from "react";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export const PostContext = createContext(
  {} as {
    posts: Post[];
    addPost: (post: Post) => void;
    deletePost: (id: string) => void;
    updatePost: (post: Post) => void;
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
        setPosts([...posts, newPost]);
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }

    console.log(newPost);
  }

  async function deletePost(id: string) {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Could not delete the post:", error);
    }
  }

  type UpdatedPost = {
    _id: string;
    title: string;
    content: string;
    author: string;
  };
  async function updatePost(updatedPost: UpdatedPost) {
    console.log(updatedPost);
    try {
      const response = await fetch(`/api/posts/${updatedPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Update successful, post:", data);

        setPosts(
          posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};
