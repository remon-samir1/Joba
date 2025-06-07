import React from "react";

const CourseDetailsInstructor = () => {
  return (
    <div className="pt-4 px-4 bg-white">
      <div className="flex items-start md:items-center gap-5 py-8 rounded-lg px-4  border border-[#dddd]">
        <div className="md:min-w-[9.25rem] w-14 h-14 shrink-0 md:h-[9.25rem] rounded-full overflow-hidden">
          <img
            src={require("../../../images/course-details.png")}
            alt="instructor"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <h3 className="text-textColor text-[1.1rem] font-semibold">
            Brenda howa
          </h3>
          <p className="text-[0.9rem] text-textColor max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur. Convallis vitae malesuada
            gravida posuere. Faucibus vel nec felis pellentesque nisi nibh. Nam
            enim sed id facilisis nullam. Arcu sit leo vulputate ornare vitae
            rutrum condimentum velit velit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsInstructor;
