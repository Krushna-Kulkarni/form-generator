import { v4 as uuid } from "uuid";
export const textFieldObject = {
  type: "text",
  subType: "text",
  label: "Text Field",
  placeholder: "Placeholder text...",
  value: "",
  maxLength: 50,
  required: false,
};
export const textareaFieldObject = {
  type: "textarea",
  subType: "textarea",
  label: "Text Area",
  placeholder: "Placeholder text...",
  value: "",
  rows: 5,
  cols: 50,
  maxLength: 100,
  required: false,
};
export const radioFieldObject = {
  type: "radio",
  label: "Radio Group",
  selectedOption: "",
  options: [
    { id: uuid(), label: "option-1", value: "option1" },
    { id: uuid(), label: "option-2", value: "option2" },
    { id: uuid(), label: "option-3", value: "option3" },
    { id: uuid(), label: "option-4", value: "option4" },
  ],
  required: false,
};
export const selectFieldObject = {
  type: "select",
  label: "Select",
  selectedOption: "",
  options: [
    { id: uuid(), value: "option1" },
    { id: uuid(), value: "option2" },
    { id: uuid(), value: "option3" },
    { id: uuid(), value: "option4" },
  ],
  required: false,
};
export const checkboxFieldObject = {
  type: "checkbox",
  label: "Checkbox Group",
  options: [
    { id: uuid(), label: "option-1", value: "option1", checked: false },
    { id: uuid(), label: "option-2", value: "option2", checked: false },
    { id: uuid(), label: "option-3", value: "option3", checked: false },
    { id: uuid(), label: "option-4", value: "option4", checked: false },
  ],
  required: false,
};
export const buttonFieldObject = {
  type: "button",
  subType: "button",
  label: "Button",
  value: "",
};
export const fileUploadObject = {
  type: "file",
  label: "File Upload",
  acceptedFileTypes: [
    ".png, .jpg, .jpeg,",
    ".pdf,",
    ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,",
  ],
  required: false,
};
