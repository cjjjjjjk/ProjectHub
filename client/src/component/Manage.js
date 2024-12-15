import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from 'antd';
const Manage = ({ task,project_id }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div className="font-semibold">{text}</div>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      sorter: (a, b) => a.priority - b.priority, // Sort based on the priority value
      render: (priority) => {
        let color;
        let label;
        if (priority === '1') {
          color = 'red';
          label = 'High';
        } else if (priority === '2') {
          color = 'yellow';
          label = 'Medium';
        } else {
          color = 'green';
          label = 'Low';
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const color = 'blue';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB'); // 'en-GB' formats to dd/mm/yyyy
        return formattedDate;
      },
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => new Date(a.end_date || 0) - new Date(b.end_date || 0), // Handle null end dates
      render: (date) => {
        if (!date) return 'N/A';
        const formattedDate = new Date(date).toLocaleDateString('en-GB'); // 'en-GB' formats to dd/mm/yyyy
        return formattedDate;
      },
    },
  ];
  const columns2 = [
    {
      title: 'User Name',
      dataIndex: 'User',  // Pass the 'User' object to render function
      key: 'userName',
      render: (user) => 
      <div className="font-semibold flex flex-row gap-x-2 bg-slate-200 p-2 rounded-md">
        <img src={user.avatar} className="w-8 h-8"></img>
        <div>{user?.name}</div></div>,  // Access 'name' from the 'User' object
    },
    {
      title: 'Content',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span className="line-clamp-2">{text}</span>, // Truncate long text if needed
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      render: (label) => {
        const color = 'blue';
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Attachment',
      dataIndex: 'attachment',
      key: 'attachment',
      render: (attachment) => (
        <a href={attachment} target="_blank" rel="noopener noreferrer" className="text-blue-500 overflow-hidden">
        {attachment? attachment: 'N/A'}
        </a>
      ),
    },
  ];
  const [avatarList, setAvatarList] = useState([]);
  const [render, setRender] = useState(false);
  const FetchParticipants = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const fetchParticipants_res = await axios.get(
        `${process.env.REACT_APP_SERVER}/project-joineds/joiner`,
        {
          headers: {
            token,
          },
          params: {
            project_id: project_id,
          },
        }
      );
      const participants = fetchParticipants_res.data;
      const avatars = participants.map(item => item.User.avatar).filter(avatar => avatar); // Filters out empty avatars
      setAvatarList(avatars);
      setRender(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [reports, setReports] = useState([]);
  const FetchReport= async () => {
    const token = sessionStorage.getItem('token');
    const reports = await axios.get(
      `${process.env.REACT_APP_SERVER}/reports/allReport`,
      {
        headers: {
          token,
        },
        params: {
          project_id: project_id,
        },
      }
    );
    setReports(reports.data);
  }

  useEffect(() => {
    FetchReport();
    FetchParticipants();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-x-8">
      <div className='flex flex-row'>
        <img src="https://i.imgur.com/tqPg4ql.png" className="w-10 h-10"></img>
        <div className="font-semibold text-xl p-2">Task List</div>
        <div className="pl-10">
        {render&&(<Avatar.Group  
        max={{count: 8,
            style: {
              backgroundColor:'#0096FF',
            },
          }}>
        
        {avatarList.map((url, index) => (
          <Avatar key={index} src={url} size={40} />
        ))}
        </Avatar.Group>)}
      </div>

      </div>
      <Table
        columns={columns}
        dataSource={task}
        rowKey="id"
        className=""
        scroll={{ y: 55 * 5 }}
      />
      <div className='flex flex-row'>
        <img src="https://i.imgur.com/ByeHeMx.png" className="w-10 h-10"></img>
        <div className="font-semibold text-xl p-2">Report List</div>
      </div>
      <Table
      columns={columns2}
      dataSource={reports}
      rowKey="id"
      scroll={{ y: 55 * 5 }}

    />


    </div>
  );
};

export default Manage;
