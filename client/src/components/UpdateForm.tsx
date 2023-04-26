import { useContext } from "react";
import { PostContext } from "../Context/PostContext";

export default function UpdateForm(id: string) {
  //   const params = useParams();
  const { posts } = useContext(PostContext);
  //   const { user } = useContext(UserContext);

  //   const selectedPost = posts.find((post) => post._id === params.id);
  const displayID = id;
  const postValues = posts.find((post) => post._id === displayID.id);

  return (
    <>
      Post ID: {displayID.id} <br />
      {postValues?.title} <br />
      {postValues?.content} <br />
      {postValues?.author} <br />
    </>
  );
}
