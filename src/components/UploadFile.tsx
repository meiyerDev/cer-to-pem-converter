import { useRef } from "react";
import { toast } from "react-toastify";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
};

const handleFileValidation = (file: File | null) => {
  if (!file) {
    toast.error("No file selected");
    return false;
  }

  if (file.type !== "application/x-x509-ca-cert") {
    toast.error("Invalid file type");
    return false;
  }

  return true;
};

export const UploadFile = ({ file, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!event.dataTransfer.files.length || !event.dataTransfer.files[0]) {
      toast.error("No file selected");
      return;
    }

    if (!handleFileValidation(event.dataTransfer.files[0])) {
      return;
    }

    onChange(event.dataTransfer.files[0]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !event.target.files[0]) {
      toast.error("No file selected");
      return;
    }

    if (!handleFileValidation(event.target.files[0])) {
      return;
    }

    onChange(event.target.files[0]);
  };

  return (
    <div
      className="w-full p-10 border border-dashed cursor-pointer border-primary rounded-xl"
      onClick={() => inputRef.current?.click()}
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onDragEnd={preventDefault}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col text-2xl text-center border-opacity-50 select-none">
          <p>Drop your .cer file here</p>
          <div className="divider">OR</div>
          <p>Press to search your files</p>
        </div>
        {file && (
          <div className="flex flex-col text-lg">
            <p className="text-slate-600">Selected file:</p>
            <FileComponent file={file} onRemove={() => onChange(null)} />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

type FileProps = {
  file: File | null;
  onRemove: () => void;
};

const FileComponent = ({ file, onRemove }: FileProps) => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-2 bg-white border border-primary rounded-xl">
      <p>{file?.name}</p>
      <button
        type="button"
        className="btn btn-error btn-outline"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
      >
        Remove
      </button>
    </div>
  );
};
