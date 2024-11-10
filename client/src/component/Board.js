import React, { useState } from "react";
import { columnsFromBackend } from "./modelList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
const Board = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;
    if (!result.destination) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
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
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, columns, setColumns);
      }}
    >
      <div className="flex">
        <div className="flex w-full min-h-[80vh]">
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-28 flex flex-col min-w-60 bg-red-300 border-2 border-black"
                  >
                    <span className="">{column.title}</span>
                    {column.items.map((item, index) => (
                      <div>
                        <Task key={item.id} item={item} index={index} />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
