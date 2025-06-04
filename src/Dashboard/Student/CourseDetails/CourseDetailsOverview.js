import { Icon } from "@iconify-icon/react";
import React from "react";

const CourseDetailsOverview = () => {
  return (
    <div className="p-3 bg-white">
      <h4 className="text-textColor text-base">Course description</h4>
      <p className="text-text2 mt-4">
        Lorem ipsum dolor sit amet consectetur. Ipsum morbi augue sit id
        vestibulum tellus dignissim ornare. Sed a aliquet aenean lacus purus
        neque aenean leo. Tincidunt libero tortor sed aliquam donec. Etiam sit
        nibh ut facilisi posuere ac viverra. In tortor lorem curabitur arcu
        senectus cursus scelerisque. Nunc natoque neque diam leo.
      </p>

      <h4 className="text-textColor text-base mt-8 ">What will you learn</h4>
      <div className="flex items-center gap-3 mt-4">
      <Icon className="text-main" icon="ic:twotone-done" width="20" height="20" />
      <span className="text-text2 ">Lorem ipsum dolor sit amet consectetur.</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
      <Icon className="text-main" icon="ic:twotone-done" width="20" height="20" />
      <span className="text-text2 ">Lorem ipsum dolor sit amet consectetur.</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
      <Icon className="text-main" icon="ic:twotone-done" width="20" height="20" />
      <span className="text-text2 ">Lorem ipsum dolor sit amet consectetur.</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
      <Icon className="text-main" icon="ic:twotone-done" width="20" height="20" />
      <span className="text-text2 ">Lorem ipsum dolor sit amet consectetur.</span>
      </div>
    </div>
  );
};

export default CourseDetailsOverview;
