import { Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function ProductDefaultInfoForm({ formData, setFormData }) {
  const { language } = useSelector((state) => state.language);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <Input
        required={true}
        label={language == "kiril" ? "Махсулот номи" : "Maxsulot nomi"}
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        required={true}
        label={
          language == "kiril"
            ? "Махсулот қалинлиги mm"
            : "Maxsulot qalinligi mm"
        }
        type="number"
        name="thickness"
        value={formData.thickness}
        onChange={(e) => handleChange("thickness", e.target.value)}
      />
      <Input
        required={true}
        label={
          language == "kiril"
            ? "Махсулотнинг оптом нархи"
            : "Maxsulotning optom narxi"
        }
        type="number"
        name="priceWholesale"
        value={formData.priceWholesale}
        onChange={(e) => handleChange("priceWholesale", e.target.value)}
      />
      <Input
        required={true}
        label={
          language == "kiril"
            ? "Махсулотнинг чакана нархи"
            : "Maxsulotning chakana narxi"
        }
        type="number"
        name="priceRetail"
        value={formData.priceRetail}
        onChange={(e) => handleChange("priceRetail", e.target.value)}
      />
      {/* <span className="flex items-center gap-1">
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
        </span> */}
    </div>
  );
}

export default ProductDefaultInfoForm;
