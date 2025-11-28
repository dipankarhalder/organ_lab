import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Cross } from "../../../icons";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import { formStatus, toastStatus } from "../../../constant";
import { postServices } from "../../../services/core.services";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { locationServices } from "../../../services/endpoints";

const locationSchema = Yup.object().shape({
  locationName: Yup.string().required("Location name is required."),
  locationCode: Yup.string().required("Location code is required."),
  locationAddress: Yup.string().required("Location address is required."),
  locationPincode: Yup.string()
    .required("Location pincode is required.")
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number."),
});

const formFields = [
  {
    name: "locationName",
    placeholder: "Location Name (e.g., Durgapur)",
    type: "text",
  },
  {
    name: "locationCode",
    placeholder: "Location Code (e.g., DCD)",
    type: "text",
  },
  {
    name: "locationAddress",
    placeholder: "Location Address",
    type: "text",
  },
  {
    name: "locationPincode",
    placeholder: "Location Pincode (e.g., 560095)",
    type: "text",
  },
];

export const LocationAdd = ({ isClosing, onClose, onSuccess }) => {
  const { addToast } = useContext(ToastContext);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(locationSchema),
  });

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const res = await postServices(`${locationServices}/new`, data);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      reset();
      await onSuccess();
      onClose();
      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success",
        description: res.data.message,
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="app_add_new_item_form_cover">
      <div
        className={`app_form_cover_inside ${isClosing ? "slideOut" : "slideIn"}`}
      >
        <h2>New Lab Location</h2>
        <p>Please take a moment to fill out the following form.</p>
        <button className="app_cross_btn_form" onClick={onClose}>
          <Cross />
        </button>
        <div className="app_add_form_files">
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map(({ name, placeholder, type }) => (
              <div className="app_wrap_field" key={name}>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...register(name)}
                />
                {errors[name] && (
                  <p className="app_field_err">{errors[name].message}</p>
                )}
              </div>
            ))}
            <div className="app_submit_back_btn">
              <Button status={formLoading && formStatus.LOADING}>Submit</Button>
              <span onClick={onClose} className="btn_cancel">
                Cancel
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
