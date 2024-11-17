import { useEffect, useState } from "react";
import { columnsFromBackend, taskFromBE } from "./modelList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Select,DatePicker } from "antd";
import Task from "./Task";
import { RandomCol } from "./RandomCol";

const { RangePicker } = DatePicker;

const Board = ({id}) => {
  //fetch thong tn project tu backend dua tren id



  //fetch task tu backend
  const taskFromBE = [
    {
      id: "1",
      Name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
      Descriptions: " ahihi",
      Start_date: "25/12/2024",
      End_date: "25/12/2024",
      Priority: 1,
      Type: "To-do",
    },
    {
      id: "2",
      Name: "Fix Styling",
      Descriptions: " ahihi",
      Start_date: "25/12/2024",
      End_date: "25/12/2024",
      Priority: 2,
      Type: "To-do",
    },
    {
      id: "3",
      Name: "Handle Door Specs",
      Descriptions: " ahihi",
      Start_date: "25/12/2024",
      End_date: "25/12/2024",
      Priority: 3,
      Type: "To-do",
    },
  
  ];
  // fetch danh sach cac task type , cho vao columnsFromBackend
   const columnsFromBackend = {
    "To-do": {
      title: "To-do",
      items: [],
      bg: RandomCol(),
    },
    "In Progress": {
      title: "In Progress",
      items: [],
      bg: RandomCol(),
    },
 
  };

  const [tasks, setTasks] = useState(taskFromBE);
  const [newTaskType, setNewTaskType] = useState("To-do");
  const [newTaskName, setNewTaskName] = useState("");
  
  const [newColumnName, setNewColumnName] = useState("");
  const addColumn = () => {
    if (!newColumnName.trim()) return; // Prevent adding columns with empty names
    if (columns[newColumnName]) {
      alert("Column already exists!");
      return;
    }

    setColumns((prevColumns) => ({
      ...prevColumns,
      [newColumnName]: {
        title: newColumnName,
        items: [],
        bg: RandomCol(), // Assign a random background color
      },
    }));
    setNewColumnName(""); // Clear the input after adding the column
  };
  // Danh sach cac cot
  const [columns, setColumns] = useState(() => {
    const newColumns = { ...columnsFromBackend };
    tasks.forEach((item) => {
      const curColumn = newColumns[item.Type];
      const curItems = [...(curColumn?.items || []), item];
      newColumns[item.Type] = {
        ...curColumn,
        items: curItems,
      };
    });

    return newColumns;
  }); // array chua cac cot lay tu backend
   



  // Them task mơi
  const addTask = () => {
    const newId = (tasks.length + 1).toString();
    if(newTaskName.trim() === "") return;
    const newTask = {
      id: newId,
      Name: newTaskName,
      Descriptions: "",
      Start_date: "",
      End_date: "",
      Status: "",
      Priority: "",
      Type: newTaskType,
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

      task.Type = destColumn.title; // thay doi type cua task
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
  };
  return (
    <div className="flex flex-col">
      <div className="px-4 pt-2">
        <h1 className="text-xl font-bold">Kanban Board</h1>
      </div>
      {/* Tittle */}
      <div className="flex flex-row gap-2 p-4">
          <input
            type="text"
            className="rounded-md text-lg border-2 px-2"
            placeholder="Add your task name ..."
            onChange={(e) => setNewTaskName(e.target.value)}
          ></input>
          <Select
            placeholder="Select type"
            size="large"
            
            onChange={(e) => setNewTaskType(e)}
            options={Object.values(columns).map((column) => ({
              value: column.title,
              label: column.title,
            }))}
          />
          <button
            className=" font-bold p-2 rounded-lg  bg-gray-300  hover:bg-blue-400 hover:text-white"
            onClick={addTask}
          >
            Add Task
          </button>
          <div className="flex flex-row gap-x-2 justify-end ">
            <input
              type="text"
              className="rounded-md text-lg border-2 px-2 "
              placeholder="Add new column ..."
              onChange={(e) => setNewColumnName(e.target.value)}
            ></input>
            <button
              className=" font-bold p-2 rounded-lg  bg-gray-300  hover:bg-blue-400 hover:text-white"
              onClick={addColumn}
            >
              Add New Column
            </button>
          </div>
      </div>

      <div className="pl-4 flex flex-row gap-x-4 overflow-x-auto ">
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns);
          }}
        >
             {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <div className="flex flex-col w-72 ">
                      {/* Tittle column */}
                      <div className={`flex justify-center text-white items-center h-10 rounded-t-md border-2 border-b-0 ${column.bg}`}>
                        <h2 className="text-xl font-bold"> {column.title}</h2>
                      </div>
                      {/* Task */}
                      <div className="flex flex-col gap-y-2">
                        <Droppable key={columnId} droppableId={columnId}>
                          {(provided, snapshot) => (
                            
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="h-80 w-72 overflow-auto pt-3 flex flex-col gap-2 items-center border-2 border-t-0  rounded-b-md"
                            >
                              {column.items.map((item, index) => (
                                  
                                <Task key={item.id} item={item} index={index} />
                             
                              ))}
                              {provided.placeholder}
                            </div>
                      
                          )}
                        </Droppable>
                      </div>
                    </div>
                );
              })}  
        </DragDropContext>
     
      </div>

    </div>
  );
};

export default Board;
