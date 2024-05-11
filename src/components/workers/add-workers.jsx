import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  workerRegisterError,
  workerRegisterStart,
  workerRegisterSuccses,
} from "@/reduser/workers-reducer";
import { WorkerService } from "@/services";
import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkerForm from "./worker-form";

function AddWorkers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading } = useSelector((state) => state.workers);
  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
    password: "",
    isAdmin: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(workerRegisterStart());
    try {
      const { data } = await WorkerService.registerWorker(formData);
      dispatch(workerRegisterSuccses());
      dispatch(showAlertMessage(data));
      navigate(-1);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(workerRegisterError());
    }
  };

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isloading}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Ходим қўшиш" : "Xodim qo'shish"}
      </Typography>
      <WorkerForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default AddWorkers;
