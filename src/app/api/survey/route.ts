import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; // your pg Pool instance
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getSession } from "@/lib/getSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, isPublished, isOpenedInEditMode, questions } = body;
   console.log("body baclend=>>>>>>>",body)
   console.log("type",questions[0].type)
   console.log("question",questions)
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
  const {rows} =   await pool.query(
      `CALL create_survey($1, $2, $3, $4, $5, $6, $7 )`,
      [
        name,
        description,
        isPublished,
        isOpenedInEditMode,
        userId,                    // <-- created_by (from session)
        JSON.stringify(questions),
        _survey_id
      ]
    );
    const sur_id = rows[0]._survey_id
    console.log("updated survey ",rows)
    // console.log("response in backend",res)
    return NextResponse.json({ message: "Survey created successfully",sur_id},{status:201});
  } catch (error: any) {
    console.error("Error creating survey:", error);
    return NextResponse.json({ error: "Failed to create survey" }, { status: 500 });
  }
}

export async function GET(){
  try{

    const user = await getSession()
    console.log("get req")
    if(!user){
      return NextResponse.json({error:"Unauthorized"},{status:401})
     
    }
    console.log("whs")
     const {rows} = await pool.query(
        `SELECT * FROM get_surveys()`
      )

      console.log("rowssssss",rows)
      return NextResponse.json({message:"surveys fetched successfully",data:rows},{status:200})

  } catch(err:unknown){
    console.log(err)
    return NextResponse.json({error:"Failed to fetch surveys"},{status:500})
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {survey_id,title,description,isPublished,isOpenEditMode,questions} = body;
    const user = await getSession()
    const createdBy = user?.id

 
   const dbres =  await pool.query(
    `CALL update_survey($1, $2, $3, $4, $5, $6, $7)`, 
      [ 
        survey_id, 
        title,
        description,
        isPublished, 
        isOpenEditMode,
        createdBy,
        JSON.stringify(questions),
    ]);

    console.log("rows",dbres)
 
    return NextResponse.json({ message: "Survey updated successfully" });
  } catch (error: any) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Failed to update survey" },
      { status: 500 }
    );
  }
}