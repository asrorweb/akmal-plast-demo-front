import {
  getOneProductFromBaseError,
  getOneProductFromBaseStart,
  getOneProductFromBaseSuccses,
} from "@/reduser/product-base-reducer";
import { ManufacturedProductService } from "@/services";
import { ButtonBack, Loader } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductBaseSeeInfo() {
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.base);
  const dispatch = useDispatch();

  const getProductHandler = async () => {
    dispatch(getOneProductFromBaseStart());
    try {
      const { data } =
        await ManufacturedProductService.getOneProductFromBaseById(id);
      dispatch(getOneProductFromBaseSuccses(data));
    } catch (error) {
      dispatch(getOneProductFromBaseError());
    }
  };

  useEffect(() => {
    getProductHandler();
  }, [id]);

  const TABLE_HEAD = ["Метр", "Калинлик"];

  return (
    <Card className="dashboars-page relative mb-10">
      <ButtonBack />

      {isLoading ? (
        <Loader
          className="flex justify-center pt-8"
          width={40}
          height={40}
          color="#2C3940"
        />
      ) : (
        <div className="px-4 md:px-0">
          <table className="mt-14 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100  bg-blue-700 p-4"
                  >
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product?.quantity?.map(({ meter }, index) => (
                <tr key={index} className="border-b-2">
                  <td className="p-4">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <span className="text-xl">{meter}</span> - m (дона)
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal text-gray-700"
                    >
                      {product?.productType?.thickness} mm
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default ProductBaseSeeInfo;
