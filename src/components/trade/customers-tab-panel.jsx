import { addClientInfo } from "@/reduser/trade-reducer";
import { Input, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

function CustomersTabPanel() {
  const dispatch = useDispatch();
  const { clientInformation } = useSelector((state) => state.trade);
  const { language } = useSelector((state) => state.language);

  const clientNameHandler = (e) => {
    dispatch(addClientInfo({ ...clientInformation, name: e.target.value }));
  };

  const clientNumberHandler = (e) => {
    dispatch(addClientInfo({ ...clientInformation, number: e.target.value }));
  };

  return (
    <div className="rounded-lg bg-white px-6 pt-5 pb-8 ">
      <Typography variant="h6" className="mb-4">
        {language == "kiril"
          ? "Клент малумотларини олиш"
          : "Klent malumotlarini olish"}
      </Typography>
      <div className="flex w-full flex-col items-center  gap-3 sm:max-w-2xl sm:flex-row">
        <Input
          value={clientInformation.name}
          onChange={clientNameHandler}
          size="lg"
          label={language == "kiril" ? "Клент исми" : "Klent ismi"}
        />
        <Input
          value={clientInformation.number}
          onChange={clientNumberHandler}
          size="lg"
          label={language == "kiril" ? "Клент номери" : "Klent nomeri"}
        />
      </div>
    </div>
  );
}

export default CustomersTabPanel;
