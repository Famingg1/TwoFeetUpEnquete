import { type User, type InsertUser, type SurveyResponse, type InsertSurveyResponse, users, surveyResponses } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pkg from "pg";
const { Pool } = pkg;

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse>;
  getSurveyResponse(id: string): Promise<SurveyResponse | undefined>;
}

// Create database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    console.log('Saving survey response to database:', insertResponse);
    const result = await db.insert(surveyResponses).values(insertResponse).returning();
    console.log('Survey response saved:', result[0]);
    return result[0];
  }

  async getSurveyResponse(id: string): Promise<SurveyResponse | undefined> {
    const result = await db.select().from(surveyResponses).where(eq(surveyResponses.id, id)).limit(1);
    return result[0];
  }
}

export const storage = new DatabaseStorage();
