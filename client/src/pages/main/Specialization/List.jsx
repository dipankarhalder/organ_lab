import { useEffect, useCallback, useState, useContext } from "react";
import moment from "moment";
import { SpecializationAdd } from "./Add";
import { DataTable } from "../../../shared/Table/DataTable";
import { toastStatus } from "../../../constant";
import { getServices, deleteServices } from "../../../services/core.services";
import { specialServices } from "../../../services/endpoints";
import { useSpeclStore } from "../../../stores/speclStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const SpecializationList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, setLoading, isSpeclData, setSpcl } = useSpeclStore();

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
      message: "Are you sure you want to delete this Specialization?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${specialServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = isSpeclData.filter((list) => list._id !== id);
          setSpcl(data);
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

  const fetchSpecializationList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${specialServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      setSpcl(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setSpcl]);

  useEffect(() => {
    fetchSpecializationList();
  }, [fetchSpecializationList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const specializationListInfo =
    isSpeclData &&
    isSpeclData.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      status: item.active,
      created_by: `${item.createBy.firstName} ${item.createBy.lastName}`,
      created_at: moment(item.createdAt).format("DD-MMMM-YYYY, h:mm a"),
    }));

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Specialization"
          data={specializationListInfo}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={["name"]}
          isAddBtn={true}
          shortId={"id"}
          linkCol={"name"}
          shortDesc={"description"}
          addBtnContent={"New Specialization"}
        />
      </div>
      {openAddForm && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <SpecializationAdd
            isClosing={isClosing}
            onClose={handleClose}
            onSuccess={fetchSpecializationList}
          />
        </div>
      )}
    </div>
  );
};
