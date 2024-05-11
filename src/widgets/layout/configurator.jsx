import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";
import { useDispatch, useSelector } from "react-redux";
import { IoLanguage } from "react-icons/io5";
import { changeLanguageTo } from "@/reduser/change-language";
import { setItem } from "@/helpers/persistens-storage";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const { language } = useSelector((state) => state.language);
  const dispatchRedux = useDispatch();

  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;

  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  const changeLanguageHandler = (lang) => {
    dispatchRedux(changeLanguageTo(lang));
    setItem("language", lang);
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            {language == "kiril" ? "Созламалар" : "Sozlamalar"}
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            {language == "kiril"
              ? "Созламалар билан танишинг"
              : "Sozlamalar bilan tanishing"}
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="py-4 px-6">
        {/* for language */}
        <div className="mb-12">
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center gap-2"
          >
            <span>
              {language == "kiril" ? "Тилни ўзгартириш" : "Tilni o'zgartirish"}
            </span>{" "}
            <IoLanguage className="h-5 w-5" />
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              onClick={() => changeLanguageHandler("lotin")}
              variant={language == "kiril" ? "outlined" : "filled"}
            >
              Lotin
            </Button>
            <Button
              onClick={() => changeLanguageHandler("kiril")}
              variant={language !== "kiril" ? "outlined" : "filled"}
            >
              Кирил
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            {language == "kiril" ? "Мену ранги" : "Menu rangi"}
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            {language == "kiril" ? "Мену кўриниши" : "Menu ko'rinishi"}
          </Typography>
          <Typography variant="small" color="gray">
            {language == "kiril"
              ? "3 тадан бита кўринишни танланг"
              : "3 tadan bita ko'rinishni tanlang"}
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              {language == "kiril" ? "Тунги" : "Tungi"}
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              {language == "kiril" ? "Рангсиз" : "Rangsiz"}
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              {language == "kiril" ? "Кундузги" : "Kunduzgi"}
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
