import React, { useEffect, useImperativeHandle, useState } from "react";
import { Tabs } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import ProjectCard from "../component/ProjectCard";
import CreateProject from "./CreateProject";
import axios from "axios";

function Project() {
  const settings1 = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 1,
    centerMode: false,
  };
  const settings2 = {
    ...settings1,
    rows: 1,
  };

  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  // Fetch data =================================== author:  Hai
  const [userjoinedData, setUserJoinedData] = useState([])

  const fetchData = async function () {
    try {
      const token = sessionStorage.getItem('token')
      if (!token) throw new Error('Fetch projects data err: Can not get token from sesstion storage !')

      // user joined projects --------------------------------
      const res_userJoinedProjects = await axios.get(`${process.env.REACT_APP_SERVER}/projects/user`, {
        headers: {
          token: `${token}`
        }
      })
      // suggest projects ------------------------------------

      // recruit ---------------------------------------------


      setUserJoinedData(res_userJoinedProjects.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  // ===========================================================
  // thay bang data fecth tu server
  const data = [
    {
      name: "Code with Tuan",
      description: "ProjectHub is a collaborative project management platform designed to streamline the workflow of teams and individuals. It combines powerful tools for planning, tracking, and managing tasks and deadlines in one intuitive interface. With ProjectHub, users can join or create projects, share updates, and keep track of goals and milestones.",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    }, {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
  ];

  return (
    <div className="">
      <Tabs
        type="card"
        tabBarStyle={{
          marginLeft: "auto", // Đẩy tab sang bên phải
          display: "flex",
          marginRight: 100,
          marginTop: 20,
        }}
        items={[
          {
            label: "Your Project",
            key: "1",
            children: (
              <div className="w-[85%] lg:w-3/4 mx-auto bg-slate-300 mb-28 pb-12 rounded-md">
                <div className="flex flex-row items-center text-2xl">
                  <div className="uppercase font-semibold p-6 basis-5/6">
                    Your Project
                  </div>
                  <div className="bg-blue-600 rounded-md ">
                    <button
                      className="block text-sm text-white px-3 py-1"
                      onClick={handleShowCreate}
                    >
                      Create Project
                    </button>
                  </div>
                </div>

                <Slider {...settings1}>
                  {userjoinedData.map((item) => (
                    <ProjectCard
                      name={item.name}
                      description={item.description}
                      avatarUrl={item.avatarUrl}
                      width={item.width}
                      height={item.height}
                      startDate={item.startDate}
                      endDate={item.endDate}
                    />
                  ))}
                </Slider>
              </div>
            ),
          },
          {
            label: "Suggest Project",
            key: "2",
            children: (
              <div className="w-[85%] lg:w-3/4 mx-auto ">
                <div className="border-[2px] border-black mb-14 pb-12">
                  <h1 className="uppercase font-semibold text-2xl p-6">
                    Suggest Project
                  </h1>
                  <Slider {...settings2}>
                    {data.map((item) => (
                      <ProjectCard
                        name={item.name}
                        description={item.description}
                        avatarUrl={item.avatarUrl}
                        width={item.width}
                        height={item.height}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        model={item.model}
                      />
                    ))}
                  </Slider>
                </div>

                <div>
                  <h1 className="uppercase font-semibold text-2xl p-6">
                    Other Project
                  </h1>
                </div>
                <div className="grid grid-cols-3 grid-auto-rows-auto gap-y-10 gap-x-5 pb-4">
                  {data.map((item) => (
                    <div className="otherCard">
                      <ProjectCard
                        name={item.name}
                        description={item.description}
                        avatarUrl={item.avatarUrl}
                        width={item.width}
                        height={item.height}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        model={item.model}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            label: "Recruit",
            key: "3",
            children: "Content of Curr Tab",
          },
        ]}
      />
      {showCreate && (
        <div>
          <CreateProject event={handleShowCreate} />
        </div>
      )}
    </div>
  );
}

export default Project;
