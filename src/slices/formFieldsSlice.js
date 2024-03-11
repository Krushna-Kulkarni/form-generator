import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import {
  fileUploadObject,
  checkboxFieldObject,
  radioFieldObject,
  selectFieldObject,
  textFieldObject,
  textareaFieldObject,
  buttonFieldObject,
} from "../utils/constants";

const initialState = {
  formFields: [],
};

export const formFieldsSlice = createSlice({
  name: "formField",
  initialState,
  reducers: {
    addField: (state, action) => {
      switch (action.payload.type) {
        case "Text Field":
          state.formFields.push({
            ...textFieldObject,
            id: uuid(),
            get name() {
              return `${this.subType}-${this.id}`;
            },
          });
          break;
        case "Radio Group":
          state.formFields.push({
            ...radioFieldObject,
            id: uuid(),
            get name() {
              return `${this.type}-${this.id}`;
            },
          });
          break;
        case "Select":
          state.formFields.push({
            ...selectFieldObject,
            id: uuid(),
            get name() {
              return `${this.type}-${this.id}`;
            },
          });
          break;
        case "Text Area":
          state.formFields.push({
            ...textareaFieldObject,
            id: uuid(),
            get name() {
              return `${this.subType}-${this.id}`;
            },
          });
          break;
        case "Checkbox Group":
          state.formFields.push({
            ...checkboxFieldObject,
            id: uuid(),
            get name() {
              return `${this.type}-${this.id}`;
            },
          });
          break;
        case "Button":
          state.formFields.push({
            ...buttonFieldObject,
            id: uuid(),
            get name() {
              return `${this.subType}-${this.id}`;
            },
          });
          break;
        case "File Upload":
          state.formFields.push({
            ...fileUploadObject,
            id: uuid(),
            get name() {
              return `${this.type}-${this.id}`;
            },
          });
          break;
        default:
          break;
      }
    },
    removeField: (state, action) => {
      state.formFields = state.formFields.filter(
        (field) => field.id !== action.payload.id
      );
    },
    updateField: (state, action) => {
      state.formFields = state?.formFields?.map((field) =>
        field?.id === action?.payload?.id ? action.payload?.field : field
      );
    },
    clearFields: (state) => {
      state.formFields = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addField, removeField, updateField, clearFields } =
  formFieldsSlice.actions;

export default formFieldsSlice.reducer;
