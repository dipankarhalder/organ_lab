import { useEffect, useState, useCallback, useContext } from "react";
import moment from "moment";
import { DataTable } from "../../../shared/Table/DataTable";
import { CategoryAdd } from "./Add";
import { toastStatus } from "../../../constant";
import { categoryServices } from "../../../services/endpoints";
import { getServices, deleteServices } from "../../../services/core.services";
import { useCategoryStore } from "../../../stores/categoryStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { AlertContext } from "../../../shared/Alert/context/AlertContext";

export const CategoryList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const { isLoading, categoryList, setLoading, setCategories } =
    useCategoryStore();

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
      message: "Are you sure you want to delete this Category?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await deleteServices(`${categoryServices}/${id}`);
          const isError = await handleApiErrorToast(res, addToast, toastStatus);
          if (isError) return;
          await addToast({
            type: toastStatus.SUCCESS,
            title: "Success",
            description: res.data.message,
          });
          const data = categoryList.filter((list) => list._id !== id);
          setCategories(data);
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

  const fetchCategoryList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices(`${categoryServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) return;
      setCategories(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading, setCategories]);

  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categoryListInfo =
    categoryList &&
    categoryList.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      status: item.active,
      created_by: `${item.user.firstName} ${item.user.lastName}`,
      created_at: moment(item.createdAt).format("DD-MMMM-YYYY, h:mm a"),
    }));

  return (
    categoryListInfo && (
      <div className="app_main_container">
        <div className="app_table_cover">
          <DataTable
            tableTitle="Manage Categories"
            data={categoryListInfo}
            pageSize={10}
            onAddAction={handleAddAction}
            onAction={handleRowAction}
            sortableFields={["name"]}
            isAddBtn={true}
            shortId={"id"}
            linkCol={"name"}
            addBtnContent={"New Category"}
          />
        </div>
        {openAddForm && (
          <div
            className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
          >
            <CategoryAdd
              isClosing={isClosing}
              onClose={handleClose}
              onSuccess={fetchCategoryList}
            />
          </div>
        )}
      </div>
    )
  );
};
