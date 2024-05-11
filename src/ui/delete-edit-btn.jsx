import { IconButton, Tooltip } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { showDeleteModal } from "@/reduser/delete-modal-reducer";
import { useNavigate } from "react-router-dom";

function DeleteEditBtn({
  _id,
  name,
  requestPathForDelete,
  pathForRoadToEditPage,
  editBtn = true,
  deleteBtn = true,
}) {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editBtnHandler = () => {
    navigate(`${pathForRoadToEditPage}/${_id}`);
  };

  const deleteBtnHandler = () => {
    const delData = { id: _id, name, path: requestPathForDelete };
    dispatch(showDeleteModal(delData));
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip content={language == "kiril" ? "Тахрир қилиш" : "Taxrir qilish"}>
        {/* edit */}
        <IconButton
          onClick={editBtnHandler}
          size="sm"
          variant="text"
          className={`${
            !editBtn && "hidden"
          } text-[#333333] hover:bg-gray-400 hover:shadow-2xl`}
        >
          <MdEdit className="h-5 w-5" />
        </IconButton>
      </Tooltip>

      {/* delete */}
      <Tooltip content={language == "kiril" ? "Ўчириш" : "O'chirish"}>
        <IconButton
          onClick={deleteBtnHandler}
          size="sm"
          variant="text"
          className={`${!deleteBtn && "hidden"}`}
        >
          <FiTrash2 className="h-5 w-5 text-red-800" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default DeleteEditBtn;
