import { RedisClientType, createClient } from "redis";

export class Redis<T = string> {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.error("Redis Client Error", err));
    this.client
      .connect()
      .catch((err) => console.error("Redis connection error:", err));
  }

  async get(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error(`Failed to get key ${key} from Redis:`, error);
      throw new Error("Failed to retrieve data from Redis");
    }
  }

  async set(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setEx(key, ttl, serializedValue);
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (error) {
      console.error(`Failed to set key ${key} in Redis:`, error);
      throw new Error("Failed to save data to Redis");
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const result = await this.client.del(key);
      return result > 0;
    } catch (error) {
      console.error(`Failed to delete key ${key} from Redis:`, error);
      throw new Error("Failed to delete data from Redis");
    }
  }
}
