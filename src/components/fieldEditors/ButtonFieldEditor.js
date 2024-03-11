import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../slices/formFieldsSlice";

const ButtonFieldEditor = ({ field, setIsFieldEditorActive, setField }) => {
  const [buttonField, setButtonField] = useState(field);

  const dispatch = useDispatch();
  const handleButtonFieldLabel = (e) => {
    const updatedLabel = e.target.value;
    setButtonField({ ...buttonField, label: updatedLabel });
  };

  const handleButtonTypeDropdownChange = (e) => {
    e.preventDefault();
    setButtonField({ ...buttonField, subType: e.target.value });
  };
  const handleButtonFieldValue = (e) => {
    e.preventDefault();
    setButtonField({ ...buttonField, value: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setField(buttonField);
    dispatch(
      updateField({
        id: buttonField?.id,
        field: buttonField,
      })
    );
    setIsFieldEditorActive(false);
  };
  return (
    <form className="button-field-editor-div" onSubmit={submitHandler}>
      <div className="button-field-attr-div">
        <label htmlFor={buttonField?.id}>Label: </label>
        <input
          className="button-field-attr-input"
          type="text"
          id={buttonField?.id}
          name={buttonField?.label}
          value={buttonField?.label}
          onChange={handleButtonFieldLabel}
        />
      </div>
      <div className="button-field-attr-div">
        <label htmlFor="buttonFieldSubType">Type: </label>
        <select
          className="button-field-attr-input"
          id="buttonFieldSubType"
          defaultValue={buttonField?.subType}
          onChange={handleButtonTypeDropdownChange}
        >
          <option value="submit">submit</option>
          <option value="button">button</option>
          <option value="reset">reset</option>
        </select>
      </div>
      <div className="button-field-attr-div">
        <label htmlFor="buttonValue">Value: </label>
        <input
          className="button-field-attr-input"
          type="text"
          id="buttonValue"
          name="buttonValue"
          value={buttonField?.value}
          onChange={handleButtonFieldValue}
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

export default ButtonFieldEditor;
