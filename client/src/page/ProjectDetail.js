import { useParams } from "react-router-dom";
import { RiTimelineView } from "react-icons/ri";
import { HiOutlineViewBoards } from "react-icons/hi";
import Kanban from "../asset/image/kanban.png";
function ProjectDetail() {
  const { id } = useParams(); // Access the id parameter from the URL

  return (
    <div className="w-full ">
      <div className="w-1/6 h-[90vh] border-r-2 border-gray-300 fixed">
        {/* Ten project */}
        <div className="h-1/6 w-full p-4 flex justify-center items-center overflow-hidden">
          <div className="h-2/3 w-11/12 flex items-center gap-4 border-2 ">
            <img src={Kanban} alt="Image model" className="h-10 w-10" />
            <div>
              <div>Name project</div>
              <div>Model</div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div>
          <ul>
            <li>
              <button>
                <RiTimelineView />
                <span>Time line</span>
              </button>
            </li>
            <li>
              <button>
                <HiOutlineViewBoards />
                <span>Board</span>
              </button>
            </li>
            <li>
              <button>Other</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
