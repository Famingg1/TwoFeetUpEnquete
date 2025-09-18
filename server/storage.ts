import { type User, type InsertUser, type SurveyResponse, type InsertSurveyResponse } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private surveyResponses: Map<string, SurveyResponse>;

  constructor() {
    this.users = new Map();
    this.surveyResponses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    const id = randomUUID();
    const response: SurveyResponse = { 
      ...insertResponse, 
      id,
      submittedAt: new Date()
    };
    this.surveyResponses.set(id, response);
    return response;
  }
}

export const storage = new MemStorage();
