import React, { FC, useState } from "react";
import { BASE_COLOR } from "./constant";

type TextAreaProps = {
  onClick: () => void;
};

export const TextArea: FC<TextAreaProps> = () => {
  const [color, setColor] = useState(BASE_COLOR.red);

  const handleColor = (currentColor: BASE_COLOR) => {
    setColor(currentColor);
  };

  return (
    <div className="w-80 h-[26rem] rounded-md">
      <div className="bg-slate-50 h-6 rounded-t-md px-2">
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
        className={`w-full h-full resize-none focus-visible:outline-none text-base ${color}`}
      />
    </div>
  );
};
