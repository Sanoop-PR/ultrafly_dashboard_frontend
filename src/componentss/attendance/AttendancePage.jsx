import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/api/userApiSlice";
import {
  createAttendance,
  departureAttendance,
  getOneUserAttendence,
} from "../../store/admin/adminSlice";

function AttendancePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [attendance, setAttendance] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isShowDepartureBtn, setIsShowDepartureBtn] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };

  const { data: users } = useSelector((state) => state.users.getAllUsers);
  const { data: attendanceUser } = useSelector(
    (state) => state.admin.getOneUserAttendence
  );
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllUsers());

    if (users.length > 0) {
      setEmail(users[0]?.email);
      dispatch(getOneUserAttendence({ emailId: users[0]?.email }));
      setUsername(users[0]?.username || "");
    }
  }, [dispatch, users]);

  useEffect(() => {
    if (attendanceUser) {
      setArrivalDate(
        attendanceUser.arrivalDate
          ? new Date(attendanceUser.arrivalDate).toLocaleDateString(
              "en-GB",
              options
            )
          : new Date().toLocaleDateString("en-GB", options)
      );
      setArrivalTime(
        attendanceUser.arrivalDate
          ? new Date(attendanceUser.arrivalDate).toLocaleTimeString()
          : new Date().toLocaleTimeString()
      );
      setDepartureDate(
        attendanceUser.departureDate
          ? new Date(attendanceUser.departureDate).toLocaleDateString(
              "en-GB",
              options
            )
          : new Date().toLocaleDateString("en-GB", options)
      );
      setDepartureTime(
        attendanceUser.departureDate
          ? new Date(attendanceUser.departureDate).toLocaleTimeString()
          : new Date().toLocaleTimeString()
      );
      setIsShowDepartureBtn(!!attendanceUser.arrivalDate);

    }
    if (attendanceUser.remarks) {
      setRemarks(attendanceUser.remarks);
    }
    if (attendanceUser.status===true) {
      setisApproved(true);
    }
  }, [attendanceUser, users,attendanceUser.status,!attendanceUser.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        createAttendance({
          emailId: email,
          name: username,
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
      <div className="mx-auto rounded-xl h-fit self-center dark:bg-gray-800/40">
        <form
          onSubmit={isShowDepartureBtn ? updateDepartureSubmit : handleSubmit}
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
            <div className="w-full">
              <label className="dark:text-gray-300">Email</label>
              <input
                value={email}
                type="text"
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="email"
              />
            </div>
            <div className="w-full">
              <label className="dark:text-gray-300">Attendance</label>
              <input
                value={attendance}
                type="text"
                disabled
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Attendance"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-center w-full md:mt-4">
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Arrival Date</label>
              <input
                type="text"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Arrival Date"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Arrival Time</label>
              <input
                type="text"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Arrival Time"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Departure Date</label>
              <input
                type="text"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Departure Date"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Departure Time</label>
              <input
                type="text"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Departure Time"
              />
            </div>
          </div>
          {isShowDepartureBtn && (
            <div className="w-full">
              <label className="mb-2 dark:text-gray-300">Remarks</label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Remarks"
              />
            </div>
          )}

          <div className={`w-full rounded-lg  mt-4 text-white text-lg font-semibold ${isApproved && !attendanceUser.departureDate ? 'bg-green-500':'bg-blue-500'} `}>
            <button type="submit" className="w-full p-2">
              {attendanceUser?.arrivalDate && attendanceUser?.departureDate
                ? "All Completed"
                : isShowDepartureBtn
                ? "Departure Update"
                : "Arrival Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendancePage;
