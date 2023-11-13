import React, { useState } from 'react';

const Menu = () => {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const handleMenuClick = () => {
    // Set the state to true when a menu item is clicked
    setIsFocusVisible(true);
  };

  return (
    <div>
      {/* Your menu bar */}
     
      <ul class="m-5 w-50 rounded-2xl drop-shadow-xl hidden text-sm font-medium text-center text-white divide-x divide-gray-200 rounded-lg shadow sm:flex bg-black dark:bg-gray-900 dark:divide-gray-700">
      <li class="w-full">
          {/* <a href="#" className="inline-block font-medium w-full h-full p-4 text-black bg-gray-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 focus:outline-none" aria-current="page"> */}
          <a id="sentimentLink" href="#" class="inline-block font-medium w-full h-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none ">
        <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
        </li>
       
        <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full h-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none ">
            <i class="fas fa-chart-line"></i> Sentiment Analysis
        </a>
    </li>
    
   
    <li class="w-full">
        {/* <!-- Add an ID to the link for JavaScript --> */}
        <a id="sentimentLink" href="#" class="inline-block font-medium w-full p-4 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none ">
            <i class="fas fa-chart-line"></i> Daily Weekend Trends
        </a>
    </li>
    </ul>
      

      {/* The focus div */}
      {isFocusVisible && (
        <div className="focus-div">
          {/* Content of the focus div */}
          <p>This is the focus div content.</p>
          {/* You can add more content or components here */}
        </div>
      )}
    </div>
  );
};

export default Menu;