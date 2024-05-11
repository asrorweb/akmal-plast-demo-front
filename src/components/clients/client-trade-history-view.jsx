import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import ClientService from "@/services/client-service";
import { ButtonBack } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
import ClientTradeHistCard from "./client-trade-hist-card";
import { v4 as uuidv4 } from "uuid";

function ClientTradeHistoryView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientData, setClientData] = useState([]);

  const getClientWithId = async () => {
    try {
      const { data } = await ClientService.getClientWithId(id);
      setClientData(data.client);
      console.log(data.client);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      // dispatch(workerUpdateError());
      navigate(-1);
    }
  };

  useEffect(() => {
    getClientWithId();
  }, [id]);

  return (
    clientData.length !== 0 && (
      <div className="relative px-2">
        <ButtonBack className="-top-12" />
        <Card className="mt-16 mb-10 grid grid-cols-4 items-center gap-6 px-4 py-6">
          <Typography className="text-lg font-bold capitalize text-[#22343D] md:text-[32px]">
            {clientData?.name}
          </Typography>
          <div className="flex items-center gap-3">
            <GiMoneyStack className="h-12 w-12 text-green-600" />
            <div>
              <span
                className={`${
                  clientData?.totalBalance >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } text-xl font-semibold`}
              >
                {numeral(clientData?.totalBalance).format("0,0")}
              </span>
              <span className="block text-xs font-medium leading-tight text-gray-400">
                {clientData?.totalBalance >= 0 ? "Ҳақдор" : "Қарздор"}
              </span>
            </div>
          </div>
        </Card>

        <div className="h-[70vh] overflow-y-scroll rounded-lg border border-gray-300 bg-inherit">
          {clientData?.tradeHistory?.map((el) => (
            <ClientTradeHistCard key={uuidv4()} data={el} />
          ))}
        </div>
      </div>
    )
  );
}

export default ClientTradeHistoryView;
