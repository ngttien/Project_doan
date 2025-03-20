import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }, [pathname]); // Chạy lại khi đường dẫn thay đổi

    return null; // Không render gì cả
};

export default ScrollToTop;