import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
Modal.setAppElement("#root");
import { HiDocumentDownload } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAttendence,
  approveDeparture,
} from "../../store/admin/adminSlice";

const AttendanceSheet = () => {
  const [selectedJobType, setSelectedJobType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [fileDetailsModalIsOpen, setFileDetailsModalIsOpen] = useState(false);
  const [currentFileDetails, setCurrentFileDetails] = useState(null);
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };

  const dispatch = useDispatch();
  const { data: users } = useSelector((state) => state.admin.getAllAttendence);
console.log(users)
  useEffect(() => {
    dispatch(getAllAttendence());
  }, [dispatch]);

  const handleRegularizationAccept = async () => {
    try {
      const res = await dispatch(
        approveDeparture({
          _id: currentFileId,
          approve: true,
        })
      );
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegularizationReject = async () => {
    try {
      const res = await dispatch(
        approveDeparture({
          _id: currentFileId,
          approve: false,
        })
      );
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const Date_Range = [
    "With a Week",
    "With a Month",
    "Last Month",
    "Select Date Range",
  ];

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOpenModal = (file) => {
    setCurrentFileDetails(file);
    setFileDetailsModalIsOpen(true);
  };

  const handleCloseFileDetailsModal = () => {
    setFileDetailsModalIsOpen(false);
    setCurrentFileDetails(null);
  };

  const openModal = (fileId) => {
    setCurrentFileId(fileId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentFileId(null);
  };

  const handleDateRangeSelect = () => {
    setSelectedJobType("Select Date Range");
    setDatePickerOpen(true);
    setDropdownOpen(false);
  };

  return (
    <div>
      <form
        className="flex items-center mb-4 justify-center mx-auto font-sans"
        style={{ textAlign: "center" }}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        </div>
      </form>

      <div className="flex items-center space-x-3 relative justify-center">
        <button
          id="filterDropdownButton"
          onClick={toggleDropdown}
          className="flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-4 w-4 mr-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          {selectedJobType || "Select Date Range"}
          <svg
            className="-mr-1 ml-1.5 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 w-48 p-3 bg-white rounded-3xl shadow transition duration-300 ease-in-out transform hover:scale-105 font-light text-sm">
            <ul>
              {Date_Range.map((dateRange, index) => (
                <li key={index}>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={() => {
                      if (dateRange === "Select Date Range") {
                        handleDateRangeSelect();
                      } else {
                        setSelectedJobType(dateRange);
                        setDropdownOpen(false);
                      }
                    }}
                  >
                    {dateRange}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {datePickerOpen && (
        <div className="flex justify-center mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-2 text-center text-lg font-medium">
              Select Date Range
            </h2>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 border border-gray-300 rounded"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="p-2 border border-gray-300 rounded"
                placeholderText="End Date"
              />
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setDatePickerOpen(false)}
                className="mt-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Arrival Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Departure Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Regularize
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
              {users?.data?.map((file) => (
                  <tr key={file._id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 text-black-900">
                      {new Date(file.arrivalDate).toLocaleDateString("en-GB", options)}
                    </td>
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-black-900"
                    >
                      {file.name}
                    </th>
                    <td className="px-4 py-3">{file.emailId}</td>
                    <td className={`px-4 py-3`}>{new Date(file.arrivalDate).toLocaleTimeString()}</td>
                    <td className={`px-4 py-3`}>{new Date(file.departureDate).toLocaleTimeString() }</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(file._id)}
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-500"
                      >
                        Regularize
                      </button>
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button
                        onClick={() => handleOpenModal(file)}
                        className="text-blue-700 hover:text-white border border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      >
                        <HiDocumentDownload />
                      </button>
                    </td>

                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Regularization Reason Modal"
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="bg-white rounded-2xl p-6">
                        <button onClick={closeModal}>
                          <AiOutlineCloseCircle />
                        </button>
                        <h2 className="text-lg font-medium mb-4">
                          Early Going Reason..
                        </h2>
                        <div>
                          <p className="py-4">{file?.remarks}</p>
                          <button
                            type="button"
                            onClick={() => handleRegularizationAccept()}
                            className="mt-2 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRegularizationReject()}
                            className="mt-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 ml-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={fileDetailsModalIsOpen}
        onRequestClose={handleCloseFileDetailsModal}
        contentLabel="File Details Modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-2xl p-6 w-1/2">
          {currentFileDetails && (
            <>
              <h2 className="text-lg font-medium mb-4">Attendance Details</h2>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="font-bold py-2">Name:</td>
                    <td className="py-2">{currentFileDetails.username}</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-2">Email:</td>
                    <td className="py-2">{currentFileDetails.email}</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-2">Date:</td>
                    <td className="py-2">{currentFileDetails.arrivalDate}</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-2">Attendance:</td>
                    <td className="py-2">{currentFileDetails.attendance}</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-2">Arrival Time:</td>
                    <td className="py-2">{currentFileDetails.arrivalTime}</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-2">Departure Time:</td>
                    <td className="py-2">{currentFileDetails.departureTime}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() =>
                    window.open(
                      `${BASE_URL}/api/download/${currentFileDetails.pdf}`,
                      "_blank"
                    )
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 mr-2"
                >
                  Download
                </button>
                <button
                  onClick={handleCloseFileDetailsModal}
                  className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AttendanceSheet;
