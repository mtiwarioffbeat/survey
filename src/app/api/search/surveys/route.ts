import { NextResponse } from "next/server";
import pool from "@/lib/db";
export async function POST(request: Request) {
  try {
    // Read raw string payload
    const q = await request.text();
    const search = q.trim();

    if (!search) {
      return NextResponse.json({ error: "Search text is required" }, { status: 400 });
    }
    const result = await pool.query("SELECT get_surveys_by_title($1) AS data", [search]);
    const data = result.rows[0].data;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching surveys:", err);
    return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
  }
}
