import { showModalQuest } from "@/reduser/model-quest-reduer";
import {
  getTradeHistoryError,
  getTradeHistoryStart,
  getTradeHistorySuccess,
} from "@/reduser/trade-history-reducer";
import TradeService from "@/services/trade-service";
import { ButtonBack, Loader, ModelQuest, TradeTableView } from "@/ui";
import { Button, Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import numeral from "numeral";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TradeHistoryView() {
  const { isLoadingTradeHistory, tradeHistoryData } = useSelector(
    (state) => state.tradeHistory
  );
  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();
  const { id } = useParams();

  const getTradeHistory = async () => {
    dispatch(getTradeHistoryStart());
    try {
      const { data } = await TradeService.getOneProductHistory(id);
      dispatch(getTradeHistorySuccess(data));
    } catch (error) {
      dispatch(getTradeHistoryError());
    }
  };

  const cencelProductHandler = () =>
    dispatch(showModalQuest(tradeHistoryData._id));

  useEffect(() => {
    getTradeHistory();
  }, [id]);

  return (
    tradeHistoryData !== null && (
      <div className="dashboars-page relative">
        {isLoadingTradeHistory ? (
          <Loader
            className="flex justify-center pt-8"
            width={40}
            height={40}
            color="#2C3940"
          />
        ) : (
          <Card className="mt-4 p-4 pt-11 md:pt-16">
            <ButtonBack />

            <div className="flex flex-col justify-between md:flex-row md:items-center md:px-5">
              <div className="mb-8">
                <Typography
                  variant="h5"
                  className="text-base font-medium text-black md:text-lg"
                >
                  <span className="text-sm font-normal text-gray-700">
                    Мижоз:{" "}
                  </span>
                  <span className="inline-block rounded-md border bg-gray-200 p-1 font-medium">
                    {tradeHistoryData.client.name
                      ? tradeHistoryData.client.name
                      : "Mijoz"}
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  className="text-xs font-medium text-black md:text-base"
                >
                  <span className="text-sm font-normal text-gray-700">
                    Савдо санаси:{" "}
                  </span>
                  {moment(tradeHistoryData.createdAt).format("L")}
                </Typography>
              </div>

              <ul className="flex items-start gap-10 p-3">
                <li>
                  <span
                    className={`text-lg font-medium leading-normal text-gray-900`}
                  >
                    {numeral(tradeHistoryData.tradeSumm).format("0,0")}
                    <span className="ml-1 text-xs font-medium leading-tight text-gray-400">
                      {language == "kiril" ? "so'm" : "so'm"}
                    </span>
                  </span>
                  <span className="block text-xs font-medium leading-tight text-gray-400">
                    {language == "kiril" ? "Савдо суммаси" : "Savdo summasi"}
                  </span>
                </li>
                <li>
                  <span
                    className={`${
                      tradeHistoryData.tradeSumm >
                      tradeHistoryData.summaFromClient
                        ? "text-red-600"
                        : "text-green-600"
                    }  text-lg font-medium leading-normal text-gray-900`}
                  >
                    {numeral(tradeHistoryData.summaFromClient).format("0,0")}
                    <span className="ml-1 text-xs font-medium leading-tight text-gray-400">
                      {language == "kiril" ? "so'm" : "so'm"}
                    </span>
                  </span>
                  <span className="block text-xs font-medium leading-tight text-gray-400">
                    {language == "kiril" ? "Тўланган сумма" : "To'langan summa"}
                  </span>
                </li>
              </ul>
            </div>

            {tradeHistoryData !== null && (
              <TradeTableView data={tradeHistoryData.tradeHistory} />
            )}
          </Card>
        )}
        <div className="text-right">
          <Button
            onClick={cencelProductHandler}
            color="red"
            className="mt-6 mr-auto"
          >
            {language == "kiril"
              ? "Савдони бекор қилиш"
              : "Savdoni bekor qilish"}
          </Button>
        </div>
      </div>
    )
  );
}

export default TradeHistoryView;
