import React, { useEffect } from "react";
import { DeleteEditBtn, PageHeader } from "@/ui";
import {
  Button,
  Typography,
  Card,
  Input,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClientError,
  getAllClientStart,
  getAllClientSuccses,
} from "@/reduser/client-reducer";
import ClientService from "@/services/client-service";
import numeral from "numeral";

function Client() {
  const { isdeleted } = useSelector((state) => state.deleteElement);
  const { clients, isLoadingClient } = useSelector((state) => state.client);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const getAllClients = async () => {
    dispatch(getAllClientStart());
    try {
      const { data } = await ClientService.getAllClient();
      dispatch(getAllClientSuccses(data));
    } catch (error) {
      dispatch(getAllClientError());
    }
  };

  const searchWorkers = async () => {
    dispatch(getAllClientStart());

    try {
      const { data } = await ClientService.searchClient(name);
      dispatch(getAllClientSuccses(data));
    } catch (error) {
      dispatch(getAllClientError());
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value); // `name` holatini yangilash
  };

  useEffect(() => {
    getAllClients();
  }, [isdeleted]);

  useEffect(() => {
    // Avtomatik qidirishni boshlash
    // searchWorkers();
  }, [name]);

  const handlerTradeHistoryView = (id) =>
    navigate(`/dashboard/klent/savdo-tarixi/${id}`);

  const TABLE_HEAD = ["Nomi", "Nomer", "Address", "Balance", ""];

  return (
    <div className="mt-8 rounded-xl  md:p-4">
      <PageHeader
        data={name}
        navigateTo={"/dashboard/klent/add-product"}
        title={"Доимий клентлар"}
        titleUz={"Doimiy klentlar"}
        searchFunction={handleInputChange}
      />

      <Card className="h-full w-full overflow-auto shadow-xl">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={uuidv4()} className="border-b p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients?.map(
              ({ name, number, address, totalBalance, _id }, index) => (
                <tr key={uuidv4()} className="group border-b-2">
                  <td
                    onClick={() => handlerTradeHistoryView(_id)}
                    className="p-4 hover:cursor-pointer"
                  >
                    <Typography
                      color="blue-gray"
                      className="text-base font-normal capitalize  group-hover:underline"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="blue-gray"
                      className="text-base font-normal"
                    >
                      {number}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="blue-gray"
                      className="text-base font-normal"
                    >
                      {address}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="blue-gray"
                      className={`${
                        totalBalance >= 0 ? "text-green-700" : "text-red-500"
                      } text-base font-normal`}
                    >
                      {numeral(totalBalance).format("0,0")}
                    </Typography>
                  </td>
                  <td className="flex justify-center gap-5 p-4">
                    <DeleteEditBtn
                      _id={_id}
                      name={name}
                      pathForRoadToEditPage={"/dashboard/klent/edit-product"}
                      requestPathForDelete={"client/delete-client"}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default Client;
