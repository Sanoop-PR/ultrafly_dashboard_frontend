import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/api/userApiSlice";
import {
  createAttendance,
  departureAttendance,
  getOneUserAttendence,
} from "../../store/admin/adminSlice";
import axios from "axios";

function AttendancePage() {
  const [username, setuserame] = useState("");
  const [email, setemail] = useState("");
  const [arrivalDate, setArrivalDate] = useState();
  const [arrivalTime, setArrivalTime] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [departureTime, setDepartureTime] = useState();
  const [attendance, setAttendance] = useState("");
  const [remarks, setReMarks] = useState("");
  //   is employee update arrival then show departure form
  const [isShowdepartureBtn, setisShowdepartureBtn] = useState(false);
  // for the new Date
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };

  const { data: users } = useSelector((state) => state.users.getAllUsers);
  const { data: attendanceUser } = useSelector(
    (state) => state.admin.getOneUserAttendence
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // ---
    dispatch(getAllUsers());
    dispatch(getOneUserAttendence({ emailId: users[0]?.email }));
    // ---
    // if arrival time update then show arival time else show now time
    setArrivalTime(
      attendanceUser?.arrivalTime
        ? attendanceUser?.arrivalTime
        : new Date().toLocaleTimeString()
    );
    setArrivalDate(
      attendanceUser?.arrivalDate
        ? attendanceUser?.arrivalDate
        : new Date().toLocaleDateString("en-GB", options)
    );
    setDepartureTime(
      attendanceUser?.departureTime
        ? attendanceUser?.departureTime
        : new Date().toLocaleTimeString()
    );
    setDepartureDate(
      attendanceUser?.departureDate
        ? attendanceUser?.departureDate
        : new Date().toLocaleDateString("en-GB", options)
    );

    if (users) {
      setuserame(users[0]?.username);
      setemail(users[0]?.email);
    }
    if (attendanceUser) {
      setisShowdepartureBtn(attendanceUser?.arrivalDate ? true : false);
    }
  }, [dispatch, new Date()]);

  const handleSubmit = async (e) => {
    console.log(new Date());
    e.preventDefault();
    try {
      const res = await dispatch(
        createAttendance({
          emailId: email,
          name: username,
          arrivalDate,
          arrivalTime,
          departureDate,
          departureTime,
        })
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } 
  };
  const updateDepartureSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        departureAttendance({
          emailId: email,
          arrivalDate,
          departureDate,
          departureTime,
          remarks,
        })
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" mx-auto  rounded-xl h-fit self-center dark:bg-gray-800/40">
        {/* isShowdepartureBtn ? updateDepartureSubmit : handleSubmit */}
        <form
          onSubmit={isShowdepartureBtn ? updateDepartureSubmit : handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-2 justify-center w-full">
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={username}
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Name"
              />
            </div>
            <div className="w-full ">
              <label className=" dark:text-gray-300">Email</label>
              <input
                value={email}
                type="text"
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="email"
              />
            </div>
            <div className="w-full ">
              <label className=" dark:text-gray-300">Attendance</label>
              <input
                value={attendance}
                type="text"
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Attendance"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-center w-full md:mt-4 ">
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Arrival Date</label>
              <input
                type="text"
                value={arrivalDate}
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Arrival Date"
              />
            </div>
            <div className="w-full ">
              <label className="mb-2 dark:text-gray-300">Arrival Time</label>
              <input
                type="text"
                value={arrivalTime}
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="time"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Departure Date</label>
              <input
                type="text"
                value={departureDate}
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Departure Date"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Departure Time</label>
              <input
                type="text"
                value={departureTime}
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="time"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="mb-2 dark:text-gray-300">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setReMarks(e.target.value)}
              className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
              placeholder="Remarks"
            />
          </div>

          <div className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600  mt-4 text-white text-lg font-semibold">
            <button type="submit" className="w-full p-2">
              {attendanceUser?.arrivalDate && attendanceUser?.departureDate ? ('All Completed'):isShowdepartureBtn?('Departure Update'):'Arrival Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendancePage;
