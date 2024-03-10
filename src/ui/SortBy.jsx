import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sort-by") ?? "";
  function handleChange(e) {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortByValue}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
