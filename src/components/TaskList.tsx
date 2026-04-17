import { useTaskStore } from "../store/taskStore";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
        >
          <span>{task.text}</span>
          <button
            onClick={() => removeTask(task.id)}
            className="text-red-500"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
