import { useEffect, useContext, useCallback, useState } from "react";
import { DoctorAdd } from "./Add";
import { DataTable } from "../../../shared/Table/DataTable";
import { toastStatus } from "../../../constant";
import { getServices, deleteServices } from "../../../services/core.services";
import { doctorServices } from "../../../services/endpoints";
import { useDoctorStore } from "../../../stores/doctorStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const DoctorList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, setLoading, isDocData, setDocs } = useDoctorStore();

  const handleRowAction = (actionType, rowData) => {
    console.log("Action:", actionType);
    console.log("Row Data:", rowData);

    if (actionType === "edit") {
      // handle edit logic
    } else if (actionType === "view") {
      // handle view logic
    } else if (actionType === "delete") {
      handleDelete(rowData.id);
    }
  };

  const handleDelete = async (id) => {
    showAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Doctor?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${doctorServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = isDocData.filter((list) => list._id !== id);
          setDocs(data);
        } catch (error) {
          await addToast({
            type: toastStatus.ERROR,
            title: "Error",
            description: error.mesage,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleAddAction = () => {
    setOpenAddForm(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenAddForm(false);
      setIsClosing(false);
    }, 400);
  };

  const fetchDoctorsList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${doctorServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      setDocs(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setDocs]);

  useEffect(() => {
    fetchDoctorsList();
  }, [fetchDoctorsList]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <span className="loader" /> Loading doctor informations...
      </div>
    );
  }

  const doctorsListInfo =
    isDocData &&
    isDocData.map((item) => ({
      id: item._id,
      name: item.fullName,
      email: item.email,
      phone: item.phone,
      specialization: item.specialization?.name ?? "-",
      location: item.location?.locationCode ?? "-",
      status: item.isActive,
    }));

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Doctors"
          data={doctorsListInfo}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={[
            "name",
            "email",
            "phone",
            "specialization",
            "location",
          ]}
          isAddBtn={true}
          shortId={"id"}
          linkCol={"name"}
          shortDesc={""}
          addBtnContent={"New Doctor"}
        />
      </div>
      {openAddForm && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <DoctorAdd
            isClosing={isClosing}
            onClose={handleClose}
            onSuccess={fetchDoctorsList}
          />
        </div>
      )}
    </div>
  );
};
