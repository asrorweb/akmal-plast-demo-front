import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Price from "./Price";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { getItem } from "./helpers/persistens-storage";
import { changeLanguageTo } from "./reduser/change-language";
import {
  AlertMessage,
  Loader,
  ModalDeleteQuest,
  ModalTradeQuest,
  ModelQuest,
} from "./ui";
import { WorkerService } from "./services";
import {
  signUserError,
  signUserStart,
  signUserSuccses,
} from "./reduser/auth-reducer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading } = useSelector((state) => state.auth);

  const checkLanguage = () => {
    const lang = getItem("language");
    if (lang) dispatch(changeLanguageTo(lang));
  };

  const GetUser = async () => {
    dispatch(signUserStart());
    try {
      const { data } = await WorkerService.getWorker();
      dispatch(signUserSuccses(data.user));
    } catch (error) {
      dispatch(signUserError());
      navigate("/auth/sign-in");
    }
  };

  useEffect(() => {
    GetUser();
    checkLanguage();
  }, []);

  if (isloading)
    return (
      <Loader
        height={30}
        width={30}
        className="flex h-screen w-full items-center justify-center"
      />
    );

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}></Suspense> */}
      <AlertMessage />
      <ModalDeleteQuest />
      <ModalTradeQuest />
      <ModelQuest />

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/price" element={<Price />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
