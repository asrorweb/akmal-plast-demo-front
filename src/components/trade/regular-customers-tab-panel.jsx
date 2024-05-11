import { addClientInfo } from "@/reduser/trade-reducer";
import ClientService from "@/services/client-service";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

function RegularCustomersTabPanel() {
  const dispatch = useDispatch();
  const { clientInformation, isRegularClient } = useSelector(
    (state) => state.trade
  );
  const { language } = useSelector((state) => state.language);

  const [selectOptionData, setSelectOptionData] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const getAllClients = async () => {
    try {
      const { data } = await ClientService.getAllClient();

      const optionsData = data.map((item) => ({
        value: item.number,
        label: item.name,
      }));

      setSelectOptionData(optionsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClients();
    setSelectedClient(null);
  }, [isRegularClient]);

  const selectClientHandler = (e) => {
    setSelectedClient(e);
    dispatch(addClientInfo({ name: e.label, number: e.value }));
  };

  return (
    <div className="rounded-lg bg-white px-6 pt-5 pb-8">
      <Typography variant="h6" className="mb-4">
        {language == "kiril"
          ? "Клент малумотларини олиш"
          : "Klent malumotlarini olish"}
      </Typography>
      <div className="grid w-full flex-col items-center gap-5 sm:max-w-lg sm:grid-cols-2 sm:flex-row">
        <Select
          value={selectedClient}
          onChange={selectClientHandler}
          options={selectOptionData}
          placeholder={
            language == "kiril" ? "Клентни танлаш" : "Klentni tanlash"
          }
          className="font-normal"
        />
        <Typography className="text-lg font-normal">
          {clientInformation.number}
        </Typography>
      </div>
    </div>
  );
}

export default RegularCustomersTabPanel;
