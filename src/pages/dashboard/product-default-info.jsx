import { DeleteEditBtn, Loader, PageHeader } from "@/ui";
import { Typography, Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductDefoultInfoError,
  getAllProductDefoultInfoStart,
  getAllProductDefoultInfoSuccses,
} from "@/reduser/product-default-info-reducer";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import { ProductDefaultInfoService } from "@/services";
import moment from "moment";
import numeral from "numeral";

export function ProductDefaultInfo() {
  const { language } = useSelector((state) => state.language);
  const { isdeleted } = useSelector((state) => state.deleteElement);
  const { isloading, productDefoultInfoData } = useSelector(
    (state) => state.productDefaultInfo
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const getAllProductDefaultInfo = async () => {
    dispatch(getAllProductDefoultInfoStart());

    try {
      const { data } =
        await ProductDefaultInfoService.getAllProductDefaultInfo();
      dispatch(getAllProductDefoultInfoSuccses(data));
    } catch (error) {
      const { response } = error;
      dispatch(getAllProductDefoultInfoError());
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
    }
  };

  const searchPrduct = async () => {
    dispatch(getAllProductDefoultInfoStart());
    try {
      const { data } = await ProductDefaultInfoService.serachProductDefaultInfo(
        name
      );
      dispatch(getAllProductDefoultInfoSuccses(data));
    } catch (error) {
      dispatch(getAllProductDefoultInfoError());
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value); // `name` holatini yangilash
  };

  useEffect(() => {
    getAllProductDefaultInfo();
  }, [isdeleted]);

  useEffect(() => {
    // Avtomatik qidirishni boshlash
    searchPrduct();
  }, [name]);

  const TABLE_HEAD = [
    {
      headTitle: "Номи",
      headTitleUZ: "Nomi",
    },
    {
      headTitle: "Қалинлиги (мм)",
      headTitleUZ: "Qalinligi (mm)",
    },
    {
      headTitle: "Оптом",
      headTitleUZ: "Optom",
    },
    {
      headTitle: "Чакана",
      headTitleUZ: "Chakana",
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
    <div className="mt-8 rounded-xl  md:p-4">
      <PageHeader
        date={name}
        setData={setName}
        navigateTo={"/dashboard/maxsulotlar/add-product"}
        title={"Махсулотлар"}
        titleUz={"Maxsulotlar"}
        searchFunction={handleInputChange}
      />

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
                    className="border-blue-gray-10 border-b p-4 "
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
              {productDefoultInfoData?.map(
                (
                  {
                    name,
                    thickness,
                    priceRetail,
                    priceWholesale,
                    createdAt,
                    _id,
                  },
                  index
                ) => (
                  <tr key={uuidv4()}>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="text-base font-medium"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="text-base font-normal text-gray-700"
                      >
                        {thickness} mm
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="text-base font-normal text-gray-700"
                      >
                        {numeral(priceWholesale).format("0,0")} so'm
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="text-base font-normal text-gray-700"
                      >
                        {numeral(priceRetail).format("0,0")} so'm
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="text-base font-normal text-gray-700"
                      >
                        {moment(createdAt).format("L")}
                      </Typography>
                    </td>
                    <td className="flex gap-5 p-4">
                      <DeleteEditBtn
                        requestPathForDelete={"product/delete"}
                        pathForRoadToEditPage={
                          "/dashboard/maxsulotlar/edit-product-default"
                        }
                        _id={_id}
                        name={name}
                        deleteBtn={false}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

export default ProductDefaultInfo;
