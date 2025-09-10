import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center h-[80vh] items-center">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-t-primary border-gray-300"></div>
    </div>
  );
};

export default Loader;
