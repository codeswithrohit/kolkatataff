import React, { useState, useEffect } from 'react';

const CurrentMonthData = ({ tableData }) => {
  console.log("tableData", tableData);

  const renderTableData = () => {
    // Filter tableData to include entries from today to the past 1 month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get current month (0-indexed)
    const currentYear = currentDate.getFullYear();
    const oneMonthAgo = new Date(currentYear, currentMonth - 1); // Calculate date 1 month ago

    const filteredData = tableData.filter(data => {
      const date = new Date(data.selectedDate);
      return date >= oneMonthAgo && date <= currentDate;
    });

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
        <tr key={data.id} className={data.id % 2 === 0 ? 'bg-gray-200 text-white' : 'bg-gray-500 text-white'}>
        <td className=' font-bold bg-white text-red-400 border border-t border-black font-bold text-center py-2 text-xl w-36 md:w-36'>{formattedDate}</td>
        {paddedNumbers.map((num, idx) => {
          let rightMostDigitSum = '-';
          if (!isNaN(num)) {
            const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
            rightMostDigitSum = digitSum % 10; // Get only the rightmost digit
          }
          return (
            <td key={idx} className='border text-xl font-bold text-center py-2 w-36'> {/* Removed px-12 */}
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
    <div className='bg-gray-500 px-0 py-0'>
      <div className=''>
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

export default CurrentMonthData;
