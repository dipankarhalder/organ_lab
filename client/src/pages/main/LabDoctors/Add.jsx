import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Cross } from "../../../icons";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import { Textarea } from "../../../shared/Textarea";
import { SelectBox } from "../../../shared/SelectBox";
import { CommaInput } from "../../../shared/CommaInput";
import { toastStatus, formStatus } from "../../../constant";
import {
  labdoctorServices,
  specialServices,
} from "../../../services/endpoints";
import { useLocationStore } from "../../../stores/locationStore";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { postServices, getServices } from "../../../services/core.services";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

const doctorSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be a 10-digit number.")
    .required("Phone is required."),
  bio: Yup.string().required("Short bio is required."),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .required("Experience is required.")
    .min(0, "Experience must be at least 0"),
  specialization: Yup.string().required("Specialization is required."),
  location: Yup.string().required("Location is required."),
  qualifications: Yup.array().required("Qualifications are required."),
});

const doctorFormFields = [
  {
    name: "fullName",
    placeholder: "Full Name",
    type: "text",
    component: Input,
  },
  { name: "email", placeholder: "Email", type: "email", component: Input },
  { name: "phone", placeholder: "Phone", type: "text", component: Input },
  { name: "bio", placeholder: "Short Bio", component: Textarea },
  {
    name: "experience",
    placeholder: "Years of Experience",
    type: "number",
    component: Input,
  },
];

export const LabDoctorAdd = ({ isClosing, onClose, onSuccess }) => {
  const { addToast } = useContext(ToastContext);
  const hasFetched = useRef(false);
  const [formLoading, setFormLoading] = useState(false);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const { locationInformation } = useLocationStore();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(doctorSchema),
    defaultValues: {
      qualifications: [],
    },
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchSpecializations = async () => {
      const res = await getServices(`${specialServices}/list`);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (!isError) {
        const options = res.data.data.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }));
        setSpecializationOptions(options);
      }
    };

    fetchSpecializations();
  }, [addToast]);

  const locationOptions =
    locationInformation?.map(({ _id, locationName, locationCode }) => ({
      label: `${locationName} - ${locationCode}`,
      value: _id,
    })) || [];

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const res = await postServices(`${labdoctorServices}/new`, data);
      const isError = await handleApiErrorToast(res, addToast, toastStatus);
      if (isError) {
        return;
      }
      reset();
      await onSuccess();
      onClose();
      addToast({
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
        <h2>Add Doctor</h2>
        <p>Please take a moment to fill out the following form.</p>
        <button className="app_cross_btn_form" onClick={onClose}>
          <Cross />
        </button>
        <div className="app_add_form_files">
          <form onSubmit={handleSubmit(onSubmit)}>
            {doctorFormFields.map(
              ({ name, placeholder, type, component: Component }) => (
                <div className="app_wrap_field" key={name}>
                  {Component ? (
                    <Component
                      type={type}
                      placeholder={placeholder}
                      {...register(name)}
                    />
                  ) : null}
                  {errors[name] && (
                    <p className="app_field_err">{errors[name].message}</p>
                  )}
                </div>
              )
            )}
            <div className="app_wrap_field">
              <SelectBox
                name="specialization"
                value={getValues("specialization")}
                onChange={(e) => setValue("specialization", e.target.value)}
                placeholder="Select Specialization"
                options={specializationOptions}
              />
              {errors.specialization && (
                <p className="app_field_err">{errors.specialization.message}</p>
              )}
            </div>
            <div className="app_wrap_field">
              <SelectBox
                name="location"
                value={getValues("location")}
                onChange={(e) => setValue("location", e.target.value)}
                placeholder="Select Location"
                options={locationOptions}
              />
              {errors.location && (
                <p className="app_field_err">{errors.location.message}</p>
              )}
            </div>
            <div className="app_wrap_field">
              <CommaInput
                name="qualifications"
                value={getValues("qualifications")}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const parsedValue =
                    typeof rawValue === "string"
                      ? rawValue
                          .split(",")
                          .map((q) => q.trim())
                          .filter(Boolean)
                      : [];
                  setValue("qualifications", parsedValue);
                }}
                placeholder="Enter qualifications, separated by commas"
              />
              {errors.qualifications && (
                <p className="app_field_err">{errors.qualifications.message}</p>
              )}
            </div>
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
