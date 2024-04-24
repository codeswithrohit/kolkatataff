import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNavbar from '../../components/AdminNavbar';
const db = firebase.firestore();

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editDocId, setEditDocId] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when month or year changes

  const fetchData = async () => {
    try {
      setShowSpinner(true);
      const dataRef = await db.collection('time_table').get();
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
console.log("time",tableData)
  const openModal = (docId = null) => {
    setIsModalOpen(true);
    const editData = tableData.find((data) => data.id === docId);
    if (editData) {
      const { numbers, selectedDate } = editData;
      setNumber(numbers || []);
      setEditDocId(docId);
    } else {
      setNumber([]);
      setEditDocId(null);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setNumber([]);
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
      };
      await db.collection('time_table').doc(editDocId).update(updatedData);
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
      await db.collection('time_table').add({
        numbers: number,
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


  return (
    <div className='min-h-screen' >
      <AdminNavbar/>
    <div className=' lg:ml-64 bg-gray-100  p-8'>
     

    {tableData.length === 0 && (

      <button
  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 absolute top-0 right-0 mr-4 mt-4'
  onClick={openModal}
>
  Add Time
</button>
    )}



      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded shadow-md w-full md:w-1/2'>
            <h2 className='text-lg font-semibold mb-4'>Add Time</h2>
            <div className='flex flex-col space-y-4'>
              {number.map((digit, index) => (
                <input
                  key={index}
                  type='text'
                  className='border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                  placeholder={`Enter Time ${index + 1}`}
                  value={digit || ''}
                  onChange={(e) => handleInputChange(index, e)}
                />
              ))}

              {number.length < 8 && (
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                  onClick={handleAddDigit}
                >
                  Add Another Time
                </button>
              )}

            

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


<table className="w-full border-collapse">
  <thead className="bg-blue-100">
    <tr>
      <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600">
        No.
      </th>
      <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600">
        Time
      </th>
      <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-800">
  {tableData.map((data, index) => (
    data.numbers.map((time, timeIndex) => (
      <tr key={`${data.id}-${timeIndex}`} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-bold whitespace-nowrap text-sm text-gray-600">
          {timeIndex + 1} Bazi
        </td>
        <td className="px-6 py-4 font-bold whitespace-nowrap text-sm text-gray-600">
          {time} 🕙
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 hover:text-blue-700">
          <button
            className="inline-flex items-center px-2 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => openModal(data.id)}
          >
            Edit
          </button>
        </td>
      </tr>
    ))
  ))}
</tbody>

</table>


   

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

      <ToastContainer />
    </div>
    </div>
  );
};

export default Index;
