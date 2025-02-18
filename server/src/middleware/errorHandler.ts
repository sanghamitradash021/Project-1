// import { Request, Response, NextFunction } from "express";

// // Global error handler middleware
// export const errorHandler = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): void => {
//     console.error("Error:", err.message);


//     res.status(500).json({
//         message: "Something went wrong. Please try again later.",
//         error: process.env.NODE_ENV === "design" ? err.message : undefined,
//     });
// };

import { Request, Response, NextFunction } from "express";

/**
 * Global error handler middleware.
 * 
 * This middleware handles errors thrown by other middleware or route handlers in the Express application.
 * It logs the error and sends a standardized error response to the client. The response includes a generic
 * message, and in the "design" environment, the actual error message is included for debugging purposes.
 * 
 * @param {Error} err - The error object that was thrown.
 * @param {Request} req - The request object, which may contain information related to the error.
 * @param {Response} res - The response object used to send the error response to the client.
 * @param {NextFunction} next - The next middleware function (not used in this case).
 * @returns {void} - The function does not return a value but sends an error response.
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error:", err.message);

    res.status(500).json({
        message: "Something went wrong. Please try again later.",
        error: process.env.NODE_ENV === "design" ? err.message : undefined,
    });
};
