import React, { useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { FaCheck, FaLessThanEqual, FaSquareFontAwesomeStroke } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import axios from 'axios'
import { useEffect } from "react";

const TaskDetail = ({ item, event, checkManager }) => {
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

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [startDate, setStartDate] = useState(item.start_date);
  const [endDate, setEndDate] = useState(item.end_date);
  const [priority, setPriority] = useState(item.priority);

  const [inputName, setInputName] = useState(name);
  const [inputDescription, setInputDescription] = useState(description);

  const [showDescription, setShowDescription] = useState(() => {
    if (description === null || description === "") return false;
    else return true;
  });
  const [showName, setShowName] = useState(() => {
    if (name === null || name === "") return false;
    else return true;
  });
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
  const token = sessionStorage.getItem('token');
  const UPdateTaskHandle = async () => {
    const updated_task = {
      name, description,
      start_date: startDate,
      end_date: endDate,
      priority
    }
    try {
      const updateTask_rs = await axios.put(`${process.env.REACT_APP_SERVER}/tasks/update`, updated_task, {
        headers: {
          token
        },
        params:
        {
          project_id: item.project_id,
          task_id: item.task_id
        }
      })
      console.log(updateTask_rs)
    } catch (ere) { console.log(ere) }
  }
  // ========================================================================
  // fetch participants -----------------------------------------------------
  const [joinedFromBackend, setJoinedFromBackend] = useState([])
  const FetchParticipants = async () => {
    try {
      const fetchParticipants_res = await axios.get(`${process.env.REACT_APP_SERVER}/project-joineds/participants`, {
        headers: {
          token
        },
        params: {
          project_id: item.project_id
        }
      })
      if (!fetchParticipants_res) throw new Error("fetch Prticipants false")
      setJoinedFromBackend(fetchParticipants_res.data.participants)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    FetchParticipants()
  }, [])
  // =========================================================================
  // assign task <manager only > ---------------------------------------------
  const [assignMap, setAsignMap] = useState([])
  const handleAssignmap = function (member_id, value) {
    setAsignMap((pre) => ({ ...pre, [member_id]: value }))
  }

  const AssignTask = async function (user_id) {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/tasks/assign-task`,
        {
          task_id: item.task_id,
          user_id
        }, {
        headers: {
          token
        }
      })
    } catch (err) { console.log(err) }
  }
  const RemoveAssign = async function (user_id) {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/tasks/delete-assign`, {
        headers: {
          token
        },
        params: {
          task_id: item.task_id,
          user_id
        }
      })
    } catch (err) { console.log(err) }
  }
  const SaveAssign_handle = function () {
    console.log(assignMap)
    for (const user_id in assignMap) {
      if (assignMap[user_id] === true) {
        AssignTask(user_id)
      } else RemoveAssign(user_id)
    }
    fetMemberTask()
  }
  // =========================================================================
  const [taskmemberList, setTaskmemberList] = useState([])
  const peopleList = joinedFromBackend.map((obj) => {
    return { value: obj.name, label: obj.name, id: obj.id };
  })
  // fetch task assigned -----------------------------------------------------
  const fetMemberTask = async function () {
    try {
      const getMember_ids_res = await axios.get(`${process.env.REACT_APP_SERVER}/tasks/task-member`, {
        headers: {
          token
        },
        params: {
          task_id: item.task_id
        }
      })
      const member_id_List = getMember_ids_res.data.member_ids.map((assign) => assign.user_id)
      setTaskmemberList(member_id_List)
    } catch (err) { console.log(err) }
  }
  useEffect(() => {
    fetMemberTask()
  }, [])
  // -------------------------------------------------------------------------

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center">
      <div className="h-[80vh] w-[70vw] min-h-96 rounded-3xl bg-neutral-50">
        {/* Title */}
        <div className="p-2 flex justify-between bg-gradient-to-r from-purple-800 via-blue-600 to-purple-400 overflow-hidden rounded-t-3xl">
          <div className="p-2 flex items-center justify-center">
            <h2 className="font-bold text-2xl text-white">Task Detail</h2>
          </div>
          <div className="p-2">
            <button onClick={event}>
              <IoCloseOutline className="text-3xl font-bold text-gray-950 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex h-5/6 relative">
          <div className="w-2/3 h-full  overflow-y-auto no-scrollbar px-6 py-4 ">
            {/* Name task*/}
            {!checkManager && (
              <div className=" w-full min-h-10 max-h-[20vh] overflow-y-auto no-scrollbar text-left ">
                <h2 className="text-2xl font-semibold">{name}</h2>
              </div>
            )}

            {showName && checkManager && (
              <button
                className=" w-full min-h-10 max-h-[20vh] overflow-y-auto no-scrollbar text-left hover:bg-gray-200"
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
                    className="p-2   border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 "
                    onClick={() => setShowName(true)}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-semibold text-black">Description</h3>

              {!checkManager && (
                <div className="w-5/6 mt-1  flex justify-start items-start min-h-20 max-h-[30vh] overflow-y-auto no-scrollbar border-2 rounded-lg">
                  <p className="w-full text-left">{description}</p>
                </div>
              )}

              {showDescription && checkManager && (
                <button
                  className="w-5/6 mt-1  flex justify-start items-start min-h-20 max-h-[30vh] overflow-y-auto no-scrollbar hover:bg-gray-200 border-2 rounded-lg"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <p className="w-full text-left">{description}</p>
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
                    onChange={(e) => setInputDescription(e.target.value)}
                  ></textarea>
                  <div>
                    <button
                      className="p-2 w-20 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
                      onClick={() => {
                        setShowDescription(true);
                        setDescription(inputDescription);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="p-2 ml-4 w-20 border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 "
                      onClick={() => setShowDescription(true)}
                    >
                      Cancel
                    </button>
                  </div>
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
                />
              </div>
            </div>

            {/* State */}
            <div className="flex gap-12 mt-5">
              {/* Priority */}
              <div className="w-36">
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
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          {/*Assignee */}
          <div className="w-1/3 h-full  overflow-y-auto no-scrollbar px-6 py-4 border-l-2 relative mt-4 bg-gray-100 rounded-b-md">
            <div className="flex flex-col h-auto w-full">
              <div className="flex justify-start">
                <h3 className="font-semibold">{checkManager ? "Assignee" : "Task members"}</h3>
              </div>
              <div className="flex flex-col items-start">
                {peopleList.map((person) => (
                  <div key={person.id} className="mt-[0.3rem] px-[0.5rem] h-[2rem] w-[70%] min-w-[12rem] bg-gray-200 rounded-lg flex items-center">
                    {checkManager && <input id={`${person.id}`} type="checkbox"
                      onChange={(e) => { handleAssignmap(person.id, e.target.checked) }}
                      defaultChecked={taskmemberList.includes(person.id)} />}
                    <label htmlFor={`${person.id}`} className="font-semibold ml-[0.5rem] whitespace-nowrap">{person.value}</label>
                  </div>
                ))}
                {checkManager && <button
                  onClick={SaveAssign_handle}
                  className="mt-[1rem] h-[2rem] text-center bg-green-300 hover:bg-green-500 rounded-full w-auto px-[1rem] font-semibold ">Save</button>}
              </div>
            </div>
            {/* Comment */}
            <div className="mt-[1rem] border-t-2 pt-4 border-gray-300 w-80 h-2/3 overflow-y-scroll flex flex-col gap-4">
              {commentList.map((obj) => {
                return (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10">
                      <RxAvatar className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-semibold my-1">{obj.name}</h3>
                      <div className="bg-gray-200 p-2 rounded-lg min-w-56 max-w-56 break-words break-all">
                        {obj.comment}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* add comment */}
            <div className="absolute bottom-4 left-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10">
                  <RxAvatar className="w-10 h-10" />
                </div>
                <textarea
                  value={text}
                  className="bg-gray-200 p-2 rounded-lg min-w-56 max-w-56 break-words break-all"
                  placeholder="Comment"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                ></textarea>
              </div>
            </div>
          </div>
          {/* Save */}
          <button onClick={UPdateTaskHandle}
            className="p-2 w-24 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500  absolute bottom-0 right-1/3 mr-10">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
