import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/types/types";

interface CreatedBy {
  name: string;
  id: string;
}
interface TaskData {
  title: string;
  description: string;
  status: "Pending" | "Done";
  createdOn: string;
  createdBy: string;
  userId: string;
}
interface AddEditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  defaultValues: Task | null;
  onSubmit: (data: TaskData) => void;
  createdBy: CreatedBy;
}

const AddEditTaskDialog: React.FC<AddEditTaskDialogProps> = ({
  open,
  onOpenChange,
  mode = "add",
  defaultValues,
  onSubmit,
  createdBy,
}) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "Pending",
    createdOn: new Date().toISOString(),
    createdBy: "",
    userId: "",
  });

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setTask({ ...defaultValues });
    }
  }, [defaultValues, open, mode]);

  const resetTask = () => {
    setTask({
      title: "",
      description: "",
      status: "Pending",
      createdOn: "",
      userId: "",
      createdBy: "",
    });
  };
  const handleSubmit = () => {
    onSubmit({
      ...task,
      status: "Pending",
      createdOn: new Date().toISOString(),
      createdBy: createdBy.name,
      userId: createdBy.id,
    });
    onOpenChange(false);
    resetTask();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        resetTask();
        onOpenChange(false);
      }}
    >
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Task Title</label>
            <Input
              placeholder="Enter task title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Enter description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetTask();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!task.description.trim() || !task.title.trim()}
            onClick={handleSubmit}
          >
            {mode === "add" ? "Add Task" : "Update Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskDialog;
