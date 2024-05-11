import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { WorkerService } from "@/services";
import {
  showAlertMessage,
  showAlertMessageColor,
} from "@/reduser/alert-message-reducer";
import {
  signUserError,
  signUserStart,
  signUserSuccses,
} from "@/reduser/auth-reducer";
import { Loader } from "@/ui";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const { language } = useSelector((state) => state.language);
  const { isloading, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Parolni o'zgartirish va yashirish holatini saqlash uchun state
  const [showPassword, setShowPassword] = useState(false);
  // for login //login uchun
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");

  // Parolni ko'rsatish va yashirish funksiyasi
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandlerFunc = async () => {
    dispatch(signUserStart());
    const user = { phone, password };
    try {
      const { data } = await WorkerService.loginWorker(user);
      dispatch(signUserSuccses(data.user));
      dispatch(showAlertMessage(data));
    } catch (error) {
      const { response } = error;
      dispatch(signUserError());
      dispatch(showAlertMessage(response.data));
      dispatch(showAlertMessageColor("yellow"));
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard/home");
    }
  }, [isLogin]);

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[85%] -translate-y-2/4 -translate-x-2/4 md:max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              {language == "kiril" ? "Тизимга кириш" : "Tizimga kirish"}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              label="Number"
              size="lg"
              required={true}
            />
            <div className="relative flex w-full">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                label="Password"
                size="lg"
                required={true}
              />
              <div
                onClick={toggleShowPassword}
                className="!absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer  text-black"
              >
                {!showPassword ? (
                  <IoMdEye className="h-full w-full" />
                ) : (
                  <IoMdEyeOff className="h-full w-full" />
                )}
              </div>
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              onClick={loginHandlerFunc}
              variant="gradient"
              fullWidth
            >
              {isloading ? (
                <Loader
                  color="white"
                  height={16}
                  width={16}
                  className="flex items-center justify-center"
                />
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
