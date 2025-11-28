import { useMemo, useState, useCallback } from "react";
import { LocationAdd } from "./Add";
import { LocationDetails } from "./View";
import { DataTable } from "../../../shared/Table/DataTable";
import { useLocationStore } from "../../../stores/locationStore";

export const LocationList = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openViewPop, setOpenViewPop] = useState(false);

  const {
    isLocationLoading,
    locationInformation,
    locationDetails,
    fetchLocations,
    fetchDetailsLocation,
  } = useLocationStore();

  const handleView = useCallback(
    async (dataInfo) => {
      await fetchDetailsLocation(dataInfo.id);
      setOpenViewPop(true);
      setIsClosing(false);
    },
    [fetchDetailsLocation]
  );

  const handleDelete = useCallback(async (id) => {
    console.log(id);
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

  const locationListInfo = useMemo(() => {
    if (!Array.isArray(locationInformation)) return [];
    return locationInformation.map(
      ({
        _id,
        locationName,
        locationCode,
        locationPincode,
        locationAddress,
        isActive,
      }) => ({
        id: _id,
        location: locationName,
        code: locationCode,
        pincode: locationPincode,
        address: locationAddress,
        status: isActive,
      })
    );
  }, [locationInformation]);

  if (isLocationLoading) {
    return <div className="app_loading">Loading locations...</div>;
  }

  return (
    <div className="app_main_container">
      <div className="app_table_cover">
        <DataTable
          tableTitle="Manage Locations"
          data={locationListInfo}
          pageSize={10}
          onAddAction={handleAddAction}
          onAction={handleRowAction}
          sortableFields={["location"]}
          isAddBtn={true}
          shortId="id"
          linkCol="location"
          addBtnContent="New Location"
        />
      </div>

      {openViewPop && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <LocationDetails
            isClosing={isClosing}
            viewDetails={locationDetails}
            onClose={handleClose}
          />
        </div>
      )}

      {openAddForm && (
        <div
          className={`app_form_popup_main_cover ${isClosing ? "fadeOut" : "fadeIn"}`}
        >
          <LocationAdd
            isClosing={isClosing}
            onClose={handleClose}
            onSuccess={fetchLocations}
          />
        </div>
      )}
    </div>
  );
};
