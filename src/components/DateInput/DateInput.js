import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="relative md:w-60 h-12 w-[40vw]">
  
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="w-full bg-inputColor border border-borderColor rounded px-4 py-2 pr-10 text-gray-300 focus:outline-none cursor-pointer"
        dateFormat="yyyy-MM-dd"
        placeholderText="Date"
      />
    
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
        onClick={() => document.querySelector(".react-datepicker__input-container input").focus()}
      >
        📅
      </span>
    </div>
  );
};

export default DateInput;
