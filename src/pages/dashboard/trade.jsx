import {
  CustomersTabPanel,
  ProductSelectTrade,
  RegularCustomersTabPanel,
  TradeFooter,
} from "@/components";
import { changeIsRegularClient } from "@/reduser/trade-reducer";
import { TradeTableView } from "@/ui";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

export function Trade() {
  const dispatch = useDispatch();
  const { isRegularClient, saleBasket } = useSelector((state) => state.trade);
  const { language } = useSelector((state) => state.language);

  const clientTabPanelHandler = () => dispatch(changeIsRegularClient(false));

  const regularClientTabPanelHandler = () =>
    dispatch(changeIsRegularClient(true));

  return (
    <div className="relative mt-6  md:min-h-[120vh]">
      <Tabs
        id="custom-animation"
        value={isRegularClient ? "regular_customer" : "customer"}
        className="mb-8 !overflow-visible"
      >
        <TabsHeader className="max-w-md bg-white shadow">
          <Tab onClick={clientTabPanelHandler} value="customer">
            {language == "kiril" ? "Клентлар" : "Klentlar"}
          </Tab>
          <Tab onClick={regularClientTabPanelHandler} value="regular_customer">
            {language == "kiril" ? "Доимий Клентлар" : "Doimiy Klentlar"}
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 0 },
            mount: { y: 0 },
            unmount: { y: 50 },
          }}
          className="!overflow-visible"
        >
          {/* for client */}
          <TabPanel value="customer">
            <CustomersTabPanel />
          </TabPanel>

          {/* for regular client */}
          <TabPanel value="regular_customer">
            <RegularCustomersTabPanel />
          </TabPanel>
        </TabsBody>
      </Tabs>

      <div className="px-4">
        <ProductSelectTrade />
        <TradeTableView data={saleBasket} />
        <TradeFooter />
      </div>
    </div>
  );
}

export default Trade;
