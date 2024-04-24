import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNavbar from '../../components/AdminNavbar';

const db = firebase.firestore();

const Userdata = () => {
  const [tableData, setTableData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when component mounts

  const fetchData = async () => {
    try {
      setShowSpinner(true);
      const dataRef = await db.collection('users').get();
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("user", tableData);

  return (
    <div className='min-h-screen bg-white'>
      <AdminNavbar />
      <div className='lg:ml-64 p-6'>
        <h1 className='text-2xl font-bold mb-4'>User Data</h1>
        <table className='w-full border-collapse'>
          <thead className='bg-blue-100'>
            <tr>
              <th className='px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600'>Name</th>
              <th className='px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600'>Phone</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentItems.map((user, index) => (
              <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-6 py-4 font-bold whitespace-nowrap text-sm text-gray-600'>{user.Name}</td>
                <td className='px-6 py-4 font-bold whitespace-nowrap text-sm text-gray-600'>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4 flex justify-center'>
          {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {showSpinner && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 animate-spin" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userdata;
