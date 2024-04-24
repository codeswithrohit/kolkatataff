import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();
const storage = firebase.storage();

const Index = () => {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [editContactId, setEditContactId] = useState(null); // Track which contact to edit

  useEffect(() => {
    // Fetch contact details on initial load
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setIsLoading(true);
      const contactRef = await db.collection('contact_details').get();
      const fetchedContactData = contactRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContactData(fetchedContactData);
    } catch (error) {
      console.error('Error fetching contact details: ', error);
      toast.error('Failed to fetch contact details.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
    setMobileNumber('');
    setText('');
    setWhatsappNumber('');
    setQrCode(null);
    setEditContactId(null); // Reset edit state
  };

  const handleEdit = (contactId) => {
    const contactToEdit = contactData.find((contact) => contact.id === contactId);
    if (contactToEdit) {
      setEditContactId(contactId);
      setMobileNumber(contactToEdit.mobileNumber);
      setText(contactToEdit.text);
      setWhatsappNumber(contactToEdit.whatsappNumber);
      // QR code URL can't be edited directly, so no need to set it here
      setIsModalOpen2(true);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setQrCode(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!mobileNumber || !whatsappNumber) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    setIsLoading(true);
    try {
      if (editContactId) {
        // If editing existing contact, update in Firestore
        let qrCodeUrl = null;
        if (qrCode) {
          // If a new QR code is selected, upload it
          const qrCodeRef = storage.ref().child(`qr_codes/${qrCode.name}`);
          const qrCodeSnapshot = await qrCodeRef.put(qrCode);
          qrCodeUrl = await qrCodeSnapshot.ref.getDownloadURL();
        }
  
        await db.collection('contact_details').doc(editContactId).update({
          mobileNumber,
          whatsappNumber,
          qrCodeUrl: qrCodeUrl || qrCodeUrl === '' ? qrCodeUrl : contactData.find(contact => contact.id === editContactId).qrCodeUrl,
          text,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        toast.success('Contact details updated successfully!');
      } else {
        // If adding new contact, upload QR code only if provided
        let qrCodeUrl = null;
        if (qrCode) {
          const qrCodeRef = storage.ref().child(`qr_codes/${qrCode.name}`);
          const qrCodeSnapshot = await qrCodeRef.put(qrCode);
          qrCodeUrl = await qrCodeSnapshot.ref.getDownloadURL();
        }
  
        await db.collection('contact_details').add({
          mobileNumber,
          whatsappNumber,
          qrCodeUrl,
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        toast.success('Contact details added successfully!');
      }
      closeModal2();
      fetchContactData(); // Refresh contact data after submit
    } catch (error) {
      console.error('Error submitting contact details: ', error);
      toast.error('Failed to submit contact details.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className=" min-h-screen p-8">
      <div className="flex justify-end">
        {contactData.length === 0 && (
          <button
            onClick={openModal2}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Contact & QR Code Details
          </button>
        )}
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">
              {editContactId ? 'Edit Contact Details' : 'Add Contact Details'}
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Enter WhatsApp Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              />
             
<div className="mb-4">
  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
    Description
  </label>
  <textarea
    id="description"
    name="description"
    value={text}
    onChange={(e) => setText(e.target.value)}
    rows="3"
    placeholder="Enter Fatafat description..."
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  ></textarea>
</div>

              <label className="block">
                <span className="text-gray-700">Upload QR Code:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </label>

              <div className="flex justify-between">
                <button
                  onClick={closeModal2}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
        {contactData.map((contact) => (
          <div key={contact.id} className="border rounded-md p-4 mb-4">
            <p className="mt-2">Mobile Number: {contact.mobileNumber}</p>
            <p>WhatsApp Number: {contact.whatsappNumber}</p>
            <p>Fatafat Desc.: {contact.text}</p>
            {contact.qrCodeUrl && (
              <div className="mt-4">
                <img
                  src={contact.qrCodeUrl}
                  alt="QR Code"
                  style={{ maxWidth: '200px' }}
                  className="mx-auto"
                />
              </div>
            )}
            <button
              onClick={() => handleEdit(contact.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Index;
