import React, { useState, useEffect } from 'react';

const CurrentData = () => {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      // Parse the stored data into JavaScript object
      setCurrentData(JSON.parse(storedData));
    }
  }, []);
  const renderTableData = () => {
  
  
    // Filter tableData to only include entries where the selectedDate matches the current date
    const currentDate = new Date().toLocaleDateString('en-GB');
    const filteredData = currentData.filter(data => new Date(data.selectedDate).toLocaleDateString('en-GB') === currentDate);
  
    // Sort filteredData by selectedDate in descending order
    const sortedTableData = [...filteredData].sort((a, b) => {
      return new Date(b.selectedDate) - new Date(a.selectedDate);
    });

    if (sortedTableData.length === 0) {
      // If currentData is empty, render table with 8 columns filled with "-"
      const emptyRow = (
        <tr key="empty-row" className='bg-red-400 font-bold text-white' >
          {[...Array(8)].map((_, idx) => (
              <td className='border text-lg  font-bold text-center py-2 w-36'> {/* Removed px-12 */}
             -
              <hr className="my-1 border-t border-black" />
              -
            </td>
          ))}
        </tr>
      );
      return [emptyRow]; // Return the empty row
    }
  
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
        <tr key={data.id} className={data.id % 2 === 0 ? 'bg-red-400 font-bold text-white' : 'bg-red-400 font-bold text-white'}>
          {/* <td className=' font-bold bg-white text-red-400 text-md text-center py-2 w-36 md:w-36'>{formattedDate}</td> */}
          {paddedNumbers.map((num, idx) => {
            let rightMostDigitSum = '-';
            if (!isNaN(num)) {
              const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
              rightMostDigitSum = digitSum % 10; // Get only the rightmost digit
            }
            return (
              <td key={idx} className='border text-lg  font-bold text-center py-2 w-36'> {/* Removed px-12 */}
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
        {/* Add sum data if needed */}
      </tr>
    );
  
    return [...tableRows, sumRow]; // Concatenate table rows and sum row
  };
  
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <div className='bg-gray-500 px-0'>
      <div className=''>
        {/* <h2 className='text-lg font-semibold mb-4 text-center'>Table Data</h2> */}
        <div className='overflow-x-auto'>
          <h1 className='text-center bg-white font-bold text-xl ' >{formattedDate} </h1>
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
