import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

const data = [
  { status: "Finished", color: "green", score: "91.66%" },
  { status: "Not finished", color: "orange", score: "91.66%" },
  { status: "Missed", color: "red", score: "91.66%" },
  { status: "Finished", color: "green", score: "91.66%" },
];

export default function MyQuiz() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">

      <h2 className="text-base text-textColor ">My Quiz </h2>
      <Breadcrumbs/>
      </div>
      <div className="overflow-x-scroll w-[80vw] md:w-full md:overflow-hidden">

      <div className=" rounded-lg md:w-full w-[100vw]">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4  mb-5 font-semibold text-text2 border-[#ddd] px-3 py-5  text-sm border-b">
          <div className=" col-span-3 md:col-span-6">Item</div>
          <div className="col-span-3 md:col-span-2">Status</div>
          <div className="col-span-3 md:col-span-2">Date & Time</div>
          <div className="col-span-3 md:col-span-2">Grade</div>
        </div>

        {/* Data Rows */}
        {data.map((item, index) => (
          <div 
            key={index}
            className="grid grid-cols-12 gap-4 px-3 py-5 rounded-lg border-b text-sm items-center bg-white border border-[#dddd] "
          >
            <div className="col-span-6">
              <p className="text-main text-[1.05rem] w-[90%]">
                Module 1 Interdiction: Education forces a person to think positive and do right deeds
              </p>
              <p className="text-text2 mt-2 text-[1.1rem]">Quiz</p>
            </div>
            <div className="col-span-2">
              <span className={`px-2 py-1   rounded text-sm bg-${item.color}-100 text-${item.color}-700`}>
                {item.status}
              </span>
            </div>
            <div className="col-span-2 text-gray-600">
              1/3/2025 <br /> 11:00 AM
            </div>
            <div className="col-span-2 font-semibold text-gray-800">{item.score}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
