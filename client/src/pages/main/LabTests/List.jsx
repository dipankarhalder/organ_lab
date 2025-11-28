import { DataTable } from "../../../shared/Table/DataTable";

export const LabTestList = () => {
  const handleRowAction = (actionType, rowData) => {
    console.log("Action:", actionType);
    console.log("Row Data:", rowData);

    if (actionType === "edit") {
      // handle edit logic
    } else if (actionType === "view") {
      // handle view logic
    } else if (actionType === "delete") {
      // handle delete logic
    }
  };

  const handleAddAction = () => {
    console.log("sdkjf");
  };

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage All Tests"
          data={[]}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={["name"]}
          isAddBtn={true}
          shortId={"id"}
          linkCol={"name"}
          shortDesc={""}
          addBtnContent={"New Test Item"}
        />
      </div>
    </div>
  );
};
