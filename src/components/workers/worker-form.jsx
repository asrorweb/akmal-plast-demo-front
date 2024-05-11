import { Checkbox, Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function WorkerForm({ formData, setFormData }) {
  const { language } = useSelector((state) => state.language);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <Input
        required
        label={language == "kiril" ? "Ходим исми" : "Xodim ismi"}
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        required
        label={language == "kiril" ? "Номер" : "Nomer"}
        // label="Nomer"
        name="phone"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <Input
        required
        label={language == "kiril" ? "Парол" : "Parol"}
        // label="Parol"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <span className="flex items-center gap-1">
        <label htmlFor="isAdmin" className="text-gray-800">
          {language == "kiril" ? "Админ" : "Admin"}
        </label>
        <Checkbox
          name="isAdmin"
          id="isAdmin"
          color="blue"
          checked={formData.isAdmin}
          onChange={(e) => handleChange("isAdmin", e.target.checked)}
        />
      </span>
    </div>
  );
}

export default WorkerForm;
