import { useEffect, useState, useMemo, useCallback } from "react";
import moment from "moment";
import { DetailsPage } from "./View";
import { DataTable } from "../../../shared/Table/DataTable";
import { useProfileStore } from "../../../stores/profileStore";

export const MembersList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openViewPop, setOpenViewPop] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);

  const { isLoadingListUser, fetchUsersList, userListInformation } =
    useProfileStore();

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const userListData = useMemo(() => {
    if (!Array.isArray(userListInformation)) return [];

    return userListInformation.map((user) => {
      const role = user.role.replace(/_/g, " ");
      return {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        role: role.charAt(0).toUpperCase() + role.slice(1),
        created_at: moment(user.createdAt).format("DD-MM-YYYY"),
      };
    });
  }, [userListInformation]);

  const handleView = useCallback(
    (dataInfo) => {
      const member = userListInformation.find((u) => u._id === dataInfo.id);
      if (member) {
        setMemberDetails(member);
        setOpenViewPop(true);
        setIsClosing(false);
      }
    },
    [userListInformation]
  );

  const handleDelete = useCallback((id) => {
    console.log("Delete member ID:", id);
  }, []);

  const handleRowAction = useCallback(
    (actionType, rowData) => {
      if (actionType === "edit") {
        // handle edit logic
      } else if (actionType === "view") {
        handleView(rowData);
      } else if (actionType === "delete") {
        handleDelete(rowData.id);
      }
    },
    [handleView, handleDelete]
  );

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenViewPop(false);
      setIsClosing(false);
    }, 400);
  }, []);

  if (isLoadingListUser) {
    return <div>Loading members...</div>;
  }

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Members"
          data={userListData}
          pageSize={10}
          onAction={handleRowAction}
          sortableFields={["name", "email", "phone", "role"]}
          isAddBtn={true}
          shortId="id"
          linkCol="name"
          addBtnContent="Create a Member"
        />
      </div>

      {openViewPop && memberDetails && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <DetailsPage
            isClosing={isClosing}
            memberDetails={memberDetails}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};
