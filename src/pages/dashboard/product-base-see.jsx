import { ProductBaseSeeList } from "@/components";
import {
  getAllProductsFromBaseError,
  getAllProductsFromBaseStart,
  getAllProductsFromBaseSuccses,
} from "@/reduser/product-base-reducer";
import { ManufacturedProductService } from "@/services";
import { Loader, PageHeader } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function ProductBaseSee() {
  const { isLoading, products } = useSelector((state) => state.base);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const getProductFromBase = async () => {
    dispatch(getAllProductsFromBaseStart());
    try {
      const { data } = await ManufacturedProductService.getAllProductFromBase();
      dispatch(getAllProductsFromBaseSuccses(data));
    } catch (error) {
      dispatch(getAllProductsFromBaseError());
    }
  };

  const searchProductFromBaseHandler = async () => {
    dispatch(getAllProductsFromBaseStart());
    try {
      console.log(name);
      const { data } = await ManufacturedProductService.searchProductFromBase(
        name
      );
      dispatch(getAllProductsFromBaseSuccses(data));
    } catch (error) {
      dispatch(getAllProductsFromBaseError());
    }
  };

  useEffect(() => {
    getProductFromBase();
  }, []);

  const handleInputChange = (e) => {
    setName(e.target.value); // `name` holatini yangilash
  };

  useEffect(() => {
    // Avtomatik qidirishni boshlash
    searchProductFromBaseHandler();
  }, [name]);

  return (
    <div className="dashboars-page mb-14">
      <PageHeader
        titleUz={"Ombor"}
        title={"Омбор"}
        btn={false}
        searchFunction={handleInputChange}
        data={name}
      />
      <Card className="p-2 shadow-none md:p-5">
        {isLoading ? (
          <Loader
            className="flex justify-center pt-8"
            width={40}
            height={40}
            color="#2C3940"
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {products?.map((data, i) => (
              <ProductBaseSeeList data={data} key={uuidv4()} index={i} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export default ProductBaseSee;
