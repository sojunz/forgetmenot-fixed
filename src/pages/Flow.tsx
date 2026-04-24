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

  return (
    <motion.div
      className="min-h-screen pt-20 px-6 bg-[#F3F8F4]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
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

      {/* 카테고리 리스트 */}
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {/* Edit 모드: 체크박스 */}
              {editMode && (
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => {
                    if (selectedCategories.includes(cat.name)) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat.name)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, cat.name]);
                    }
                  }}
                />
              )}

              {/* Rename 모드 / Edit 모드 / 일반 모드 */}
              {renameTarget === cat.name ? (
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

            {/* 오른쪽: Rename / Save 버튼 + 아이템 개수 */}
            <div className="flex items-center gap-3">
              {editMode && renameTarget !== cat.name && (
                <button
                  onClick={() => {
                    setRenameTarget(cat.name);
                    setRenameValue(cat.name);
                  }}
                  className="text-gray-500 text-sm underline"
                >
                  Rename
                </button>
              )}

              {renameTarget === cat.name && (
                <button
                  onClick={() => {
                    renameCategory(cat.name, renameValue);
                    setRenameTarget(null);
                  }}
                  className="text-[#3F4A3F] text-sm underline"
                >
                  Save
                </button>
              )}

              {/* count → memos.length */}
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
            onClick={() => {
              deleteCategories(selectedCategories);
              setSelectedCategories([]);
              setEditMode(false);
            }}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            Delete Selected
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
            placeholder="New category name"
            className="flex-1 p-2 rounded-lg border border-gray-300"
          />
          <button
            onClick={() => {
              if (!newCategory.trim()) return;
              addCategory(newCategory);
              setNewCategory("");
              setShowInput(false);
            }}
            className="bg-[#3F4A3F] text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      )}

      {/* Add Category 버튼 */}
      {!editMode && (
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-[#3F4A3F] text-white px-4 py-2 rounded-lg shadow-sm"
          >
            + Add Category
          </button>
        </div>
      )}
    </motion.div>
  );
}