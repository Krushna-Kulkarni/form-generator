import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { updateField } from "../../slices/formFieldsSlice";
const RadioGroupFieldEditor = ({ field, setField, setIsFieldEditorActive }) => {
  const [radioField, setRadioField] = useState(field);
  const dispatch = useDispatch();

  const handleOptionLabelChange = (e) => {
    const updatedRadioFieldOptions = radioField?.options?.map((opt) =>
      opt?.id === e.target.id ? { ...opt, label: e.target.value } : opt
    );
    setRadioField({ ...radioField, options: updatedRadioFieldOptions });
  };
  const handleOptionValueChange = (e) => {
    const updatedRadioFieldOptions = radioField?.options?.map((opt) =>
      opt?.id === e.target.id ? { ...opt, value: e.target.value } : opt
    );
    setRadioField({ ...radioField, options: updatedRadioFieldOptions });
  };
  const handleRadioSelectionChange = (e) => {
    setRadioField({
      ...radioField,
      selectedOption: e.target.id,
    });
  };
  const handleRadioLabelChange = (e) => {
    setRadioField({ ...radioField, label: e.target.value });
  };

  const addNewOptionHandler = (e) => {
    e.preventDefault();
    const newOption = {
      id: uuid(),
      label: `option-${radioField?.options?.length + 1}`,
      value: `option${radioField?.options?.length + 1}`,
    };
    setRadioField({
      ...radioField,
      options: [...radioField?.options, newOption],
    });
  };
  const deleteOptionHandler = (e, optionId) => {
    e.preventDefault();

    const updatedRadioFieldOptions = radioField?.options?.filter(
      (opt) => opt?.id !== optionId
    );

    setRadioField({
      ...radioField,
      options: updatedRadioFieldOptions,
      selectedOption:
        optionId === radioField?.selectedOption
          ? ""
          : radioField?.selectedOption,
    });
  };
  const requiredChangeHandler = () => {
    setRadioField({
      ...radioField,
      required: !radioField.required,
    });
  };
  const resetSelection = (e) => {
    e.preventDefault();
    setRadioField({
      ...radioField,
      selectedOption: "",
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setField(radioField);
    dispatch(updateField({ id: radioField?.id, field: radioField }));
    setIsFieldEditorActive(false);
  };

  return (
    <form className="radioGroup-field-editor-div" onSubmit={submitHandler}>
      <div className="radioGroup-field-attr-div">
        <label htmlFor={radioField?.id}>Label: </label>
        <input
          className="radioGroup-field-attr-input"
          type="text"
          id={radioField?.id}
          name={radioField?.label}
          defaultValue={radioField?.label}
          onChange={handleRadioLabelChange}
        />
      </div>
      <div className="radioGroup-field-attr-div">
        <label>Options: [label][value]</label>
      </div>
      {radioField?.options?.map((option, i) => (
        <div key={i} className="radioGroup-field-attr-div">
          <input
            className="radioGroup-field-attr-input"
            type="radio"
            id={option?.id}
            name={option?.label}
            defaultValue={option?.value}
            onChange={handleRadioSelectionChange}
            checked={radioField?.selectedOption === option?.id}
          />
          <label>
            <input
              className="radioGroup-field-attr-input"
              type="text"
              id={option?.id}
              name={option?.label}
              defaultValue={option?.label}
              onChange={handleOptionLabelChange}
            />
          </label>
          <label>
            <input
              className="radioGroup-field-attr-input"
              type="text"
              id={option?.id}
              name={option?.value}
              defaultValue={option?.value}
              onChange={handleOptionValueChange}
            />
          </label>
          {radioField?.options?.length > 2 && (
            <button
              className="edit-field-action-btn"
              onClick={(e) => deleteOptionHandler(e, option?.id)}
            >
              Delete Option
            </button>
          )}
        </div>
      ))}

      <div className="radioGroup-field-attr-div">
        <label
          className="radioGroup-field-attr-label"
          htmlFor="radioFieldRequired"
        >
          Required:{" "}
        </label>
        <input
          className="radioGroup-field-attr-input"
          type="checkbox"
          id="radioFieldRequired"
          name="required"
          defaultChecked={radioField?.required}
          onChange={requiredChangeHandler}
        />
      </div>
      <div className="edit-field-action-btns-container">
        <button className="edit-field-action-btn" onClick={resetSelection}>
          Reset Selection
        </button>
        <button className="edit-field-action-btn" onClick={addNewOptionHandler}>
          +Add Option
        </button>
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

export default RadioGroupFieldEditor;
