import React from "react";

interface LectureCardProps {
  subject: string;
  color: string;
  time: string;
  roll: string;
}

const LectureCard: React.FC<LectureCardProps> = ({
  subject,
  color,
  time,
  roll,
}) => (
  <div
    className={`bg-white border border-[#ececec] rounded-lg shadow-sm p-4 text-center min-w-[60px] min-h-[180px] flex flex-col justify-center mb-4`}
    style={{ boxShadow: "0 6px 24px 0 rgba(44,62,80,0.18)" }}
  >
    <div className={`font-bold mb-1 ${color}`}>Subject: {subject}</div>
    <div className="text-sm text-[#222] mb-1">{time}</div>
    <div className="text-xs text-[#bbb]">Roll No: {roll}</div>
  </div>
);

export default LectureCard;
