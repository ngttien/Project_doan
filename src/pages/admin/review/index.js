import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./review.module.scss";
import { MdOutlineStar } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { GoClock } from "react-icons/go";




const cx = classNames.bind(styles);

const initialReviews = [
  { id: 1, name: "Nguyễn Văn A", rating: 5, comment: "Dịch vụ tuyệt vời!", approved: true },
  { id: 2, name: "Trần Thị B", rating: 4, comment: "Phòng sạch sẽ, view đẹp.", approved: true },
  { id: 3, name: "Lê Văn C", rating: 3, comment: "Giá hơi cao so với chất lượng.", approved: false },
];

const ReviewPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [visibleComments, setVisibleComments] = useState({});

  // Tính điểm trung bình
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "Chưa có đánh giá";

  // Xử lý gửi đánh giá
  const handleSubmit = () => {
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, { ...newReview, id: reviews.length + 1, approved: false }]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  // Xóa đánh giá
  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  // Duyệt đánh giá
  const handleApprove = (id) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, approved: true } : review)));
  };

  // Hiển thị / Ẩn bình luận
  const toggleCommentVisibility = (id) => {
    setVisibleComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cx("review-container")}>
      <h1>Quản lý Phản hồi & Đánh giá</h1>

      <h2><MdOutlineStar /> Đánh giá trung bình: {averageRating} / 5</h2>

      {/* Form gửi đánh giá */}


      {/* Danh sách phản hồi */}
      <table className={cx("review-table")}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Đánh giá</th>
            <th>Bình luận</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.name}</td>
              <td>{review.rating} <MdOutlineStar /></td>
              <td className={cx("comment")}>
                <button className={cx("show-btn")} onClick={() => toggleCommentVisibility(review.id)}>
                  {visibleComments[review.id] ? "Ẩn bình luận" : "Hiển thị bình luận"}
                </button>
                {visibleComments[review.id] && <p className={cx("comment-text")}>{review.comment}</p>}
              </td>
              <td>{review.approved ? <><GiConfirmed /> Đã duyệt</> : <><GoClock /> Chờ duyệt</>}</td>
              <td>
                {!review.approved && (
                  <button className={cx("approve-btn")} onClick={() => handleApprove(review.id)}>
                    Duyệt
                  </button>
                )}
                <button className={cx("delete-btn")} onClick={() => handleDelete(review.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewPage;
