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
        <table key={data.id} className='table-auto w-full '>
                    <thead>
              <tr>
                <th colSpan="9" className='font-bold bg-white text-green-900 border border-t border-black font-bold text-center py-2 text-xl w-36 md:w-36'>{formattedDate}</th>
              </tr>
            </thead>

        <tbody>
        <tr  >
  
    {paddedNumbers.map((num, idx) => {
      let rightMostDigitSum = '-';
      if (!isNaN(num)) {
        const digitSum = num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
        rightMostDigitSum = digitSum % 10; // Get only the rightmost digit
      }
      return (
        <td key={idx} className='border border-t border-red-400 text-xl bg-gradient-to-r from-pink-600 to-green-500 text-white font-bold text-center py-2 w-36'> {/* Removed px-12 */}
        {num}
        <hr className="my-1 border-t border-white" />
        {rightMostDigitSum}
      </td>
      
      );
    })}
  </tr>
        </tbody>
      </table>
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
        {renderTableData()}
         
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthData;
