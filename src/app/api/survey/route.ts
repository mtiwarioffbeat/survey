// src/app/api/surveys/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db"; 


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      created_by,
      is_deleted = false,
      is_active = true,
      is_published = false,
      questions = [],
    } = body;

  
    const surveyResult = await pool.query(
      `INSERT INTO survey (name, description, createdby, createdat, isdeleted, isactive, ispublished) 
       VALUES ($1, $2, $3, NOW(), $4, $5, $6) 
       RETURNING id`,
      [name, description, created_by, is_deleted, is_active, is_published]
    );

    const surveyId = surveyResult.rows[0].id;

   
    for (const q of questions) {
      const questionResult = await pool.query(
        `INSERT INTO question (title, description, questiontypeid, surveyid, enteredby, createdat, isdeleted, isactive, sortorder) 
         VALUES ($1, $2, $3, $4, $5, NOW(), false, true, $6) 
         RETURNING id`,
        [q.title, q.description, q.type, surveyId, created_by, q.sortOrder]
      );

      const questionId = questionResult.rows[0].id;

   
      if (q.choices && q.choices.length > 0) {
        for (let i = 0; i < q.choices.length; i++) {
          const choice = q.choices[i];
          await pool.query(
            `INSERT INTO questionoption (title, description, questionid, createdat, isdeleted, isactive, sortorder)
             VALUES ($1, $2, $3, NOW(), false, true, $4)`,
            [choice, "", questionId, i + 1]
          );
        }
      }
    }

    return NextResponse.json(
      { message: "Survey saved successfully", surveyId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error saving survey:", err);
    return NextResponse.json(
      { error: "Failed to save survey" },
      { status: 500 }
    );
  }
}
