import React from 'react';
import { Card, Avatar } from 'antd';

const ProjectCard = ({
    name,
    description,
    avatarUrl,
    startDate,
    endDate,
}) => {
    const getStartDate = () => {
        if (startDate) {
            return startDate;
        }
        return "Not specified";
    }
    const getEndDate = () => {
        if (endDate) {
            return endDate;
        }
        return "Not specified";
    }
    const getAvatarUrls = () => {
        const safeAvatarUrl = Array.isArray(avatarUrl) ? avatarUrl : [];

        return safeAvatarUrl.map(url => {
            return url && url !== "" ? url : 'https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain';
        });
    };

    const avatarList = getAvatarUrls(); // Safe avatar URL list

    return (
        <div >
            <Card
                className=""
                hoverable={true}
                cover={
                   <img src="https://i.imgur.com/49caWH8.jpeg" style={{ height: "170px", objectFit: "cover" }} ></img>
                }
            >
                <div className="mt-[-55px] mb-4 ">
                    <Card.Meta
                        className="flex flex-col"
                        avatar={<Avatar.Group  max={{
                            count: 2,
                            style: {
                              backgroundColor:'#0096FF',
                            },
                          }}>
                        
                        {avatarList.map((url, index) => (
                          <Avatar key={index} src={url} size={40} />
                        ))}

                            
                        </Avatar.Group>}
                        title={name}
                    />
                </div>
                <div className='info'>
                    <div className="text-start text-sm text-gray-700 space-y-1">
                    <p className=" text-black overflow-hidden text-ellipsis line-clamp-3">
                        {description}  
                    </p>
                        <p className="text-sm font-thin">Start Date: {getStartDate()}</p>
                        <p className="text-sm font-thin">End Date: {getEndDate()}</p>
                 
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;
