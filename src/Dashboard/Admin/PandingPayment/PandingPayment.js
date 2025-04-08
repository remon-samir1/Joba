import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

import Table from "../../../components/Table/Table";

const PendingPayment = () => {
  return (
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Pending Payment</h3>
        <Breadcrumbs />
      </div>

        <div className="overflow-x-auto w-[90vw] md:w-full mt-8">
          <Table action sub update trash  gray/>
        </div>
    </div>
  );
};

export default PendingPayment;
