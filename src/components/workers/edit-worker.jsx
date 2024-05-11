import {
  workerUpdateError,
  workerUpdateStart,
  workerUpdateSuccses,
} from "@/reduser/workers-reducer";
import { WorkerService } from "@/services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import WorkerForm from "./worker-form";
import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";

function EditWorker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isloading } = useSelector((state) => state.workers);
  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    isAdmin: false,
  });

  const getWorkerWithId = async () => {
    try {
      const { data } = await WorkerService.getWorkerWithId(id);
      setFormData(data.user);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(workerUpdateError());
      navigate("/dashboard/xodim");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(workerUpdateStart());
    try {
      const { data } = await WorkerService.updateWorker(id, formData);
      dispatch(workerUpdateSuccses());
      dispatch(showAlertMessage(data));
      navigate(-1);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(workerUpdateError());
    }
  };

  useEffect(() => {
    getWorkerWithId();
  }, [id]);

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isloading}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Ходимни янгилаш" : "Xodimni yangilash"}
      </Typography>
      <WorkerForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default EditWorker;
