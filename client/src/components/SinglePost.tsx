import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";

export default function SinglePost() {
  const params = useParams();
  const { posts } = useContext(PostContext);

  const selectedPost = posts.find((post) => post._id === params.id);

  return (
    <>
      Title: {selectedPost?.title} <br />
      Content: {selectedPost?.content} <br />
    </>
  );
}
