import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import MonthPicker from '../../components/MonthPicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import AdminNavbar from '../../components/AdminNavbar';
const db = firebase.firestore();
import { useRouter } from 'next/router';
const Spinner = () => (
  <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span class='sr-only'>Loading...</span>
  	<div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
);
const Index = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null); // Add currentUser state
  const [dailySubmitTimeout, setDailySubmitTimeout] = useState(null); // Timeout for daily submission

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Redirect to login page if not logged in
        router.push('/Admin/adminlogin'); // Change '/login' to the appropriate login page route
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    // Calculate milliseconds until next 12:00 AM
    const now = new Date();
    const millisTillMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day
      0, // 12:00 AM
      0, // 0 minutes
      0, // 0 seconds
      0 // 0 milliseconds
    ) - now;
  
    // Set timeout to trigger submission at 12:00 AM
    const timeoutId = setTimeout(() => {
      handleSubmitDaily();
      // Set a new timeout for the next day
      setNextDailySubmitTimeout();
    }, millisTillMidnight);
  
    setDailySubmitTimeout(timeoutId);
  
    return () => {
      // Clear the timeout when component unmounts
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  
  // Function to set the timeout for the next daily submission
  const setNextDailySubmitTimeout = () => {
    // Calculate milliseconds until next 12:00 AM
    const now = new Date();
    const millisTillMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day
      0, // 12:00 AM
      0, // 0 minutes
      0, // 0 seconds
      0 // 0 milliseconds
    ) - now;
  
    // Set timeout to trigger submission at 12:00 AM tomorrow
    const timeoutId = setTimeout(() => {
      handleSubmitDaily();
      // Set a new timeout for the next day
      setNextDailySubmitTimeout();
    }, millisTillMidnight);
  
    setDailySubmitTimeout(timeoutId);
  };
  
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [number, setNumber] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editDocId, setEditDocId] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]); // Fetch data when month or year changes

  const fetchData = async () => {
    try {
      setShowSpinner(true);
      const dataRef = await db.collection('your_collection_name').get();
      const fetchedData = dataRef.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTableData(fetchedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setShowSpinner(false);
    }
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const openModal = (docId = null) => {
    setIsModalOpen(true);
    const editData = tableData.find((data) => data.id === docId);
    if (editData) {
      const { numbers, selectedDate } = editData;
      setNumber(numbers || []);
      setSelectedDate(selectedDate ? new Date(selectedDate) : null);
      setEditDocId(docId);
    } else {
      setNumber([]);
      setSelectedDate(null);
      setEditDocId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNumber([]);
    setSelectedDate(null);
    setEditDocId(null);
  };

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    setNumber((prevNumber) => {
      const newNumber = [...prevNumber];
      newNumber[index] = value;
      return newNumber;
    });
  };

  const handleAddDigit = () => {
    if (number.length < 8) {
      setNumber((prevNumber) => [...prevNumber, '']);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        numbers: number,
        selectedDate: selectedDate ? selectedDate.toISOString() : null,
      };
      await db.collection('your_collection_name').doc(editDocId).update(updatedData);
      toast.success('Data updated successfully!');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Failed to update data.');
    } finally {
      setIsLoading(false);
    }
  };



  const handleSubmitDaily = async () => {
    setIsLoading(true);
    try {
      // Set selectedDate to current date
      const currentDate = new Date();
      setSelectedDate(currentDate);
  
      await db.collection('your_collection_name').add({
        numbers: number,
        selectedDate: currentDate.toISOString(), // Use currentDate instead of selectedDate
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      toast.success('Data submitted successfully!');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to submit data.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await db.collection('your_collection_name').add({
        numbers: number,
        selectedDate: selectedDate ? selectedDate.toISOString() : null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      toast.success('Data submitted successfully!');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to submit data.');
    } finally {
      setIsLoading(false);
    }
  };

  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, index) => 2000 + index);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedTableData = [...tableData].sort((a, b) => {
    return new Date(b.selectedDate) - new Date(a.selectedDate);
  });
  const currentItems = sortedTableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTableData = () => {
    const handleDelete = async (docId) => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        try {
          await db.collection('your_collection_name').doc(docId).delete();
          toast.success('Data deleted successfully!');
          window.location.reload();
          fetchData(); // Refetch data after deletion
        } catch (error) {
          console.error('Error deleting document: ', error);
          toast.error('Failed to delete data.');
        }
      }
    };

    return currentItems.map((data) => {
      const rowNumbers = data.numbers || [];
      const paddedNumbers = Array.from({ length: 8 }, (_, i) => rowNumbers[i] || '-');
      const formattedDate = data.selectedDate
        ? new Date(data.selectedDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '-';

      return (
        <tr key={data.id} className={data.id === editDocId ? 'bg-yellow-200' : data.id % 2 === 0 ? 'bg-gray-200 text-white' : 'bg-gray-500 text-white'}>
          <td className='border px-4 py-2'>{formattedDate}</td>
          {paddedNumbers.map((num, idx) => {
            let rightMostDigitSum = '-';
            if (!isNaN(num)) {
              const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
              rightMostDigitSum = digitSum % 10;
            }
            return (
              <td key={idx} className='border text-center px-4 py-2'>
                {num}
                <hr className="my-1 border-t border-black" />
                {rightMostDigitSum}
              </td>
            );
          })}
          <td className='border px-4 py-2'>
            <button
              className="inline-block px-3 py-1 mr-2 leading-none text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => openModal(data.id)}
            >
              Edit
            </button>
            <button
              className="inline-block px-3 py-1 leading-none text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tableData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='min-h-screen' >
      <AdminNavbar/>
      {showSpinner && <Spinner />}
      <div className=' lg:ml-64 bg-gray-100  p-8'>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="monthPicker" className="text-sm font-medium text-gray-700">
              Select Month:
            </label>
            <MonthPicker
              selectedMonth={selectedMonth}
              onChange={setSelectedMonth}
            />
          </div>
          <div>
            <label htmlFor="yearPicker" className="text-sm font-medium text-gray-700">
              Select Year:
            </label>
            <select
              id="yearPicker"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>


        <button
          className='bg-blue-500 hover:bg-blue-600 text-white  font-bold py-2 px-4 rounded mt-4 mr-0 mt-4'
          onClick={openModal}
        >
          Add Result
        </button>

        {isModalOpen2 && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-full md:w-1/2'>
              <h2 className='text-lg font-semibold mb-4'>Add & Update Contact details and payment qr</h2>
              <div className='flex flex-col space-y-4'>
                <div className='flex justify-between'>
                  <button
                    onClick={closeModal2}
                    className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-full md:w-1/2'>
              <h2 className='text-lg font-semibold mb-4'>Add Number and Select Date</h2>
              <div className='flex flex-col space-y-4'>
                {number.map((digit, index) => (
                  <input
                    key={index}
                    type='text'
                    className='border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                    placeholder={`Enter Digit ${index + 1}`}
                    value={digit || ''}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                ))}

                {number.length < 8 && (
                  <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                    onClick={handleAddDigit}
                  >
                    Add Another Digit
                  </button>
                )}

                <div>
                  <label htmlFor='datePicker' className='text-sm font-medium text-gray-700'>
                    Select Date
                  </label>
                  <DatePicker
                    id='datePicker'
                    className='border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat='MM/dd/yyyy'
                    placeholderText='MM/DD/YYYY'
                  />
                </div>

                <div className='flex justify-between'>
                  <button
                    onClick={closeModal}
                    className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                  >
                    Cancel
                  </button>
                  {editDocId ? (
                    <button
                      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleUpdate}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update'}
                    </button>
                  ) : (
                    <button
                      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='mt-8'>
          <h2 className='text-lg text-black font-semibold mb-4'>Table Data</h2>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='bg-gray-800 text-white' >
                <tr>
                  <th className='px-4 py-2 border'>Date</th>
                  <th colSpan={8} className='px-4 py-2 border text-center'>
                    Numbers
                  </th>
                  <th className='px-4 py-2 border'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </div>
          <div className="mt-4">
            <ul className="flex justify-center">
              {pageNumbers.map((number) => (
                <li key={number} className={`mx-1 px-3 py-1 cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`} onClick={() => paginate(number)}>
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Index;
