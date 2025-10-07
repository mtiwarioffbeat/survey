import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; // your pg Pool instance
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getSession } from "@/lib/getSession";
import { SurveyServices } from "@/services/db/UserDbService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, isPublished, isOpenedInEditMode, questions } = body;
    console.log("body baclend=>>>>>>>", body)
    console.log("type", questions[0].type) 
    console.log("question", questions)
    // token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Decode JWT to get user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;
    let _survey_id = null
    // 3. Call stored procedure
    const { rows } = await pool.query(
      `CALL create_survey($1, $2, $3, $4, $5, $6, $7 )`,
      [
        title,
        description,
        isPublished,
        isOpenedInEditMode,
        userId,                    // <-- created_by (from session)
        JSON.stringify(questions),
        _survey_id
      ]
    );
    const sur_id = rows[0]._survey_id
    console.log("post survey ", rows)
    // console.log("response in backend",res)
    return NextResponse.json({ message: "Survey created successfully", sur_id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating survey:", error);
    return NextResponse.json({ error: "Failed to create survey" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const user = await getSession(); // your existing auth check
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse search param from URL
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim() || "";

    if (!search) {
      // No search term, return all surveys
      const { rows } = await pool.query(`SELECT * FROM get_surveys()`);
      const surveys = rows[0]?.get_surveys || [];

      return NextResponse.json(
        {
          success: true,
          message: "Surveys fetched successfully",
          data: surveys,
        },
        { status: 200 }
      );
    } else {
      // Search term provided, run search query
      const result = await pool.query("SELECT get_surveys($1) AS data", [search]);
      const surveys = result.rows[0].data || [];

      return NextResponse.json(
        {
          success: true,
          message: `Surveys fetched for search term "${search}"`,
          data: surveys,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Failed to fetch surveys", err);
    return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("body",body)
     
    const { id:survey_id, title, description,  isPublished, isOpenedInEditMode, questions } = body;
  
    const user = await getSession()
    const enteredBy:number = user?.id

    
    const dbres = await pool.query(
      `CALL update_survey($1, $2, $3, $4, $5, $6, $7,$8)`,
      [
        survey_id,
        title,
        description,
        isPublished,
        isOpenedInEditMode,
        enteredBy,
        JSON.stringify(questions),
        null
      ]);

    console.log("rows", dbres)

    return NextResponse.json({ message: "Survey updated successfully" });
  } catch (error: any) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Failed to update survey" },
      { status: 500 }
    );
  }
}

export async function PATCH(req:Request){
  try{
    const body = await req.json()
    console.log("Body data in patch",body)

    const response = await SurveyServices.patchSurvey(body);
    let NextResponseMessage='';
    // if(!response){
    //   return NextResponse.json({error:"No Survey found"},{status:404})
    // }
    if(body.to_delete){
      NextResponseMessage="Survey deleted successfully"
    }
    else if(body.to_publish){
      NextResponseMessage="Survey published successfully"
    }
    return NextResponse.json({status:200,message:NextResponseMessage})
  }  catch(error:any){
       console.error("Error updating survey:", error);
    return NextResponse.json({ error: "Failed to publish/delete survey" }, { status: 500 });
  }
}