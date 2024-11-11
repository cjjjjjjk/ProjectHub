import { useParams } from "react-router-dom";
import { RiTimelineView } from "react-icons/ri";
import { HiOutlineViewBoards } from "react-icons/hi";
import Kanban from "../asset/image/kanban.png";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import Board from "../component/Board";
import Timeline from "../component/Timeline";
import ProjectSetting from "../component/ProjectSetting";

function ProjectDetail() {
  const { id } = useParams(); // Access the id parameter from the URL

  const [showTask, setShowTask] = useState(true);
  const [showTimeline, setShowTimeLine] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const handleShowTask = () => {
    setShowTask(true);
    setShowTimeLine(false);
    setShowSetting(false);
  };
  const handleShowTimeline = () => {
    setShowTask(false);
    setShowTimeLine(true);
    setShowSetting(false);
  };
  const handleShowSetting = () => {
    setShowTask(false);
    setShowTimeLine(false);
    setShowSetting(true);
  };
  return (
    <div className="w-full flex">
      <div className=" min-w-72  h-[90vh] border-r-2 border-gray-300 flex flex-col gap-6 ">
        {/* Ten project */}
        <div className="w-full p-4 flex justify-center items-center ">
          <div className=" w-11/12 flex items-center gap-4 justify-center ">
            <img src={Kanban} alt="model" className="h-10 w-10" />
            <div className="w-max-44 overflow-hidden">
              <div className="truncate">Name project</div>
              <div>Model</div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="px-4">
          <ul className="flex flex-col">
            <li>
              <button
                className={`p-2 w-64 h-12 rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300  focus:border-blue-500 ${
                  showTask && "bg-blue-200"
                }`}
                onClick={handleShowTask}
              >
                <HiOutlineViewBoards className="text-2xl" />
                <span>Task</span>
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-64 h-12 rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300  focus:border-blue-500 ${
                  showTimeline && "bg-blue-200"
                }`}
                onClick={handleShowTimeline}
              >
                <RiTimelineView className="text-2xl" />
                <span>Timeline</span>
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-64 h-12 rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300  focus:border-blue-500 ${
                  showSetting && "bg-blue-200"
                }`}
                onClick={handleShowSetting}
              >
                <IoIosSettings className="text-2xl" />
                <span>Setting</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[80vw] h-[90vh]">
        {showTask && <Board />}
        {showTimeline && <Timeline />}
        {showSetting && <ProjectSetting />}
      </div>
    </div>
  );
}

export default ProjectDetail;
