import Summ from "@/helpers/summ";
import { Typography } from "@material-tailwind/react";
import numeral from "numeral";
import { RxInfoCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function ProductBaseSeeList({ data, index }) {
  const navigate = useNavigate();
  const { productType, quantity, _id } = data;
  const meter = Summ(quantity);

  const infoHandler = () => {
    navigate(`/dashboard/ombor/maxsulot/${_id}`);
  };

  return (
    <li
      className={`flex items-center justify-between rounded-lg bg-white py-3 px-4  shadow-[0px_0px_4px_0px_#00000024] md:hover:shadow-[0px_0px_15px_0px_#00000024]`}
    >
      <div>
        <Typography className="flex text-lg font-normal">
          <span className="block w-40  md:w-52  ">{productType?.name}</span>
          <span className="text-2xl font-medium text-black">
            {numeral(meter).format("0,0")}{" "}
            <span className=" text-base text-gray-600">m (дона)</span>
          </span>
        </Typography>
      </div>

      <RxInfoCircled
        onClick={infoHandler}
        className="h-6 w-6 cursor-pointer text-[#3B82F6]"
      />
    </li>
  );
}

export default ProductBaseSeeList;
