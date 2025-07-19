import React, { useState } from "react";

const Visa = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = cleanedValue.replace(/(\d{4})/g, "$1 ").trim();
    setFormData((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  };

  const formatCvc = (value) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 3);
    setFormData((prev) => ({
      ...prev,
      cvc: cleanedValue,
    }));
  };

  return (
    <div>
      <form>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="name" className="text-[0.9rem] text-textColor font-medium">
            Cardholder name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Card name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="cardNumber" className="text-[0.9rem] text-textColor font-medium">
            Card number
          </label>
          <input
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
            type="text"
            value={formData.cardNumber}
            onChange={(e) => formatCardNumber(e.target.value)}
            placeholder="Card number"
            maxLength="19"
            inputMode="numeric"
            id="cardNumber"
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="expiryDate" className="text-[0.9rem] text-textColor font-medium">
              Expiry date
            </label>
            <input
              type="month"
              name="expiryDate"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="cvc" className="text-[0.9rem] text-textColor font-medium">
              Security code
            </label>
            <input
              className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
              inputMode="numeric"
              value={formData.cvc}
              type="text"
              name="cvc"
              placeholder="CVC"
              id="cvc"
              maxLength="3"
              onChange={(e) => formatCvc(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="amount" className="text-[0.9rem] text-textColor font-medium">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
          />
        </div>

        <button type="submit" className="text-white bg-main p-4 w-full rounded-lg mt-6 main-shadow duration-500">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Visa;
