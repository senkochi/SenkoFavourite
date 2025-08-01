import React from 'react';
import AvatarCard from './AvatarCard'; // Import AvatarCard

/**
 * Component Card hiển thị thông tin sản phẩm hoặc bài viết.
 * Thumbnail bên trái, nội dung bên phải.
 * @param {string} title - Tiêu đề của card.
 * @param {string} briefContent - Nội dung tóm tắt của card.
 * @param {string} imageUrl - URL của hình ảnh thumbnail.
 * @param {string} avatarUrl - URL của hình ảnh avatar cho AvatarCard.
 * @param {string} username - Tên người dùng cho AvatarCard.
 * @param {string} date - Ngày tháng cho AvatarCard.
 * @param {string} [cardWidth="w-96"] - Chiều rộng cố định của card (ví dụ: "w-96", "w-80"). Mặc định là "w-96".
 */
const BlogCard = (props) => {
  return (
    <div className={`flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden md:h-[15rem] max-h-[30rem] md:w-250 w-screen`}>
      {/* Phần bên trái - Thumbnail */}
      <div className="md:w-60 w-full md:h-full h-60 flex-shrink-0"> 
        <img
          src={props.thumbnail || "https://placehold.co/240x240/cccccc/ffffff?text=Thumbnail"} // Fallback image
          alt={props.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/240x240/cccccc/ffffff?text=Thumbnail"; }} // Fallback image
        />
      </div>

      {/* Phần bên phải - Nội dung */}
      {/* flex-col để các phần tử xếp chồng, justify-between để AvatarCard ở cuối, items-start để căn trái nội dung */}
      <div className="flex flex-col flex-grow p-4 justify-between items-start w-full">
        {/* Tiêu đề và nội dung tóm tắt */}
        <div>
          <h3 className="font-semibold text-2xl text-gray-900 mb-2 w-full">
            {props.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 w-full"> {/* line-clamp để giới hạn số dòng */}
            {props.briefContent}
          </p>
        </div>

        {/* Component AvatarCard ở phía dưới */}
        <div className="mt-4 w-full"> {/* mt-4 để tạo khoảng cách với nội dung phía trên */}
          <AvatarCard avatarUrl={props.creatorAvatar} creator={props.creator} createAt={props.createAt} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

