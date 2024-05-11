import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { GoX } from "react-icons/go";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  clearAllTradeData,
  hideTradeModal,
  isLoadingTradesError,
  isLoadingTradesStart,
  isLoadingTradesSuccses,
  showTradeModal,
} from "@/reduser/trade-reducer";
import TradeService from "@/services/trade-service";
import { Button, Typography } from "@material-tailwind/react";
import { AiOutlineDollar } from "react-icons/ai";
import numeral from "numeral";
import { Loader } from ".";

function ModalTradeQuest() {
  const {
    isShow,
    tradeSumm,
    isRegularClient,
    saleBasket,
    summaFromClient,
    clientInformation,
    isLoadingTrades,
  } = useSelector((state) => state.trade);
  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const SellTradeHandlar = async () => {
    dispatch(isLoadingTradesStart());

    const data = {
      tradeSumm,
      saleBasket,
      summaFromClient,
      clientInformation,
      isRegularClient,
    };

    const alertMessage = {
      message: "Сотув муаффақиятли амалга оширилди",
      messageUz: "Sotuv muaffaqiyatli amalga oshirildi",
    };

    try {
      const sellProd = await TradeService.sellProducts(data);
      console.log("sellProd", sellProd);
      dispatch(isLoadingTradesSuccses());

      dispatch(clearAllTradeData());
      dispatch(showAlertMessage(alertMessage));
    } catch (error) {
      const { response } = error;
      dispatch(isLoadingTradesError());
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("red"));
    }
    dispatch(hideTradeModal());
  };

  const closeDeleteModal = () => {
    dispatch(hideTradeModal());
  };

  const backdropClickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeDeleteModal();
    }
  };

  return (
    <motion.div
      initial={{ visibility: "hidden" }}
      animate={{
        visibility: isShow ? "visible" : "hidden",
      }}
      className={`fixed z-[1000]  flex min-h-screen w-full items-center justify-center bg-[#93949843] px-3 sm:px-0`}
      onClick={backdropClickHandler}
    >
      <motion.div
        initial={{ scale: 0, y: 500 }}
        animate={{
          opacity: isShow ? 1 : 0,
          y: isShow ? 0 : 500,
          scale: isShow ? 1 : 0,
          transitionDuration: 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-full max-w-sm rounded-xl bg-white p-4 shadow-2xl"
      >
        <GoX
          onClick={closeDeleteModal}
          className="absolute top-2 right-2 h-6 w-6 cursor-pointer text-gray-500 duration-200 hover:scale-125"
        />
        <Typography
          variant="h6"
          className="mb-6 flex items-center gap-4 text-2xl font-semibold"
        >
          <AiOutlineDollar className="h-8 w-8 text-[#388E3C]" />
          <span>
            <Typography variant="h5" className="text-xl">
              {language == "kiril"
                ? "Сотишни тасдиқлаш"
                : "Sotishni tasdiqlash"}
            </Typography>
            {language == "kiril" ? (
              <ul className="pl-3 pt-1 text-base font-normal">
                <li> Савдо суммаси = {numeral(tradeSumm).format("0,0")}</li>
                <li>Тўланган пул = {numeral(summaFromClient).format("0,0")}</li>
                <li>
                  Қолдиқ : {numeral(tradeSumm - summaFromClient).format("0,0")}
                </li>
              </ul>
            ) : (
              <ul className="pl-3 pt-1 text-base font-normal">
                <li> Savdo summasi = {numeral(tradeSumm).format("0,0")}</li>
                <li>
                  To'langan pul = {numeral(summaFromClient).format("0,0")}
                </li>
                <li>
                  Qoldiq : {numeral(tradeSumm - summaFromClient).format("0,0")}
                </li>
              </ul>
            )}
          </span>
        </Typography>

        <span className="flex items-center justify-end gap-2">
          <Button
            onClick={closeDeleteModal}
            className="bg-gray-200  text-black"
            variant="text"
            size="md"
          >
            Cancel
          </Button>
          <Button size="md" onClick={SellTradeHandlar} color="green">
            {isLoadingTrades ? (
              <Loader color="white" />
            ) : language == "kiril" ? (
              "Сотиш"
            ) : (
              "Sotish"
            )}
          </Button>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default ModalTradeQuest;
