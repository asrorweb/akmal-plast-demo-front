import { TradeTableView } from "@/ui";
import { Card } from "@material-tailwind/react";
import moment from "moment";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function ClientTradeHistCard({ data }) {
  const { language } = useSelector((state) => state.language);
  const { tradeHistory, tradeSumm, summaFromClient, createdAt } = data;

  return (
    <div className="py-5 px-2 md:p-7">
      <span className="block text-center">
        {moment(createdAt).format("LLL")}
      </span>
      <Card className="p-2">
        <ul className="flex items-start gap-10 p-3">
          <li>
            <span
              className={`text-base font-medium leading-normal text-gray-900`}
            >
              {numeral(tradeSumm).format("0,0")}
              <span className="ml-1 text-xs font-medium leading-tight text-gray-400">
                {language == "kiril" ? "so'm" : "so'm"}
              </span>
            </span>
            <span className="block pl-2 text-xs font-medium leading-tight text-gray-400">
              {language == "kiril" ? "Савдо суммаси" : "Savdo summasi"}
            </span>
          </li>
          <li>
            <span
              className={`${
                tradeSumm > summaFromClient ? "text-red-600" : "text-green-600"
              }  text-base font-medium leading-normal text-gray-900`}
            >
              {numeral(summaFromClient).format("0,0")}
              <span className="ml-1 text-xs font-medium leading-tight text-gray-400">
                {language == "kiril" ? "so'm" : "so'm"}
              </span>
            </span>
            <span className="block pl-2 text-xs font-medium leading-tight text-gray-400">
              {language == "kiril" ? "Тўланган сумма" : "To'langan summa"}
            </span>
          </li>
        </ul>

        <TradeTableView data={tradeHistory} />
      </Card>
    </div>
  );
}

export default ClientTradeHistCard;
