import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function FeatureCard({
  title,
  description,
  icon,
  hoverEffect = true,
}) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-cyan-900/10 overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-4 text-white">
          {icon}
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-400">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="text-cyan-400 hover:text-cyan-300 p-0 group-hover:translate-x-2 transition-transform"
        >
          Explore <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Hover effect */}
      {hoverEffect && (
        <div
          className="absolute inset-0 bg-gradient-to-br 
        from-cyan-600/20 to-transparent opacity-0 
        group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        ></div>
      )}
    </Card>
  );
}
