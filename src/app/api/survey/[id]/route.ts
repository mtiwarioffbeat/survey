import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid survey ID' }, { status: 400 });
  }

  try {
    const result = await pool.query('SELECT * FROM get_survey_by_id($1)', [Number(id)]);
    const survey = result.rows[0]?.get_survey_by_id;

    if (!survey) {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }

    return NextResponse.json(survey, { status: 200 });
  } catch (err) {
    console.error('Error fetching survey by ID:', err);
    return NextResponse.json({ error: 'Failed to fetch survey' }, { status: 500 });
  }
}
