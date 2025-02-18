import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

interface Comment {
    comment_id: number;
    recipe_id: number;
    user_id: number;
    content: string;
    is_deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CommentRepository = {
    async addComment(recipeId: number, userId: number, content: string) {
        await sequelize.query(
            `INSERT INTO Comments (recipe_id, user_id, content, createdAt, updatedAt) 
            VALUES (:recipeId, :userId, :content, NOW(), NOW())`,
            {
                replacements: { recipeId, userId, content },
                type: QueryTypes.INSERT,
            }
        );
    },

    async getCommentsByRecipe(recipeId: number): Promise<Comment[]> {
        const result = await sequelize.query<Comment>(
            "SELECT * FROM Comments WHERE recipe_id = :recipeId AND is_deleted = 0",
            {
                replacements: { recipeId },
                type: QueryTypes.SELECT,
            }
        );
        return result;
    },

    async getCommentByIdAndUser(commentId: number, userId: number): Promise<Comment | undefined> {
        const result = await sequelize.query<Comment>(
            "SELECT * FROM Comments WHERE comment_id = :commentId AND user_id = :userId",
            {
                replacements: { commentId, userId },
                type: QueryTypes.SELECT,
            }
        );
        return result[0]; // Return the first result or undefined if not found
    },

    async updateComment(commentId: number, content: string) {
        await sequelize.query(
            "UPDATE Comments SET content = :content, updatedAt = NOW() WHERE comment_id = :commentId",
            {
                replacements: { content, commentId },
                type: QueryTypes.UPDATE,
            }
        );
    },

    async deleteComment(commentId: number) {
        await sequelize.query(
            "UPDATE Comments SET is_deleted = 1 WHERE comment_id = :commentId",
            {
                replacements: { commentId },
                type: QueryTypes.UPDATE,
            }
        );
    },
};

export default CommentRepository;
