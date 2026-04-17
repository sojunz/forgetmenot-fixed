import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function Tasks() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}
