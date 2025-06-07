import React, { useState } from "react";
// import RecentCart from "./RecentCart/RecentCart";
// import './Visa.css'
const Visa = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
     // handle CardNumber input
  const formatCardNumber = (value) => {
    let cleanedValue = value.replace(/\D/g, "").slice(0, 16);

    let formattedValue = cleanedValue.replace(/(\d{4})/g, "$1 ").trim();

    setCardNumber(formattedValue);
  };
      // handle Cvc input
  const formatCvc = (value)=> {
    let cleanedValue = value.replace(/\D/g, "").slice(0, 3);
  setCvc(cleanedValue)
  }
  return (
    <div >
  
    
        <form>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="name" className="text-[0.9rem] text-textColor font-medium">Cardholder name</label>
            <input type="text" name="name" id="name" placeholder="Card name" className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2" />
          </div>
          <div className="flex flex-col gap-2 mt-4 ">
            <label htmlFor="cardNumber" className="text-[0.9rem] text-textColor font-medium">Card number</label>

            <input
            className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
              type="text"
              value={cardNumber}
              onChange={(e) => formatCardNumber(e.target.value)}
              placeholder="Card number"
              maxLength="19"
              inputMode="numeric"
              id="cardNumber"
            />
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="date" className="text-[0.9rem] text-textColor font-medium">Expiry date</label>
              <input type="month" name="date" id="date" placeholder="month" className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2" />
            </div>
            <div className="flex flex-col gap-2  flex-1">
              <label htmlFor="number" className="text-[0.9rem] text-textColor font-medium">Security code</label>

              <input
              className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
                inputMode="numeric"
                value={cvc}
                type="text"
                name="number"
                placeholder="CVC"
                id="number"
                maxLength="3"
                onChange={(e) => formatCvc(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="Amount" className='text-[0.9rem] text-textColor font-medium'>Amount</label>
        <input type="text" placeholder='Amount' id='Amount' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <button type="submit" className='text-white bg-main p-4 w-full rounded-lg mt-6 main-shadow duration-500'>Confirm</button>
        </form>

      


      </div>
  
  );
};

export default Visa;
