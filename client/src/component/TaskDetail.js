import React, { useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
const TaskDetail = ({ item, event }) => {
  // Danh sach comment cua task tu backend
  const commentFromBackend = [
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
    },
    {
      id: 2,
      task_id: 1,
      user_id: 3,
      comment: "vlluon",
    },
    {
      id: 3,
      task_id: 1,
      user_id: 2,
      comment: "abcxyz",
    },
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
    },
    {
      id: 1,
      task_id: 1,
      user_id: 1,
      comment:
        "ahihi sdFesfawefweahihis dFesfawefwe ahihisdFesf awefweahi hisdF esfawefwe",
    },
  ];

  //danh sach nguoi da tham gia
  const joinedFromBackend = [
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Truong",
    },
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "nguyen cuan Truong",
    },
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Who am I",
    },
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Wheo am I",
    },
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Whqo am I",
    },
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Wrho am I",
    },
  ];
  const peopleList = joinedFromBackend.map((obj) => {
    return { value: obj.name, label: obj.name };
  });

  // bien kiem tra xem có phai manager ko
  const [checkManager, setCheckManager] = useState(true);

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [startDate, setStartDate] = useState(item.start_date);
  const [endDate, setEndDate] = useState(item.end_date);
  const [status, setStatus] = useState(item.status);
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
        };

        setCommentList([...commentList, newComment]); // Thêm nội dung vào mảng
        setText(""); // Xóa nội dung trong textarea
      }
    }
  };
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
              <div className=" w-36">
                <h3 className="font-semibold text-black">Status</h3>
                <Select
                  defaultValue={status !== null ? status : ""}
                  style={{
                    width: "100%",

                    borderWidth: 1,
                    borderRadius: "7px",
                  }}
                  dropdownStyle={{ maxHeight: 100 }}
                  onChange={(value) => {
                    setStatus(value);
                  }}
                  disabled={!checkManager}
                >
                  <Select.Option value="opt1">Opt1</Select.Option>
                  <Select.Option value="opt2">opt2</Select.Option>
                </Select>
              </div>

              {/* Priority */}
              <div className="w-36">
                <h3 className="font-semibold text-black">Priority</h3>
                <Select
                  defaultValue={priority !== null ? status : ""}
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

          <div className="w-1/3 h-full  overflow-y-auto no-scrollbar px-6 py-4 border-l-2 relative mt-4 bg-gray-100 rounded-b-md">
            {/* type */}
            {/* <div className="">
              <Select
                size="large"
                defaultValue={type}
                style={{
                  width: 160,
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: "9px",
                  height: 36,
                  fontSize: "18px",
                }}
                dropdownStyle={{ maxHeight: 100 }}
                options={Object.values(column).map((column) => ({
                  value: column.title,
                  label: column.title,
                }))}
                onChange={(value) => {
                  setType(value);
                }}
              />
            </div> */}

            {/* Assignee */}
            <div className=" grid grid-cols-3">
              <div className="flex justify-start items-center">
                <h3>Assignee</h3>
              </div>
              <div className="col-span-2">
                <Select
                  size="large"
                  style={{
                    width: 200,

                    height: 36,
                    fontSize: "18px",
                  }}
                  listHeight={100}
                  options={peopleList}
                  disabled={!checkManager}
                />
              </div>
            </div>

            {/* Comment */}
            <div className="mt-10 border-t-2 pt-4 border-gray-300 w-80 h-2/3 overflow-y-scroll flex flex-col gap-4">
              {commentList.map((obj) => {
                return (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10">
                      <RxAvatar className="w-10 h-10" />
                    </div>
                    <div className="bg-gray-200 p-2 rounded-lg min-w-56 max-w-56 break-words break-all">
                      {obj.comment}
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
          <button className="p-2 w-24 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500  absolute bottom-0 right-1/3 mr-10">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
