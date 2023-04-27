import { createContext, useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
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
    console.log(newPost);
  }

  async function deletePost(_id: string, index: number) {
    console.log("Deleting post with ID:", _id);
    const userResponse = await fetch("/api/users");
    const user = await userResponse.json();

    try {
      if (index >= 0 && index < posts.length) {
        // Check if index is valid
        const postOwnerId = posts[index]?.author?.toString();
        console.log(postOwnerId);
        if (user.id !== postOwnerId && !user.isAdmin) {
          console.log("user is not authorized to delete this post");
          return;
        }
      } else {
        console.log("Invalid index");
        return;
      }

      const response = await fetch(`/api/posts/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("post deleted successfully");
        const updatedPosts = posts.filter((post, i) => i !== index);
        // setPosts([...posts, updatedPosts]);
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
