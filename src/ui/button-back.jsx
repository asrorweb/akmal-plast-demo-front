import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function ButtonBack({ to = false, className = "" }) {
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        to ? navigate(to) : navigate(-1);
      }}
      variant="text"
      className={`group !absolute top-3 left-3 flex items-center gap-1  px-1 py-0  sm:px-4 sm:py-2 ${className}`}
    >
      <IoChevronBackOutline className="h-6 w-6" />
      <span className="capitalize duration-100 md:group-hover:-translate-x-1">
        {language == "kiril" ? "назад" : "back"}
      </span>
    </Button>
  );
}

export default ButtonBack;
