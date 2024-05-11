import {
  workersError,
  workersStart,
  workersSuccses,
} from "@/reduser/workers-reducer";
import { WorkerService } from "@/services";
import { DeleteEditBtn, Loader, PageHeader } from "@/ui";
import { Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircle } from "react-icons/fa6";

function Workers() {
  const dispatch = useDispatch();
  const { workers, isloading } = useSelector((state) => state.workers);
  const { isdeleted } = useSelector((state) => state.deleteElement);
  const [name, setName] = useState("");

  const getAllWorkers = async () => {
    dispatch(workersStart());
    try {
      const { data } = await WorkerService.getAllWorkers();
      dispatch(workersSuccses(data));
    } catch (error) {
      dispatch(workersError());
    }
  };

  const searchWorkers = async () => {
    dispatch(workersStart());

    try {
      const { data } = await WorkerService.searchWorker(name);
      dispatch(workersSuccses(data));
    } catch (error) {
      dispatch(workersError());
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value); // `name` holatini yangilash
  };

  useEffect(() => {
    getAllWorkers();
  }, [isdeleted]);

  useEffect(() => {
    searchWorkers();
  }, [name]);

  const TABLE_HEAD = ["Name", "Phone", "Employed", "Admin", ""];

  return (
    <div className="dashboars-page">
      <PageHeader
        titleUz={"Xodimlar"}
        title={"Ходимлар"}
        navigateTo={"/dashboard/xodim/add-workers"}
        data={name}
        searchFunction={handleInputChange}
      />

      {isloading ? (
        <Loader
          className="flex justify-center pt-8"
          width={40}
          height={40}
          color="#2C3940"
        />
      ) : (
        <Card className="h-full w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100  bg-blue-700 p-4"
                  >
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workers?.map(
                ({ name, phone, isAdmin, createdAt, _id }, index) => (
                  <tr key={phone} className="border-b-2">
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium capitalize"
                      >
                        {name.slice(0, 20)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal text-gray-700"
                      >
                        {phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal text-gray-700"
                      >
                        {moment(createdAt).format("L")}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <FaCircle
                        className={`h-3 w-3 ${
                          isAdmin ? "text-green-600" : "text-red-600"
                        } `}
                      />
                    </td>
                    <td className="flex justify-center p-4">
                      <DeleteEditBtn
                        _id={_id}
                        name={name}
                        requestPathForDelete={"admin/delete"}
                        pathForRoadToEditPage={"/dashboard/xodim/edit-workers"}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

export default Workers;
