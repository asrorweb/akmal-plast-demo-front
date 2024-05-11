import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { removeItem } from "@/helpers/persistens-storage";
import { logOutUser } from "@/reduser/auth-reducer";

export function Sidenav({ brandImg, brandName, routes }) {
  const { language } = useSelector((state) => state.language);
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const logoutHandler = () => {
    removeItem("token");
    Dispatch(logOutUser());
    navigate("/auth/sign-in");
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? " translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          {/* logo */}
          {/* <Avatar src={brandImg} size="sm" /> */}
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-1 top-1 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, !openSidenav)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-7 w-7 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(
          ({ layout, title, pages }, key) =>
            title !== "auth pages" && (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {pages.map(
                  ({ icon, name, nameuz, path, main }) =>
                    main && (
                      <li key={name}>
                        <NavLink
                          onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                          to={`/${layout}${path}`}
                        >
                          {({ isActive }) => (
                            <Button
                              variant={isActive ? "gradient" : "text"}
                              color={
                                isActive
                                  ? sidenavColor
                                  : sidenavType === "dark"
                                  ? "white"
                                  : "blue-gray"
                              }
                              className="flex items-center gap-4 px-4 capitalize"
                              fullWidth
                            >
                              {icon && icon}
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                {language == "kiril" ? name : nameuz}
                              </Typography>
                            </Button>
                          )}
                        </NavLink>
                      </li>
                    )
                )}
              </ul>
            )
        )}
      </div>

      {/* Logout btn */}
      <Button
        onClick={logoutHandler}
        variant="text"
        className={`${
          sidenavType == "dark" ? "text-white" : "text-black"
        } !absolute bottom-4 left-4 right-4 flex w-auto max-w-none items-center gap-4 text-sm capitalize`}
      >
        <RiLogoutCircleRLine className="h-6 w-6" />
        {language == "kiril" ? "Чиқиш" : "Chiqish"}
      </Button>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Akmal Plast Ivest",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
