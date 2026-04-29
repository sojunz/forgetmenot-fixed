import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFlowStore } from "../store/flowStore";

export default function Flow() {
  const {
    categories,
    addCategory,
    deleteCategories,
    renameCategory,
  } = useFlowStore();

  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [renameTarget, setRenameTarget] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <motion.div
      className="min-h-screen pt-20 px-6 bg-[#F3F8F4]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
    {/* Header */}
<div className="max-w-md mx-auto mb-2">
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-semibold text-[#3F4A3F]">Flow</h1>
    <button
      onClick={() => {
        setEditMode(!editMode);
        setSelectedCategories([]);
        setRenameTarget(null);
      }}
      className="text-[#3F4A3F] underline"
    >
      {editMode ? "Done" : "Edit"}
    </button>
  </div>
  <p className="text-sm text-gray-400 italic mt-1 mb-6">
    "A place for everything, everything in its place." 🌿
  </p>
</div>

      {/* 카테고리 리스트 */}
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto mb-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {editMode && (
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => {
                    if (selectedCategories.includes(cat._id)) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat._id)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, cat._id]);
                    }
                  }}
                />
              )}

              {renameTarget === cat._id ? (
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="p-1 border rounded"
                />
              ) : editMode ? (
                <span className="text-lg text-[#3F4A3F] font-medium">
                  {cat.name}
                </span>
              ) : (
                <Link
                  to={`/flow/${cat.name.toLowerCase()}`}
                  className="text-lg text-[#3F4A3F] font-medium"
                >
                  {cat.name}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {editMode && renameTarget !== cat._id && (
                <button
                  onClick={() => {
                    setRenameTarget(cat._id);
                    setRenameValue(cat.name);
                  }}
                  className="text-gray-500 text-sm underline"
                >
                  Rename
                </button>
              )}

              {renameTarget === cat._id && (
                <button
                  onClick={async () => {
                    setLoading(true);
                    await renameCategory(cat._id, renameValue);
                    setRenameTarget(null);
                    setLoading(false);
                  }}
                  disabled={loading}
                  className="text-[#3F4A3F] text-sm underline disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              )}

              <span className="text-sm text-gray-500">
                {cat.memos.length} items
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 삭제 버튼 */}
      {editMode && selectedCategories.length > 0 && (
        <div className="max-w-md mx-auto mb-4">
          <button
            onClick={async () => {
              setLoading(true);
              await deleteCategories(selectedCategories);
              setSelectedCategories([]);
              setEditMode(false);
              setLoading(false);
            }}
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      )}

      {/* Add Category 입력창 */}
      {showInput && (
        <div className="max-w-md mx-auto mb-4 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && document.getElementById("addBtn")?.click()}
            placeholder="New category name"
            className="flex-1 p-2 rounded-lg border border-gray-300"
          />
          <button
            id="addBtn"
            disabled={loading}
            onClick={async () => {
              if (!newCategory.trim()) return;
              setLoading(true);
              await addCategory(newCategory);
              setNewCategory("");
              setShowInput(false);
              setLoading(false);
            }}
            className="bg-[#6BAF7C] text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      )}

      {/* Add Category 버튼 */}
      {!editMode && (
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-[#6BAF7C] text-white px-4 py-2 rounded-lg shadow-sm"
          >
            + Add Category
          </button>
        </div>
      )}
    </motion.div>
  );
}