import React from "react";

interface CourseCardProps {
  course: {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
  };
  onClick: () => void;
}

// Helper to get initials from course name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div
      className="group cursor-pointer transition-transform duration-300"
      onClick={onClick}
    >
      <div
        className="bg-gradient-to-br from-[#f5faff] to-[#eaf6ff] rounded-lg overflow-hidden shadow p-8 flex flex-col items-center text-center h-full border border-[#e3eefe] relative transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-[#2989FF]/40"
        style={{ minHeight: 340 }}
      >
        {/* Animated initials circle */}
        <div
          className="w-20 h-20 flex items-center justify-center rounded-full mb-4 text-3xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-200"
          style={{
            background: "linear-gradient(135deg, #2989FF 60%, #22CBCC 100%)",
          }}
        >
          {getInitials(course.name)}
        </div>
        <h3 className="text-lg font-semibold text-[#2989FF] mb-1">
          {course.name}
        </h3>
        <div className="text-xs text-[#888] mb-2">{course.code}</div>
        <p className="text-sm text-[#444] mb-4 line-clamp-2">
          {course.description}
        </p>
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d0e6ff] to-transparent my-4" />
        {/* View Details Button */}
        <button className="mt-auto px-6 py-2 rounded-full bg-[#2989FF] text-white font-semibold shadow transition-all duration-200 hover:bg-[#22CBCC] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2989FF]/40">
          View Details
        </button>
        {/* Optional: icons for actions (commented out for now) */}
        {/* <div className="flex gap-2 mt-3">
          <span className="text-[#2989FF] text-xl"><i className="fas fa-tasks"></i></span>
          <span className="text-[#22CBCC] text-xl"><i className="fas fa-graduation-cap"></i></span>
        </div> */}
      </div>
    </div>
  );
};

export default CourseCard;
