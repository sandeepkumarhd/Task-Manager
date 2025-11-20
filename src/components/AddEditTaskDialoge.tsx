import React, { useState, useEffect } from "react";
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

interface Task {
  title: string;
  description: string;
}

interface AddEditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  defaultValues?: Task;
  onSubmit: (data: Task) => void;
  createdBy: string | undefined;
}

const AddEditTaskDialog: React.FC<AddEditTaskDialogProps> = ({
  open,
  onOpenChange,
  mode = "add",
  defaultValues,
  onSubmit,
  createdBy = "",
}) => {
    console.log(createdBy,"createdBy")
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "",
    createdOn: "",
    createdBy: "",
  });

  // Prefill values when editing
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setTask(defaultValues);
    }
  }, [mode, defaultValues]);

  const handleSubmit = () => {
    onSubmit({
      ...task,
      status: "Pending",
      createdOn: new Date(),
      createdBy: createdBy,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Task" : "Update Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskDialog;
