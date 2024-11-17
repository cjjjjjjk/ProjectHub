import React, { useEffect, useState } from "react";
import { columnsFromBackend, taskFromBE } from "./modelList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Select } from "antd";
import { IoMdAdd } from "react-icons/io";
import Task from "./Task";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

const Board = () => {
  const [tasks, setTasks] = useState(taskFromBE);

  const [newTaskType, setNewTaskType] = useState("To-do");
  const [newTaskName, setNewTaskName] = useState(null);

  // Danh sach cac cot
  const [columns, setColumns] = useState(() => {
    const newColumns = { ...columnsFromBackend };
    tasks.forEach((item) => {
      const curColumn = newColumns[item.type];
      const curItems = [...(curColumn?.items || []), item];
      newColumns[item.type] = {
        ...curColumn,
        items: curItems,
      };
    });

    return newColumns;
  }); // array chua cac cot lay tu backend

  useEffect(() => {}, [columns]);
  // Them task mơi
  const addTask = () => {
    const newId = (tasks.length + 1).toString();
    const newTask = {
      id: newId,
      name: newTaskName,
      description: null,
      start_date: null,
      end_date: null,
      status: null,
      priority: null,
      type: newTaskType,
    };
    setTasks((prevItems) => [...prevItems, newTask]);
    const targetColumn = columns[newTaskType];
    const targetItems = targetColumn.items;
    setColumns({
      ...columns,
      [newTaskType]: {
        ...targetColumn,
        items: [...targetItems, newTask],
      },
    });
  };

  // Xoa task
  const deleteTask = (task) => {
    const updateTask = tasks.filter((item) => item.id !== task.id);
    setTasks(updateTask);
    const targetColumn = columns[task.type];
    const targetItems = targetColumn.items;
    const updateItems = targetItems.filter((item) => item.id !== task.id);
    setColumns({
      ...columns,
      [task.type]: {
        ...targetColumn,
        items: updateItems,
      },
    });
  };

  // Them column
  const addColumn = () => {
    const numColum = Object.keys(columns).length + 1;
    const newColumnName = `New column ${numColum}`;
    setColumns({
      ...columns,
      [newColumnName]: {
        title: newColumnName,
        items: [],
        color: "#CCCCCC",
      },
    });
  };

  // Sua ten cot
  const renameColumn = (e, columnID) => {
    const newNameColumn = e.target.value;
    const updateColumn = columns[columnID];
    setColumns({
      ...columns,
      [columnID]: {
        ...updateColumn,
        title: newNameColumn,
      },
    });
  };

  // Xoa column
  const moreOptions = [
    {
      key: "1",
      label: (
        <button
          className="w-32 text-left"
          onClick={() => {
            console.log(newTaskType);

            const updateColumn = { ...columns };
            delete updateColumn[newTaskType];
            setColumns(updateColumn);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  // Xu ly keo tha
  const onDragEnd = (result, columns, setColumns) => {
    const { draggableId, source, destination } = result;

    if (!result.destination) return; // Neu ko trong vung tha thi thoat

    //neu khac cot
    if (source.droppableId !== destination.droppableId) {
      const task = tasks.find((item) => item.id === draggableId); // task dang dc keo
      const sourceColumn = columns[source.droppableId]; // cot bi keo
      const destColumn = columns[destination.droppableId]; // cot dc tha
      const sourceItems = [...sourceColumn.items]; // cac task trong cot bi keo
      const destItems = [...destColumn.items]; // cac task trong cot dc tha

      task.type = destColumn.title; // thay doi type cua task
      console.log(tasks);

      const [removed] = sourceItems.splice(source.index, 1); //xoa task bi keo trong cot nguon
      destItems.splice(destination.index, 0, removed); // them task bi keo vao cot dich

      // Update lai danh sach cac cot
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // Neu cung cot:
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    console.log(tasks);
  };
  return (
    <div className="h-full w-full ">
      {/* Tittle */}
      <div className=" h-22">
        <div className="px-4 pt-2">
          <h1 className="text-xl font-bold">Kanban Board</h1>
        </div>
        <div className="flex gap-5 p-4 items-center ml-32">
          <input
            type="text"
            className="w-72 p-1 rounded-md text-lg border-2 border-gray-500"
            placeholder="Add your task"
            onChange={(e) => setNewTaskName(e.target.value)}
          ></input>
          <Select
            size="large"
            defaultValue={Object.entries(columns)[0][1].title}
            style={{
              width: 160,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: "9px",
              height: 40,
              fontSize: "20px",
            }}
            onChange={(e) => setNewTaskType(e)}
            options={Object.values(columnsFromBackend).map((column) => ({
              value: column.title,
              label: column.title,
            }))}
          />
          <button
            className="border-2 border-black font-bold p-2 rounded-lg w-28 bg-gray-200  hover:bg-blue-400 hover:text-white"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </div>

      <div className="h-5/6 w-full">
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns);
          }}
        >
          <div className="flex w-full h-full">
            <div className="flex w-5/6 no-scrollbar overflow-x-auto h-5/6 min-h-[40vh] gap-4 p-4">
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div>
                    {/* Tittle column */}
                    <div
                      style={{ backgroundColor: column.color }}
                      className="w-72 flex rounded-t-md border-2 border-black border-b-0 focus:outline-blue-500 focus:border-blue-500"
                    >
                      <input
                        key={columnId}
                        defaultValue={column.title}
                        className="text-xl pl-6 text-center font-bold w-60 h-10  focus:outline-none bg-transparent"
                        onChange={(e) => renameColumn(e, columnId)}
                      ></input>
                      <Dropdown
                        menu={{
                          items: moreOptions,
                        }}
                        className="flex justify-center w-12"
                        trigger={["click"]}
                      >
                        <div
                          className="h-10 flex items-center"
                          onClick={() => {
                            setNewTaskType(columnId);
                          }}
                        >
                          <EllipsisOutlined className=" text-2xl h-6 rounded-lg hover:bg-gray-100 cursor-pointer" />
                        </div>
                      </Dropdown>
                    </div>

                    {/* Task */}
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="p-2 h-5/6 w-72 min-h-96 min-w-60 overflow-y-auto no-scrollbar flex flex-col gap-2 items-center bg-white border-2 border-t-0 border-black rounded-b-md"
                        >
                          {column.items.map((item, index) => (
                            <div>
                              <Task
                                key={item.id}
                                item={item}
                                index={index}
                                deleteTask={deleteTask}
                              />
                            </div>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-between pt-4 pb-10 items-center">
              {/* Add column */}
              <button
                className="p-1 border-2 border-black hover:bg-gray-200"
                onClick={addColumn}
              >
                <IoMdAdd className="text-2xl" />
              </button>
              <button className="p-2 w-24 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500  ">
                Save
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
