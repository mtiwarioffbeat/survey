import FormHeading from "@/components/dashboard/form/FormHeading";
import Question from "@/components/dashboard/form/Question";
import FormNav from "@/components/dashboard/form/FormNav";
export default function FormPage() {
    const isMenu = true;
    return (
        <div className='w-full flex flex-col px-10  bg-purple-50' >
            <div className="flex ">
                <div
                    className={`transition-all duration-300 flex-1 ${isMenu ? "ml-60" : "ml-0"
                        }`}
                >
                    <div>
                        <div className="">
                            <FormNav/>
                            <FormHeading />
                            <Question />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}