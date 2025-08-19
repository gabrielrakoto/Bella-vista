import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Disabled auth setup
  await setupAuth(app);

  // Simple health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Frontend-only restaurant website' });
  });

  // All database-dependent routes have been removed
  // This is now a frontend-only application

  const httpServer = createServer(app);
  return httpServer;
}
