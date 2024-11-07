import React from 'react';
import { Card, Avatar } from 'antd';

const ProjectCard = ({
    name,
    description,
    avatarUrl,
    width,
    height,
    startDate,
    endDate,
   
}) => {
    return (
        <div style={{ width: width, height: height }}>
            <Card
                className=" "
                hoverable={true}
                cover={
                   <img src="https://i.imgur.com/49caWH8.jpeg" style={{ height: "170px", objectFit: "cover" }} ></img>
                }
            >
                <div className="mt-[-55px] mb-4 ">
                    <Card.Meta
                        className="flex flex-col"
                        avatar={<Avatar src={avatarUrl} size={64} />}
                        title={name}

                    />
                </div>
                <div className='info'>
                    <div className="text-start text-sm text-gray-700 space-y-1">
                    <p className=" text-black overflow-hidden text-ellipsis line-clamp-3">
                        {description}  
                    </p>
                        <p className="text-sm font-thin">Start Date: {startDate}</p>
                        <p className="text-sm font-thin">End Date: {endDate}</p>
                 
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;
