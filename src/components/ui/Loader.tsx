import React, { FC } from "react";
import { ClipLoader } from "react-spinners";

interface ILoader {
  color?: string;
}

const Loader: FC<ILoader> = ({ color }) => {
  return (
    <div className="flex justify-center items-center mt-2">
      <ClipLoader
        className=""
        color={color}
        // loading={loading}
        // cssOverride={override}
        size={24}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
