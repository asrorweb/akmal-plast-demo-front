import { Button } from "@material-tailwind/react";
import { ButtonBack, Loader } from ".";

function BasisAddElement({ children, onClickFunc, isloading }) {
  return (
    <div className="relative mt-12 rounded-2xl bg-[#FBFCFD] p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <ButtonBack />
      <form className="my-6 flex flex-col gap-4">
        {/* element */}
        {children}

        <Button
          onClick={(e) => onClickFunc(e)}
          size="lg"
          type="submit"
          className="mx-auto inline-block"
        >
          {isloading ? <Loader color="white" /> : "Qo'shish"}
        </Button>
      </form>
    </div>
  );
}

export default BasisAddElement;
