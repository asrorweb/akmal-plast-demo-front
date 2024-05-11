import { RotatingLines } from "react-loader-spinner";

function Loader({ height = 20, width = 20, color = "black", className = "" }) {
  return (
    <div className={className}>
      <RotatingLines height={height} width={width} strokeColor={color} />
    </div>
  );
}

export default Loader;
