import React from "react";
import { useNavigate } from "react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-red-500 mb-2">
            ERROR 403
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            You don&apos;t have permission to view this page with your current
            role. If you think this is a mistake, please contact your
            administrator.
          </p>
        </div>

        <div className="flex justify-center flex-row gap-3 pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-1/2"
            onClick={handleBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
