import { Draggable } from "react-beautiful-dnd";
import { Select, Modal, Form, Button, DatePicker, Input } from "antd";
import { useState } from "react";
const Task = ({ item, index }) => {
  const [openTaskDetail, setOpenTaskDetail] = useState(false);
  const getPriority = (value) => {
    if (value == 1) {
      return "bg-red-500"
    }
    else if (value == 2) {
      return "bg-yellow-400"
    }
    else if (value == 3) {
      return "bg-green-500"
    }
  }
  const getPriorityName = (value) => {
    if (value == 1) {
      return "Critical"
    }
    else if (value == 2) {
      return "Important"
    }
    else if (value == 3) {
      return "Normal"
    }
  }
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-4 items-start min-h-20 w-64 rounded-lg bg-slate-200">
            <div className={`text-xs rounded-md pl-1 w-1/3 text-white ${getPriority(item.priority)}`}>{getPriorityName(item.priority)}</div>
            <div className="flex flex-row items-center justify-between gap-x-4">
              {/* Text */}
              <div className="overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-sm">
                <div className="pl-1">{item.name} </div>
              </div>
              {/* Button */}
              <button onClick={() => { setOpenTaskDetail(true) }}>
                <img src="https://i.imgur.com/zB6H1uA.png" className="h-5 w-5"></img>
              </button>
            </div>
            <div className="text-xs text-gray-500 pl-1">{item.start_date} - {item.end_date}</div>
          </div>
          <Modal open={openTaskDetail}
            title={item.name}
            footer={null}
            onCancel={() => setOpenTaskDetail(false)}
            width={800} // Set width of the modal
          >
          </Modal>
        </div>
      )}
    </Draggable>

  );
};

export default Task;
