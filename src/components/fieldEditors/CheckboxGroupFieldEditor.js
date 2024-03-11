import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { updateField } from "../../slices/formFieldsSlice";

const CheckboxGroupFieldEditor = ({
  field,
  setIsFieldEditorActive,
  setField,
}) => {
  const [checkboxGroupField, setCheckboxGroupField] = useState(field);
  const dispatch = useDispatch();

  const handleCheckbooxGroupLabelChange = (e) => {
    setCheckboxGroupField({ ...checkboxGroupField, label: e.target.value });
  };
  const handleOptionLabelChange = (e) => {
    const updatedRadioFieldOptions = checkboxGroupField?.options?.map((opt) =>
      opt?.id === e.target.id ? { ...opt, label: e.target.value } : opt
    );
    setCheckboxGroupField({
      ...checkboxGroupField,
      options: updatedRadioFieldOptions,
    });
  };
  const handleOptionValueChange = (e) => {
    const updatedRadioFieldOptions = checkboxGroupField?.options?.map((opt) =>
      opt?.id === e.target.id ? { ...opt, value: e.target.value } : opt
    );
    setCheckboxGroupField({
      ...checkboxGroupField,
      options: updatedRadioFieldOptions,
    });
  };

  const checkboxSelectHandler = (e) => {
    const updatedCheckboxOptions = checkboxGroupField?.options?.map((option) =>
      option?.id === e.target.id
        ? { ...option, checked: !option?.checked }
        : option
    );
    setCheckboxGroupField({
      ...checkboxGroupField,
      options: updatedCheckboxOptions,
    });
  };
  const addNewOptionHandler = (e) => {
    e.preventDefault();
    const newOption = {
      id: uuid(),
      label: `option-${checkboxGroupField?.options?.length + 1}`,
      value: `option${checkboxGroupField?.options?.length + 1}`,
    };
    setCheckboxGroupField({
      ...checkboxGroupField,
      options: [...checkboxGroupField?.options, newOption],
    });
  };
  const deleteOptionHandler = (e, optionId) => {
    e.preventDefault();

    const updatedCheckboxFieldOptions = checkboxGroupField?.options?.filter(
      (opt) => opt?.id !== optionId
    );

    setCheckboxGroupField({
      ...checkboxGroupField,
      options: updatedCheckboxFieldOptions,
      selectedOption:
        optionId === checkboxGroupField?.selectedOption
          ? ""
          : checkboxGroupField?.selectedOption,
    });
  };
  const requiredChangeHandler = () => {
    setCheckboxGroupField({
      ...checkboxGroupField,
      required: !checkboxGroupField.required,
    });
  };

  const resetSelection = (e) => {
    e.preventDefault();
    const updatedCheckboxGroupFieldOptions = checkboxGroupField?.options?.map(
      (opt) => ({ ...opt, checked: false })
    );
    setCheckboxGroupField({
      ...checkboxGroupField,
      selectedOption: "",
      options: updatedCheckboxGroupFieldOptions,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setField(checkboxGroupField);
    dispatch(
      updateField({ id: checkboxGroupField?.id, field: checkboxGroupField })
    );
    setIsFieldEditorActive(false);
  };

  return (
    <form className="checkboxGroup-field-editor-div" onSubmit={submitHandler}>
      <div className="checkboxGroup-field-attr-div">
        <label htmlFor={checkboxGroupField?.id}>Label: </label>
        <input
          className="checkboxGroup-field-attr-input"
          type="text"
          id={checkboxGroupField?.id}
          name={checkboxGroupField?.label}
          value={checkboxGroupField?.label}
          onChange={handleCheckbooxGroupLabelChange}
        />
      </div>
      <div className="checkboxGroup-field-attr-div">
        <label>Options: [label][value]</label>
      </div>
      {checkboxGroupField?.options?.map((option) => (
        <div className="checkboxGroup-field-attr-div" key={option?.id}>
          <input
            className="checkboxGroup-field-attr-input"
            type="checkbox"
            id={option?.id}
            name={option?.label}
            value={option?.value}
            checked={option?.checked}
            onChange={checkboxSelectHandler}
          />
          <label>
            <input
              className="checkboxGroup-field-attr-input"
              type="text"
              id={option?.id}
              name={option?.label}
              value={option?.label}
              onChange={handleOptionLabelChange}
            />
          </label>
          <label>
            <input
              className="checkboxGroup-field-attr-input"
              type="text"
              id={option?.id}
              name={option?.value}
              value={option?.value}
              onChange={handleOptionValueChange}
            />
          </label>
          {checkboxGroupField?.options?.length > 1 && (
            <button
              className="edit-field-action-btn"
              onClick={(e) => deleteOptionHandler(e, option?.id)}
            >
              Delete Option
            </button>
          )}
        </div>
      ))}

      <div className="checkboxGroup-field-attr-div">
        <label
          className="checkboxGroup-field-attr-label"
          htmlFor="checkboxGroupFieldRequired"
        >
          Required:{" "}
        </label>
        <input
          className="checkboxGroup-field-attr-input"
          type="checkbox"
          id="checkboxGroupFieldRequired"
          name="required"
          defaultChecked={checkboxGroupField?.required}
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

export default CheckboxGroupFieldEditor;
