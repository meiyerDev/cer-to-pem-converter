import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CerToPemConverterService } from "./domain";
import { UploadFile } from "./components";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="flex flex-col justify-between h-full max-w-sm px-4 pt-4 mx-auto md:pt-16 md:max-w-screen-md">
        <div className="flex flex-col items-center justify-center gap-8">
          <div>
            <h1 className="font-bold text-center text-7xl text-slate-800">
              CER to PEM converter
            </h1>
            <p className="text-sm text-center text-slate-500">
              This converter is client-side, This application does not store
              your data or the file, nor does it share it with third parties.
              You can see the source code at{" "}
              <a
                href="https://github.com/meiyerDev/cer-to-pem-converter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                here.
              </a>
            </p>
          </div>
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

        <footer className="p-4 text-sm text-center text-slate-500">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/meiyerDev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              meiyerDev
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
