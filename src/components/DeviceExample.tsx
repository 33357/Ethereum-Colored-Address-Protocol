import React from "react";
import { ColorfulAddress } from "./ColorfulAddress";

const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

export const DeviceExample = () => {
  return (
    <div className="relative flex flex-col sm:flex-row justify-center items-center sm:items-end">
      <div className="relative h-fit hidden sm:block">
        <img
          src="/iPhone.png"
          alt="iPhone"
          className="w-48 min-w-48 object-fit mx-auto"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-50">
          <ColorfulAddress
            address={address}
            className="!text-[14px] font-bold"
            simple={true}
          />
        </div>
      </div>

      <div className="relative">
        <img
          src="/MacBook.png"
          alt="MacBook"
          className="w-[750px] min-w-[335px] object-fit mx-auto"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-50">
          <ColorfulAddress
            address={address}
            className="!text-[10px] sm:!text-[16px] font-bold"
          />
        </div>
      </div>
    </div>
  );
};
