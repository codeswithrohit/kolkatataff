import React from "react";
const HeroInstagramThreads = () => {
  return (
    <div className="w-full max-h-screen items-start flex bg-[url('https://www.tailwindtap.com/assets/components/hero/threads/1.png')] bg-center lg:bg-center bg-cover bg-no-repeat flex-col">
      <div className="font-semibold text-white text-2xl tracking-wider px-10 pt-10 cursor-pointer md:block hidden">
      Kolkata Fatafat VIP Tips
      </div>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="bg-[#181818]  w-[211px] rounded-xl border-[1px] border-gray-700 flex flex-col justify-between pb-4 ">
          <div className="p-6">
            <img
              src="https://www.tailwindtap.com/assets/components/hero/threads/qr-code.png"
              alt="qr-code"
            />
          </div>
         
        </div>
        <div className="font-semibold text-white text-2xl tracking-wider pt-3 cursor-pointer md:hidden">
        Kolkata Fatafat VIP Tips
        </div>
        <div className="text-center text-white pt-3 font-semibold">
          <a href="#_">
            <h1>Design by Kolkata Fatafat Head Office</h1>
          </a>
        </div>
      </div>
    </div>
  );
};
export default HeroInstagramThreads;
