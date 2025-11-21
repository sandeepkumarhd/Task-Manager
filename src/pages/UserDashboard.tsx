import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskDialog from "@/components/common/AddEditTaskDialoge";
import { Button } from "@/components/ui/button";
import { TableList } from "@/components/ui/data-table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { RootState } from "@/app/stote";
import {
  addTask,
  deleteTask,
  editTask,
  updateTaskStatus,
} from "@/features/task/taskSlice";
import { useAppSelector } from "@/app/hooks";
import { formatDateCustom } from "@/lib/helperFucntion";
import { CheckCheckIcon, Eye, PencilIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useNavigate, useSearchParams } from "react-router";
import type { Row } from "@tanstack/react-table";
import type { Task } from "@/types/types";
interface TaskData {
  title: string;
  description: string;
  status: "Pending" | "Done";
  createdOn: string;
  createdBy: string;
  userId: string;
}

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state: RootState) => state.auth);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const defaultStatus = searchParams.get("status") || "All";
  const defaultSort = searchParams.get("sort") || "latest";
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const handleSubmit = (data: TaskData) => {
    console.log(data, "data");
    if (mode === "add") {
      dispatch(addTask(data));
    } else if (mode === "edit" && selectedTask) {
      dispatch(editTask({ ...data, id: selectedTask.id }));
    }
  };
  console.log(selectedTask, "selectedTask");
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("status", selectedStatus);
    params.set("sort", selectedSort);
    setSearchParams(params);
  }, [selectedStatus, selectedSort, setSearchParams]);
  const MarkAsDone = useCallback(
    (taskId: string) => {
      dispatch(updateTaskStatus({ taskId }));
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "SrNo",
        header: "Sr.No.",
        cell: ({ row }: { row: Row<Task> }) => row.index + 1,
      },

      { accessorKey: "title", header: "Title" },

      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: Row<Task> }) => {
          return (
            <div className="w-[170px]" title={row.original.description}>
              {row.original?.description?.slice(0, 80)}
            </div>
          );
        },
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        cell: ({ row }: { row: Row<Task> }) => {
          return (
            <div className="w-[170px]">
              {formatDateCustom(row?.original?.createdOn || "")}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<Task> }) => {
          return <div className="w-[170px]">{row?.original?.status}</div>;
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: Row<Task> }) => {
          const task = row.original;

          return (
            <div className="flex gap-2">
              <Button
                className="transition-all duration-200 hover:bg-blue-500 hover:text-white active:scale-95 hover:shadow-md"
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  navigate(`/dashboard/task/${task.id}`);
                }}
              >
                <Eye />
              </Button>
              <Button
                className="transition-all duration-200 hover:bg-yellow-500 hover:text-white active:scale-95 hover:shadow-md"
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setMode("edit");
                  setSelectedTask(task);
                  setOpen(true);
                }}
              >
                <PencilIcon />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="transition-all duration-200 hover:bg-green-500 hover:text-white active:scale-95 hover:shadow-md"
                    disabled={task.status === "Done"}
                    size="sm"
                    variant="outline"
                  >
                    <CheckCheckIcon />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mark this task as done?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Once marked as completed, the task status will be updated.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        MarkAsDone(task.id as string);
                      }}
                    >
                      Mark Done
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete the task. This cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => dispatch(deleteTask(task.id as string))}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        },
      },
    ],
    [dispatch, navigate, MarkAsDone]
  );
  const filteredTask = useMemo(() => {
    let result = tasks;
    result = result.filter(
      (ele) => Number(ele.userId) === Number(user.user?.id)
    );
    if (selectedStatus !== "All") {
      result = result.filter((ele) => ele.status === selectedStatus);
    }
    if (selectedSort === "latest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    } else if (selectedSort === "oldest") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
      );
    }

    return result;
  }, [tasks, user.user?.id, selectedStatus, selectedSort]);

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
      <div>
        {" "}
        <div className="flex justify-between gap-3">
          <div className="w-40">
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Done">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Select
              value={selectedSort}
              onValueChange={(value) => setSelectedSort(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Sort By Latest</SelectItem>
                <SelectItem value="oldest">Sort By Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <TableList columns={columns} data={filteredTask} />
      <AddEditTaskDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        defaultValues={selectedTask}
        onSubmit={handleSubmit}
        createdBy={{ name: user.user?.name || "", id: user.user?.id || "" }}
      />
    </div>
  );
};

export default UserDashboard;
