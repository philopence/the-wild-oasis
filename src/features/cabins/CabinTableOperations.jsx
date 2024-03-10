import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { lable: "All", value: "all" },
          { lable: "No Discount", value: "no-discount" },
          { lable: "With Discount", value: "with-discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
