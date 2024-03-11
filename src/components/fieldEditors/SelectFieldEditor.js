import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { updateField } from "../../slices/formFieldsSlice";

const SelectFieldEditor = ({ field, setField, setIsFieldEditorActive }) => {
  const [selectField, setSelectField] = useState(field);
  const dispatch = useDispatch();

  const handleSelectLabelChange = (e) => {
    setSelectField({ ...selectField, label: e.target.value });
  };

  const handleRadioSelectionChange = (e) => {
    setSelectField({
      ...selectField,
      selectedOption: e.target.id,
    });
  };
  const handleSelectOptionValueChange = (e) => {
    const updatedRadioFieldOptions = selectField?.options?.map((opt) =>
      opt?.id === e.target.id ? { ...opt, value: e.target.value } : opt
    );
    setSelectField({
      ...selectField,
      options: updatedRadioFieldOptions,
    });
  };

  const addNewOptionHandler = (e) => {
    e.preventDefault();
    const newOption = {
      id: uuid(),
      value: `option${selectField?.options?.length + 1}`,
    };
    setSelectField({
      ...selectField,
      options: [...selectField?.options, newOption],
    });
  };

  const deleteOptionHandler = (e, optionId) => {
    e.preventDefault();

    const updatedRadioFieldOptions = selectField?.options?.filter(
      (opt) => opt?.id !== optionId
    );

    setSelectField({
      ...selectField,
      options: updatedRadioFieldOptions,
      selectedOption:
        optionId === selectField?.selectedOption
          ? ""
          : selectField?.selectedOption,
    });
  };
  const requiredChangeHandler = () => {
    setSelectField({
      ...selectField,
      required: !selectField.required,
    });
  };
  const resetSelection = (e) => {
    e.preventDefault();
    setSelectField({
      ...selectField,
      selectedOption: "",
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setField(selectField);
    dispatch(
      updateField({
        id: selectField?.id,
        field: selectField,
      })
    );
    setIsFieldEditorActive(false);
  };

  return (
    <form className="select-field-editor-div" onSubmit={submitHandler}>
      <div className="select-field-attr-div">
        <label htmlFor={selectField?.id}>Label: </label>
        <input
          className="select-field-attr-input"
          value={selectField.label}
          onChange={handleSelectLabelChange}
        />
      </div>
      <div className="select-field-attr-div">
        <label>Options: </label>
      </div>
      {selectField?.options?.map((option, i) => (
        <div className="select-field-attr-div" key={i}>
          <input
            className="select-field-attr-input"
            type="radio"
            id={option?.id}
            name={option?.label}
            defaultValue={option?.value}
            onChange={handleRadioSelectionChange}
            checked={selectField?.selectedOption === option?.id}
          />
          <label>
            <input
              className="select-field-attr-input"
              id={option?.id}
              value={option?.value}
              onChange={handleSelectOptionValueChange}
            />
          </label>

          {selectField?.options?.length > 1 && (
            <button
              className="edit-field-action-btn"
              onClick={(e) => deleteOptionHandler(e, option?.id)}
            >
              Delete Option
            </button>
          )}
        </div>
      ))}

      <div className="select-field-attr-div">
        <label
          className="select-field-attr-label"
          htmlFor="selectFieldRequired"
        >
          Required:{" "}
        </label>
        <input
          className="select-field-attr-input"
          type="checkbox"
          id="selectFieldRequired"
          name="required"
          defaultChecked={selectField?.required}
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

export default SelectFieldEditor;
