import React from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../slices/formFieldsSlice";

const TextFieldEditor = ({ field, setIsFieldEditorActive, setField }) => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const getEditedFields = Object.fromEntries(formData.entries());

    setField({
      ...field,
      ...getEditedFields,
      required: getEditedFields?.required === "on",
    });
    dispatch(
      updateField({
        id: field?.id,
        field: {
          ...field,
          ...getEditedFields,
          required: getEditedFields?.required === "on",
        },
      })
    );
    setIsFieldEditorActive(false);
  };
  return (
    <form className="text-field-editor-div" onSubmit={submitHandler}>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="textFieldLabel">
          Label:{" "}
        </label>
        <input
          className="text-field-attr-input"
          type="text"
          id="textFieldLabel"
          name="label"
          defaultValue={field?.label}
        />
      </div>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="textFieldPlaceholder">
          Placeholder:{" "}
        </label>
        <input
          className="text-field-attr-input"
          type="text"
          id="textFieldPlaceholder"
          name="placeholder"
          defaultValue={field?.placeholder}
        />
      </div>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="textFieldValue">
          Value:{" "}
        </label>
        <input
          className="text-field-attr-input"
          type="text"
          id="textFieldValue"
          name="value"
          defaultValue={field?.value}
        />
      </div>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="subType-select">
          Type:{" "}
        </label>

        <select
          className="text-field-attr-input"
          name="subType"
          id="subType-select"
          defaultValue={field?.subType}
        >
          <option value="text">text</option>
          <option value="email">email</option>
          <option value="color">color</option>
          <option value="password">password</option>
          <option value="tel">tel</option>
        </select>
      </div>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="textFieldMaxLength">
          Max Length:{" "}
        </label>
        <input
          className="text-field-attr-input"
          type="number"
          id="textFieldMaxLength"
          name="maxLength"
          defaultValue={field?.maxLength}
        />
      </div>
      <div className="text-field-attr-div">
        <label className="text-field-attr-label" htmlFor="textFieldRequired">
          Required:{" "}
        </label>
        <input
          className="text-field-attr-input"
          type="checkbox"
          id="textFieldRequired"
          name="required"
          defaultChecked={field?.required}
        />
      </div>
      <div className="edit-field-action-btns-container">
        <input className="edit-field-action-btn" type="submit" value="Save" />{" "}
        <input
          className="edit-field-action-btn"
          type="button"
          value="Cancel"
          onClick={() => setIsFieldEditorActive(false)}
        />
      </div>
    </form>
  );
};

export default TextFieldEditor;
