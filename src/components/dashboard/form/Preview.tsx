"use client";

interface PreviewProps {
  questions:any[];
}

export default function Preview({ questions }: PreviewProps) {
  return (
    <div className=" w-195 ml-34 items-center bg-white p-6 mt-5 shadow rounded-lg">
      <h2 className="font-bold mb-4">Your Survey Questions</h2>

      {questions.length === 0 && <p>No questions added yet.</p>}

      <div className="space-y-6 text-gray-700">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">{q.title}</h3>

            {q.type.type === "Paragraph" && (
              <input type="text" placeholder="Your answer" className="w-full border-b outline-none pb-1" />
            )}

            {q.type.type === "Multiple choice" && (
              <ul className="space-y-1">
                {q.choices.map((opt: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="radio" name={q.id} />
                    <span>{opt}</span>
                  </li>
                ))}
                {q.hasOther && (
                  <li className="flex items-center gap-2">
                    <input type="radio" name={q.id} />
                    <span>Other...</span>
                  </li>
                )}
              </ul>
            )}

            {q.type.type === "Checkboxes" && (
              <ul className="space-y-1">
                {q.choices.map((opt: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{opt}</span>
                  </li>
                ))}
                {q.hasOther && (
                  <li className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Other...</span>
                  </li>
                )}
              </ul>
            )}

            {q.type.type === "Drop-down" && (
              <select className="border rounded px-2 py-1 w-60">
                {q.choices.map((opt: string, i: number) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
                {q.hasOther && <option value="other">Other...</option>}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
