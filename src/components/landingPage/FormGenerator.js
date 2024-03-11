import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, clearFields } from "../../slices/formFieldsSlice";
import TextField from "../fields/TextField";
import RadioGroup from "../fields/RadioGroup";
import TextArea from "../fields/TextArea";
import Select from "../fields/Select";
import CheckboxGroup from "../fields/CheckboxGroup";
import Button from "../fields/Button";
import FileUpload from "../fields/FileUpload";

const fieldTypeBtns = [
  "Text Field",
  "Text Area",
  "Radio Group",
  "Select",
  "Checkbox Group",
  "Button",
  "File Upload",
];

const FormGenerator = () => {
  const formFields = useSelector((state) => state.formFields);

  const dispatch = useDispatch();
  return (
    <div className="form-generator">
      <div className="form-generator-title">
        <h2>Build Form</h2>
      </div>
      <div className="form-generator-content">
        <div className="edit-form-container">
          {formFields?.map((field) => (
            <div key={field.id}>
              {field?.type === "text" && <TextField field={field} />}
              {field?.type === "textarea" && <TextArea field={field} />}
              {field.type === "radio" && <RadioGroup field={field} />}
              {field.type === "select" && <Select field={field} />}
              {field.type === "checkbox" && <CheckboxGroup field={field} />}
              {field.type === "button" && <Button field={field} />}
              {field.type === "file" && <FileUpload field={field} />}
            </div>
          ))}
        </div>

        <div className="form-input-btns-container">
          {fieldTypeBtns.map((fieldBtnType, index) => (
            <button
              key={index}
              onClick={() => dispatch(addField({ type: fieldBtnType }))}
              type="button"
              className="field-btn"
            >
              {fieldBtnType}
            </button>
          ))}
          <button className="field-btn" onClick={() => dispatch(clearFields())}>
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormGenerator;
