import { useSearchParams } from "react-router-dom";

import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (cabins.length === 0) return <Empty resource="cabins" />;

  const filterValues = searchParams.get("discount") ?? "all";

  // Feature: filter
  let filteredCabins = [];

  if (filterValues === "all") filteredCabins = cabins;
  if (filterValues === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValues === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  // // Feature: sortBy
  const sortBy = searchParams.get("sort-by") ?? "startDate-asc";
  const [sortField, direction] = sortBy.split("-");
  const sortedCabins = filteredCabins.sort((prev, next) => {
    return direction === "asc"
      ? prev[sortField] - next[sortField]
      : next[sortField] - prev[sortField];
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {/* thead */}
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* tbody */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
