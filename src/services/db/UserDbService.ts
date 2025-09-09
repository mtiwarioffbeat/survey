import pool from "@/lib/db";

export class UserDbService {
  public static async findUserByEmail(email: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT id, name, email FROM users WHERE email = $1 LIMIT 1",
        [email]
      );

      if ((result.rowCount ?? 0)) {
  return result.rows[0]; // user exists
}
      return null; // user does not exist
    } finally {
      client.release();
    }
  }

  public static async createUser(name: string, email: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO users (name, email, created_at, is_deleted, is_active) 
         VALUES ($1, $2, NOW(), FALSE, TRUE)
         RETURNING id, name, email, created_at`,
        [name, email]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}