import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import UpdateForm from "./UpdateForm";

export default function SinglePost() {
  const params = useParams();
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const selectedPost = posts.find((post) => post._id === params.id);

  return (
    <>
      Title: {selectedPost?.title} <br />
      Content: {selectedPost?.content} <br />
      Author: {selectedPost?.author} <br />
      {user && (selectedPost?.author === user._id || user.isAdmin) ? (
        <UpdateForm id={selectedPost?._id} />
      ) : (
        "Du kan inte göra grejer med denna posten"
      )}
    </>
  );
}
