import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskDetail from "./TaskDetail";
import { Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const Task = ({ item, index, deleteTask }) => {
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const handleShowTaskDetail = () => {
    setShowTaskDetail(!showTaskDetail);
  };
  const items = [
    {
      key: "1",
      label: (
        <button
          className="w-32 text-left"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(item);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

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
            <div className="w-full flex justify-end">
              <Dropdown
                menu={{
                  items,
                }}
                className="flex justify-center px-2"
                trigger={["click"]}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className=" w-10 px-2 "
                >
                  <EllipsisOutlined className=" text-2xl rounded-lg hover:bg-gray-200 cursor-pointer" />
                </div>
              </Dropdown>
            </div>
            <div className="px-4 mb-2">
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
