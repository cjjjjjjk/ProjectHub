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
    model
}) => {
    return (
        <div style={{ width: width, height: height }}>
            <Card
                className="text-center"
                hoverable={true}
                cover={
                    <div className="bg-[#4db6c3] h-28  pt-5">
                        Ant Design Card
                    </div>
                }
            >
                <div className="mt-[-55px] mb-4">
                    <Card.Meta
                        className="flex flex-col"
                        avatar={<Avatar src={avatarUrl} size={64} />}
                        title={name}

                    />
                </div>
                <div className="text-start text-sm text-gray-700 space-y-1">
                    <p className="font-bold  overflow-hidden whitespace-nowrap text-ellipsis">{description}</p>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                    <p>Model: {model}</p>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;
