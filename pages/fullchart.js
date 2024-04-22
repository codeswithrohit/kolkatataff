import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
const db = firebase.firestore();
const CurrentData = () => {

    const [tableData, setTableData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to get the current date in "DD/MM/YYYY" format
    const getCurrentDate = () => {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };

    // Set current date on component mount
    setCurrentDate(getCurrentDate());
  }, []);
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
  const renderTableData = () => {
    // Sort tableData by selectedDate in descending order
    const sortedTableData = [...tableData].sort((a, b) => {
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
        <tr key={data.id} className={data.id % 2 === 0 ? 'bg-gray-200 text-white' : 'bg-gray-500 text-white'}>
          <td className=' font-bold bg-white text-red-400 px-4 py-2'>{formattedDate}</td>
          {paddedNumbers.map((num, idx) => {
            let rightMostDigitSum = '-';
            if (!isNaN(num)) {
              const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
              rightMostDigitSum = digitSum % 10; // Get only the rightmost digit
            }
            return (
              <td key={idx} className='border text-center px-12 py-2'>
                {num}
                <hr className="my-1 border-t border-black" />
                {rightMostDigitSum}
              </td>
            );
          })}

      
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
    <div className='bg-gray-500 px-0'>
            {showSpinner && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 animate-spin"
            viewBox="0 0 16 16">
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
          </svg>
        </div>
      )}
      <div className=''>
        {/* <h2 className='text-lg font-semibold mb-4 text-center'>Table Data</h2> */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead></thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentData;
