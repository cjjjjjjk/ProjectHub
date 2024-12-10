import React, { useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { DatePicker, Select, Modal } from "antd";
import dayjs from "dayjs";
import {
  FaCheck,
  FaLessThanEqual,
  FaSquareFontAwesomeStroke,
} from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { useEffect } from "react";
import ReportCard from "./Report";
const TaskDetail = ({ item, checkManager, close, isOpen, update1 }) => {
  // Danh sach comment cua task tu backend
  const commentFromBackend = [
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
      name: "Nguyen Xuan Truong",
    },
    {
      id: 2,
      task_id: 1,
      user_id: 3,
      comment: "vlluon",
      name: "Nguyen Xuan Truong",
    },
    {
      id: 3,
      task_id: 1,
      user_id: 2,
      comment: "abcxyz",
      name: "Nguyen Xuan Truong",
    },
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
      name: "Nguyen Xuan Truong",
    },
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
      name: "Nguyen Xuan Truong",
    },
  ];
  const dummyData = [
    {
      username: "Achootrain",
      avatar: "https://i.imgur.com/VAhQIqV.png",
      description:
        "Project manager overseeing multiple teams for successful project execution.",
      label: "Project Manager",
    },
    {
      username: "Hai",
      avatar: "https://i.imgur.com/btiIFHP.png",
      description:
        "Senior software developer with expertise in backend systems and cloud computing.",
      label: "Senior Developer",
    },
    {
      username: "Truong",
      avatar: "https://i.imgur.com/aJKfWLf.png",
      description:
        "Data analyst focusing on extracting insights from complex datasets to guide business decisions.",
      label: "Data Analyst",
    },
    {
      username: "Viet",
      avatar: "https://i.imgur.com/padyuTG.png",
      description:
        "Quality assurance specialist dedicated to ensuring product excellence and reliability.",
      label: "QA Specialist",
    },
    {
      username: "Tuan",
      avatar: "https://i.imgur.com/Sb3bqmw.png",
      description:
        "UI/UX designer crafting intuitive user experiences and engaging interfaces.",
      label: "UI/UX Designer",
    },
    {
      username: "Hieu",
      avatar: "https://i.imgur.com/Aoja6dx.png",
      description:
        "IT support specialist ensuring smooth operations and resolving technical issues efficiently.",
      label: "IT Support Specialist",
    },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");
  const [inputName, setInputName] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchTaskDetail = async function () {
    try {
      const fetchTaskDetail_res = await axios.get(
        `${process.env.REACT_APP_SERVER}/tasks/find`,
        {
          headers: {
            token,
          },
          params: {
            task_id: item.task_id,
          },
        }
      );
      setName(fetchTaskDetail_res.data.name);
      setDescription(fetchTaskDetail_res.data.description);
      setStartDate(fetchTaskDetail_res.data.start_date);
      setEndDate(fetchTaskDetail_res.data.end_date);
      setPriority(fetchTaskDetail_res.data.priority);
      setInputName(fetchTaskDetail_res.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const [showDescription, setShowDescription] = useState(() => {
    if (description === null || description === "") return false;
    else return true;
  });
  const [showName, setShowName] = useState(false);
  const inputRef = useRef(null);

  // Nhap comment
  const [commentList, setCommentList] = useState(commentFromBackend);
  const [text, setText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Kiểm tra nếu nhấn Enter (không Shift)
      e.preventDefault(); // Ngăn xuống dòng trong textarea
      if (text.trim()) {
        const newComment = {
          id: 1,
          task_id: item.id,
          user_id: 1,
          comment: text.trim(),
          name: "Nguyen Xuan Truong",
        };

        setCommentList([...commentList, newComment]); // Thêm nội dung vào mảng
        setText(""); // Xóa nội dung trong textarea
      }
    }
  };
  // Cal api : Update task==================================== author : Hai

  const UPdateTaskHandle = async () => {
    const updated_task = {
      name,
      description: description,
      start_date: startDate,
      end_date: endDate,
      priority,
    };
    try {
      const updateTask_rs = await axios.put(
        `${process.env.REACT_APP_SERVER}/tasks/update`,
        updated_task,
        {
          headers: {
            token,
          },
          params: {
            project_id: item.project_id,
            task_id: item.task_id,
          },
        }
      );
      update1();
      close();
    } catch (ere) {
      console.log(ere);
    }
  };
  // ========================================================================
  // fetch participants -----------------------------------------------------
  const [joinedFromBackend, setJoinedFromBackend] = useState([]);
  const FetchParticipants = async () => {
    try {
      const fetchParticipants_res = await axios.get(
        `${process.env.REACT_APP_SERVER}/project-joineds/participants`,
        {
          headers: {
            token,
          },
          params: {
            project_id: item.project_id,
          },
        }
      );
      if (!fetchParticipants_res) throw new Error("fetch Prticipants false");
      setJoinedFromBackend(fetchParticipants_res.data.participants);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================================================================
  // assign task <manager only > ---------------------------------------------
  const [assignMap, setAsignMap] = useState([]);
  const handleAssignmap = function (member_id, value) {
    setAsignMap((pre) => ({ ...pre, [member_id]: value }));
  };

  const AssignTask = async function (user_id) {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/tasks/assign-task`,
        {
          task_id: item.task_id,
          user_id,
        },
        {
          headers: {
            token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const RemoveAssign = async function (user_id) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER}/tasks/delete-assign`,
        {
          headers: {
            token,
          },
          params: {
            task_id: item.task_id,
            user_id,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const SaveAssign_handle = function () {
    console.log(assignMap);
    for (const user_id in assignMap) {
      if (assignMap[user_id] === true) {
        AssignTask(user_id);
      } else RemoveAssign(user_id);
    }
    fetMemberTask();
  };
  // =========================================================================
  const [taskmemberList, setTaskmemberList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const peopleList = joinedFromBackend.map((obj) => {
    return { value: obj.name, label: obj.name, id: obj.id };
  });
  // fetch task assigned -----------------------------------------------------
  const fetMemberTask = async function () {
    try {
      const getMember_ids_res = await axios.get(
        `${process.env.REACT_APP_SERVER}/tasks/task-member`,
        {
          headers: {
            token,
          },
          params: {
            task_id: item.task_id,
          },
        }
      );
      const member_id_List = getMember_ids_res.data.member_ids.map(
        (assign) => assign.user_id
      );
      setTaskmemberList(member_id_List);
      setIsFetched(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTaskDetail();
    FetchParticipants();
    fetMemberTask();
  }, []);
  // -------------------------------------------------------------------------

  return (
    <Modal
      open={isOpen && isFetched}
      onCancel={close}
      title={
        <div className="flex flex-row gap-x-2">
          <img
            className="h-10 w-10"
            src="https://i.imgur.com/SKi1VSu.png"
          ></img>
          <div className="text-xl pt-2">Task detail</div>
        </div>
      }
      width={1000}
      footer={null}
      style={{ top: "30px" }} // Aligns the modal to the top of the viewport
    >
      <div className="flex flex-row pl-6">
        <div className="flex h-5/6 flex-col w-2/3">
          <div className=" h-full  overflow-y-auto no-scrollbar px-6 py-4 ">
            {/* Name task*/}
            {!checkManager && (
              <div className=" w-full min-h-10 max-h-[20vh] overflow-y-auto no-scrollbar text-left ">
                <h2 className="text-2xl font-semibold">{name}</h2>
              </div>
            )}

            {showName && checkManager && (
              <button
                className="rounded-md text-left hover:bg-gray-200"
                onClick={() => {
                  setShowName(!showName);
                  setTimeout(() => {
                    if (inputRef.current) {
                      inputRef.current.focus(); // Focus vào input
                    }
                  }, 0);
                }}
              >
                <h2 className="text-2xl font-semibold">{name}</h2>
              </button>
            )}
            {!showName && checkManager && (
              <div className="flex items-center gap-1">
                <input
                  placeholder="Add name"
                  ref={inputRef}
                  type="text"
                  defaultValue={name}
                  className="w-5/6 p-2 resize-y border-2 border-gray-400 text-2xl font-semibold"
                  onChange={(e) => setInputName(e.target.value)}
                ></input>
                <div>
                  <button
                    className="p-2  border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
                    onClick={() => {
                      setName(inputName);
                      setShowName(true);
                    }}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2  border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 "
                    onClick={() => setShowName(true)}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-2">
              <h3 className="font-semibold text-black">Description</h3>

              {!checkManager && (
                <div className=" mt-1  flex justify-start items-start min-h-20 max-h-[30vh] overflow-y-auto no-scrollbar border-2 rounded-lg">
                  <p className="w-full text-left ">{description}</p>
                </div>
              )}

              {showDescription && checkManager && (
                <button
                  className="w-5/6 mt-1  flex justify-start items-start min-h-20 max-h-[30vh] overflow-y-auto no-scrollbar hover:bg-gray-200 border-2 rounded-lg"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <p className="w-full p-2 text-left">{description}</p>
                </button>
              )}
              {!showDescription && checkManager && (
                <div>
                  <textarea
                    className="w-5/6 min-h-20 p-2 resize-y border-2 border-gray-400 "
                    placeholder={
                      description === null || description === ""
                        ? "Add description"
                        : ""
                    }
                    defaultValue={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div></div>
                </div>
              )}
            </div>

            {/* Start date */}
            <div className="flex gap-10 mt-10">
              <div className="">
                <h3 className="font-semibold text-black">Start date</h3>
                <DatePicker
                  defaultValue={
                    startDate !== null ? dayjs(startDate, "YYYY-MM-YY") : ""
                  }
                  format={"DD/MM/YYYY"}
                  onChange={(value) => {
                    setStartDate(value.toDate());
                  }}
                  disabled={!checkManager}
                  allowClear={false} //
                />
              </div>

              <div className="">
                <h3 className="font-semibold text-black">End date</h3>
                <DatePicker
                  defaultValue={
                    endDate !== null ? dayjs(endDate, "YYYY-MM-YY") : ""
                  }
                  format={"DD/MM/YYYY"}
                  onChange={(value) => {
                    setEndDate(value.toDate());
                  }}
                  disabled={!checkManager}
                  allowClear={false} //
                />
              </div>
            </div>

            {/* State */}
            <div className="flex mt-5 flex-row gap-x-12">
              {/* Priority */}
              <div className="w-1/4">
                <h3 className="font-semibold text-black">Priority</h3>
                <Select
                  defaultValue={priority !== null ? priority : ""}
                  style={{
                    width: "100%",

                    borderWidth: 1,
                    borderRadius: "7px",
                  }}
                  dropdownStyle={{ maxHeight: 100 }}
                  onChange={(value) => {
                    setPriority(value);
                  }}
                  disabled={!checkManager}
                >
                  <Select.Option value="1">
                    <div className="text-red-500">Critical</div>{" "}
                  </Select.Option>
                  <Select.Option value="2">
                    <div className="text-yellow-500">Important</div>{" "}
                  </Select.Option>
                  <Select.Option value="3">
                    <div className="text-green-500">Normal</div>{" "}
                  </Select.Option>
                </Select>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-start">
                  <h3 className="font-semibold">
                    {checkManager ? "Assignee" : "Task members"}
                  </h3>
                </div>
                <div className="flex flex-row gap-x-2 ">
                  <div className="flex flex-col items-start max-h-16 overflow-y-auto">
                    {peopleList.map((person) => {
                      if (!(checkManager || taskmemberList.includes(person.id)))
                        return <></>;
                      else
                        return (
                          <div
                            key={person.id}
                            className="mt-[0.3rem] px-[0.5rem] h-[2rem] w-[70%] min-w-[12rem] bg-gray-200 rounded-lg flex items-center"
                          >
                            {checkManager && (
                              <input
                                id={`${person.id}`}
                                type="checkbox"
                                onChange={(e) => {
                                  handleAssignmap(person.id, e.target.checked);
                                }}
                                defaultChecked={taskmemberList.includes(
                                  person.id
                                )}
                              />
                            )}
                            <label
                              htmlFor={`${person.id}`}
                              className="font-semibold ml-[0.5rem] whitespace-nowrap"
                            >
                              {person.value}
                            </label>
                          </div>
                        );
                    })}
                  </div>
                  {checkManager && (
                    <button
                      onClick={SaveAssign_handle}
                      className=" text-center bg-green-500 hover:bg-green-800 rounded-md p-1 text-white font-semibold h-8 mt-1 "
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-6 py-2 font-bold text-xl">Comment</div>
          <div className=" ml-6 bg-gray-100 rounded-lg w-5/6 h-1/2">
            <div className="p-6 border-gray-300 overflow-y-scroll flex flex-col gap-4 max-h-36">
              {/* Add Comment */}
              <div className="">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10">
                    <RxAvatar className="w-10 h-10" />
                  </div>
                  <textarea
                    value={text}
                    className="bg-gray-200 p-2 rounded-lg w-full break-words"
                    placeholder="Write a comment..."
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                </div>
              </div>
              {/* Comment List */}
              {commentList.map((obj, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-10 h-10">
                    <RxAvatar className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold my-1">{obj.name}</h3>
                    <div className="bg-gray-200 p-2 rounded-lg w-full break-words">
                      {obj.comment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-1/3 p-6 border-2">
          <div className="flex flex-row gap-x-2">
            <img
              className="h-10 w-10"
              src="https://i.imgur.com/6cuneNd.png"
            ></img>
            <div className="font-bold text-lg">Report</div>
          </div>
          <div className=" flex flex-col gap-y-4 overflow-x-auto h-[500px] pt-4">
            {dummyData.map((data, index) => (
              <ReportCard
                key={index}
                username={data.username}
                avatar={data.avatar}
                description={data.description}
                label={data.label}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={UPdateTaskHandle}
          className="p-2 w-24 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
        >
          Complete
        </button>
      </div>
    </Modal>
  );
};

export default TaskDetail;
