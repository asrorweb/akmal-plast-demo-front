import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  clearAllTradeData,
  showTradeModal,
  summFromClientChange,
} from "@/reduser/trade-reducer";
import TradeService from "@/services/trade-service";
import { Button, Typography } from "@material-tailwind/react";
import numeral from "numeral";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";

function TradeFooter() {
  const { tradeSumm } = useSelector((state) => state.trade);
  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const summaFromClientHandler = (value, name, values) => {
    dispatch(summFromClientChange(values.float));
  };

  const checkTradeHandler = () => {
    dispatch(showTradeModal());
  };

  const cancelTradeHandlar = async () => {
    const mess = {
      message: "Савдо бекор қилинди",
      messageUz: "Savdo bekor qilindi",
    };

    dispatch(clearAllTradeData());
    dispatch(showAlertMessage(mess));
  };

  return (
    <div className="glasses-effect relative z-40 mt-7 flex flex-col justify-end gap-3 rounded-xl p-4 md:fixed md:left-8 md:right-8 md:bottom-8 md:flex-row md:items-center xl:left-80">
      <Typography variant="h5" className="flex items-center gap-3">
        <span className="whitespace-nowrap text-base font-normal">
          {language == "kiril" ? "Жами Сумма" : "Jami Summa"}:
        </span>
        <span>{numeral(tradeSumm).format("0,0")}</span>
      </Typography>
      <div className="md:max-w-xs">
        <CurrencyInput
          id="input-example"
          name="input-name"
          placeholder={
            language == "kiril" ? "Клент берган сумма" : "Klent bergan summa"
          }
          decimalsLimit={3}
          onValueChange={summaFromClientHandler}
          className="w-full rounded-md border-2 border-gray-500 p-2  font-medium focus:border-blue-600 focus:outline-none md:text-xl"
        />
      </div>
      <Button onClick={cancelTradeHandlar} color="red" className="md:text-base">
        {language == "kiril" ? "Бекор қилиш" : " Bekor qilish"}
      </Button>
      <Button
        onClick={checkTradeHandler}
        color="green"
        className="md:text-base"
      >
        {language == "kiril" ? "Сотиш" : "Sotish"}
      </Button>
    </div>
  );
}

export default TradeFooter;
