import {
  manufacturedProductError,
  manufacturedProductStart,
  manufacturedProductSuccses,
  paginationPageManufacture,
} from "@/reduser/add-manufactured";
import { ManufacturedProductService } from "@/services";
import { DeleteEditBtn, Loader, SimplePagination } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { PiClockFill } from "react-icons/pi";

function ProductManufacturedTable() {
  const { language } = useSelector((state) => state.language);
  const { manufacturedData, isloading, isCreated } = useSelector(
    (state) => state.manufactured
  );
  const { isdeleted } = useSelector((state) => state.deleteElement);

  const currentPage = manufacturedData?.pagination?.currentPage;

  const dispatch = useDispatch();

  // ishlab chiqarilgan maxsulotning ro'yhati uchun
  const getManufacturedProduct = async () => {
    const limit = 10;
    dispatch(manufacturedProductStart());
    try {
      const { data } =
        await ManufacturedProductService.getAllManufacturedProduct(
          currentPage,
          limit
        );
      dispatch(manufacturedProductSuccses(data));
    } catch (error) {
      dispatch(manufacturedProductError(error));
    }
  };

  useEffect(() => {
    getManufacturedProduct();
  }, [isCreated, currentPage, isdeleted]);

  const paginationHandler = {
    next() {
      dispatch(paginationPageManufacture(currentPage + 1));
    },
    prev() {
      dispatch(paginationPageManufacture(currentPage - 1));
    },
  };

  const TABLE_HEAD = [
    {
      headTitle: "Номи",
      headTitleUZ: "Nomi",
    },
    {
      headTitle: "Метр",
      headTitleUZ: "Metr",
    },
    {
      headTitle: "Қалинлиг(мм)",
      headTitleUZ: "Qalinlig(mm)",
    },

    {
      headTitle: "Ходим",
      headTitleUZ: "Xodim",
    },
    {
      headTitle: "Қўшилган санаси",
      headTitleUZ: "Qo‘shilgan sanasi",
    },
    {
      headTitle: "",
      headTitleUZ: "",
    },
  ];

  return (
    <>
      {manufacturedData && (
        <div className="flex flex-col justify-between md:flex-row">
          <Typography className="mb-2 p-3 text-gray-700" variant="h6">
            {language == "kiril"
              ? "Ишлаб чиқарилган махсулотлар тарихи"
              : "Ishlab chiqarilgan maxsulotlar tarixi"}
          </Typography>
          <SimplePagination
            func={paginationHandler}
            data={manufacturedData}
            className={"justify-end  p-4"}
          />
        </div>
      )}
      {isloading ? (
        <Loader
          className="flex justify-center pt-8"
          width={40}
          height={40}
          color="#2C3940"
        />
      ) : (
        <Card className="h-full w-full overflow-auto shadow-xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((data) => (
                  <th
                    key={uuidv4()}
                    className="border-b border-blue-gray-100  p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium leading-none"
                    >
                      {language == "kiril" ? data.headTitle : data.headTitleUZ}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {manufacturedData?.productManufactured?.map(
                ({ author, name, meter, createdAt, _id }, index) => (
                  <tr key={uuidv4()}>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-medium">
                        {name?.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-normal">
                        {meter}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-normal">
                        {name.thickness} mm
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className=" font-normal capitalize"
                      >
                        {author.name}
                      </Typography>
                    </td>
                    <td className="p-2 pl-4">
                      <Typography
                        color="blue-gray"
                        className="text-sm font-normal text-gray-700"
                      >
                        <span className="block">
                          {moment(createdAt).format("L")}
                        </span>
                        <span className="flex items-center gap-1">
                          <PiClockFill className="text-gray-600" />
                          {moment(createdAt).format("LT")}
                        </span>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <DeleteEditBtn
                        editBtn={false}
                        requestPathForDelete={"product-base/delete"}
                        name={name.name}
                        _id={_id}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}

export default ProductManufacturedTable;
