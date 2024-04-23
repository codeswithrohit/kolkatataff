import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { firebase } from '../Firebase/config';
import 'firebase/firestore';
const db = firebase.firestore();

// Import your spinner component here (CSS spinner or any other)

const HeroInstagramThreads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
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
      // Assuming you have some kind of toast notification library for errors
      toast.error('Failed to fetch contact details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-h-screen items-start flex bg-[url('https://www.tailwindtap.com/assets/components/hero/threads/1.png')] bg-center lg:bg-center bg-cover bg-no-repeat flex-col">
      <div className="font-semibold text-white text-2xl tracking-wider px-10 pt-10 cursor-pointer md:block hidden">
        Kolkata Fatafat VIP Tips
      </div>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        {isLoading && (
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
        <div className="bg-[#181818] w-[211px] rounded-xl border-[1px] border-gray-700 flex flex-col justify-between pb-4">
          {contactData.map((contact) => (
            <div className="p-6" key={contact.id}>
              <img src={contact.qrCodeUrl} alt="qr-code" />
            </div>
          ))}
        </div>
        <div className="font-semibold text-white text-2xl tracking-wider pt-3 cursor-pointer md:hidden">
          Kolkata Fatafat VIP Tips
        </div>
        <div className="text-center text-white pt-3 font-semibold">
          <a href="#_">
            <h1>Design by Kolkata Fatafat Head Office</h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroInstagramThreads;
