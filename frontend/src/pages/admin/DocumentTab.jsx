// DocumentsTab.jsx
import React, { useEffect, useState } from "react";
import { Filter, Plus, FileText, Download, Eye, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { getAllDocuments, deleteDocument } from "@/api/adminService";

export default function DocumentsTab({ onUploadClick }) {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const result = await getAllDocuments();
      setDocuments(result);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl shadow-cyan-900/10 overflow-hidden border border-gray-800">
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Documents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-800">
            {documents.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="rounded p-2 bg-blue-900/20 text-blue-400 mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {doc.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {doc.uploadedByUserId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={"Active"} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {doc.uploadedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
