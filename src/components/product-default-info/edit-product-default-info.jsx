import {
  productDefoultInfoError,
  productDefoultInfoStart,
  productDefoultInfoSuccses,
} from "@/reduser/product-default-info-reducer";
import { ProductDefaultInfoService } from "@/services";
import { BasisAddElement } from "@/ui";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductDefaultInfoForm from "./product-default-info-form";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";

function EditProductDefaultInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isloading } = useSelector((state) => state.productDefaultInfo);
  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    name: "",
    thickness: "",
    priceWholesale: "",
    priceRetail: "",
  });

  // productni id bilan get qilish
  const getProdouctDefaultInfoWithId = async () => {
    try {
      const { data } =
        await ProductDefaultInfoService.getOneProductDefaultIngoWithId(id);
      setFormData(data.product);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      navigate("/dashboard/maxsulotlar");
    }
  };

  // yangilangan malumotlarni bazaga qaytarish
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(productDefoultInfoStart());

    // Ma'lumotlarni tekshirish va trim() qilish
    const trimmedFormData = Object.keys(formData).reduce((acc, key) => {
      // Agar formData[key] bir string bo'lmasa yoki undefined bo'lsa, acc[key] ga avvalgi qiymatni qo'shamiz
      acc[key] =
        typeof formData[key] === "string"
          ? formData[key].toString().trim()
          : formData[key];
      return acc;
    }, {});

    try {
      const { data } = await ProductDefaultInfoService.updadeProductDefaultInfo(
        id,
        trimmedFormData
      );
      dispatch(productDefoultInfoSuccses());
      dispatch(showAlertMessage(data));
      navigate(-1);
    } catch (error) {
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
      dispatch(productDefoultInfoError());
    }
  };

  useEffect(() => {
    getProdouctDefaultInfoWithId();
  }, [id]);

  return (
    <BasisAddElement onClickFunc={handleSubmit} isloading={isloading}>
      <Typography variant="h4" className="mb-4 text-center">
        {language == "kiril" ? "Махсулот ўзгартириш" : "Maxsulot o'zgartirish"}
      </Typography>
      <ProductDefaultInfoForm formData={formData} setFormData={setFormData} />
    </BasisAddElement>
  );
}

export default EditProductDefaultInfo;
