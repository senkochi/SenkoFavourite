import { useEffect } from 'react';

const useScrollMemory = (key = 'scroll-position') => {
  // Khôi phục khi trang được mount
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(key);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
      sessionStorage.removeItem(key);
    }
  }, [key]);

  // Ghi nhớ khi trang bị unmount (chuyển sang trang khác)
  useEffect(() => {
    return () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
  }, [key]);
};

export default useScrollMemory;