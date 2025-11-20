import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddEditTaskDialog from "@/components/AddEditTaskDialoge";
import { Button } from "@/components/ui/button";
import TableList from "@/components/ui/data-table";
import type { RootState } from "@/app/stote";
import { addTask, deleteTask, editTask } from "@/features/task/taskSlice";
import { useAppSelector } from "@/app/hooks";

const UserDashboard = () => {
  const dispatch = useDispatch();
const user = useAppSelector((state:RootState)=>state.auth)
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Add or Edit submit handler
  const handleSubmit = (data: any) => {
    if (mode === "add") {
      dispatch(addTask(data));
    } else if (mode === "edit" && selectedTask) {
      dispatch(editTask({ ...data, id: selectedTask.id }));
    }
  };

  // Columns for table
  const columns = useMemo(
    () => [
      { accessorKey: "SrNo", header: "Sr.No.", cell: ({ row }: any) => row.index + 1 },

      { accessorKey: "title", header: "Title" },

      { accessorKey: "description", header: "Description" },

      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: any) => {
          const task = row.original;

          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setMode("edit");
                  setSelectedTask(task);
                  setOpen(true);
                }}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">User Dashboard</h1>

        <Button
          className="cursor-pointer"
          onClick={() => {
            setMode("add");
            setSelectedTask(null);
            setOpen(true);
          }}
        >
          Add Task
        </Button>
      </div>

      <TableList columns={columns} data={tasks} />

      <AddEditTaskDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        defaultValues={selectedTask || undefined}
        onSubmit={handleSubmit}
        createdBy={user.user?.name}
      />
    </div>
  );
};

export default UserDashboard;
