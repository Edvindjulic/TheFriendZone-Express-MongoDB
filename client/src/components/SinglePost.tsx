import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import UpdateForm from "./UpdateForm";

export default function SinglePost() {
  const params = useParams();
  const { posts } = useContext(PostContext);
  const { user, getUsernameById } = useContext(UserContext);

  const selectedPost = posts.find((post) => post._id === params.id);

  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const fetchAuthorName = async () => {
      if (selectedPost) {
        const username = await getUsernameById(selectedPost.author);
        setAuthorName(username);
      }
    };

    fetchAuthorName();
  }, [selectedPost, getUsernameById]);

  return (
    <>
      Title: {selectedPost?.title} <br />
      Content: {selectedPost?.content} <br />
      Author: {authorName} <br />
      {user && (selectedPost?.author === user._id || user.isAdmin) ? (
        <UpdateForm id={selectedPost?._id} />
      ) : (
        "Du kan inte göra grejer med denna posten"
      )}
    </>
  );
}
