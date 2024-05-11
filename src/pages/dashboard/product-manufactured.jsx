import { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllProductDefoultInfoError,
  getAllProductDefoultInfoStart,
  getAllProductDefoultInfoSuccses,
} from "@/reduser/product-default-info-reducer";
import {
  ManufacturedProductService,
  ProductDefaultInfoService,
} from "@/services";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import { ProductManufacturedTable } from "@/components";
import {
  addProductToBaseError,
  addProductToBaseStart,
  addProductToBaseSuccses,
} from "@/reduser/add-manufactured";
import Select from "react-select";
import { Loader } from "@/ui";

export function ProductManufactured() {
  const { language } = useSelector((state) => state.language);

  const { productDefoultInfoSelectOptions } = useSelector(
    (state) => state.productDefaultInfo
  );

  const { isloading } = useSelector((state) => state.manufactured);

  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState("");
  const [inputMeter, setInputMeter] = useState("");

  // select uchun
  const getAllProductDefaultInfo = async () => {
    dispatch(getAllProductDefoultInfoStart());

    try {
      const { data } =
        await ProductDefaultInfoService.getAllProductDefaultInfo();
      dispatch(getAllProductDefoultInfoSuccses(data));
    } catch (error) {
      const { response } = error;
      dispatch(getAllProductDefoultInfoError());
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
    }
  };

  const addProductToBaseHandler = async (e) => {
    dispatch(addProductToBaseStart());
    try {
      const { data } =
        await ManufacturedProductService.addProductManufacturedHistoryAndBase(
          selectId,
          { meter: inputMeter }
        );

      dispatch(addProductToBaseSuccses());
      dispatch(showAlertMessage(data));
      setInputMeter("");
      setSelectId("");
    } catch (error) {
      dispatch(addProductToBaseError());
      const { response } = error;
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
    }
  };

  useEffect(() => {
    getAllProductDefaultInfo();
  }, []);

  const handleSelectChange = (event) => {
    setSelectId(event.value);
  };

  const handleInputChange = (event) => {
    setInputMeter(event.target.value);
  };

  return (
    <div className="mx-auto my-12">
      <div className="mb-8 rounded-xl bg-gray-50 p-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:p-8">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-xl">
          <Typography
            variant="h5"
            className="mb-3 text-center font-normal md:text-2xl"
          >
            {language == "kiril"
              ? "Ишлаб чиқарилган махсулот қўшиш"
              : "Ishlab chiqarilgan maxsulot qo'shish"}
          </Typography>

          <Select
            options={productDefoultInfoSelectOptions}
            onChange={handleSelectChange}
            placeholder={
              language == "kiril"
                ? "Махсулот турини танланг"
                : "Maxsulot turini tanlang"
            }
          />

          <Input
            type="number"
            color="blue"
            size="lg"
            label={
              language == "kiril"
                ? "Метр(м) ини киритинг..."
                : "Metr(m) ini kiriting..."
            }
            className="text-lg placeholder:text-lg"
            onChange={handleInputChange}
            value={inputMeter}
          />
          <Button onClick={addProductToBaseHandler}>
            {isloading ? (
              <Loader color="white" className="mx-auto inline-block" />
            ) : language == "kiril" ? (
              "Қўшиш"
            ) : (
              "Qo'shish"
            )}
          </Button>
        </div>
      </div>

      <ProductManufacturedTable />
    </div>
  );
}

export default ProductManufactured;
