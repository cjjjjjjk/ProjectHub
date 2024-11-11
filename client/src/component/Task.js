import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-4 flex flex-col justify-center items-start min-h-28 w-64 rounded-lg bg-gray-50 border-2 border-black">
            <p>{item.Name}</p>
            <div className="flex justify-between items-center w-full">
              <p>
                <span></span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
