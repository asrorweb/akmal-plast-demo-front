import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  addClientInfo,
  addInfoToSaleKash,
  getAllProductsFromBaseForTradeError,
  getAllProductsFromBaseForTradeStart,
  getAllProductsFromBaseForTradeSuccess,
  selectIdChange,
  updateAllProductAndPushSaleKashToSaleBasket,
} from "@/reduser/trade-reducer";
import { ManufacturedProductService } from "@/services";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

function ProductSelectTrade() {
  const {
    allProoducts,
    selectedProduct,
    selectId,
    selectProductOptionData,
    selectMaterProductOptionData,
    saleKash,
    isRegularClient,
  } = useSelector((state) => state.trade);

  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectMeter, setSelectMeter] = useState(null);

  const getAllProductFromBase = async () => {
    dispatch(getAllProductsFromBaseForTradeStart());

    try {
      const { data } = await ManufacturedProductService.getAllProductFromBase();
      dispatch(getAllProductsFromBaseForTradeSuccess(data));
    } catch (error) {
      dispatch(getAllProductsFromBaseForTradeError());
    }
  };

  useEffect(() => {
    dispatch(addClientInfo({ name: "", number: "" }));
    setSelectMeter(null);
    setSelectedOption(null);
    getAllProductFromBase();
  }, [isRegularClient]);

  const selectIdHandler = (e) => {
    dispatch(selectIdChange(e.value));
    setSelectedOption(e);
  };

  const selectMaterProductHandler = (e) => {
    dispatch(addInfoToSaleKash({ saleId: e.value }));
    setSelectMeter(e);
  };

  const changeSalePriceHandler = (e) => {
    dispatch(addInfoToSaleKash({ salePrice: Number(e.target.value) }));
  };

  const changeSaleMaterHandler = (e) =>
    dispatch(
      addInfoToSaleKash({ saleMater: Math.abs(Number(e.target.value)) })
    );

  const addTradeProductToSaleBasketHandler = () => {
    if (!saleKash || !selectedProduct?.quantity) {
      const err = {
        message: "Малумотларни тўлиқ танланмади",
        messageUz: "Malumotlarni to'liq tanlanmadi",
      };

      return (
        dispatch(showAlertMessage(err)), dispatch(showAlertMessageColor("red"))
      );
    }

    const { salePrice, saleId, saleMater } = saleKash;

    if (!selectId || !salePrice || !saleId || !saleMater) {
      const err = {
        message: "Малумотларни тўлиқ танланмади",
        messageUz: "Malumotlarni to'liq tanlanmadi",
      };
      return (
        dispatch(showAlertMessage(err)), dispatch(showAlertMessageColor("red"))
      );
    }

    // O'zgartirish uchun yangi ma'lumot
    const subObjectIndexToUpdate = selectedProduct.quantity.findIndex(
      (obj) => obj._id === saleId
    );

    if (subObjectIndexToUpdate == -1) {
      const err = {
        message: "Махсулот топилмади саҳифани янгиланг",
        messageUz: "Maxsulot topilmadi sahifani yangilang",
      };

      return (
        dispatch(showAlertMessage(err)),
        dispatch(showAlertMessageColor("yellow"))
      );
    }

    // Arrayni o'zgartirish
    const updatedSubObjects = [...selectedProduct.quantity];

    if (updatedSubObjects[subObjectIndexToUpdate].meter - saleMater < 0) {
      const err = {
        message: "Киритилган метр котта",
        messageUz: "Kiritilgan metr kotta",
      };

      return (
        dispatch(showAlertMessage(err)),
        dispatch(showAlertMessageColor("yellow"))
      );
    }

    updatedSubObjects[subObjectIndexToUpdate] = {
      ...updatedSubObjects[subObjectIndexToUpdate],
      meter: updatedSubObjects[subObjectIndexToUpdate].meter - saleMater,
    };

    // Yangi obyektni yangi arrayga joylashtirish
    const updatedObject = {
      ...selectedProduct,
      quantity: updatedSubObjects,
    };

    const newFilterArrayAllProduct = allProoducts.filter(
      (product) => product._id !== selectId
    );

    const updateAllProducts = [...newFilterArrayAllProduct, updatedObject];

    dispatch(updateAllProductAndPushSaleKashToSaleBasket(updateAllProducts));
    setSelectMeter(null);
    setSelectedOption(null);
  };

  return (
    selectProductOptionData !== null && (
      <div className="mb-6 rounded-lg  bg-white p-6">
        <div className="mb-6 grid grid-cols-1 gap-4  md:grid-cols-3 lg:grid-cols-4">
          <Select
            value={selectedOption}
            onChange={selectIdHandler}
            options={selectProductOptionData}
            placeholder={
              language == "kiril" ? "Махсулот тури" : "Maxsulot turi"
            }
          />

          <Select
            value={selectMeter}
            onChange={selectMaterProductHandler}
            options={selectMaterProductOptionData}
            placeholder={
              language == "kiril" ? "Нечи метрлигидан" : "Nechi metrligidan"
            }
            isDisabled={!selectId}
          />

          <Input
            type="number"
            value={saleKash && saleKash.saleMater ? saleKash.saleMater : ""}
            onChange={changeSaleMaterHandler}
            label={
              language == "kiril"
                ? "Неча метр кераклиги"
                : "Necha metr kerakligi"
            }
            disabled={!selectId}
          />
          <Input
            type="number"
            defaultValue={saleKash ? saleKash.salePrice : ""}
            onChange={changeSalePriceHandler}
            label={language == "kiril" ? "Махсулот нархи" : "Maxsulot narxi"}
            disabled={!selectId}
          />
        </div>

        <Button
          onClick={addTradeProductToSaleBasketHandler}
          className="ml-auto block"
        >
          {language == "kiril" ? "Қўшиш" : "Qo'shish"}
        </Button>
      </div>
    )
  );
}

export default ProductSelectTrade;
