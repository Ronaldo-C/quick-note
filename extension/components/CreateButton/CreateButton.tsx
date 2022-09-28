import React, { FC, useContext } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { AppContext, NoteActionType } from "../../common";
import { BaseColor } from "../TextArea/constant";

export const CreateButton: FC<{}> = () => {
  const { dispatch } = useContext(AppContext);

  const addNote = () => {
    dispatch({
      type: NoteActionType.ADD,
      payload: { color: BaseColor.red, left: 50, top: 50 },
    });
  };

  return (
    <button
      type="button"
      className="bg-black hover:bg-blue-700 text-white py-4 px-4 rounded-full absolute bottom-7 right-7"
      onClick={addNote}
    >
      <PencilIcon className="w-6 h-6" />
    </button>
  );
};
