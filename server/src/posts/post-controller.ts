import { Request, Response } from "express";

// export async function getAllPosts(req: Request, res: Response) {
//   try {
//     const postCollection = db.collection("posts");

//     const posts = await postCollection.find().toArray();

//     res.status(200).json({ message: "All posts", data: posts });
//   } catch (error) {
//     console.error("Error finding posts", error);
//     res.status(500).json({
//       message: "Error finding posts",
//       error: (error as any).message,
//     });
//   }
// }

export async function createBook(req: Request, res: Response) {
  console.log("hej");
  return;
  // const bookData = req.body;
  // const book = new PostModel(bookData);
  // await book.save();
  // res.status(201).json(book);
}
// //currently not working!
// export async function getPostById(req: Request, res: Response) {
//   const id = req.params.id;

//   try {
//     const postCollection = db.collection("posts");
//     const post = await postCollection.findOne({ _id: id });

//     if (post) {
//       res.status(200).json({ message: "Post found!", data: post });
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   } catch (error) {
//     console.error("Error finding post", error);
//     {
//       res
//         .status(500)
//         .json({ message: "Error finding post", error: (error as any).message });
//     }
//   }
// }
