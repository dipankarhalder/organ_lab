import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Cross } from "../../../icons";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { Textarea } from "../../../shared/Textarea";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { toastStatus, formStatus } from "../../../constant";
import { specialServices } from "../../../services/endpoints";
import { postServices } from "../../../services/core.services";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

const specializationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  description: Yup.string().required("Description is required."),
});

const formFields = [
  {
    name: "name",
    placeholder: "Name",
    type: "text",
    component: "input",
  },
  {
    name: "description",
    placeholder: "Description",
    component: "textarea",
  },
];

export const SpecializationAdd = ({ isClosing, onClose, onSuccess }) => {
  const { addToast } = useContext(ToastContext);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(specializationSchema),
  });

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const res = await postServices(`${specialServices}/new`, data);
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
        <h2>Add Specialization</h2>
        <p>Please take a moment to fill out the following form.</p>
        <button className="app_cross_btn_form" onClick={onClose}>
          <Cross />
        </button>
        <div className="app_add_form_files">
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map(({ name, placeholder, type, component }, index) => (
              <div className="app_wrap_field" key={index}>
                {component === "textarea" ? (
                  <>
                    <Textarea placeholder={placeholder} {...register(name)} />
                    {errors[name] && (
                      <p className="app_field_err">{errors[name]?.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...register(name)}
                    />
                    {errors[name] && (
                      <p className="app_field_err">{errors[name]?.message}</p>
                    )}
                  </>
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
