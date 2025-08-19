// Authentication functionality removed - this is now a frontend-only application
import type { Express, RequestHandler } from "express";

export async function setupAuth(app: Express) {
  // No authentication setup - frontend only
  console.log("Authentication disabled - frontend-only mode");
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // No authentication required - frontend only
  res.status(401).json({ message: "Authentication disabled - frontend-only mode" });
};
