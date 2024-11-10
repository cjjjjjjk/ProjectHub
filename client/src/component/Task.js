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
          <div className="flex flex-col justify-center items-start min-h-28 max-w-60 bg-blue-600 border-2 border-black">
            <p>{item.Task}</p>
            <div className="flex justify-between items-center w-full">
              <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
