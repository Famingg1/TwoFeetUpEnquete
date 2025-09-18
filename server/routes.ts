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

  // Make.com webhook endpoint
  app.post("/api/survey/send-to-make", async (req, res) => {
    try {
      const { surveyResponseId } = req.body;
      
      if (!surveyResponseId) {
        return res.status(400).json({
          success: false,
          message: "Survey response ID is required"
        });
      }

      // Get the survey response from storage
      const surveyResponse = await storage.getSurveyResponse(surveyResponseId);
      
      if (!surveyResponse) {
        return res.status(404).json({
          success: false,
          message: "Survey response not found"
        });
      }

      // Format data for Make.com webhook
      const webhookData = {
        survey_id: surveyResponse.id,
        submitted_at: surveyResponse.submittedAt.toISOString(),
        responses: surveyResponse.responses
      };

      // Send to Make.com webhook
      const webhookUrl = "https://hook.eu2.make.com/acjgk31ajw9eeoe113rdesiyx3a7luco";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      res.status(200).json({
        success: true,
        message: "Survey response sent to Make.com successfully"
      });
    } catch (error) {
      console.error("Error sending to Make.com webhook:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send survey response to Make.com"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
