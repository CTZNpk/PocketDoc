import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FileText, Upload, Plus, BookOpen } from "lucide-react";
import DocumentUploadPage from "./DocumentUploadPage";
import docsStore from "../../store/docsStore";
import useDocs from "../../hooks/useDocs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import AnimateBox from "@/components/AnimateBox";
import Title from "@/components/Title";

export default function MyDocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { docs } = docsStore();
  const { getMyDocs } = useDocs();

  useEffect(() => {
    getMyDocs();
  }, [getMyDocs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 ">
      <Navbar />
      <div className="text-white mt-10">
        <AnimateBox className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center mt-8 mb-12">
            <Title>My Documents</Title>

            <Button
              variant="default"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white flex items-center gap-2"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Upload Document
            </Button>
          </div>

          {docs.length === 0 ? (
            <EmptyDocumentsState setIsModalOpen={setIsModalOpen} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {docs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {isModalOpen && (
            <DocumentUploadPage onClose={() => setIsModalOpen(false)} />
          )}
        </AnimateBox>
      </div>
    </div>
  );
}

function EmptyDocumentsState({ setIsModalOpen }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-gray-700 bg-gray-800/50 mt-8">
      <div className="bg-cyan-900/20 p-4 rounded-full mb-4">
        <BookOpen className="h-12 w-12 text-cyan-400" />
      </div>
      <h2 className="text-xl font-medium text-white mb-2">No documents yet</h2>
      <p className="text-gray-400 text-center mb-6">
        Upload your first document to get started
      </p>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload a document
      </Button>
    </div>
  );
}

function DocumentCard({ doc }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/document/${doc.id}/`);
  };

  // Calculate a random number of pages between 1-100 for demonstration
  const pageCount = Math.floor(Math.random() * 100) + 1;

  // Create a formatted date string
  const uploadDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-cyan-700/10 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-40 bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center">
        {/* Document preview - first page simulation */}
        <div className="absolute inset-4 bg-white rounded-sm shadow-md flex flex-col p-2">
          <div className="w-full h-4 bg-gray-200 rounded-sm mb-2"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded-sm mb-2"></div>
          <div className="w-full h-16 bg-gray-100 rounded-sm"></div>
          <div className="mt-auto w-full flex justify-between">
            <div className="w-1/4 h-2 bg-gray-200 rounded-sm"></div>
            <div className="w-1/4 h-2 bg-gray-200 rounded-sm"></div>
          </div>
        </div>

        {/* Document type indicator */}
        <Badge className="absolute top-2 right-2 bg-cyan-600 text-white border-none">
          PDF
        </Badge>
      </div>

      <CardContent className="p-4">
        <ScrollArea className="h-12">
          <h3 className="font-medium text-white text-lg line-clamp-2">
            {doc.title}
          </h3>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-gray-700 flex justify-between items-center text-sm">
        <span className="text-gray-400">{pageCount} pages</span>
        <span className="text-gray-400">{uploadDate}</span>
      </CardFooter>
    </Card>
  );
}
