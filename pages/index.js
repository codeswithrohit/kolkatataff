
import React,{useState,useEffect} from 'react'
import { FaBell,FaSync,FaEnvelope, FaDownload  } from 'react-icons/fa';

const index = () => {


  return (
    <div className='bg-white min-h-screen'>

       <><div className="bg-white  text-red-400">
         <div className="text-center text-red-400">
              <h1 className="text-2xl font-bold mb-2">KOLKATAFF.WIN</h1>
            </div>
            <div className="h-1 bg-red-400"></div>
            <div className="flex items-center justify-center text-red-400">
  <img src="data:image/png;base64,R0lGODlhJgAPAPMGAP/////MzP+Zmf9mZv8zM/8AAMzM/5mZ/5lm/2Yz/zMA/wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAGACwAAAAAJgAPAAADgWi63P4wyjmDvcFgy/YFmpcZRWkWxnCWA6iuRQYXg1ISOJ7eOLsXOZwMGBTYYg0VYaHcLR2lUSOaBDJpzs1RgAGRVpkX+Hd6zkY8Ifk2egVr3yABjWQ0X0bngwqtX58EVE19Ugx8fwoBNz9yRmk4cIcKgwYCLGInNTNPFJ2en6ANCQAh+QQFAAAAACwBAAIAJAALAAAEddDIaQCVINuLN1dgqACICCZZaSrVqqhJHJNnDCK0Isetvh+gioaGyiR0xKEmqGQOS0XAEQW9ZEAHCmBVUZm6q6LLUOPlQgkhTIbb+mRklhKaO6SQSrdwKX/ij3J0eU58e3dFcVRlMXaLCSqGSRlAL14iOC4JEQA7" alt="Left Image" className="h-2 w-4 mr-2" />
  <div className="text-center">
    <h1 className="text-2xl font-bold mb-2">KOLKATA FF TIPS</h1>
  </div>
  <img src="data:image/png;base64,R0lGODlhJgAPAPMGAP/////MzP+Zmf9mZv8zM/8AAMzM/5mZ/5lm/2Yz/zMA/wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAGACwAAAAAJgAPAAADgWi63P4wyjmDvcFgy/YFmpcZRWkWxnCWA6iuRQYXg1ISOJ7eOLsXOZwMGBTYYg0VYaHcLR2lUSOaBDJpzs1RgAGRVpkX+Hd6zkY8Ifk2egVr3yABjWQ0X0bngwqtX58EVE19Ugx8fwoBNz9yRmk4cIcKgwYCLGInNTNPFJ2en6ANCQAh+QQFAAAAACwBAAIAJAALAAAEddDIaQCVINuLN1dgqACICCZZaSrVqqhJHJNnDCK0Isetvh+gioaGyiR0xKEmqGQOS0XAEQW9ZEAHCmBVUZm6q6LLUOPlQgkhTIbb+mRklhKaO6SQSrdwKX/ij3J0eU58e3dFcVRlMXaLCSqGSRlAL14iOC4JEQA7" alt="Right Image" className="h-2 w-4 ml-2" />
</div>
<div className="bg-gradient-to-r from-red-300 to-green-500 py-2 text-white text-center">
      <div className="flex items-center justify-center">
      <FaBell className="text-sm md:text-xl text-red-500 mr-2" />
      <h1 class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-2xl font-black">
    LIVE RESULT
</h1>
      <FaBell className="text-sm md:text-xl text-red-500 ml-2" />
    </div>
      </div>

      <div class="flex flex-col items-center justify-center bg-gray-900 py-2">
  <h1 class="text-lg text-white font-medium">19/03/2024</h1>
  <div class="flex flex-col mt-4">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full text-sm text-white border border-white">
            <thead class="bg-red-400 text-white text-xs uppercase font-medium">
              <tr>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  1
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  2
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  3
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  4
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  5
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  6
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  7
                </th>
                <th scope="col" class="px-6 py-3 text-left border-b-2 border-white tracking-wider">
                  8
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800">
              <tr class="border-b border-white">
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">852</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">502</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">230</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">855</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">102</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">750</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">520</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">620</td>
              </tr>
              <tr class="border-b border-white">
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">5</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">7</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">5</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">8</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">3</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">2</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">7</td>
                <td class="px-6 py-4 whitespace-nowrap border-r border-white">8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="bg-gradient-to-r from-red-300 to-green-500 py-2 text-white text-center">
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center bg-white text-red-500 rounded-full w-8 h-8 focus:outline-none hover:bg-red-500 hover:text-white transition duration-300 mr-2"
        >
          <FaSync size={16} />
        </button>
        <span className="text-white">Refresh</span>
      </div>
    </div>

    <div className="bg-gradient-to-r from-orange-300 to-pink-400 p-4">
      <h1 className="text-xl font-bold text-center text-white">KOLKATA FATAFAT GHOSH BABU TIPS</h1>
      <h2 className="text-md font-bold text-center text-white">Kolkata FF Fatafat Tips</h2>
      <h3 className="text-md font-bold mb-1 text-center text-white">WWW.KOLKATAFF.WIN</h3>
      <div className="flex justify-center space-x-4 mt-4">
        {/* Subscribe Fast Result Button */}
        <button className="flex items-center justify-center bg-white text-orange-400 rounded-full py-2 px-4 focus:outline-none hover:bg-orange-400 hover:text-white transition duration-300">
          <FaEnvelope className="mr-2" />
          Subscribe Fast Result
        </button>
        {/* Download App Button */}
        <button className="flex items-center justify-center bg-white text-pink-400 rounded-full py-2 px-4 focus:outline-none hover:bg-pink-400 hover:text-white transition duration-300">
          <FaDownload className="mr-2" />
          Download App
        </button>
      </div>
      <h1 className="text-xl font-bold text-center text-white">KOLKATA FF ONLINE PLAY APP</h1>
    </div>

    <div className="bg-gradient-to-r from-red-300 to-green-500 py-2 text-white text-center">
  <p className="text-lg font-medium">
    Kolkata FF Fatafat, Kolkata FF, Kolkata Fatafat, Kolkata FF Tips Win, Win Big with Kolkata FF, Expert Tips from Ghosh Babu - Kolkata Fatafat, kolkata ff ghosh, Unlock the secrets to winning big in Kolkata FF with expert tips and tricks. Stay ahead of the game and increase your chances of winning with Kolkata Fatafat Ghosh Babu's exclusive insights. Get real-time Kolkata FF results and take your gaming experience to the next level. kolkata fatafat lucky number Start playing like a pro today! Search On Google <a href="https://kolkataff.in.com.net.mobi.win.fun" className="underline">kolkataff.in.com.net.mobi.win.fun</a>
  </p>
</div>
<div className='bg-black overflow-x-auto'>
            <div className="flex border border-white rounded-md items-center">
              <h1 className="text-lg font-bold text-red-400">
                <span className="animate-marquee">
                Disclaimer - KOLKATA FF LOTTERY MAY BE BAN IN YOUR COUNTRY/STATE. VISIT THIS WEBSITE AT YOUR OWN RISK. CAUSE TO ANY LOSS WILL BE YOUR RESPONSIBILITY SO PLAY SAFE!
                </span>
              </h1>
            </div>
          </div>


       

        </div>
       
          </>
    
    </div>
  )

}


function handleRefresh(index) {
  // Simulate refreshing data by generating random numbers
  const updatedResults = [...results];
  updatedResults[index].value = `${Math.floor(
    Math.random() * 1000
  )}-${Math.floor(Math.random() * 10)}`;
  setResults(updatedResults);
}


export default index