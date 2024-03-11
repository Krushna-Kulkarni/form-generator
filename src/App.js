import "./App.css";
import FormGenerator from "./components/landingPage/FormGenerator";
import FormJsonPreview from "./components/landingPage/FormJsonPreview";

function App() {
  return (
    <div className="main-container">
      <div className="form-generator-title">
        <h1>Dynamic Form Generator</h1>
      </div>
      <div className="form-generator-container">
        <div className="generate-form-container">
          <FormGenerator />
        </div>
        <div className="preview-form-json-container">
          <FormJsonPreview />
        </div>
      </div>
    </div>
  );
}

export default App;
