import React, { useState } from "react";
import Select from "react-select";
import countries from "world-countries";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";

const LocationStudentSetting = ({
  studentLocation,
  setStudentLocation,
  setLoading,
}) => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.put("/student/setting/address", studentLocation).then(
        (data) => {
          console.log(data);
          toast.success("Updated Successfly");
          setLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("something was wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white mt-6">
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-2 mt-4 flex-1 w-full ">
          <label
            htmlFor="country"
            className="text-[0.9rem] text-textColor font-medium"
          >
            Country
          </label>
          <Select
            options={formattedCountries}
            className="DateSelectBox country"
            classNamePrefix="my"
            placeholder="Select"
            value={formattedCountries.find(
              (country) => country.value === studentLocation.country
            )}
            onChange={(selectedOption) =>
              setStudentLocation({
                ...studentLocation,
                country: selectedOption.value,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-2 mt-4 md:flex-1 w-full ">
          <label
            htmlFor="State"
            className="text-[0.9rem] text-textColor font-medium"
          >
            State
          </label>
          <input
            value={studentLocation.state}
            onChange={(e) =>
              setStudentLocation({ ...studentLocation, state: e.target.value })
            }
            type="text"
            placeholder="State"
            id="State"
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4 md:flex-1 w-full ">
          <label
            htmlFor="City"
            className="text-[0.9rem] text-textColor font-medium"
          >
            City
          </label>
          <input
            value={studentLocation.city}
            onChange={(e) =>
              setStudentLocation({ ...studentLocation, city: e.target.value })
            }
            type="text"
            placeholder="City"
            id="name"
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 md:flex-1 w-full ">
        <label
          htmlFor="address"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Address
        </label>
        <input
          value={studentLocation.address}
          onChange={(e) =>
            setStudentLocation({ ...studentLocation, address: e.target.value })
          }
          type="text"
          placeholder="Address"
          id="address"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500"
      >
        Update
      </button>
    </form>
  );
};

export default LocationStudentSetting;
