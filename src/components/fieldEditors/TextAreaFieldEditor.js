import React from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../slices/formFieldsSlice";

const TextareaFieldEditor = ({ field, setIsFieldEditorActive, setField }) => {
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
    <form className="textarea-field-editor-div" onSubmit={submitHandler}>
      <div className="textarea-field-attr-div">
        <label
          className="textarea-field-attr-label"
          htmlFor="textareaFieldLabel"
        >
          Label:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="text"
          id="textareaFieldLabel"
          name="label"
          defaultValue={field?.label}
        />
      </div>
      <div className="textarea-field-attr-div">
        <label
          className="textarea-field-attr-label"
          htmlFor="textareaFieldPlaceholder"
        >
          Placeholder:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="text"
          id="textareaFieldPlaceholder"
          name="placeholder"
          defaultValue={field?.placeholder}
        />
      </div>
      <div className="textarea-field-attr-div">
        <label
          className="textarea-field-attr-label"
          htmlFor="textareaFieldValue"
        >
          Value:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="text"
          id="textareaFieldValue"
          name="value"
          defaultValue={field?.value}
        />
      </div>

      <div className="textarea-field-attr-div">
        <label
          className="textarea-field-attr-label"
          htmlFor="textareaFieldMaxLength"
        >
          Max Length:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="number"
          id="textareaFieldMaxLength"
          name="maxLength"
          defaultValue={field?.maxLength}
        />
      </div>
      <div className="textarea-field-attr-div">
        <label
          className="textarea-field-attr-label"
          htmlFor="textareaFieldMaxLength"
        >
          Rows:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="number"
          id="textareaFieldMaxLength"
          name="rows"
          defaultValue={field?.rows}
        />
      </div>
      <div className="textarea-field-attr-div">
        <label className="textarea-field-attr-label" htmlFor="textareaRequired">
          Required:{" "}
        </label>
        <input
          className="textarea-field-attr-input"
          type="checkbox"
          id="textareaRequired"
          name="required"
          defaultChecked={field?.required}
        />
      </div>
      <div className="edit-field-action-btns-container ">
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

export default TextareaFieldEditor;
