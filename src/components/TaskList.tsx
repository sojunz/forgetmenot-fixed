import { useTaskStore } from "../store/taskStore";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        No tasks yet. Add something above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 accent-[#6BAF7C]"
            />
            <span
              className={`text-sm ${
                task.done ? "line-through text-gray-400" : "text-[#3F4A3F]"
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => removeTask(task.id)}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}