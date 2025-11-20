import { Link } from "react-router";
import type { Task } from "@/types/types";
import { Button } from "../ui/button";

interface Props {
  task: Task;
  onToggleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<Props> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isDone = task.status === "done";

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isDone
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isDone ? "Done" : "Pending"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {task.description}
      </p>
      <div className="flex gap-2 justify-end mt-2">
        <Button size="sm" variant="outline" asChild>
          <Link to={`/task/${task.id}`}>Details</Link>
        </Button>

        <Button
          size="sm"
          variant={isDone ? "outline" : "default"}
          onClick={onToggleStatus}
        >
          {isDone ? "Undo" : "Mark Done"}
        </Button>

        {/* <RoleGuard roles={["admin"]}> */}
        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
        {/* </RoleGuard> */}
      </div>
    </div>
  );
};
