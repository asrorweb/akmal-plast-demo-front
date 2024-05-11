import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  getAllTradeHistoryError,
  getAllTradeHistorySuccess,
  getTradeHistoryStart,
  paginationPageTradeHistory,
} from "@/reduser/trade-history-reducer";
import TradeService from "@/services/trade-service";
import { Loader, SimplePagination } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import numeral from "numeral";
import { useEffect } from "react";
import { PiClockFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function TradeHistory() {
  const { isLoadingTradeHistory, allTradeHistoryData } = useSelector(
    (state) => state.tradeHistory
  );
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPage = allTradeHistoryData?.pagination?.currentPage;

  const getAllTradeHistory = async () => {
    const limit = 15;
    dispatch(getTradeHistoryStart());
    try {
      const { data } = await TradeService.getAllTradeHistory(
        currentPage,
        limit
      );
      console.log(data);
      dispatch(getAllTradeHistorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getAllTradeHistoryError());
      dispatch(showAlertMessage(error.message));
      dispatch(showAlertMessageColor("red"));
    }
  };

  useEffect(() => {
    getAllTradeHistory();
  }, [currentPage]);

  const TABLE_HEAD = [
    {
      headTitle: "Клент",
      headTitleUZ: "Klent",
    },
    {
      headTitle: "Савдо суммаси",
      headTitleUZ: "Savdo summasi",
    },
    {
      headTitle: "Клент берган суммаси",
      headTitleUZ: "Klent bergan summasi",
    },

    {
      headTitle: "Сотувчи",
      headTitleUZ: "Sotuvchi",
    },
    {
      headTitle: "Қўшилган санаси",
      headTitleUZ: "Qo‘shilgan sanasi",
    },
  ];

  const paginationHandler = {
    next() {
      dispatch(paginationPageTradeHistory(currentPage + 1));
    },
    prev() {
      dispatch(paginationPageTradeHistory(currentPage - 1));
    },
  };

  const tradeHistoryViewHandler = (id) => {
    navigate(`/dashboard/savdo-tarixi/${id}`);
  };

  return (
    allTradeHistoryData !== null && (
      <div className="dashboars-page">
        <Card className="mb-6 px-2 py-4  md:px-5 md:py-8">
          <Typography variant="h3" className="text-black">
            {language == "kiril" ? "Савдо тарихи" : "Savdo tarixi"}
          </Typography>
          <Typography variant="paragraph" className="font-normal">
            {language == "kiril"
              ? "Бу ерда сотилган махсулотлар тарихи бўлади"
              : "Bu yerda sotilgan maxsulotlar tarixi bo'ladi"}
          </Typography>
        </Card>
        <SimplePagination
          func={paginationHandler}
          data={allTradeHistoryData}
          className={"justify-end  p-4"}
        />
        {isLoadingTradeHistory ? (
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
                        {language == "kiril"
                          ? data.headTitle
                          : data.headTitleUZ}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allTradeHistoryData?.tradeHistory?.map(
                  (
                    {
                      author,
                      createdAt,
                      _id,
                      client,
                      summaFromClient,
                      tradeSumm,
                    },
                    index
                  ) => (
                    <tr
                      key={uuidv4()}
                      onClick={() => tradeHistoryViewHandler(_id)}
                      className="cursor-pointer"
                    >
                      <td className="p-4">
                        <Typography color="blue-gray" className="font-medium">
                          {client.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography color="blue-gray" className="font-normal">
                          {tradeSumm ? numeral(tradeSumm).format("0,0") : "?"}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography color="blue-gray" className="font-normal">
                          {numeral(summaFromClient).format("0,0")}
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
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    )
  );
}

export default TradeHistory;
