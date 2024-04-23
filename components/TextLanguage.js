import React, { useState } from 'react';

const KolkataFatafat = () => {
  const [language, setLanguage] = useState('english');

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'bengali' : 'english');
  };

  return (
    <div className="text-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={toggleLanguage}>
        {language === 'english' ? 'Switch to Bengali' : 'Switch to English'}
      </button>
      {language === 'english' ? (
        <>
        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-8  shadow-lg">
          <h2 className="text-lg text-center font-bold mb-4">Kolkata Fatafat Tips: Win Big with Kolkata FF - Expert Advice from Ghosh Babu</h2>
          <p className="text-sm font-semibold leading-relaxed text-center">Get insider tips and latest results for FF (Fatafat) in Kolkata with expert advice from Ghosh Babu. Increase your chances of winning in this popular game with our proven strategies. Stay one step ahead of the competition and increase your profits with Kolkata FF tips. Don't miss your chance to win - start playing now!</p>
          <p className="text-sm font-semibold leading-relaxed text-center">Looking for Kolkata FF tips and results? Ghosh Babu's expertise and strategies can help you crack the Kolkata Fatafat game. Stay one step ahead of the competition with our proven technology and increase your chances of winning big. Get the latest Kolkata FF Result now and improve your success rate!</p>
          <p className="text-sm font-semibold leading-relaxed text-center">Discover the secret to winning big at FF Kolkata with expert tips and tricks. Stay ahead and increase your chances of winning with exclusive insights from Kolkata's Fatafat Ghosh Babu. Get live Kolkata FF results and take your gaming experience to the next level. Start playing like a pro today!</p>

          <h2 className="text-lg text-center font-bold mb-4 mt-2">Win big with expert tips from Ghosh Babu for Kolkata FF</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Are you ready to win big with Kolkata FF? Look no further, our expert tips come from none other than Ghosh Babu and Kolkata FF Fatafat himself - the master of Kolkata Fatafat! If you're a fan of this popular game and want to increase your chances of success, then give it a listen. Kolkata FF took the city by storm and won the hearts of many eager participants. But let’s be honest: winning isn’t always easy. This is where Ghosh Babu comes into play. With years of experience and a deep understanding of the game, he has perfected his strategy and is now ready to share his secrets with you. Whether you are new to Kolkata FF or an experienced player, Ghosh Babu's tips are designed to give you an edge. From predicting the next winning number to understanding patterns and trends, his knowledge will help you make informed decisions and increase your chances of winning. Don't waste your time relying solely on luck.</p>



  <h2 className="text-lg text-center font-bold mb-4 mt-2">Win big with Kolkata FF! Expert Tips from Ghosh Babu – Fatafat in Kolkata</h2>
  <p className="text-sm font-semibold leading-relaxed text-center">Kolkata Fatafat Game Satta Play is a very popular game in West Bengal. The game is played daily from 9:00 a.m. to 8:30 p.m. In this game you have to guess the numbers drawn in the lottery. If you guess the number correctly, you win a prize.</p>
  <p className="text-sm font-semibold leading-relaxed text-center">There are two types of bets in the Kolkata Fatafat game: Ghar and Patti. Gal betting involves guessing the numbers drawn in a single lottery round. Patty betting involves guessing the numbers that will be drawn in the lottery.</p>
  <h3 className="text-lg text-center font-semibold  mt-1">Kolkata Fatafat Game Tips:</h3>
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
          </div>
        </>
      ) : (
        <>
          <div className="bg-gradient-to-r from-gray-800 to-black text-white p-8  shadow-lg">
          <h2 className="text-lg text-center font-bold mb-4">কলকাতা ফাটাফাট টিপস: ঘোষ বাবুর দ্বারা কলকাতা এফ এফ - বড় জিতে নিন</h2>
          <p className="text-sm font-semibold leading-relaxed text-center">ঘোষবাবুর দ্বারা কলকাতা এফ এফ (ফাটাফাট) এর অভিজ্ঞ পরামর্শের সাথে গোপনীয় টিপস এবং সর্বশেষ ফলাফল পেতে। এই জনপ্রিয় খেলায় বড় জিতে নিন আমাদের প্রমাণিত স্ট্রেটেজির সাহায্যে। প্রতিযোগিতার আগে থাকুন এবং আপনার লাভ বাড়ান - কলকাতা এফ এফ টিপস দিয়ে। হারান না আপনার জিতার সুযোগ - এখনি খেলা শুরু করুন!</p>
          <p className="text-sm font-semibold leading-relaxed text-center">কলকাতা এফ এফ টিপস এবং ফলাফল খুঁজছেন? ঘোষবাবুর অভিজ্ঞ প্রতিষ্ঠান এবং রণনীতি আপনাকে কলকাতা ফাটাফাট খেলাটি ভেঙে দেওয়ার সাহায্য করতে পারে। প্রমাণিত কৌশলের সাথে প্রতিযোগিতার আগে থাকুন এবং বড় জিতের সম্ভাবনা বাড়ান। আজই নতুনতম কলকাতা এফ এফ ফলাফল পেতে এবং আপনার সাফল্য হার বাড়ান!</p>
          <p className="text-sm font-semibold leading-relaxed text-center">ঘোষ বাবুর পরামর্শ এবং ট্রিক্স দিয়ে কলকাতা এফ এফ জিতার সম্পর্কের গোপনীয় পরামর্শ আনলে বড় জিতের রহস্য উন্মোচন করুন। খেলার আগের পদক্ষেপ নিন এবং কলকাতা ফাটাফাট ঘোষ বাবুর এক্সক্লুসিভ পরামর্শের সাহায্যে আপনার জিতার সম্ভাবনা বাড়ান। আজই নতুনতম কলকাতা এফ এফ ফলাফল পেতে এবং আপনার গেমিং অভিজ্ঞতা উন্নত করুন। এক্সপার্ট হিসেবে খেলা শুরু করুন!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default KolkataFatafat;
