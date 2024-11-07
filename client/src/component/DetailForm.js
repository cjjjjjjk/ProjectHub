import React, { useState } from "react";

import { DatePicker, Form, Input, Select } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const DetailForm = ({ item, event }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("");
  const model = item.name;
  

  return (
    <div className="flex gap-10">
      <div className="p-4 mt-10 w-3/5">
        <Form
          labelCol={{
            span: 6,
          }}
          className=""
        >
          <Form.Item label="Project name"
          
          >
            <Input
              className="border-black "
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Model">
            <Select
              defaultValue={item.name}
              disabled
              style={{
                width: "30%",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: "5px",
              }}
            ></Select>
          </Form.Item>
          <Form.Item label="Timeline">
            <RangePicker
              className="border-black"
              format={"DD/MM/YYYY"}
              onChange={(value) => {
                setStartDate(value[0].$d);
                setEndDate(value[1].$d);
              }}
            />
          </Form.Item>
          <Form.Item label="State">
            <Select
              style={{
                width: "30%",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setState(e);
              }}
            >
              <Select.Option value="Private">Private</Select.Option>
              <Select.Option value="Public">Public</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Code">
            <Input
              className="border-black"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              rows={4}
              className="border-black"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="px-10 py-4 mt-10 w-2/5 flex flex-col justify-between">
        <div>
          <div className="px-2 flex justify-between">
            <h2 className="px-4 py-2">Model</h2>

            {/* Quay ve trang ban dau */}
            <button
              className="px-4 py-2 rounded-lg hover:bg-gray-300"
              onClick={event}
            >
              Change model
            </button>
          </div>
          <div className="bg-white border-2  w-full rounded-3xl flex items-center ">
            <div
              className=" h-20 w-24 rounded-l-3xl flex justify-center items-center "
              style={{ backgroundColor: "#D6EEF2" }}
            >
              <img src={item.icon} alt="" className="w-2/3 h-2/3"></img>
            </div>
            <div className="p-4 w-2/3 flex flex-col items-start">
              <h2>{item.name}</h2>
            </div>
          </div>
        </div>

        {/* Nut chuyen sang buoc ke tiep */}
        <div className="flex justify-end items-end">
          <button className="py-2 px-4 bg-blue-600 rounded-md text-white shadow-transparent shadow-lg hover:shadow-blue-300">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
