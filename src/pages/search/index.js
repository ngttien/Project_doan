import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./search.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  return (
    <div className={cx("search-page")}>
      <h1>Kết quả tìm kiếm</h1>
      <input type="text" value={query} readOnly className={cx("search-box")} />
      <p>Bạn đã tìm kiếm: <strong>{query}</strong></p>
    </div>
  );
}

export default Search;
