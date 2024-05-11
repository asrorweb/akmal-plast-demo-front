import { configureStore } from "@reduxjs/toolkit";

// reducer
import AuthReducer from "../reduser/auth-reducer";
import ManufacturedReduser from "../reduser/add-manufactured";
import ChangeLanguageReducer from "../reduser/change-language";
import AlertMassageReducer from "../reduser/alert-message-reducer";
import WorkersReducer from "@/reduser/workers-reducer";
import DeleteElementReducer from "../reduser/delete-modal-reducer";
import ProductDefaultInfoReduser from "../reduser/product-default-info-reducer";
import ProductBaseReducer from "../reduser/product-base-reducer";
import ClientsReducer from "../reduser/client-reducer";
import TradeReducer from "../reduser/trade-reducer";
import TradeHistoryReducer from "../reduser/trade-history-reducer";
import ModalQuestUniversalReducer from "../reduser/model-quest-reduer";

export const store = configureStore({
  reducer: {
    manufactured: ManufacturedReduser,
    language: ChangeLanguageReducer,
    alertMassage: AlertMassageReducer,
    auth: AuthReducer,
    workers: WorkersReducer,
    deleteElement: DeleteElementReducer,
    productDefaultInfo: ProductDefaultInfoReduser,
    base: ProductBaseReducer,
    client: ClientsReducer,
    trade: TradeReducer,
    tradeHistory: TradeHistoryReducer,
    modal: ModalQuestUniversalReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
