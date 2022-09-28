import React, { FC, useContext, useMemo } from "react";
import { useDrag } from "react-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AppContext, ItemTypes, NoteActionType } from "../../common";
import { BaseColor } from "./constant";

export type TextAreaProps = {
  id: number;
  top: number;
  left: number;
  color: BaseColor;
  content: string;
};

export const TextArea: FC<TextAreaProps> = (props) => {
  const { left, top, color, id, content } = props;
  const { dispatch } = useContext(AppContext);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: props,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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

  const styles = useMemo(() => {
    return {
      transform: `translate(${left}px, ${top}px)`,
      display: isDragging ? "none" : "flex",
    };
  }, [left, top, isDragging]);

  return (
    <div
      className="flex flex-col w-80 absolute transition"
      ref={preview}
      style={styles}
      onClick={handleClick}
    >
      <div
        className="bg-slate-50 h-6 rounded-t-md px-2 cursor-move flex justify-between items-center"
        ref={drag}
      >
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
        className={`h-[26rem] px-1 rounded-b-md resize-none focus-visible:outline-none text-base ${color}`}
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};
