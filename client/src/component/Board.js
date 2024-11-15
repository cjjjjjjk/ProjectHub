import React, { useState } from "react";
import { columnsFromBackend, taskFromBE } from "./modelList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Select } from "antd";
import Task from "./Task";
const Board = () => {
  const [tasks, setTasks] = useState(taskFromBE);

  const [newTaskType, setNewTaskType] = useState("To-do");
  const [newTaskName, setNewTaskName] = useState("");
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

  // Them task mơi
  const addTask = () => {
    const newId = (tasks.length + 1).toString();
    const newTask = {
      id: newId,
      name: newTaskName,
      descriptions: null,
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
    <div className="h-full w-full overflow-y-auto">
      {/* Tittle */}
      <div className="min-h-20 h-1/6">
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
            defaultValue="To-do"
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
                    <div className="flex justify-center items-center h-10 bg-slate-100 rounded-t-md border-2 border-black border-b-0">
                      <h2 className="text-xl font-bold"> {column.title}</h2>
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
                              <Task key={item.id} item={item} index={index} />
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
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
