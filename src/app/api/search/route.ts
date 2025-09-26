import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { withAuth } from "@/lib/authMiddleware";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    // Search surveys by title or description
    const { rows } = await pool.query(
      `SELECT * FROM get_surveys() WHERE title ILIKE $1 OR description ILIKE $1`,
      [`%${query}%`]
    );

    const surveys = rows[0]?.get_surveys || [];

    return NextResponse.json({
      success: true,
      message: "Search completed successfully",
      data: surveys,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error searching surveys:", error);
    return NextResponse.json({ error: "Failed to search surveys" }, { status: 500 });
  }
});
