import React from 'react';
import { format } from 'date-fns';


const AvatarCard = (props) => {

  let formattedDate = '';
  if (props.createAt) {
    const date = new Date(props.createAt);
    formattedDate = format(date, 'MMM do, yyyy'); // Format the date as "Jan 3, 2025"
  } else {
    formattedDate = 'Unknown date'; // Fallback if createdAt is not provided
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Avatar hình tròn */}
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={props.avatarUrl}
          alt={props.creator}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/ffffff?text=AV"; }} // Fallback image
        />
      </div>
      {/* Username và Ngày tháng */}
      <div className="flex flex-row items-baseline justify-center"> {/* justify-center để căn giữa dọc */}
        <p className="font-medium text-gray-800 text-sm">{props.creator}</p>
        <p className="text-gray-500 text-xs mx-3">{formattedDate}</p>
      </div>
    </div>
  );
};

export default AvatarCard;