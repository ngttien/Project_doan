import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hiệu ứng cuộn mượt mà
    });
  }, [pathname]); // Chạy mỗi khi pathname thay đổi

  return null;
}

export default ScrollToTop;