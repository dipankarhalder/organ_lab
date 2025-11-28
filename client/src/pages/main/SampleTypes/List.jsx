import { useEffect, useCallback, useState, useContext } from "react";
import moment from "moment";
import { DataTable } from "../../../shared/Table/DataTable";
import { SampleTypeAdd } from "./Add";
import { toastStatus } from "../../../constant";
import { getServices, deleteServices } from "../../../services/core.services";
import { sampletypeServices } from "../../../services/endpoints";
import { useSampleTypeStore } from "../../../stores/sampletypeStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const SampleTypesList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, setLoading, isSampleData, setSampleType } =
    useSampleTypeStore();

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
      message: "Are you sure you want to delete this Sample?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${sampletypeServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = isSampleData.filter((list) => list._id !== id);
          setSampleType(data);
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

  const fetchSampleTypeList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${sampletypeServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      setSampleType(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setSampleType]);

  useEffect(() => {
    fetchSampleTypeList();
  }, [fetchSampleTypeList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sampleTypeInformation =
    isSampleData &&
    isSampleData.map((item) => ({
      id: item._id,
      name: item.typeName,
      description: item.typeDesc,
      status: item.isActive,
      created_by: `${item.createBy.firstName} ${item.createBy.lastName}`,
      created_at: moment(item.createdAt).format("DD-MMMM-YYYY, h:mm a"),
    }));

  return (
    sampleTypeInformation && (
      <div className="app_main_container">
        <div className="app_table_cover">
          <DataTable
            tableTitle="Manage Sample Types"
            data={sampleTypeInformation}
            pageSize={10}
            onAddAction={handleAddAction}
            onAction={handleRowAction}
            sortableFields={["name"]}
            isAddBtn={true}
            shortId={"id"}
            linkCol={"name"}
            shortDesc={""}
            addBtnContent={"New Sample Type"}
          />
        </div>
        {openAddForm && (
          <div
            className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
          >
            <SampleTypeAdd
              isClosing={isClosing}
              onClose={handleClose}
              onSuccess={fetchSampleTypeList}
            />
          </div>
        )}
      </div>
    )
  );
};
