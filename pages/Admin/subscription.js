import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import AdminNavbar from '../../components/AdminNavbar';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DayPassIcon = () => (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.3333 17C30.3333 13.4638 28.9286 10.0724 26.4281 7.57189C23.9276 5.0714 20.5362 3.66665 17 3.66665C13.4638 3.66665 10.0724 5.0714 7.57189 7.57189C5.0714 10.0724 3.66665 13.4638 3.66665 17V23.6666H8.66665C9.10867 23.6666 9.5326 23.8422 9.84516 24.1548C10.1577 24.4674 10.3333 24.8913 10.3333 25.3333V30.3333H23.6666V25.3333C23.6666 24.8913 23.8422 24.4674 24.1548 24.1548C24.4674 23.8422 24.8913 23.6666 25.3333 23.6666H30.3333V17ZM27 27V32C27 32.442 26.8244 32.8659 26.5118 33.1785C26.1993 33.4911 25.7753 33.6666 25.3333 33.6666H8.66665C8.22462 33.6666 7.8007 33.4911 7.48814 33.1785C7.17558 32.8659 6.99998 32.442 6.99998 32V27H1.99998C1.55795 27 1.13403 26.8244 0.821468 26.5118C0.508908 26.1993 0.333313 25.7753 0.333313 25.3333V17C0.333313 7.79498 7.79498 0.333313 17 0.333313C26.205 0.333313 33.6666 7.79498 33.6666 17V25.3333C33.6666 25.7753 33.4911 26.1993 33.1785 26.5118C32.8659 26.8244 32.442 27 32 27H27ZM9.49998 20.3333C9.17168 20.3333 8.84659 20.2687 8.54327 20.143C8.23996 20.0174 7.96436 19.8332 7.73221 19.6011C7.50007 19.3689 7.31592 19.0933 7.19028 18.79C7.06464 18.4867 6.99998 18.1616 6.99998 17.8333C6.99998 17.505 7.06464 17.1799 7.19028 16.8766C7.31592 16.5733 7.50007 16.2977 7.73221 16.0655C7.96436 15.8334 8.23996 15.6493 8.54327 15.5236C8.84659 15.398 9.17168 15.3333 9.49998 15.3333C10.163 15.3333 10.7989 15.5967 11.2677 16.0655C11.7366 16.5344 12 17.1703 12 17.8333C12 18.4964 11.7366 19.1322 11.2677 19.6011C10.7989 20.0699 10.163 20.3333 9.49998 20.3333ZM24.5 20.3333C24.1717 20.3333 23.8466 20.2687 23.5433 20.143C23.24 20.0174 22.9644 19.8332 22.7322 19.6011C22.5001 19.3689 22.3159 19.0933 22.1903 18.79C22.0646 18.4867 22 18.1616 22 17.8333C22 17.505 22.0646 17.1799 22.1903 16.8766C22.3159 16.5733 22.5001 16.2977 22.7322 16.0655C22.9644 15.8334 23.24 15.6493 23.5433 15.5236C23.8466 15.398 24.1717 15.3333 24.5 15.3333C25.163 15.3333 25.7989 15.5967 26.2677 16.0655C26.7366 16.5344 27 17.1703 27 17.8333C27 18.4964 26.7366 19.1322 26.2677 19.6011C25.7989 20.0699 25.163 20.3333 24.5 20.3333Z"
        fill="#0B0914"
      />
    </svg>
  );

  const RightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0001 0.00012207C4.48608 0.00012207 7.62939e-05 4.48612 7.62939e-05 10.0001C7.62939e-05 15.5141 4.48608 20.0001 10.0001 20.0001C15.5141 20.0001 20.0001 15.5141 20.0001 10.0001C20.0001 4.48612 15.5141 0.00012207 10.0001 0.00012207ZM8.00108 14.4131L4.28808 10.7081L5.70008 9.29212L7.99908 11.5871L13.2931 6.29312L14.7071 7.70712L8.00108 14.4131Z"
        fill="#35353F"
      />
    </svg>
  );
  

const SubscriptionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staticValue, setStaticValue] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const db = firebase.firestore();
        const subscriptionSnapshot = await db.collection('subscription').get();
        const subscriptionData = subscriptionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStaticValue(subscriptionData);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions().finally(() => setIsLoading(false)); // Set loading to false after fetching data
  }, []);
console.log(staticValue)
  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setEditData(data);
    setIsPopupOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Show loading state
      const db = firebase.firestore();
      await db.collection('subscription').doc(staticValue[editingIndex].id).update(editData);
      // Refresh data after update
      const subscriptionSnapshot = await db.collection('subscription').get();
      const subscriptionData = subscriptionSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStaticValue(subscriptionData);
      setEditingIndex(-1); // Exit editing mode
      setIsPopupOpen(false); // Close the pop-up after updating
      toast.success('Subscription updated successfully', { autoClose: 2000 }); // Show success toast
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Error updating subscription');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };
  

  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar />
      {/* Pop-up for editing */}
      {isPopupOpen && (
       <div className="fixed top-0 z-30 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-8 rounded-md shadow-lg w-96">
         {/* Pass Type Input */}
         <input
           type="text"
           value={editData.passType}
           onChange={e => setEditData({ ...editData, passType: e.target.value })}
           placeholder="Pass Type"
           className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
         />
         {/* Static Input Fields */}
         {editData.static.map((item, idx) => (
           <input
             key={idx}
             type="text"
             value={item}
             onChange={e => {
               const updatedStatic = [...editData.static];
               updatedStatic[idx] = e.target.value;
               setEditData({ ...editData, static: updatedStatic });
             }}
             placeholder={`Static ${idx + 1}`}
             className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
           />
         ))}
         {/* Price Input */}
         <input
           type="text"
           value={editData.price}
           onChange={e => setEditData({ ...editData, price: e.target.value })}
           placeholder="Price"
           className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
         />
         {/* Duration Input */}
         <input
           type="text"
           value={editData.duration}
           onChange={e => setEditData({ ...editData, duration: e.target.value })}
           placeholder="Duration"
           className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
         />
         {/* Update and Cancel Buttons */}
         <div className="flex justify-end mt-4">
           <button
             className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
             onClick={handleUpdate}
           >
             Update
           </button>
           <button
             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
             onClick={() => setIsPopupOpen(false)}
           >
             Cancel
           </button>
         </div>
       </div>
     </div>
     
      )}
      {/* Main content */}
      <div className="lg:ml-64 flex flex-wrap">
        {isLoading && (
          <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {staticValue.map((data, index) => (
            <div
              key={index}
              className="max-w-[360px] md:w-[384px] min-h-[518px] md:min-h-[572px] p-6 bg-white group rounded-2xl border xl:border-none border-[#0B0641] relative"
            >
              <div className="flex flex-row gap-5 items-center">
                <span>
                  <DayPassIcon />
                </span>
                <span className="text-3xl font-bold">{data.passType}</span>
              </div>
              <span className="flex mt-4 text-[#A9A9AA] text-[22px]">
                What You'll Get
              </span>
              {data.static.map((myData, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-start mt-6 text-left text-lg"
                >
                  <div className="pt-1 shrink-0 ">
                    <RightIcon />
                  </div>
                  <span>{myData}</span>
                </div>
              ))}
              <div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
              <div className="h-28 ">
                <div className="flex flex-col gap-4 justify-between absolute left-6 right-6 bottom-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold ">{data.price}</span>
                    <span>{data.duration}</span>
                  </div>
                  <div className="flex align-bottom">
                  <button
                        className="w-full rounded-xl font-semibold text-xl px-4 py-3 bg-[#365CCE] text-white"
                        onClick={() => handleEdit(index, data)}
                      >
                        Edit
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SubscriptionPage;
