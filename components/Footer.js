import React from 'react'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-900 text-gray-300 py-5 sm:px-16 px-6 font-[sans-serif]">
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
    </footer>
    <footer class="bg-gray-800 text-white py-4 px-2 font-[sans-serif]">
  <div class="flex flex-col items-center">
    <h1 class="text-xl font-bold mb-4">KOLKATAFF.WIN</h1>
    <ul className="flex space-x-4">
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
    <a href="javascript:void(0)" className="text-xl hover:text-green-400">
      <FaWhatsapp size={24} />
    </a>
  </li>
</ul>
<h1 class="text-sm font-bold mt-4">© ALL RIGHT RESERVED (2017-2035)</h1>
<h2 class="text-sm font-semibold">Email: support@kolkataff.win</h2>
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