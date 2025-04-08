import React from "react";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import Select from "react-select";
import countries from "world-countries";
const UpdateStudentsDetails = () => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  return (
    <div className="UpdateStudentsDetails flex-1">
      {/* Profile information */}
      <div className="profile-information">
        <h3>Profile information</h3>
        <form>
          <div className="form-control">
            <label htmlFor="name">Full name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="phone">Phone</label>
              <input type="number" id="phone" name="phone" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="form-control">
              <label htmlFor="email">Gender</label>
              <SelectBox title="select" />
            </div>{" "}
            <div className="form-control">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" />
            </div>
          </div>
          <div className="form-control ">
            <label htmlFor="bio">Bio</label>
            <textarea type="text" id="bio" className="h-36" />
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
              <label htmlFor="Password-confirmation">Password confirmation</label>
              <input type="password" id="Password-confirmation" name="Password-confirmation" />
            </div>
          </div>
    
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentsDetails;
