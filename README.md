This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Store Procedure
1. Get Survey
CREATE OR REPLACE FUNCTION get_surveys(search TEXT DEFAULT NULL)
RETURNS JSON
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT COALESCE(
            json_agg(
                json_build_object(
                    'id', s.id,
                    'title', s.title,
                    'description', s.description,
                    'createdBy', u.name,
                    'createdAt', s.created_at,
                    'isPublished', s.is_published,
                    'isOpenedInEditMode', s.is_opened_in_edit_mode,
                    'questions', (
                        SELECT COALESCE(
                            json_agg(
                                json_build_object(
                                    'id', q.id,
                                    'title', q.title,
                                    'description', q.description,
                                    'sortOrder', q.sort_order,
									'isDeleted', q.is_deleted,
                                    'type', json_build_object(
                                        'title', qt.title,
                                        'description', qt.description
                                    ),
                                    'choices', (
                                        SELECT COALESCE(
                                            json_agg(
                                                json_build_object(
                                                    'id', qo.id,
                                                    'title', qo.title,
                                                    'description', qo.description,
                                                    'sortOrder', qo.sort_order,
													'isDeleted', qo.is_deleted
                                                ORDER BY qo.sort_order
                                            ), '[]'::json
                                        )
                                        FROM question_option qo
                                        WHERE qo.question_id = q.id
                                          AND qo.is_deleted = false
                                          AND qo.is_active = true
                                    )
                                )
                                ORDER BY q.sort_order
                            ), '[]'::json
                        )
                        FROM question q
                        JOIN question_type qt ON qt.id = q.question_type_id
                        WHERE q.survey_id = s.id
                          AND q.is_deleted = false
                          AND q.is_active = true
                    )
                )
                ORDER BY s.created_at DESC
            ), '[]'::json
        )
        FROM survey s
        JOIN users u ON u.id = s.created_by
        WHERE s.is_deleted = false
          AND s.is_active = true
          AND (
            search IS NULL OR search = '' -- no filtering if search empty
            OR s.title ILIKE search || '%' -- case-insensitive partial match
          )
    );
END;
$$;
 2. Get Survey ID
    
 CREATE OR REPLACE FUNCTION get_survey_by_id(_survey_id INT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT COALESCE(
    json_build_object(
      'id', s.id,
      'title', s.title,
      'description', s.description,
      'isPublished', s.is_published,
      'isOpenedInEditMode', s.is_opened_in_edit_mode,
      'createdAt', s.created_at,
      'questions', (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', q.id,
              'title', q.title,
              'description', q.description,
              'sortOrder', q.sort_order,
              'isDeleted', q.is_deleted,
              'type', json_build_object(
                'title', qt.title,
                'description', qt.description
              ),
              'choices', (
                SELECT COALESCE(
                  json_agg(
                    json_build_object(
                      'id', qo.id,
                      'title', qo.title,
                      'description', qo.description,
                      'sortOrder', qo.sort_order,
                      'isDeleted', qo.is_deleted
                    )
                    ORDER BY qo.sort_order
                  ), '[]'::json
                )
                FROM question_option qo
                WHERE qo.question_id = q.id
                  AND qo.is_deleted = false
                  AND qo.is_active = true
              )
            )
            ORDER BY q.sort_order
          ), '[]'::json
        )
        FROM question q
        JOIN question_type qt ON qt.id = q.question_type_id
        WHERE q.survey_id = s.id
          AND q.is_deleted = false
          AND q.is_active = true
      )
    ), '{}'::json
  )
  INTO result
  FROM survey s
  WHERE s.id = _survey_id
    AND s.is_deleted = false
    AND s.is_active = true;
  RETURN result;
END;
$$ LANGUAGE plpgsql;


 3. Create Survey
    
 CREATE OR REPLACE PROCEDURE create_survey(
    IN _title VARCHAR,
    IN _description VARCHAR,
    IN _isPublished boolean,
    IN _isOpenedInEditMode boolean,
    IN _createdBy INT,
    IN _questions JSON,
    OUT _survey_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    q JSONB;
    question_id INT;
    opt JSONB;
    question_type_id INT;
BEGIN
    -- Insert survey
    INSERT INTO survey (title, description, created_by, created_at, is_deleted,is_active,
                        is_published, is_opened_in_edit_mode, edit_mode_start_date_time, edit_start_by)
    VALUES (_title, _description, _createdBy, now(), false, true, _isPublished, _isOpenedInEditMode, now(), _createdBy)
    RETURNING id INTO _survey_id;
    -- Loop through questions
    FOR q IN SELECT * FROM jsonb_array_elements(_questions::jsonb)
    LOOP
        SELECT id INTO question_type_id
        FROM question_type
        WHERE title = q->'type'->>'title'
          AND is_deleted = false
        LIMIT 1;
        IF question_type_id IS NULL THEN
            INSERT INTO question_type (title, description, created_at, is_deleted)
            VALUES (q->'type'->>'title', COALESCE(q->'type'->>'description'), now(), false)
            RETURNING id INTO question_type_id;
        END IF;
        -- Insert question
        INSERT INTO question (title, description, question_type_id, survey_id, created_at, entered_by, is_deleted, is_active)
        VALUES (
            NULLIF(q->>'title',''),
            NULLIF(q->>'description',''),
            question_type_id,
            _survey_id,
            now(),
            _createdBy,
            false,
            true
        )
        RETURNING id INTO question_id;
        -- Insert choices
        IF q ? 'choices' THEN
            FOR opt IN SELECT * FROM jsonb_array_elements(q->'choices')
            LOOP
                INSERT INTO question_option (title, description, question_id, created_at, is_deleted, is_active)
                VALUES (
                    opt->>'title',
                    opt->>'description',
                    question_id,
                    now(),
                    false,
                    true
                );
            END LOOP;
        END IF;
    END LOOP;
END;
$$;

 4. Update Survey
 CREATE OR REPLACE PROCEDURE update_survey(
  IN _survey_id INT,
  IN _title VARCHAR,
  IN _description VARCHAR,
  IN _isPublished BOOLEAN,
  IN _isOpenEditMode BOOLEAN,
  IN _enteredBy INT,
  IN _questions JSON,
OUT sur_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
  q JSONB;
  questionId INT;
  opt JSONB;
  question_typeId INT;
BEGIN
  -- UPDATE SURVEY
  UPDATE survey
  SET
    title = _title,
    description = _description,
    is_published = _isPublished,
    is_opened_in_edit_mode = _isOpenEditMode,
    edit_mode_start_date_time = now(),
    edit_start_by = _enteredBy
  WHERE id = _survey_id
  RETURNING id INTO sur_id;
  -- Loop Through questions
  FOR q IN SELECT * FROM jsonb_array_elements(_questions::jsonb)
  LOOP
    SELECT id INTO question_typeId 
    FROM question_type
    WHERE title = q->'type'->>'title' AND is_deleted = false
    LIMIT 1;
    -- The fix for the question_type section is below
    IF question_typeId  IS NOT NULL THEN
      UPDATE question_type
      SET
        title = q->'type'->>'title',
        description = q->'type'->>'description',
        created_at = now(),
        is_deleted = false
      WHERE id = question_typeId ;
    ELSE
      INSERT INTO question_type(title, description, created_at, is_deleted)
      VALUES (q->'type'->>'title', COALESCE(q->'type'->>'description'), now(), false)
      RETURNING id INTO question_typeId ;
    END IF;
    -- CASE 1: UPDATE existing QUESTON
    IF q ? 'id' THEN
      UPDATE question
      SET
        title = q->>'title',
        description = q->>'description',
        question_type_id = question_typeId ,
        is_deleted = (q->>'isDeleted')::BOOLEAN,
        is_active = true
      WHERE id = (q->>'id')::INT
        AND survey_id = _survey_id
      RETURNING id INTO questionId;
    ELSE
      -- INSERT new question
      INSERT INTO question (title, description, question_type_id, survey_id, created_at,
                           entered_by, is_deleted, is_active)
      VALUES (
        q->>'title',
        q->>'description',
       	question_typeId ,
        _survey_id,
        now(),
        _enteredBy,
        (q->>'isDeleted')::BOOLEAN,
        true)
      RETURNING id INTO questionId;
    END IF;
    -- UPDATE existing option
    IF q ? 'choices' THEN
      FOR opt IN SELECT * FROM jsonb_array_elements(q->'choices')
      LOOP
        IF opt ? 'id' THEN
          UPDATE question_option
          SET
            title = opt->>'title',
            description = opt->>'description',
            is_deleted = (opt->>'isDeleted')::BOOLEAN,
            is_active = true
          WHERE id = (opt->>'id')::INT
            AND question_id = questionId;
        ELSE
          -- INSERT new option
          INSERT INTO question_option(title, description, question_id, created_at, is_deleted,
                                      is_active)
          VALUES (
            opt->>'title',
            opt->>'description',
            questionId,
            now(),
            false,
            true);
        END IF;
      END LOOP;
    END IF;
  END LOOP;
END;
$$;

 ## TABLES
 1.User Table
 CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    session_id VARCHAR(255)
);
2.Survey Table
CREATE TABLE Survey (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000),
    created_by INT,
    created_at TIMESTAMP,
    is_deleted BOOLEAN,
    is_active BOOLEAN,
    is_published BOOLEAN,
    is_opened_in_edit_mode BOOLEAN,
    edit_mode_start_date_time TIMESTAMP,
    edit_start_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (edit_start_by) REFERENCES users(id)
);
3.Question Table
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    question_type_id INT,
    survey_id INT,
    entered_by INT,
    created_at TIMESTAMP,
    is_deleted BOOLEAN,
    is_active BOOLEAN,
    sort_order INT,
    FOREIGN KEY (question_type_id) REFERENCES question_type(id),
    FOREIGN KEY ( survey_id) REFERENCES survey(id),
    FOREIGN KEY (entered_by) REFERENCES users(id)
);
4.Question_type Table
create table question_type(
id SERIAL PRIMARY KEY,
name VARCHAR,
description VARCHAR,
created_at TIMESTAMP,
is_deleted BOOLEAN
)
5.Question_Option Table
CREATE TABLE question_option (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    question_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

 
 
 
