import { useParams } from "react-router-dom";
import { useFlowStore } from "../store/flowStore";

export default function CategoryDetail() {
  const { name } = useParams();
  const { categories, removeMemoFromCategory } = useFlowStore();

  if (!name) return null;

  const category = categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!category) return <p>Category not found</p>;

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-semibold text-[#3F4A3F]">
        {category.name}
      </h1>

      <p className="text-gray-500 mb-4">
        {category.memos.length} items in this category
      </p>

      <div className="flex flex-col gap-3">
        {category.memos.map((m, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
          >
            <span className="text-[#3F4A3F]">{m}</span>

            <button
              onClick={() => removeMemoFromCategory(category.name, m)}
              className="text-red-400 text-sm hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
