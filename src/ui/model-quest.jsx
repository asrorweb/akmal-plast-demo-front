import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { GoX } from "react-icons/go";
import { Button, Typography } from "@material-tailwind/react";
import { hideModalQuest } from "@/reduser/model-quest-reduer";
import { TbBasketCancel } from "react-icons/tb";
import TradeService from "@/services/trade-service";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";
import { useState } from "react";

function ModelQuest() {
  const { language } = useSelector((state) => state.language);
  const { isShow, id } = useSelector((state) => state.modal);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cancelTradeHandler = async () => {
    setLoader(true);
    try {
      const { data } = await TradeService.cencelTrade(id);
      setLoader(false);
      dispatch(showAlertMessage(data));
    } catch (error) {
      const { response } = error;
      setLoader(false);
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
    }
    dispatch(hideModalQuest());
    navigate(-1);
  };

  const closeDeleteModal = () => {
    dispatch(hideModalQuest());
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
          <TbBasketCancel className="h-10 w-10 text-red-500" />
          {language == "kiril"
            ? "Савдони бекор қилишга тайёрмисиз"
            : "Savdoni bekor qilishga tayyormisiz"}
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
          <Button onClick={cancelTradeHandler} size="md" color="red">
            {loader ? (
              <Loader color="white" />
            ) : language == "kiril" ? (
              "Бекор қилиш"
            ) : (
              "Bekor qilish"
            )}
          </Button>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default ModelQuest;
