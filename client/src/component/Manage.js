import CFDChart from "./CFD";
import { useState } from "react";
const sampleData = [
    { date: '2024-12-01', value: 10 },
    { date: '2024-12-02', value: 25 },
    { date: '2024-12-03', value: 40 },
    { date: '2024-12-04', value: 55 },
    { date: '2024-12-05', value: 70 },
    // Add more data points as needed
  ];

const Manage=({task,model})=> {
  const getPriority = (value) => {
    if (value == 1) {
      return "bg-red-500";
    } else if (value == 2) {
      return "bg-yellow-400";
    } else if (value == 3) {
      return "bg-green-500";
    }
  };
  const getPriorityName = (value) => {
    if (value == 1) {
      return "Critical";
    } else if (value == 2) {
      return "Important";
    } else if (value == 3) {
      return "Normal";
    }
  };
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending

  const sortedTasks = [...task].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.priority - b.priority;
    } else {
      return b.priority - a.priority;
    }
  });
  
  return (
    <div className="flex flex-col p-8 gap-x-8">
    
        <div className="bg-blue-400 text-white p-2 font-bold"> Task List</div>
       
        <div className="flex flex-col bg-slate-200 gap-y-4 p-2 max-h-72 overflow-auto mt-4 ">
          {sortedTasks.map((item) => (
            <div key={item.id} className="flex flex-row gap-x-4 bg-white p-2 rounded-md">
              <div className="w-1/4 font-bold whitespace-nowrap overflow-hidden">{item.name}</div>
              <div className="w-1/4 text-sm">{item.type}</div>
              <div className={` p-1 h-6 text-xs text-white ${getPriority(item.priority)} rounded-md`}>{getPriorityName(item.priority)}</div>
              <div className="w-1/4">hmmmm</div>
            </div>
          ))}
          
        </div>
    
    

    </div>
  );
}
export default Manage;