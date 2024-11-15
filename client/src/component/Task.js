import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskDetail from "./TaskDetail";

const Task = ({ item, index }) => {
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const handleShowTaskDetail = () => {
    setShowTaskDetail(!showTaskDetail);
  };
  return (
    <div>
      {showTaskDetail && (
        <TaskDetail event={handleShowTaskDetail} item={item} model={"Kanban"} />
      )}
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className=" w-64  rounded-lg bg-gray-50 border-2 border-black cursor-pointer text-left"
            onClick={handleShowTaskDetail}
          >
            <div className="p-4 mb-2">
              <p>{item.name}</p>
            </div>
            <div className="p-2 flex justify-between items-center w-full">
              <p>
                <span className="text-gray-600">{item.start_date}</span>
              </p>
              <button
                className="rounded-full bg-red-400 object-cover h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked 2");
                }}
              >
                <img></img>
              </button>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Task;
