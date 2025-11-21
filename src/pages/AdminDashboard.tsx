import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import TableList from "@/components/ui/data-table";
import { type RootState } from "@/app/stote";
import { formatDateCustom } from "@/lib/helperFucntion";
import { CheckCheckIcon } from "lucide-react";
import { updateTaskStatus } from "@/features/task/taskSlice";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const defaultStatus = searchParams.get("status") || "All";
  const defaultSort = searchParams.get("sort") || "latest";
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const markAsDone = (taskId: string) => {
    dispatch(updateTaskStatus({ taskId: taskId }));
  };
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("status", selectedStatus);
    params.set("sort", selectedSort);
    setSearchParams(params);
  }, [selectedStatus, selectedSort, setSearchParams]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "SrNo",
        header: "Sr.No.",
        cell: ({ row }: any) => row.index + 1,
      },

      { accessorKey: "title", header: "Title" },

      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: any) => {
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
        cell: ({ row }: any) => {
          return (
            <div className="w-[170px]">
              {formatDateCustom(row?.original?.createdOn)}
            </div>
          );
        },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ row }: any) => {
          return <div className="w-[170px]">{row?.original?.createdBy}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => {
          return <Badge>{row?.original?.status}</Badge>;
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: any) => {
          const task = row.original;
          return (
            <div className="flex gap-2">
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
                        markAsDone(task.id);
                      }}
                    >
                      Mark Done
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        },
      },
    ],
    []
  );
  const filteredTask = useMemo(() => {
    let result = tasks;

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
  }, [tasks, selectedStatus, selectedSort]);

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <TableList
        rightElements={
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
        }
        columns={columns}
        data={filteredTask}
      />
    </div>
  );
};

export default AdminDashboard;
