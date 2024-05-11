import { Button, Typography } from "@material-tailwind/react";
import { GoX } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  deleteElementEror,
  deleteElementStart,
  deleteElementSuccses,
  hideDeleteModal,
} from "@/reduser/delete-modal-reducer";
import { DeleteElementService } from "@/services";
import { Loader } from ".";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";

function ModalDeleteQuest() {
  const { isShow, deleteData, isloading } = useSelector(
    (state) => state.deleteElement
  );
  const dispatch = useDispatch();

  const deleteWorkerHandler = async () => {
    const { id, path } = deleteData;

    const alertMessage = {
      message: "Муаффақиятли ўчирилди",
      messageUz: "Muaffaqiyatli o'chirildi",
    };

    dispatch(deleteElementStart());
    try {
      await DeleteElementService.deleteElement(id, path);
      dispatch(deleteElementSuccses());
      dispatch(hideDeleteModal());
      dispatch(showAlertMessage(alertMessage));
    } catch (error) {
      const { response } = error;
      dispatch(deleteElementEror());
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(hideDeleteModal());
    }
  };

  const closeDeleteModal = () => {
    dispatch(hideDeleteModal());
  };

  const backdropClickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeDeleteModal();
    }
  };

  return (
    deleteData !== null && (
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
            className="mb-6 flex items-center gap-3 text-2xl font-semibold"
          >
            <FiTrash2 className="h-8 w-8 text-[#F44336]" />
            <span>
              <Typography variant="h5" className="text-xl ">
                <span className="capitalize">
                  {deleteData.name.slice(0, 10)}
                </span>{" "}
                ni o'chirish
              </Typography>
              <Typography className="text-xs">
                <span className="capitalize">
                  {deleteData.name.slice(0, 10)}
                </span>
                ni o'chirishga tayyormisiz
              </Typography>
            </span>
          </Typography>

          <span className="flex items-center justify-end gap-2">
            <Button
              onClick={closeDeleteModal}
              className="bg-gray-200  text-black"
              variant="text"
            >
              Cancel
            </Button>
            <Button onClick={deleteWorkerHandler} color="red">
              {isloading ? <Loader color="white" /> : "Delete"}
            </Button>
          </span>
        </motion.div>
      </motion.div>
    )
  );
}

export default ModalDeleteQuest;
