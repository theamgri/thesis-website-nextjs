"use client"
import Navbar from '../components/Navbar';
import { db } from '../components/firebase.jsx';
import DataFilters from '../components/DataFilters';
import DailyWeekendTrends from '../components/DailyWeekendTrends';
import HateSpeech from '@/components/HateSpeech';
import OffensiveLanguageAnalysis from '@/components/OffensiveLanguageAnalysis';
import SentimentAnalysis from '@/components/SentimentAnalysis';
import Overview from '@/components/Overview';
// import { db } from './firebase.jsx';
// fetching data
const fetchData = async () => {
  const data = await db.collection('sentiment').get();
  // Process the data
};
export default function Home() {

  return (
    
    <main> 
      {/* icon logo */}
      <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" /> 
      {/* Call a navbar */}
      <Navbar /> 
      <div className="flex w-screen flex-col items-center justify-between pt-24">
      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"> */}
          <div class="text-right font-bold text-2xl opacity-50 mt-8 font-mono">
          <h1>Analytics Overview</h1> 
          {/* </div> */}
      
          
      </div>
      <div>
      <ul class="m-5 rounded-2xl drop-shadow-xl hidden text-sm font-medium text-center text-white divide-x divide-gray-200 rounded-lg shadow sm:flex bg-black dark:bg-gray-900 dark:divide-gray-700">
      <li class="w-full">
          {/* <a href="#" className="inline-block font-medium w-full h-full p-4 text-black bg-gray-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 focus:outline-none" aria-current="page"> */}
          <a id="sentimentLink" href="#" class="inline-block font-medium w-full h-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
        <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
        </li>
        <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full h-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
            <i class="fas fa-chart-line"></i> Data Filters
        </a>
    </li>
        <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full h-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
            <i class="fas fa-chart-line"></i> Sentiment Analysis
        </a>
    </li>
    <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
            <i class="fas fa-chart-line"></i> Offensive Language Analysis
        </a>
    </li>
    <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
            <i class="fas fa-chart-line"></i> Hate Speech Source
        </a>
    </li>
    <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-gray-700">
            <i class="fas fa-chart-line"></i> Daily Weekend Trends
        </a>
    </li>
    </ul>
      </div>
    {/* DERE NA IBUTANG ANG CHART.jS */}
    <div className="flex flex-wrap">
      {/* First Column */}
      <div className="w-1/2 p-4">
        <Overview />
      </div>

      {/* Second Column */}
      <div className="w-1/2 p-4">
        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <DataFilters />
          </div>
          <div className="w-1/2 p-2">
            <HateSpeech />
          </div>
          <div className="w-1/2 p-2">
            <OffensiveLanguageAnalysis />
          </div>
          <div className="w-1/2 p-2">
            <DailyWeekendTrends />
          </div>
          <div className="w-1/2 p-2">
            <SentimentAnalysis />
          </div>
        </div>
      </div>
      </div>
    </div>
    
    </main>
  )
}
