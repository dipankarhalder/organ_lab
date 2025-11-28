import { useEffect, useCallback, useMemo, useState } from "react";
import moment from "moment";
import { DataTable } from "../../../shared/Table/DataTable";
import { usePatientStore } from "../../../stores/patientStore";

export const PatientList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openViewPop, setOpenViewPop] = useState(false);

  const { isPatientLoading, patientListData, fetchPatientLists } =
    usePatientStore();

  useEffect(() => {
    fetchPatientLists();
  }, [fetchPatientLists]);

  const patientsListInfo = useMemo(() => {
    if (!Array.isArray(patientListData)) return [];

    return patientListData.map((item) => {
      const genderInfo =
        item.gender.charAt(0).toUpperCase() + item.gender.slice(1);
      const createdInfo =
        item.createdBy.charAt(0).toUpperCase() + item.createdBy.slice(1);

      return {
        id: item._id,
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        phone: item.phone,
        gender: genderInfo,
        DOB: moment(item.dateOfBirth).format("DD-MMMM-YYYY"),
        created_by: createdInfo,
        created_at: moment(item.createdAt).format("DD-MMMM-YYYY, h:mm a"),
      };
    });
  }, [patientListData]);

  const handleRowAction = useCallback((actionType, rowData) => {
    console.log("Row Data:", rowData);

    if (actionType === "edit") {
      // handle edit logic
    } else if (actionType === "view") {
      // handle view logic
    } else if (actionType === "delete") {
      // handle delete logic
    }
  }, []);

  const handleAddAction = useCallback(() => {
    setOpenAddForm(true);
    setIsClosing(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenAddForm(false);
      setOpenViewPop(false);
      setIsClosing(false);
    }, 400);
  }, []);

  if (isPatientLoading) {
    return <div>Loading patients...</div>;
  }

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Patients"
          data={patientsListInfo}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={["name", "email", "phone"]}
          isAddBtn={true}
          shortId="id"
          linkCol="name"
          addBtnContent="New Patient"
        />
      </div>
    </div>
  );
};
