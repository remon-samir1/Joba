import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Axios } from '../../../components/Helpers/Axios';
import Table from '../../../components/Table/Table';

const OrderStudentHistory = () => {
  const [deleted ,setDeleted] = useState(false)
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search , setSearch] = useState('')
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/student/orders?page=${page}&keyword=${search}& status=${status}`).then((data) => {
      console.log(data.data);
      setCategories(data.data.orders.data);
      // setTotal(data.data.data.order.total);
      setLoading(false);
    });
  }, [search,deleted, status]);

  // headers of table
  const headers = [
    {
      title: "Invoices",
      key: "invoice_id",
    },
    {
      title: "Paid",
      key: "paid_amount",
    },
    {
      title: "Gateway",
      key: "payment_method",
    },
  
    {
      title: "Status",
      key: "status",
      type:'text'
    },
    {
      title: "Payment",
      key: "payment_status",
    },
  ];
  return (
    <div className='mt-5'>
      <h3 className='text-[1.2rem] text-textColor font-semibold'>Order History</h3>
        <div className="overflow-x-auto w-[90vw] md:w-full mt-6">
          <Table
            action
            viewStudent
            headers={headers}
            data={categories}
            loading={loading}
            setDeleted={setDeleted}
          />
        </div>
    </div>
  );
}

export default OrderStudentHistory;
