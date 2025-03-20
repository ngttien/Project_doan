import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import styles from "./search.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const branchOptions = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hcm", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "cantho", label: "Cần Thơ" },
];

const roomOptions = [
  { value: "standard", label: "Tiêu chuẩn" },
  { value: "deluxe", label: "Deluxe" },
  { value: "suite", label: "Suite" },
  { value: "vip", label: "VIP" },
];

function Search() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState(null);
  const [filteredBranches, setFilteredBranches] = useState(branchOptions);
  const [roomType, setRoomType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isNextDay, setIsNextDay] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("query") || "");
  }, [location.search]);

  // Xử lý khi nhập vào ô tìm kiếm
  const handleQueryChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.trim() === "") {
      setFilteredBranches(branchOptions);
      setBranch(null); // Nếu xóa hết text, reset chọn chi nhánh
      return;
    }

    // Lọc danh sách chi nhánh theo từ khóa
    const matchedBranches = branchOptions.filter(branch =>
      branch.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredBranches(matchedBranches);

    // Nếu chỉ còn một kết quả duy nhất, tự động chọn
    if (matchedBranches.length === 1) {
      setBranch(matchedBranches[0]);
    }
  };

  const handleSearch = () => {
    console.log({ query, branch, roomType, startDate, endDate });
  };

  return (
    <section className={cx("search-container")}>
      <div className={cx("container")}>
      <div className={cx("search_form")}>
        <div className={cx("search_form_top")}>
          <div className={cx("frame_title")}>
            <h2 className={cx("search_title")}>Tìm kiếm</h2>
          </div>

          {/* Ô nhập tìm kiếm */}
          <input
            type="text"
            value={query}
            onChange={handleQueryChange} // Gọi hàm xử lý
            className={cx("search_box")}
            placeholder="Nhập từ khóa tìm kiếm..."
          />
        </div>

        <div className={cx("search_form_bottom")}>
          <div className={cx("search_select")}>
            <div className={cx("select_left")}>
              <button
                className={cx("next_day", { active: isNextDay })}
                onClick={() => setIsNextDay(true)}
              >
                Qua đêm
              </button>
              <button
                className={cx("in_day", { active: !isNextDay })}
                onClick={() => setIsNextDay(false)}
              >
                Thuê theo giờ
              </button>
            </div>
          </div>

          {/* Select Chi Nhánh */}
          <div className={cx("row")}>
            <div className={cx("bottom_left")}>
              <Select
                options={filteredBranches}
                value={branch}
                onChange={setBranch}
                placeholder="Chọn chi nhánh..."
                className={cx("select_field")}
                isSearchable
              />
            </div>

            {/* Select Loại Phòng */}
            <div className={cx("bottom_right")}>
              <Select
                options={roomOptions}
                value={roomType}
                onChange={setRoomType}
                placeholder="Chọn loại phòng..."
                className={cx("select_field")}
                isSearchable
              />
            </div>
          </div>
        </div>

        {/* Hiển thị check-in và check-out khi chọn Qua đêm */}
        {isNextDay && (
          <div className={cx("search_inputs")}>
            <div className={cx("check_in")}>
              <span>Ngày nhận phòng:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={cx("check_in_input")}
              />
            </div>

            <div className={cx("check_out")}>
              <span>Ngày trả phòng:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={cx("check_out_input")}
              />
            </div>
          </div>
        )}

        <button className={cx("search_button")} onClick={handleSearch}>
          Tìm Kiếm
        </button>
      </div>
      </div>
    </section>
  );
}

export default Search;
