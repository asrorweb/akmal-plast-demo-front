import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import { Alert } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AlertMessage() {
  const { alertMassage, color } = useSelector((state) => state.alertMassage);
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertMassage !== null) {
      setTimeout(() => {
        // 3 sekunddan so'ng xabarni yo'qolish
        dispatch(showAlertMessage(null));
        dispatch(showAlertMessageColor("green"));
      }, 2000);
    }
  }, [alertMassage]);

  return (
    alertMassage !== null && (
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={color}
        className="fixed top-2 right-2 z-[500] max-w-[70%] p-2 text-sm md:max-w-md"
        style={{
          animationDuration: "0.3s", // Animatsiya davomiyligi
          WebkitAnimationDuration: "0.3s",
        }} // iOS uchun
      >
        {language == "kiril" ? alertMassage?.message : alertMassage?.messageUz}
      </Alert>
    )
  );
}

export default AlertMessage;
