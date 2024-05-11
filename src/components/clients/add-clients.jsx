import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import ClientForm from "./client-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClientService from "@/services/client-service";
import {
  clientsError,
  clientsStart,
  clientsSuccses,
} from "@/reduser/client-reducer";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";

function AddClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingClient } = useSelector((state) => state.client);
  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    name: "",
    number: "+998",
    address: "",
    totalBalance: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clientsStart());
    try {
      const { data } = await ClientService.createClient(formData);
      console.log("data", data);
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

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isLoadingClient}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Клент қўшиш" : "Klent qo'shish"}
      </Typography>
      <ClientForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default AddClients;
