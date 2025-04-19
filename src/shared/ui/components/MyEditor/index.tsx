"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import "../../styles/quill.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value = "",
  onChange = () => {},
}) => {
  const modules = {
    toolbar: [
      ["bold", "italic"], // Bold dan Italic
      [{ list: "ordered" }, { list: "bullet" }], // List
      ["image", "link"], // Gambar dan Link
    ],
  };

  const formats = undefined;

  return (
    <div className="flex w-full">
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={"Add Experience"}
        className="w-full min-h-[300px]"
      />
    </div>
  );
};

export default QuillEditor;
