import React from "react";
import { AlertTriangle } from "lucide-react";

const NoDataFound = ({
  message = "No data found",
  action,
}: {
  message?: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 py-12 text-center text-gray-600">
      <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
      <h2 className="text-xl font-semibold">{message}</h2>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default NoDataFound;
