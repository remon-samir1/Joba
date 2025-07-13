import React from "react";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import Select from "react-select";
import countries from "world-countries";
import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../../components/Helpers/Axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateStudentsDetails = ({ setLoading }) => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const [student, setStudent] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    bio: "",
  });
  const [studentLocation, setStudentLocation] = useState({
    state: "",
    address: "",
    country: "",
    city: "",
  });
  const [studentPassword, setStudentPassword] = useState({
    password: "",
    password_confirmation: "",
  });
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/customer-show/${id}`).then((data) => {
      setLoading(false);
      const user = data.data.data.user;
      setStudent(user);
      setStudentLocation({
        state: user.state,
        address: user.address,
        country: user.country?.slice(0, 2),
        city: user.city,
        _method:"PUT"
      });
      console.log(data);
    });
  }, []);
  console.log(studentLocation);
  // handleInfoUpdate
  const handleInfoUpdate = () => {
    setLoading(true);
    try {
      Axios.put(`/admin/customer-info-update/${id}`, student).then((data) => {
        setLoading(false);
        toast.success("Updated Successfly");
      });
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // handleLocationUpdate
  const handleLocationUpdate = () => {
    setLoading(true);
    try {
      Axios.put(`/admin/customer-location-update/${id}`, studentLocation).then(
        (data) => {
          console.log(data);

          setLoading(false);
          toast.success("Updated Successfly");
        }
      );
    } catch (err) {
      setLoading(false);
    }
  };
  // handlePasswordUpdate
  const handlePasswordUpdate = () => {
    setLoading(true);
    try {
      Axios.put(`/admin/customer-password-change/${id}`, studentPassword).then(
        (data) => {
          console.log(data);

          setLoading(false);
          toast.success("Password change successfully");
        }
      );
    } catch (err) {
      setLoading(false);
    }
  };

  const genderDate = [
    {
      name: "Female",
      value: "female",
    },
    {
      name: "Male",
      value: "male",
    },
  ];
  return (
    <div className="UpdateStudentsDetails w-full md:flex-1">
      {/* Profile information */}
      <div className="profile-information">
        <h3>Profile information</h3>
        <form>
          <div className="form-control">
            <label htmlFor="name">Full name</label>
            <input
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="flex justify-center items-center md:flex-row md:gap-4 flex-col">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
              />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={student.phone}
                onChange={(e) =>
                  setStudent({ ...student, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center md:flex-row md:gap-4 flex-col">
            <div className="form-control">
              <label htmlFor="email">Gender</label>
              <SelectBox
                onChange={(e) =>
                  setStudent({ ...student, gender: e.target.value })
                }
                value={student.gender}
                title="select"
                data={genderDate}
              />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={(e) =>
                  setStudent({ ...student, age: e.target.value })
                }
                value={student.age}
              />
            </div>
          </div>
          <div className="form-control ">
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              id="bio"
              className="h-36"
              onChange={(e) => setStudent({ ...student, bio: e.target.value })}
              value={student.bio}
            />
          </div>
          <button
            onClick={handleInfoUpdate}
            className="hover:!bg-opacity-50 duration-300"
            type="button"
          >
            Update
          </button>
        </form>
      </div>

      {/* Profile location */}
      <div className="profile-information mt-8">
        <h3>Profile location</h3>
        <form>
          <div className="form-control">
            <label htmlFor="name">Country</label>
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

          <div className="flex justify-center items-center md:flex-row md:gap-4 flex-col">
            <div className="form-control">
              <label htmlFor="state">State</label>
              <input
                value={studentLocation.state}
                onChange={(e) =>
                  setStudentLocation({
                    ...studentLocation,
                    state: e.target.value,
                  })
                }
                type="text"
                id="state"
                name="state"
              />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="city">City</label>
              <input
                value={studentLocation.city}
                onChange={(e) =>
                  setStudentLocation({
                    ...studentLocation,
                    city: e.target.value,
                  })
                }
                type="text"
                id="city"
                name="city"
              />
            </div>
          </div>
          <div className="form-control ">
            <label htmlFor="address">Address</label>
            <input
              value={studentLocation.address}
              onChange={(e) =>
                setStudentLocation({
                  ...studentLocation,
                  address: e.target.value,
                })
              }
              type="text"
              id="address"
              name="address"
            />
          </div>
          <button type="button" onClick={handleLocationUpdate}>
            Update
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="profile-information mt-8">
        <h3>Profile location</h3>
        <form>
          <div className="flex justify-center items-center md:flex-row md:gap-4 flex-col">
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={studentPassword.password}
                onChange={(e) =>
                  setStudentPassword({
                    ...studentPassword,
                    password: e.target.value,
                  })
                }
              />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="Password-confirmation">
                Password confirmation
              </label>
              <input
                value={studentPassword.password_confirmation}
                onChange={(e) =>
                  setStudentPassword({
                    ...studentPassword,
                    password_confirmation: e.target.value,
                  })
                }
                type="password"
                id="Password-confirmation"
                name="Password-confirmation"
              />
            </div>
          </div>

          <button onClick={handlePasswordUpdate} type="button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentsDetails;
