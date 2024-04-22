import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { firebase } from '../Firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { FaBell, FaSync, FaEnvelope, FaDownload, FaPhone, FaWhatsapp } from 'react-icons/fa';
import CurrentData from '@/components/CurrentData';
import CurrentMonthData from '@/components/CurrentMonthData';
const db = firebase.firestore();

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to get the current date in "DD/MM/YYYY" format
    const getCurrentDate = () => {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };

    // Set current date on component mount
    setCurrentDate(getCurrentDate());
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setShowSpinner(true);
      const dataRef = await db.collection('your_collection_name').get();
      const fetchedData = dataRef.docs.map((doc) => {
        return {
          id: doc.id, // Include document ID
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

  const fullText = `Get Megha Day (Known as Main Mumbai Matka), Kalyan Matka, Kalyan Night Matka Result, Milan Day,Milan Night Matka Result, Rajdhani Day & Rajdhani Night Matka Market Result, Time Bazar Matka Market Result and Indian Matka Market Results Fastest Live Update. Get All Kalyan,Main Kuber, Rajdhani, Milan Matka And Time Bazar Jodi Penal Charts For Free . All Matka Guessing.With Best Guessers , Online Old Charts , Panel Charts, Online Charts List Pdf Download And Top Matka Guessing Free Number Provided By SRV ONLINE MATKA Professor And Master Dr`;

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleRefresh = () => {
    fetchData(); // Call fetchData to refresh data
  };

  return (
    <div className='bg-[#c4fd16] min-h-screen'>
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

        <CurrentData tableData={tableData} />


        <div className="bg-gradient-to-r from-red-300 to-green-500 py-2 text-white text-center">
          <div   onClick={handleRefresh}  className="flex items-center cursor-pointer justify-center">
            <button
              className="flex items-center justify-center bg-white text-red-500 rounded-full w-8 h-8 focus:outline-none hover:bg-red-500 hover:text-white transition duration-300 mr-2"
            // Call handleRefresh on click
            >
              <FaSync size={16} />
            </button>
            <span className="text-white">Refresh</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-4">

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
      
        <div className="text-center text-red-400">
          <h1 className="text-2xl font-bold mb-2">KOLKATA FATAFAT TIPS & WIN</h1>
        </div>
        <div class="py-4 px-4 mx-auto sm:py-8 lg:px-6 bg-green-50 mt-2">
          <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-1 text-3xl tracking-tight font-bold leading-tight text-green-800">KOLKATA FF FATAFAT TIPS</h2>
            <p className="text-green-700 md:text-lg font-bold">Date: {currentDate}</p>
            <p class=" text-green-700 md:text-md font-bold">Kolkata Fatafat</p>
            <p class=" text-green-700 md:text-md font-bold">Wellcome To Bengali Brothers</p>
            <p class=" text-green-700 md:text-md font-bold">Direct Head Office Leak</p>
            <p class=" text-green-700 md:text-md font-bold">30 Minute Pahle Live Result Paye</p>
            <p class=" text-green-700 md:text-md font-bold">(Single Ghar/Patti Number)</p>
            <p class=" text-green-700 md:text-md font-bold">Booking Only 2150rs Taka</p>
            <p class=" text-green-700 md:text-md font-bold">Advance Payment</p>
            <p class=" text-green-700 md:text-md font-bold">Booking For Call</p>

            <div className="flex flex-row items-center justify-center mt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-500"
              >
                <FaPhone className="w-5 h-5 mr-2" />
                Call
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-red-400">
          <h1 className="text-2xl font-bold mb-2">KOLKATA FF THIS MONTH RECORD</h1>
        </div>
        <CurrentMonthData tableData={tableData} />
        <div className='bg-gray-500 px-4 py-4 cursor-pointer' >
          <Link href='/fullchart' >
        <div className="text-center  bg-white text-red-400 rounded-lg">
          <h1 className="text-2xl font-bold">👉CHECK FULL CHART</h1>
        </div>
        </Link>
        </div>

        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>
 
 
<section className="py-4 bg-blue-50 md:px-48">
  <div className="w-full xl:w-2/3 px-4 mx-auto mt-2">
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="bg-blue-400 px-4 py-3">
        <h3 className="text-white font-semibold text-base">
          Kolkata FF Fatafat Result Time Table
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600">
                No.
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blue-600">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                10:00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                11:30
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                3
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                1:00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                4
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                2:30
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                5
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                4:00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                6
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                5:30
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                7
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                7:00
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                8
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                8:30
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<div className="bg-gradient-to-r from-gray-800 to-black text-white p-8  shadow-lg">
  <h2 className="text-lg text-center font-bold mb-4">Kolkata Fatafat Tips & Win Big with Kolkata FF: Pro Tips from Ghosh Babu</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Get insider tips and the latest results for Kolkata FF (Fatafat) with Ghosh Babu's expert advice. Boost your chances of winning big in this popular game with our proven strategies. সরাসরি এখানে আসুন কারণ এই হলুদ ওয়েবসাইটটি এখান থেকে ফলাফল চুরি করে অন্যথায় আমাদের ঘোষবাবু ওয়েবসাইট থেকে। Stay ahead of the competition and increase your profits with Kolkata FF tips. Don't miss out on your chance to win - start playing now!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Looking for Kolkata FF tips and results? Ghosh Babu's expert insights and strategies can help you crack the Kolkata Fatafat game. Stay ahead of the competition with our proven techniques and increase your chances of winning big. Get the latest Kolkata FF results and boost your success rate today!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Unlock the secrets to winning big in Kolkata FF with expert tips and tricks. Stay ahead of the game and increase your chances of winning with Kolkata Fatafat Ghosh Babu's exclusive insights. Get real-time Kolkata FF results and take your gaming experience to the next level. Start playing like a pro today!</p>

  <h2 className="text-lg text-center font-bold mb-4 mt-2">Win Big with Expert Kolkata FF Tips from Ghosh Babu</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Are you ready to win big with Kolkata FF? Look no further, because we have expert tips from none other than Ghosh Babu AND Kolkata FF Fatafat Tips himself - the master of Kolkata Fatafat! If you're a fan of this popular game and want to increase your chances of success, then listen up. Kolkata FF has taken the city by storm, captivating the hearts of many eager participants. But let's face it, winning is not always easy. That's where Ghosh Babu comes in. With years of experience and a keen understanding of the game, he has perfected his strategies and is now ready to share his secrets with you. Whether you're new to Kolkata FF or a seasoned player, Ghosh Babu's tips are designed to give you an edge. From predicting the next winning numbers to understanding patterns and trends, his knowledge will help you make informed decisions and increase your chances of hitting that jackpot. Don't waste any more time relying solely on luck. Take advantage of Ghosh Babu's expertise and turn your Kolkata Fatafat experience into a winning one. Get ready to elevate your game with these valuable insights that could potentially change your fortune. So, are you ready to unlock the secrets behind Kolkata FF? Stay tuned as we reveal Ghosh Babu's expert tips that will set you on the path towards success in this thrilling game. Get ready to win big with Kolkata Fatafat!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Are you ready to win big with Kolkata FF? Look no further than the expert tips from none other than Ghosh Babu himself - the master of Kolkata Fatafat! With his invaluable insights and strategies, you can increase your chances of success in this thrilling game. Kolkata FF, also known as Kolkata Fatafat, has gained immense popularity among gaming enthusiasts. It offers a unique opportunity to test your luck and skills while enjoying the thrill of guessing the correct numbers. But why rely solely on luck when you can benefit from Ghosh Babu's expertise? Ghosh Babu's tips are like gold dust for those looking to maximize their winnings in Kolkata FF. His deep understanding of the game, combined with years of experience, allows him to analyze trends and patterns that others might miss. By following his advice, you can make more informed decisions and increase your chances of hitting the jackpot. Whether you're new to Kolkata FF or a seasoned player, Ghosh Babu's tips will undoubtedly give you an edge. From predicting winning numbers to understanding how to interpret results effectively, his guidance covers all aspects of this exciting game. So why leave your success up to chance when you can tap into Ghosh Babu's expertise? Don't miss out on this incredible opportunity to win big with Kolkata FF! Follow Ghosh Babu's expert tips and watch as your fortunes change in this thrilling game of luck and strategy. Get ready for an unforgettable journey filled with excitement and rewards!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Are you ready to win big with Kolkata FF? Look no further, because we have expert tips from none other than Ghosh Babu himself - the master of Kolkata Fatafat! Kolkata FF has become a popular game of luck and strategy, captivating the hearts of many players. kolkata ff live But how can you increase your chances of winning? That's where Ghosh Babu's invaluable tips come in. As a seasoned player with years of experience, Ghosh Babu has cracked the code to success in Kolkata Fatafat. He knows the ins and outs of this thrilling game and is here to share his wisdom with you. Whether you're a beginner or a seasoned player, Ghosh Babu's tips will give you that extra edge. From understanding the nuances of Kolkata FF to predicting results more accurately, his expertise will guide you towards bigger wins. Don't miss out on this opportunity to learn from the best. With Ghosh Babu's insider knowledge and strategic advice, you can elevate your Kolkata Fatafat game to new heights. Get ready to turn your luck around and conquer Kolkata FF like never before! So what are you waiting for? Dive into this section for exclusive tips from Ghosh Babu himself and get ready to win big in Kolkata Fatafat!</p>


  <h2 className="text-lg text-center font-bold mb-4 mt-2">Win Big with Kolkata FF! Expert Tips from Ghosh Babu - Kolkata Fatafat</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Kolkata Fatafat Game satta play is a very popular game in West Bengal. This game is played every day from 09:00 AM to 08:30 PM. In this game, you have to guess the numbers which will be drawn in a lottery. If you guess the right numbers, you will win a prize.</p>
  <p className="text-sm font-semibold leading-relaxed text-center">There are two types of bets in Kolkata Fatafat Game: Ghar and Patti. In Ghar bet, you have to guess the numbers which will be drawn in a single round of lottery. In Patti bet, you have to guess the numbers which will be drawn in lottery.</p>
  <h3 className="text-lg text-center font-semibold  mt-1">Tips for Kolkata Fatafat Game:</h3>
  <ul className=" pl-6">
    <li className="text-sm font-semibold leading-relaxed text-center">Study the past Kolkata FF results: The past results of Kolkata Fatafat Game can give you a good idea of which numbers are drawn more often. You can use this information to make your bets.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Use a combination of numbers: Instead of betting on a single number, you can bet on a combination of numbers. This will increase your chances of winning.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Don't bet too much money: Kolkata Fatafat Game is a game of luck. So, don't bet too much money. Only bet the amount of money that you can afford to lose.</li>
  </ul>
  <h3 className="text-lg text-center font-semibold  mt-1">Tips for Ghar bet:</h3>
  <ul className=" pl-6">
    <li className="text-sm font-semibold leading-relaxed text-center">Focus on the most frequently drawn numbers: The most frequently drawn numbers are 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0. So, you should focus on these numbers when making your bets.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Avoid betting on consecutive numbers: Consecutive numbers are less likely to be drawn. So, you should avoid betting on them.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Use a combination of numbers: As mentioned earlier, using a combination of numbers will increase your chances of winning.</li>
  </ul>
  <h3 className="text-lg text-center font-semibold  mt-1">Tips for Patti bet:</h3>
  <ul className=" pl-6">
    <li className="text-sm font-semibold leading-relaxed text-center">Focus on the numbers which are drawn together often: There are some numbers which are drawn together often. So, you should focus on these numbers when making your bets.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Avoid betting on consecutive numbers: Consecutive numbers are less likely to be drawn. So, you should avoid betting on them.</li>
    <li className="text-sm font-semibold leading-relaxed text-center">Use a combination of numbers: As mentioned earlier, using a combination of numbers will increase your chances of winning.</li>
  </ul>



  <h2 className="text-lg text-center font-bold mb-4 mt-2">I hope these tips will help you to win in Kolkata Fatafat Game.</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Kolkata FF, also known as Kolkata Fatafat, is a popular online lottery game that has gained immense popularity in recent years. For those unfamiliar with this game, Kolkata FF is based on guessing the correct number from a series of numbers. Players place their bets on various number combinations and wait for the results to see if they have won. One of the most frequently asked questions about Kolkata FF is whether it is legal to play. The legality of Kolkata FF varies depending on the region you are playing from, so it's essential to check your local laws and regulations before participating. If you're wondering how to play Kolkata FF, it's relatively straightforward. Players need to choose a set of numbers and place their bets accordingly. Once the results are announced, winners are determined based on their chosen numbers matching the winning combination. For those looking for tips on how to win at Kolkata FF, there is no foolproof strategy as it primarily relies on luck. However, some players suggest studying previous results and patterns to make informed decisions when placing bets. Finding Kolkata FF results is relatively easy as they are usually published online or through official channels associated with the game. Anyone can participate in playing Kolkata FF as long as they adhere to the rules and regulations set forth by the organizers. In conclusion, while playing Kolkata FF can be an exciting pastime for many individuals, it's crucial to approach it responsibly and within legal boundaries. Remember that luck plays a significant role in this game, so enjoy playing while keeping expectations realistic!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Kolkata FF, also known as Kolkata Fatafat, is a popular online game of Satta Matka where players can test their luck and intuition to win exciting prizes. Despite its popularity, there are often questions surrounding the legality and strategies for playing this game. To start with, Kolkata FF is a form of lottery or gambling game that is played in Kolkata and its surrounding areas. It involves betting on numbers from 1 to 100. Players can place bets on various combinations of numbers and wait for the results to be announced. One common query that arises is whether Kolkata FF is legal. The legality of such games can vary depending on local regulations, so it's essential to check the legal status in your specific location before participating. If you're interested in trying your luck at Kolkata FF, here are some tips to enhance your gameplay: 1. Understand the rules: Before diving into the game, make sure you fully understand how Kolkata FF works and what different betting options are available. 2. Play responsibly: Set a budget for yourself and stick to it. Gambling should always be done for entertainment purposes only, and you should never bet more than you can afford to lose. 3. Analyze past results: Some players believe in analyzing past results to predict future outcomes. While this strategy may not guarantee success, it can help you make more informed decisions when placing your bets. 4. Stay updated on results: To stay informed about Kolkata FF results, there are various online platforms where you can find real-time updates on winning numbers. Remember that winning at Kolkata FF largely depends on luck, so it's crucial to approach the game with a positive mindset and realistic expectations. If you decide to participate, do so responsibly and enjoy the thrill of the game!</p>
  <p className="text-sm font-semibold leading-relaxed text-center">Kolkata FF, also known as Kolkata Fatafat, is a popular online lottery game that has gained immense popularity in recent times. It is a form of Satta Matka gambling based on choosing numbers from 1 to 100. While the game itself may seem straightforward, there are tips and strategies that players can employ to increase their chances of winning. Firstly, it's important to understand how to play Kolkata FF. Players need to select a set of numbers and wait for the results to be announced. The game is based on luck and requires players to make informed choices when picking their numbers. One common question that arises is whether Kolkata FF is legal. While the legality of such games may vary depending on local regulations, it's crucial for players to be aware of the laws governing online gambling in their region. To improve your chances of winning at Kolkata FF, consider researching past results and patterns. While there is no foolproof strategy for winning at lottery games, staying informed can help you make more calculated decisions when playing. For those looking for Kolkata FF tips and results, there are various online platforms where you can find up-to-date information and insights. Remember that anyone can participate in Kolkata FF, but it's essential to approach such games responsibly and within legal boundaries. In conclusion, while Kolkata FF offers an exciting opportunity for players to test their luck and win prizes, it's crucial to approach the game with caution and awareness. By understanding the rules, employing smart strategies, and staying informed about results, players can enhance their overall gaming experience.</p>
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

export default Index;
