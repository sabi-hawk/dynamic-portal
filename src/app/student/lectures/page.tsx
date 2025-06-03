"use client";
import React from "react";
import LectureCard from "./components/LectureCard";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const lectures = [
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 0,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 0,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 0,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 0,
  },
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 1,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 1,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 1,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 1,
  },
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 2,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 2,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 2,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 2,
  },
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 3,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 3,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 3,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 3,
  },
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 4,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 4,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 4,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 4,
  },
  {
    subject: "Chemistry",
    color: "text-green-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 5,
  },
  {
    subject: "English",
    color: "text-orange-500",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 5,
  },
  {
    subject: "Physics",
    color: "text-blue-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 5,
  },
  {
    subject: "Computer",
    color: "text-purple-600",
    time: "10:00 am to 11:30 am",
    roll: "101",
    day: 5,
  },
];

function Lectures() {
  // Group lectures by day
  const lecturesByDay = days.map((_, i) => lectures.filter((l) => l.day === i));

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#5B626B]">
          Time Table
        </h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-2 min-w-[900px]">
            {days.map((day, i) => (
              <div key={day}>
                <div className="font-medium text-center mb-2 text-[#444]">
                  {day}
                </div>
                <div className="flex flex-col gap-2">
                  {lecturesByDay[i].map((lec, idx) => (
                    <LectureCard
                      key={idx}
                      subject={lec.subject}
                      color={lec.color}
                      time={lec.time}
                      roll={lec.roll}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lectures;
