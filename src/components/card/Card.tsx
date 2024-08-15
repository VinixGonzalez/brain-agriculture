import React from "react";

type CardProps = {
  children?: React.ReactNode;
  title?: string;
  titleIcon?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  children,
  title,
  titleIcon,
  className,
}) => {
  return (
    <div
      className={`shadow-lg border border-gray-200 p-4 rounded-lg bg-white ${className}`}
    >
      {title && (
        <>
          <div className={`flex items-center gap-2 `}>
            {titleIcon && <div>{titleIcon}</div>}
            <p className="text-xl">{title}</p>
          </div>
          <hr className="w-full" />
        </>
      )}
      {children}
    </div>
  );
};

export { Card };
