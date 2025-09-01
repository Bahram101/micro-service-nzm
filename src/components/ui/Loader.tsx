import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <ClipLoader
      color={'green'}
      // loading={loading}
      // cssOverride={override}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
