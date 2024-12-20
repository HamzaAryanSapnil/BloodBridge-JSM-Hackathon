import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="h-[90vh] w-full relative p-4">
      <img
        src="/final_bloodBridge_banner.jpg"
        alt="Blood Bridge Banner Image"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 ">
        <div className="flex justify-center items-center md:items-start flex-col gap-5">
          <h1 className="md:text-5xl text-3xl font-bold text-white">
            Blood <span className="text-primary">Bridge</span>🩸🩸🩸
          </h1>
          <p className="text-xl text-gray-300 text-start">
            Save Lives with Blood Donation.{" "}
          </p>
          <p className="text-base text-gray-300 text-center md:text-start ">
            Join Today as a Donor and Help Save Lives with Blood Donation.
          </p>
        </div>

        <div className="flex justify-around items-center gap-5 ">
          <button className="btn btn-primary dark:text-white">Join as a Donor</button>
          <button className="btn btn-outline btn-primary dark:btn dark:bg-white ">Search Donors</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
