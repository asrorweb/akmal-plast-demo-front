import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ListBulletIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { GrUserWorker } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { DiDatabase } from "react-icons/di";
import { FaHistory } from "react-icons/fa";

import {
  Home,
  Trade,
  Workers,
  Profile,
  ProductDefaultInfo,
  ProductManufactured,
  ProductBaseSee,
  Client,
  TradeHistory,
} from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import {
  AddClients,
  AddProduct,
  AddWorkers,
  ClientTradeHistoryView,
  EditClients,
  EditProductDefaultInfo,
  EditWorker,
  ProductBaseSeeInfo,
  TradeHistoryView,
} from "./components";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Статистика",
        nameuz: "dashboard",
        path: "/home",
        element: <Home />,
        main: true,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Савдо",
        nameuz: "savdo",
        path: "/savdo",
        main: true,
        element: <Trade />,
        main: true,
      },
      {
        icon: <ListBulletIcon {...icon} />,
        name: "махсулотлар",
        nameuz: "maxsulotlar",
        path: "/maxsulotlar",
        element: <ProductDefaultInfo />,
        main: true,
      },
      {
        icon: <DiDatabase {...icon} />,
        name: "Омбор",
        nameuz: "Ombor",
        path: "/ombor",
        element: <ProductBaseSee />,
        main: true,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Клент",
        nameuz: "Klent",
        path: "/klent",
        element: <Client />,
        main: true,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "махсулот oмбор қўшиш",
        nameuz: "maxsulot ombor qo'shish",
        path: "/omborga-maxsulot-qoshish",
        element: <ProductManufactured />,
        main: true,
      },
      {
        icon: <GrUserWorker {...icon} />,
        name: "Ходим",
        nameuz: "Xodim",
        path: "/xodim",
        element: <Workers />,
        main: true,
      },
      {
        icon: <FaHistory {...icon} />,
        name: "Савдо тарихи",
        nameuz: "Savdo tarixi",
        path: "/savdo-tarixi",
        element: <TradeHistory />,
        main: true,
      },

      {
        icon: <CiUser {...icon} />,
        name: "Профил",
        nameuz: "Profil",
        path: "/profile",
        element: <Profile />,
        main: true,
      },

      // sub navigation
      {
        name: "Махсулот-қўшиш",
        nameuz: "Maxsulot-qo'shish",
        path: "/maxsulotlar/add-product",
        element: <AddProduct />,
        main: false,
      },
      {
        name: "Клент қўшиш",
        nameuz: "Klent qo'shish",
        path: "/klent/add-product",
        element: <AddClients />,
        main: false,
      },
      {
        name: "Клент edit",
        nameuz: "Klent edit",
        path: "/klent/edit-product/:id",
        element: <EditClients />,
        main: false,
      },
      {
        name: "Клент view",
        nameuz: "Klent view",
        path: "/klent/savdo-tarixi/:id",
        element: <ClientTradeHistoryView />,
        main: false,
      },
      {
        name: "Ходим-қўшиш",
        nameuz: "Xodim-qo'shish",
        path: "/xodim/add-workers",
        element: <AddWorkers />,
        main: false,
      },
      {
        name: "Ходимни-янгилаш",
        nameuz: "Xodimni-yangilash",
        path: "/xodim/edit-workers/:id",
        element: <EditWorker />,
        main: false,
      },
      {
        name: "Махсулотни-янгилаш",
        nameuz: "Maxsulotni-yangilash",
        path: "/maxsulotlar/edit-product-default/:id",
        element: <EditProductDefaultInfo />,
        main: false,
      },
      {
        name: "ombordagi-maxsulot",
        nameuz: "ombordagi-maxsulot",
        path: "/ombor/maxsulot/:id",
        element: <ProductBaseSeeInfo />,
        main: false,
      },
      {
        name: "savdo",
        nameuz: "savdo",
        path: "/savdo-tarixi/:id",
        element: <TradeHistoryView />,
        main: false,
      },
    ],
  },

  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        main: true,
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
