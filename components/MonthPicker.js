import React from 'react';

const MonthPicker = ({ selectedMonth, onChange }) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={index + 1}>{month}</option>
      ))}
    </select>
  );
};

export default MonthPicker;
