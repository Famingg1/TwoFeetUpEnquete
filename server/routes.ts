import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveyResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Survey response submission endpoint
  app.post("/api/survey/submit", async (req, res) => {
    try {
      // Validate the request body using the schema
      const surveyResponse = insertSurveyResponseSchema.parse(req.body);
      
      // Save the survey response
      const savedResponse = await storage.createSurveyResponse(surveyResponse);
      
      res.status(201).json({
        success: true,
        id: savedResponse.id,
        message: "Survey response saved successfully"
      });
    } catch (error) {
      console.error("Error saving survey response:", error);
      res.status(400).json({
        success: false,
        message: "Failed to save survey response"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
