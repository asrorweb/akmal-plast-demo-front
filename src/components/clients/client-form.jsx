import { Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function ClientForm({ formData, setFormData }) {
  const { language } = useSelector((state) => state.language);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <Input
        required
        label={language == "kiril" ? "Клент исми" : "Klent ismi"}
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        required
        label={language == "kiril" ? "Номер" : "Nomer"}
        // label="Nomer"
        name="number"
        value={formData.number}
        onChange={(e) => handleChange("number", e.target.value)}
      />
      <Input
        required
        label={language == "kiril" ? "Аддресс" : "Address"}
        name="address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <Input
        required
        label={language == "kiril" ? "Баланcе" : "Balance"}
        name="totalBalance"
        value={formData.totalBalance}
        onChange={(e) => handleChange("totalBalance", e.target.value)}
        type="number"
      />
    </div>
  );
}

export default ClientForm;
