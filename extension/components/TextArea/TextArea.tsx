import React, { FC, useContext, useMemo } from "react";
import { useDrag } from "react-dnd";
import { AppContext, ItemTypes, NoteActionType } from "../../common";
import { BASE_COLOR } from "./constant";

export type TextAreaProps = {
  id: number;
  top: number;
  left: number;
  color: BASE_COLOR;
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

  const handleColor = (currentColor: BASE_COLOR) => {
    dispatch({
      type: NoteActionType.UPDATE,
      payload: { id, color: currentColor },
    });
  };

  const styles = useMemo(() => {
    return {
      transform: `translate(${left}px, ${top}px)`,
      opacity: isDragging ? 0 : 1,
    };
  }, [left, top, isDragging]);

  return (
    <div className="flex flex-col w-80 absolute" ref={preview} style={styles}>
      <div className="bg-slate-50 h-6 rounded-t-md px-2 cursor-move" ref={drag}>
        <div className="flex items-center h-full space-x-1.5">
          <button
            type="button"
            className={`w-3 h-3 rounded-full ${BASE_COLOR.red}`}
            onClick={() => handleColor(BASE_COLOR.red)}
          />
          <button
            type="button"
            className={`w-3 h-3 rounded-full ${BASE_COLOR.yellow}`}
            onClick={() => handleColor(BASE_COLOR.yellow)}
          />
          <button
            type="button"
            className={`w-3 h-3 rounded-full ${BASE_COLOR.green}`}
            onClick={() => handleColor(BASE_COLOR.green)}
          />
        </div>
      </div>
      <textarea
        className={`h-[26rem] rounded-b-md resize-none focus-visible:outline-none text-base ${color}`}
        value={content}
      />
    </div>
  );
};
