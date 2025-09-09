
export default function DraftPage() {
  const isMenu = true;
  return (
    <div className='w-full flex flex-col px-10  h-screen bg-slate-100' >
      <div className="flex h-screen">
        <div
          className={`transition-all duration-300 flex-1 ${isMenu ? "ml-60" : "ml-0"
            }`}
        >
          
        </div>
      </div>
    </div>
  )
}