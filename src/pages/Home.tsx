import MemoInput from "../components/MemoInput";
import MemoList from "../components/MemoList";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ForgetMeNot</h1>
      <MemoInput />
      <MemoList />
    </div>
  );
}
