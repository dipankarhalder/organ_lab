import { useEffect, useContext, useCallback, useState } from "react";
import { LabDoctorAdd } from "./Add";
import { DataTable } from "../../../shared/Table/DataTable";
import { paths } from "../../../routers/links";
import { toastStatus } from "../../../constant";
import { getServices, deleteServices } from "../../../services/core.services";
import { labdoctorServices } from "../../../services/endpoints";
import { useLabDoctorStore } from "../../../stores/labdoctorStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const LabDoctorsList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, setLoading, labDoctorList, setLabDoctors } =
    useLabDoctorStore();

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
      message: "Are you sure you want to delete this Lab Doctor?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${labdoctorServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = labDoctorList.filter((list) => list._id !== id);
          setLabDoctors(data);
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

  const fetchlabDoctorsList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${labdoctorServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      setLabDoctors(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setLabDoctors]);

  useEffect(() => {
    fetchlabDoctorsList();
  }, [fetchlabDoctorsList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const doctorsLabListInfo =
    labDoctorList &&
    labDoctorList.map((item) => ({
      id: item._id,
      name: item.fullName,
      email: item.email,
      phone: item.phone,
      specialization: item.specialization.name ?? "-",
      location: item.location.locationCode ?? "-",
      status: item.isActive,
    }));

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Lab Doctors"
          data={doctorsLabListInfo}
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
          addBtnContent={"New Lab Doctor"}
          addBtnLink={paths.labDoctorAdd}
        />
      </div>
      {openAddForm && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <LabDoctorAdd
            isClosing={isClosing}
            onClose={handleClose}
            onSuccess={fetchlabDoctorsList}
          />
        </div>
      )}
    </div>
  );
};
