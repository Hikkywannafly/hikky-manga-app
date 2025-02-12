import classNames from "classnames";
import React from "react";

interface InfoItemProps {
    title: string;
    value?: string | number | React.ReactNode;
    className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, value, className }) => {
    return value ? (
        <div className={classNames("text-gray-500", className)}>
            <p className="font-bold">{title}</p>
            <p className="whitespace-pre-line flex flex-row md:flex-col gap-2 font-semibold">
                {value}
            </p>
        </div>
    ) : null;
};

export default InfoItem;
