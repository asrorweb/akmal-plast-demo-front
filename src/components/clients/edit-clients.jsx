import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import ClientForm from "./client-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientService from "@/services/client-service";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import { workerUpdateError } from "@/reduser/workers-reducer";
import {
  clientsError,
  clientsStart,
  clientsSuccses,
} from "@/reduser/client-reducer";

function EditClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoadingClient } = useSelector((state) => state.client);
  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });

  const getClientWithId = async () => {
    try {
      const { data } = await ClientService.getClientWithId(id);
      setFormData(data.client);
      console.log(data.client);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(workerUpdateError());
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clientsStart());
    try {
      const { data } = await ClientService.updateClient(id, formData);
      dispatch(clientsSuccses());
      dispatch(showAlertMessage(data));
      navigate(-1);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(clientsError());
    }
  };

  useEffect(() => {
    getClientWithId();
  }, [id]);

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isLoadingClient}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Клентни янгилаш" : "Klentni yangilash"}
      </Typography>
      <ClientForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default EditClients;
