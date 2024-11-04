import React from "react";
import { Tabs } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import ProjectCard from '../component/ProjectCard';
import { Link } from "react-router-dom";

function Project() {
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,

  };
  const settings2 = {
    ...settings1,
    rows: 1,

  };
  const data = [
    {
      name: "Code with Tuan",
      description: "A new e-commerce platform built with Kanban workflow.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A new e-commerce platform built with Kanban workflow.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Dev with Lan",
      description: "@LanDev",
      avatarUrl: "https://example.com/lan-avatar.jpg",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      width: "100%",
      height: "100%",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
    {
      name: "Code with Tuan",
      description: "A project management tool using Kanban.",
      avatarUrl: "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
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
            label: 'Your Project',
            key: '1',
            children: (
              <div className="w-[85%] lg:w-3/4 mx-auto bg-slate-300 mb-28 pb-12 ">
                <div className="flex flex-row items-center text-2xl">
                  <div className="uppercase font-semibold p-6 basis-5/6">
                    Your Project
                  </div>
                  <div className="bg-blue-600 rounded-md ">
                    <Link className="block text-white px-3 py-1" to="/page/CreateProject">
                      Create Project
                    </Link>
                  </div>
                </div>

                <Slider {...settings1}>
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
            ),
          },
          {
            label: 'Suggest Project',
            key: '2',
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
            label: 'Recruit',
            key: '3',
            children: 'Content of Curr Tab',
          },
        ]}
      />
    </div>
  );
}


export default Project;
