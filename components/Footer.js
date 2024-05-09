import React, { useState, useEffect } from 'react'
import { firebase } from '../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
const db = firebase.firestore();
const Footer = () => {
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      toast.error('Failed to fetch contact details.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleWhatsApp = (number) => {
    // Open WhatsApp with the WhatsApp number
    window.location.href = `https://wa.me/${number}`;
  };
  return (
    <div>
      {/* <footer class="bg-gray-900 text-gray-300 py-5 sm:px-16 px-6 font-[sans-serif]">
      <div class="lg:flex lg:justify-between lg:items-center max-lg:text-center">
       
        <ul class="flex space-x-6 gap-y-2 max-lg:mt-4 max-lg:justify-center flex-wrap">
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Home</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Privacy Policy</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Term Condition</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Contact</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Supports</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">About</a></li>
          <li><a href="javascript:void(0)" class="text-base hover:text-white">Sitemap</a></li>
        </ul>
      </div>
    </footer> */}
      
    <footer class="bg-gray-800 text-white py-4 px-2 font-[sans-serif]">
  <div class="flex flex-col items-center">
    <a href='/Admin' >
    <h1 class="text-xl font-bold mb-4">KOLKATAFF.ES</h1>
    </a>
    {contactData.map((contact) => (
    <ul key={contact.id} className="flex space-x-4">
  <li>
    <a href="javascript:void(0)" className="text-xl hover:text-blue-400">
      <FaFacebook size={24} />
    </a>
  </li>
  <li>
    <a href="javascript:void(0)" className="text-xl hover:text-gray-400">
      <FaTwitter size={24} />
    </a>
  </li>
  <li>
    <button  onClick={() => handleWhatsApp(contact.whatsappNumber)} className="text-xl hover:text-green-400">
      <FaWhatsapp size={24} />
    </button>
  </li>
</ul>
    ))}
<h1 class="text-sm font-bold mt-4">© ALL RIGHT RESERVED (2017-2035)</h1>
<h2 class="text-sm font-semibold">Email: support@KOLKATAFF.ES</h2>
<h3 class="text-sm font-semibold">KOLKATA FATAFAT GADDI OFFICIAL WEBSITE</h3>
  </div>
  <div className="text-center bg-white text-red-400 mt-2">
              <h1 className="text-2xl font-bold mb-2">KOLKATA FATAFAT ORIIGNAL WEBSITE</h1>
            </div>
</footer>
    </div>
  )
}

export default Footer