import { useEffect, useCallback, useState, useContext } from "react";
import moment from "moment";
import { DataTable } from "../../../shared/Table/DataTable";
import { SubCatgryAdd } from "./Add";
import { toastStatus } from "../../../constant";
import { getServices, deleteServices } from "../../../services/core.services";
import { subcategoryServices } from "../../../services/endpoints";
import { useSubCategoryStore } from "../../../stores/subCategory";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const SubCategoryList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, setLoading, subCateList, setSubCategories } =
    useSubCategoryStore();

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
      message: "Are you sure you want to delete this Sub Category?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${subcategoryServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = subCateList.filter((list) => list._id !== id);
          setSubCategories(data);
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

  const fetchSubCategoryList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${subcategoryServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      setSubCategories(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setSubCategories]);

  useEffect(() => {
    fetchSubCategoryList();
  }, [fetchSubCategoryList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const subcategoryInformation =
    subCateList &&
    subCateList.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      status: item.active,
      created_by: `${item.user.firstName} ${item.user.lastName}`,
      created_at: moment(item.createdAt).format("DD-MMMM-YYYY, h:mm a"),
    }));

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Sub-Category"
          data={subcategoryInformation}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={["name"]}
          isAddBtn={true}
          shortId={"id"}
          linkCol={"name"}
          shortDesc={""}
          addBtnContent={"New Sub-Category"}
        />
      </div>
      {openAddForm && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <SubCatgryAdd
            isClosing={isClosing}
            onClose={handleClose}
            onSuccess={fetchSubCategoryList}
          />
        </div>
      )}
    </div>
  );
};
