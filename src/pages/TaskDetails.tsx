import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/stote";
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const currentTask = useMemo(() => {
    return tasks.find((ele) => ele.id === taskId);
  }, [taskId, tasks]);
  if (!currentTask)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Task not found
      </div>
    );

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-500",
    Done: "bg-green-600",
  };

  const formattedDate = new Date(currentTask.createdOn).toLocaleString();

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            {currentTask.title}
            <Badge className={`${statusColors[currentTask.status]} text-white`}>
              {currentTask.status}
            </Badge>
          </CardTitle>

          {/* Back Button */}
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} className="mr-1" />
            Back
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-gray-600 mt-1 leading-relaxed">
              {currentTask.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={18} />
              <span>Created On: {formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <User size={18} />
              <span>Created By: {currentTask.createdBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
