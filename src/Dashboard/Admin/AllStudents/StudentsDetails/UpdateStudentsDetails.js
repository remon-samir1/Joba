import React from "react";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import Select from "react-select";
import countries from "world-countries";
import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../../components/Helpers/Axios";
import { useParams } from "react-router-dom";
const UpdateStudentsDetails = () => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));
  const [student, setStudent] = useState({
    name:'',
    phone:'',
    email:'',
    gender:'',
 age:"",
 bio:''

  });
  const { id } = useParams();
  useEffect(() => {
    Axios.get(`/admin/customer-show/${id}`).then((data) =>{
      // setStudent(data.data.filter((data) => data.id == id))
      setStudent(data.data.data.user)
    }
    );
  }, []);

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
    <div className="UpdateStudentsDetails flex-1">
      {/* Profile information */}
      <div className="profile-information">
        <h3>Profile information</h3>
        <form>
          <div className="form-control">
            <label htmlFor="name">Full name</label>
            <input value={student.name} onChange={(e)=>setStudent({...student , name:e.target.value})} type="text" id="name" name="name" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={student.email} onChange={(e)=>setStudent({...student , email:e.target.value})} />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="phone">Phone</label>
              <input type="number" id="phone" name="phone" value={student.phone} onChange={(e)=>setStudent({...student , phone:e.target.value})} />
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="email">Gender</label>
              <SelectBox onChange={(e)=>setStudent({...student , gender:e.target.value})} value={student.gender} title="select" data={genderDate} />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" onChange={(e)=>setStudent({...student , age:e.target.value})} value={student.age} />
            </div>
          </div>
          <div className="form-control ">
            <label htmlFor="bio">Bio</label>
            <textarea type="text" id="bio" className="h-36" onChange={(e)=>setStudent({...student , bio:e.target.value})} value={student.bio}/>
          </div>
          <button type="submit">Update</button>
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
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>
          </div>
          <div className="form-control ">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>

      {/* Password */}
      <div className="profile-information mt-8">
        <h3>Profile location</h3>
        <form>
          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="Password-confirmation">
                Password confirmation
              </label>
              <input
                type="password"
                id="Password-confirmation"
                name="Password-confirmation"
              />
            </div>
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentsDetails;
