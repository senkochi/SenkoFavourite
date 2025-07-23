const formatDate = (dateString) => {
  if (!dateString) return 'Chưa có ngày';
  
  // Cắt microseconds xuống milliseconds (chỉ lấy 3 chữ số đầu)
  let formattedDateString = dateString;
  const dotIndex = dateString.lastIndexOf('.');
  if (dotIndex !== -1) {
    const beforeDot = dateString.substring(0, dotIndex + 1);
    const afterDot = dateString.substring(dotIndex + 1);
    if (afterDot.length > 3) {
      formattedDateString = beforeDot + afterDot.substring(0, 3);
    }
  }
  
  const date = new Date(formattedDateString);
  return isNaN(date.getTime()) ? 'Ngày không hợp lệ' : date.toLocaleDateString('vi-VN');
};

export default formatDate;