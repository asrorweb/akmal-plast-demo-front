import {
  signUserError,
  signUserStart,
  signUserSuccses,
} from "@/reduser/auth-reducer";
import {
  getWorkerError,
  getWorkerStart,
  getWorkerSuccses,
  workerRegisterError,
  workerRegisterStart,
  workerRegisterSuccses,
  workersError,
  workersStart,
  workersSuccses,
} from "@/reduser/workers-reducer";
import { WorkerService } from "@/services";
import { Loader } from "@/ui";
import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const { worker, isloading } = useSelector((state) => state.workers);

  const GetUser = async () => {
    dispatch(getWorkerStart());
    try {
      const { data } = await WorkerService.getWorker();
      dispatch(getWorkerSuccses(data.user));
    } catch (error) {
      dispatch(getWorkerError());
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div className="mt-8 rounded-xl md:p-4">
      <Card className="w-full">
        <img
          className="h-24 w-full rounded-lg object-cover object-center opacity-90 shadow-xl shadow-blue-gray-900/50 md:h-36"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />

        <Avatar
          src="https://cadenaser.com/resizer/SqMmu4aDcATBH_pg7caRR-kPiWw=/736x552/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/LYOYJKKN4NDA7DWZAA7R2GR4F4.jpg"
          alt="avatar"
          size="xxl"
          className="-mt-16 ml-[5%]"
        />
        {isloading ? (
          <Loader
            className="flex justify-center pt-8"
            width={40}
            height={40}
            color="#2C3940"
          />
        ) : (
          <CardBody className="pl-[5%]">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 capitalize"
            >
              {worker ? worker.name : ""}
            </Typography>
            <Typography>{worker ? worker.phone : ""}</Typography>
          </CardBody>
        )}
      </Card>
    </div>
  );
}

export default Profile;
