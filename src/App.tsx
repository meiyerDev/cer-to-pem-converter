import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { CerToPemConverterService } from "./domain";
import { UploadFile } from "./components";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleClick = () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    CerToPemConverterService.make()
      .execute(file)
      .then((file) => {
        const url = URL.createObjectURL(file);

        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        toast.success("File converted and downloaded!");
      });
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      <ToastContainer />
      <div className="h-full max-w-screen-md mx-auto">
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <h1 className="text-center text-7xl">CER to PEM converter</h1>
          <div className="flex flex-col items-center justify-center w-full gap-6">
            <UploadFile file={file} onChange={setFile} />
            <button
              type="button"
              className="w-full uppercase btn btn-primary btn-outline"
              onClick={handleClick}
            >
              Convert and download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
