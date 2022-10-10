import React, { FC, useContext } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AppContext, NoteActionType } from "../../common";

import { BaseColor } from "./constant";

export const TextArea: FC<TextAreaProps> = (props) => {
  const { left, top, color, id, content } = props;
  const { dispatch } = useContext(AppContext);

  const handleColor = (currentColor: BaseColor) => {
    dispatch({
      type: NoteActionType.UPDATE,
      payload: { id, color: currentColor },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: NoteActionType.DELETE,
      payload: { id },
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: NoteActionType.UPDATE,
      payload: { id, content: e.currentTarget.value },
    });
  };

  const handleClick = () => {
    dispatch({
      type: NoteActionType.UP,
      payload: { id },
    });
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;
    dispatch({
      type: NoteActionType.UPDATE,
      payload: { id, left: x, top: y },
    });
    dispatch({
      type: NoteActionType.UP,
      payload: { id },
    });
  };

  return (
    <Draggable
      handle=".handle"
      onStop={handleDragStop}
      position={{
        x: left,
        y: top,
      }}
      bounds={{
        left: 0,
        top: 0,
      }}
    >
      <div className="flex flex-col w-80 absolute" onClick={handleClick}>
        <div className="handle bg-slate-50 h-6 rounded-t-md px-2 cursor-move flex justify-between items-center">
          <div className="flex h-full items-center space-x-1.5">
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${BaseColor.red}`}
              onClick={() => handleColor(BaseColor.red)}
            />
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${BaseColor.yellow}`}
              onClick={() => handleColor(BaseColor.yellow)}
            />
            <button
              type="button"
              className={`w-3 h-3 rounded-full ${BaseColor.green}`}
              onClick={() => handleColor(BaseColor.green)}
            />
          </div>
          <button type="button" className="w-4 h-4" onClick={handleDelete}>
            <XMarkIcon />
          </button>
        </div>
        <textarea
          className={`h-[26rem] px-1 rounded-b-md resize-none focus-visible:outline-none text-base ${color} custom-scrollbar`}
          value={content}
          onChange={handleChange}
        />
      </div>
    </Draggable>
  );
};

export type TextAreaProps = {
  id: number;
  top: number;
  left: number;
  color: BaseColor;
  content: string;
};
