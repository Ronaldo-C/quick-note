import React, { FC } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

type CreateButtonProps = {
  onClick: () => void;
};

export const CreateButton: FC<CreateButtonProps> = () => {
  return (
    <button
      type="button"
      className="bg-black hover:bg-blue-700 text-white py-4 px-4 rounded-full absolute bottom-7 right-7"
    >
      <PencilIcon className="w-6 h-6" />
    </button>
  );
};
