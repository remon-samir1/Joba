

import React, { useRef, useState } from "react";
import { LuSave } from "react-icons/lu";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const AddWithdrawMethod = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    minimum: "",
    maximum: "",
    description: "",
    status: 0,
  });

  const navigate = useNavigate();

  const statusData = [
    { name: "Inactive", value: false },
    { name: "Active", value: true },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("minimum_amount", form.minimum);
      formData.append("maximum_amount", form.maximum);
      formData.append("description", form.description);
      formData.append("status", form.status);

      const res = await Axios.post(`/admin/withdraw-method`, formData);
      console.log(res);
      toast.success("Created successfully");

      setTimeout(() => {
        navigate("/admin/withdraw-method");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notifcation />
      <div className="UpdateCategory">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl">
            Add withdraw method
          </h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <form className="inputs p-7" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                disabled={loading}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label htmlFor="Minimum">Minimum amount</label>
              <input
                type="number"
                id="Minimum"
                name="minimum"
                value={form.minimum}
                disabled={loading}
                onChange={(e) =>
                  setForm({ ...form, minimum: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label htmlFor="Maximum">Maximum amount</label>
              <input
                type="number"
                id="Maximum"
                name="maximum"
                value={form.maximum}
                disabled={loading}
                onChange={(e) =>
                  setForm({ ...form, maximum: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="h-48"
                value={form.description}
                disabled={loading}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="status">Status</label>
              <SelectBox
                data={statusData}
                disabled={loading}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value === "true" ? 1 : 0,
                  })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`!bg-[#0048D3] !px-10 !border-[#0048D3] hover:!bg-white hover:!text-[#0048D3] w-full !rounded !mt-7 ${
                loading && "cursor-wait hover:!bg-[#0048D3] hover:!text-white"
              }`}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <LuSave width={24} height={24} className="text-white icon" />
                  <span>Save</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWithdrawMethod;

