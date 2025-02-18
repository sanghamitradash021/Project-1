

// import { Request, Response } from "express";
// import CommentRepository from "../repositories/commentRepository";

// const addComment = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { userId, content } = req.body;
//         const { recipeId } = req.params;

//         // Add the comment using the repository
//         await CommentRepository.addComment(Number(recipeId), userId, content);

//         res.status(201).json({ message: "Comment added successfully" });
//     } catch (error: any) {
//         console.error("Error adding comment:", error);
//         res.status(500).json({ message: "Error adding comment", error: error.message });
//     }
// };

// const getComments = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { recipeId } = req.params;

//         // Get the comments from the repository
//         const comments = await CommentRepository.getCommentsByRecipe(Number(recipeId));

//         res.status(200).json(comments);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching comments", error });
//     }
// };

// const updateComment = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { commentId, userId, content } = req.body;

//         // Check if the comment exists and belongs to the user
//         const existingComment = await CommentRepository.getCommentByIdAndUser(commentId, userId);

//         if (!existingComment) {
//             res.status(404).json({ message: "Comment not found or unauthorized" });
//             return;
//         }

//         // Update the comment using the repository
//         await CommentRepository.updateComment(commentId, content);

//         res.status(200).json({ message: "Comment updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating comment", error });
//     }
// };

// const deleteComment = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { commentId, userId } = req.body;

//         // Check if the comment exists and belongs to the user
//         const existingComment = await CommentRepository.getCommentByIdAndUser(commentId, userId);

//         if (!existingComment) {
//             res.status(404).json({ message: "Comment not found or unauthorized" });
//             return;
//         }

//         // Delete the comment using the repository
//         await CommentRepository.deleteComment(commentId);

//         res.status(200).json({ message: "Comment deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting comment", error });
//     }
// };

// export default {
//     addComment,
//     getComments,
//     updateComment,
//     deleteComment,
// };

import { Request, Response } from "express";
import CommentRepository from "../repositories/commentRepository";

/**
 * Adds a new comment to a recipe.
 * 
 * @param {Request} req - The request object, containing the comment data in the body and recipeId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, content } = req.body;
        const { recipeId } = req.params;

        // Add the comment using the repository
        await CommentRepository.addComment(Number(recipeId), userId, content);

        res.status(201).json({ message: "Comment added successfully" });
    } catch (error: any) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

/**
 * Fetches all comments for a specific recipe.
 * 
 * @param {Request} req - The request object, containing recipeId in the params.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const getComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId } = req.params;

        // Get the comments from the repository
        const comments = await CommentRepository.getCommentsByRecipe(Number(recipeId));

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

/**
 * Updates an existing comment.
 * 
 * @param {Request} req - The request object, containing commentId, userId, and content in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { commentId, userId, content } = req.body;

        // Check if the comment exists and belongs to the user
        const existingComment = await CommentRepository.getCommentByIdAndUser(commentId, userId);

        if (!existingComment) {
            res.status(404).json({ message: "Comment not found or unauthorized" });
            return;
        }

        // Update the comment using the repository
        await CommentRepository.updateComment(commentId, content);

        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment", error });
    }
};

/**
 * Deletes a comment from the database.
 * 
 * @param {Request} req - The request object, containing commentId and userId in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise indicating the completion of the operation.
 */
const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { commentId, userId } = req.body;

        // Check if the comment exists and belongs to the user
        const existingComment = await CommentRepository.getCommentByIdAndUser(commentId, userId);

        if (!existingComment) {
            res.status(404).json({ message: "Comment not found or unauthorized" });
            return;
        }

        // Delete the comment using the repository
        await CommentRepository.deleteComment(commentId);

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
};

export default {
    addComment,
    getComments,
    updateComment,
    deleteComment,
};
