import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaFilePdf } from "react-icons/fa";
import { X, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import useDocs from "../../hooks/useDocs";
import { emitToast } from "../../utils/emitToast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const fileTypes = ["PDF"];

function DragDrop({ setFile, file }) {
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <div className="w-full p-2">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        children={
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-all duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-10 w-10 text-gray-400" />
              {file ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    File ready for upload
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Drag & drop your file here
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    or click to browse
                  </p>
                </div>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}

function DocumentCard({ documentName }) {
  const fileSize = "Unknown size";
  const date = new Date().toLocaleDateString();

  return (
    <Card className="w-full bg-white dark:bg-gray-800 border-0 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
            <FaFilePdf className="h-8 w-8 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {documentName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {fileSize}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {date}
              </span>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
          >
            PDF
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DocumentUploadPage({ onClose }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadDoc } = useDocs();

  const confirmUpload = async () => {
    if (!file) {
      emitToast("Please select a file");
      return;
    }

    setIsUploading(true);
    try {
      await uploadDoc(file, file.name);
      emitToast("Document uploaded successfully");
      onClose();
    } catch (error) {
      emitToast("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-900 border-0 shadow-2xl">
        <CardHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center">
            Upload Document
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <DragDrop setFile={setFile} file={file} />

              {!file && (
                <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                    Supported file type: PDF
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Document Preview
              </h3>

              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                {file ? (
                  <DocumentCard documentName={file.name} />
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>No document selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-4 p-6 pt-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={confirmUpload}
            disabled={!file || isUploading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
