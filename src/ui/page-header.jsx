import { Button, Input, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

function PageHeader({
  title,
  titleUz,
  navigateTo,
  data,
  searchFunction,
  btn = true,
}) {
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  return (
    <div className="mb-6 rounded-lg bg-[#ffffffbf]  p-2 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] md:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="mb-5 flex items-center justify-between ">
        <Typography variant="h5" className="md:text-2xl">
          {language == "kiril" ? title : titleUz}
        </Typography>
        <Button
          onClick={() => navigate(navigateTo)}
          className={`${
            !btn && "hidden"
          } rounded-3xl bg-[#116DFF] px-3 py-1 capitalize shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
          size="sm"
        >
          <div className="flex gap-1">
            <IoAddOutline className="h-6 w-6" />
            <Typography variant="h6">
              {language == "kiril" ? "қўшиш" : "qo'shish"}
            </Typography>
          </div>
        </Button>
      </div>
      <div className="relative flex w-full gap-2 md:w-max">
        <Input
          value={data}
          onChange={searchFunction}
          size="md"
          type="search"
          label="Search..."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
      </div>
    </div>
  );
}

export default PageHeader;
