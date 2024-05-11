import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductDefaultInfoForm from "./product-default-info-form";
import { ProductDefaultInfoService } from "@/services";
import {
  createProductDefaultInfoError,
  createProductDefaultInfoStart,
  createProductDefaultInfoSuccses,
} from "@/reduser/product-default-info-reducer";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";

function AddProduct() {
  const { isloading } = useSelector((state) => state.productDefaultInfo);
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    thickness: "",
    priceWholesale: "",
    priceRetail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Malumotlarni trim() qilish
    const trimmedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim();
      return acc;
    }, {});

    dispatch(createProductDefaultInfoStart());
    try {
      const { data } = await ProductDefaultInfoService.addProductDefaultInfo(
        trimmedFormData
      );
      dispatch(createProductDefaultInfoSuccses());
      dispatch(showAlertMessage(data));
      navigate(-1);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(createProductDefaultInfoError());
    }
  };

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isloading}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Махсулот қўшиш" : "Maxsulot qo'shish"}
      </Typography>
      <ProductDefaultInfoForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default AddProduct;
