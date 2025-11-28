import { useRef, useState, useEffect } from "react";

export const ImageUpload = ({
  onFileSelect,
  multiple = false,
  accept = "image/*",
}) => {
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    onFileSelect(files);
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const newPreviews = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  return (
    <div
      className={`upload-container ${dragging ? "dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      style={{
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      />
      <div className="upload-btns">
        <p>Drag & Drop or Click to Select {multiple ? "Images" : "an Image"}</p>
      </div>
      {previews.length > 0 && (
        <div
          className="uploaded-preview"
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {previews.map((preview, idx) => (
            <img
              key={idx}
              src={preview.url}
              alt="Preview"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
