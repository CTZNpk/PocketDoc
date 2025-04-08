export default function StatusBadge({ status }) {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    Active: "bg-green-900/20 text-green-400 border border-green-800",
    Pending: "bg-yellow-900/20 text-yellow-400 border border-yellow-800",
    Inactive: "bg-gray-900/20 text-gray-400 border border-gray-800",
    Published: "bg-blue-900/20 text-blue-400 border border-blue-800",
    "Under Review": "bg-purple-900/20 text-purple-400 border border-purple-800",
    Draft: "bg-gray-900/20 text-gray-400 border border-gray-800",
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
}
