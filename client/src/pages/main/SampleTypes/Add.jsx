import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Cross } from "../../../icons";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import { Textarea } from "../../../shared/Textarea";
import { formStatus, toastStatus } from "../../../constant";
import { postServices } from "../../../services/core.services";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { sampletypeServices } from "../../../services/endpoints";

const sampleTypeSchema = Yup.object().shape({
  typeName: Yup.string().required("Sample type name is required."),
  typeDesc: Yup.string().required("Description is required."),
});

const formFields = [
  {
    name: "typeName",
    placeholder: "Sample Type Name",
    type: "text",
    FieldComponent: Input,
  },
  {
    name: "typeDesc",
    placeholder: "Description",
    FieldComponent: Textarea,
  },
];

export const SampleTypeAdd = ({ isClosing, onClose, onSuccess }) => {
  const { addToast } = useContext(ToastContext);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(sampleTypeSchema),
  });

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const res = await postServices(`${sampletypeServices}/new`, data);
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
        <h2>New Sample Type</h2>
        <p>Please take a moment to fill out the following form.</p>
        <button className="app_cross_btn_form" onClick={onClose}>
          <Cross />
        </button>
        <div className="app_add_form_files">
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field) => {
              const { name, placeholder, type, FieldComponent } = field;
              return (
                <div className="app_wrap_field" key={name}>
                  <FieldComponent
                    {...register(name)}
                    placeholder={placeholder}
                    {...(type ? { type } : {})}
                  />
                  {errors[name] && (
                    <p className="app_field_err">{errors[name].message}</p>
                  )}
                </div>
              );
            })}
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
