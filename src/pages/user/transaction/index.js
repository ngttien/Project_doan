import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./transaction.module.scss";

const cx = classNames.bind(styles);

const transactions = [
  { id: "123456", date: "2025-03-10", amount: "5,000,000 VND", status: "Hoàn thành" },
  { id: "123457", date: "2025-02-15", amount: "3,000,000 VND", status: "Chờ xử lý" },
  { id: "123458", date: "2025-01-20", amount: "4,500,000 VND", status: "Đã hủy" },
];

const TransactionPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredTransactions = transactions.filter(
    (t) =>
      t.id.includes(search) &&
      (filter ? t.status === filter : true)
  );

  return (
    <div className={cx("transaction-container")}>      
      <h1>Lịch sử giao dịch</h1>
      
      <div className={cx("filter-container")}>        
        <input
          type="text"
          placeholder="Tìm theo mã giao dịch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
      
      <div className={cx("transaction-list")}>        
        {filteredTransactions.map((t) => (
          <div key={t.id} className={cx("transaction-card")}>            
            <h3>Thanh toán đặt phòng</h3>
            <p>Mã giao dịch: #{t.id}</p>
            <p>Ngày giao dịch: {t.date}</p>
            <p>Số tiền: {t.amount}</p>
            <p>Trạng thái: <strong>{t.status}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
