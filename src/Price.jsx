import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import img from "../public/img/logo.png";
import qr from "../public/img/qr.svg";

function Price() {
  const TABLE_HEAD = [
    "Nomi",
    ,
    "Narx / Цена (so'm)",
    "Qalinligi / Толщина (mm)",
    "Рулон / Метровой",
  ];
  //   const TABLE_ROWS = [
  //     {
  //       name: "16",
  //       optom: "1 500",
  //       thickness: "1.7",
  //       xolati: "рулон",
  //     },
  //     {
  //       name: "20",
  //       optom: "1 700",
  //       xolati: "рулон",
  //       thickness: "2",
  //     },
  //     {
  //       name: "25",
  //       optom: "2 500",
  //       thickness: "2",
  //       xolati: "рулон",
  //     },
  //     {
  //       name: "32",
  //       optom: "3 500",
  //       xolati: "рулон",
  //       thickness: "2.5",
  //     },
  //     {
  //       name: "40",
  //       optom: "4 500",
  //       xolati: "рулон",
  //       thickness: "2.7",
  //     },
  //     {
  //       name: "50",
  //       optom: "7 000",
  //       xolati: "рулон",
  //       thickness: "3",
  //     },
  //     {
  //       name: "63",
  //       optom: "12 000",
  //       xolati: "рулон",
  //       thickness: "3.4",
  //     },
  //     {
  //       name: "75",
  //       optom: "8 500",
  //       xolati: "метровой",
  //       thickness: "2.5",
  //     },
  //     {
  //       name: "100",
  //       optom: "12 000",
  //       xolati: "метровой",
  //       thickness: "2.5",
  //     },
  //     {
  //       name: "150",
  //       optom: "35 000",
  //       xolati: "метровой",
  //       thickness: "3.5",
  //     },
  //   ];

  const TABLE_ROWS = [
    {
      name: "25",
      optom: "3 700",
      thickness: "3",
      xolati: "рулон",
    },
    {
      name: "32",
      optom: "5 200",
      xolati: "рулон",
      thickness: "4",
    },
    {
      name: "40",
      optom: "6 700",
      thickness: "4",
      xolati: "рулон",
    },
    {
      name: "50",
      optom: "8 200",
      xolati: "рулон",
      thickness: "4",
    },
    {
      name: "63",
      optom: "13 500",
      xolati: "рулон",
      thickness: "4",
    },

    {
      name: "75",
      optom: "17 000",
      xolati: "рулон",
      thickness: "4.5",
    },
    {
      name: "90",
      optom: "27 000",
      xolati: "рулон",
      thickness: "5.5",
    },
    {
      name: "100",
      optom: "17 000",
      xolati: "метровой",
      thickness: "3.3",
    },
    {
      name: "110",
      optom: "42 000",
      xolati: "рулон",
      thickness: "7.5",
    },
    {
      name: "150",
      optom: "70 000",
      xolati: "метровой",
      thickness: "9",
    },
  ];
  return (
    <Card className="h-screen w-full overflow-auto shadow-xl">
      <div className="flex items-center justify-between">
        <Typography className="text-black" variant="h1">
          Akmaljon Plast Invest
        </Typography>
        <img src={img} alt="" className="w-[150px]" />
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={uuidv4()}
                className="border-b border-blue-gray-100 bg-blue-gray-800 p-4 "
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium leading-none text-white"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, optom, thickness, xolati }, index) => (
            <tr key={uuidv4()} className="even:bg-blue-gray-100">
              <td className="p-5">
                <Typography color="blue-gray" className="text-xl font-normal">
                  Ф{name}
                </Typography>
              </td>
              <td className="p-5">
                <Typography color="blue-gray" className="text-xl font-normal">
                  {optom} so'm
                </Typography>
              </td>
              <td className="p-5">
                <Typography color="blue-gray" className="text-xl font-normal">
                  {thickness} mm
                </Typography>
              </td>

              <td className="p-5">
                <Typography color="blue-gray" className="text-xl font-normal">
                  {xolati}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-7">
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-2 text-4xl ">
            <i className="fa-solid fa-phone text-black"></i>
            <a className="text-xl" href="tel:+998911483734">
              +998911483734
            </a>
          </span>
          <img className="w-[100px]" src={qr} alt="" />
        </div>
      </div>
    </Card>
  );
}

export default Price;
