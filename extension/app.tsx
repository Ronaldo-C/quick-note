import React, { useMemo, useReducer } from "react";
import { useDrop } from "react-dnd";
import { AppContext, ItemTypes, NoteActionType } from "./common";
import { CreateButton } from "./components/CreateButton";
import { TextArea, TextAreaProps } from "./components/TextArea";

interface NoteAction {
  type: NoteActionType;
  payload: TextAreaProps;
}

const reducer = (state: TextAreaProps[], action: NoteAction) => {
  const { type, payload } = action;
  switch (type) {
    case NoteActionType.ADD:
      return [...state, payload];
    case NoteActionType.DELETE:
      return state.filter((item) => item.id !== payload.id);
    case NoteActionType.UPDATE: {
      const newItem = state.find((item) => item.id === payload.id);
      const newState = state.filter((item) => item.id !== payload.id);
      return [...newState, { ...newItem, ...payload }];
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const ContenxtValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item: TextAreaProps, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();

      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      dispatch({
        type: NoteActionType.UPDATE,
        payload: { ...item, left, top },
      });
    },
  });

  return (
    <AppContext.Provider value={ContenxtValue}>
      <div className="h-full relative" ref={drop}>
        <CreateButton />
        {state.map((item) => (
          <TextArea key={item.id} {...item} />
        ))}
      </div>
    </AppContext.Provider>
  );
}

export default App;
