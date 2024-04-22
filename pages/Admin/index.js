import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import MonthPicker from '../../components/MonthPicker'; // Import the MonthPicker component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const db = firebase.firestore();

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editDocId, setEditDocId] = useState(null); // Track the document ID being edited
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setShowSpinner(true);
      const dataRef = await db.collection('your_collection_name').get();
      const fetchedData = dataRef.docs.map((doc) => {
        return {
          id: doc.id, // Include document ID
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

  const renderTableData = () => {
    // Filter tableData based on selectedMonth and selectedYear
    let filteredData = tableData;
    if (selectedMonth !== null) {
      filteredData = filteredData.filter((data) => {
        const date = new Date(data.selectedDate);
        return date.getMonth() + 1 === selectedMonth;
      });
    }
    if (selectedYear !== null) {
      filteredData = filteredData.filter((data) => {
        const date = new Date(data.selectedDate);
        return date.getFullYear() === selectedYear;
      });
    }

    // Sort filteredData by selectedDate in descending order
    const sortedTableData = [...filteredData].sort((a, b) => {
      return new Date(b.selectedDate) - new Date(a.selectedDate);
    });

    // Calculate sum for each digit and their individual sums
    const digitSums = Array.from({ length: 8 }, () => 0); // Initialize array with 0s
    const individualSums = Array.from({ length: 8 }, () => 0); // Initialize array with 0s

    sortedTableData.forEach((data) => {
      const rowNumbers = data.numbers || [];
      rowNumbers.forEach((num, idx) => {
        if (!isNaN(num)) {
          const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
          individualSums[idx] += digitSum; // Add individual digit sum to the array
          digitSums[idx] += parseInt(num) || 0; // Add number to sum if it's a valid number
        }
      });
    });

    // Render table rows
    const tableRows = sortedTableData.map((data) => {
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
              rightMostDigitSum = digitSum % 10; // Get only the rightmost digit
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
            <button className="text-blue-500" onClick={() => openModal(data.id)}>Edit</button>
          </td>
        </tr>
      );
    });

    // Render sum row
    const sumRow = (
      <tr key="sum" className="bg-gray-300">
      
      </tr>
    );

    return [...tableRows, sumRow]; // Concatenate table rows and sum row
  };

  return (
    <div className='bg-gray-100 min-h-screen p-8'>
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
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={openModal}
      >
        Add Number
      </button>

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
        <h2 className='text-lg font-semibold mb-4'>Table Data</h2>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead>
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
      </div>

      {showSpinner && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='text-white'>Loading...</div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Index;
