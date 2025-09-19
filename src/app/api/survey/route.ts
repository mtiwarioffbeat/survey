import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; // your pg Pool instance
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, isPublished, isOpenedInEditMode, questions } = body;
   console.log("body baclend=>>>>>>>",body)
    // 1. Extract token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Decode JWT to get user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;

    // 3. Call stored procedure
    await pool.query(
      `CALL create_survey($1, $2, $3, $4, $5, $6)`,
      [
        name,
        description,
        isPublished,
        isOpenedInEditMode,
        userId,                // <-- created_by (from session)
        JSON.stringify(questions),
      ]
    );

    return NextResponse.json({ message: "Survey created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating survey:", error);
    return NextResponse.json({ error: "Failed to create survey" }, { status: 500 });
  }
}
