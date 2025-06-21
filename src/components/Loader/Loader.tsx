import { RiseLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <RiseLoader color={"#34ca34"} />
    </div>
  );
};
