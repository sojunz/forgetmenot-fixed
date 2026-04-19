import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFlowStore } from "../store/flowStore";

export default function Flow() {
  /* Zustand에서 카테고리 관련 기능들 가져오기 */
  const {
    categories,        // 카테고리 목록
    addCategory,       // 카테고리 추가
    deleteCategories,  // 여러 카테고리 삭제
    renameCategory,    // 카테고리 이름 변경
  } = useFlowStore();

  /* 새 카테고리 입력값 */
  const [newCategory, setNewCategory] = useState("");

  /* Add Category 입력창 보이기/숨기기 */
  const [showInput, setShowInput] = useState(false);

  /* Edit 모드 (삭제/이름변경 모드) */
  const [editMode, setEditMode] = useState(false);

  /* 선택된 카테고리들 (삭제용) */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /* 이름 변경 중인 카테고리 */
  const [renameTarget, setRenameTarget] = useState<string | null>(null);

  /* 이름 변경 입력값 */
  const [renameValue, setRenameValue] = useState("");

  return (
    <motion.div
      /* 화면 전환 애니메이션 */
      className="min-h-screen pt-20 px-6 bg-[#F3F8F4]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* ----------------------------- */}
      {/* Header 영역 */}
      {/* ----------------------------- */}
      <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-[#3F4A3F]">Flow</h1>

        {/* Edit 버튼 (Edit ↔ Done 토글) */}
        <button
          onClick={() => {
            setEditMode(!editMode);     // Edit 모드 켜기/끄기
            setSelectedCategories([]);  // 선택 초기화
            setRenameTarget(null);      // rename 모드 초기화
          }}
          className="text-[#3F4A3F] underline"
        >
          {editMode ? "Done" : "Edit"}
        </button>
      </div>

      {/* ----------------------------- */}
      {/* 카테고리 리스트 */}
      {/* ----------------------------- */}
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-3">

              {/* Edit 모드일 때 체크박스 표시 */}
              {editMode && (
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => {
                    /* 체크박스 선택/해제 로직 */
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

              {/* ----------------------------- */}
              {/* Rename 모드일 때 입력창 표시 */}
              {/* ----------------------------- */}
              {renameTarget === cat.name ? (
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="p-1 border rounded"
                />

              /* Edit 모드일 때는 클릭 불가한 텍스트 */
              ) : editMode ? (
                <span className="text-lg text-[#3F4A3F] font-medium">
                  {cat.name}
                </span>

              /* 일반 모드일 때는 카테고리 상세 페이지로 이동 */
              ) : (
                <Link
                  to={`/flow/${cat.name.toLowerCase()}`}
                  className="text-lg text-[#3F4A3F] font-medium"
                >
                  {cat.name}
                </Link>
              )}
            </div>

            {/* 오른쪽 영역: Rename 버튼 + 아이템 개수 */}
            <div className="flex items-center gap-3">

              {/* Rename 버튼 (Edit 모드일 때만 표시) */}
              {editMode && renameTarget !== cat.name && (
                <button
                  onClick={() => {
                    setRenameTarget(cat.name); // 어떤 카테고리를 rename할지 지정
                    setRenameValue(cat.name);  // 기존 이름을 입력창에 넣기
                  }}
                  className="text-gray-500 text-sm underline"
                >
                  Rename
                </button>
              )}

              {/* Save 버튼 (Rename 모드일 때만 표시) */}
              {renameTarget === cat.name && (
                <button
                  onClick={() => {
                    renameCategory(cat.name, renameValue); // 이름 변경 실행
                    setRenameTarget(null);                 // rename 모드 종료
                  }}
                  className="text-[#3F4A3F] text-sm underline"
                >
                  Save
                </button>
              )}

              {/* 카테고리 안에 있는 메모 개수 */}
              <span className="text-sm text-gray-500">
                {cat.count} items
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------- */}
      {/* 선택된 카테고리 삭제 버튼 */}
      {/* ----------------------------- */}
      {editMode && selectedCategories.length > 0 && (
        <div className="max-w-md mx-auto mb-4">
          <button
            onClick={() => {
              deleteCategories(selectedCategories); // 선택된 카테고리 삭제
              setSelectedCategories([]);            // 선택 초기화
              setEditMode(false);                   // Edit 모드 종료
            }}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* ----------------------------- */}
      {/* Add Category 입력창 */}
      {/* ----------------------------- */}
      {showInput && (
        <div className="max-w-md mx-auto mb-4 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 p-2 rounded-lg border border-gray-300"
          />

          {/* Add 버튼 */}
          <button
            onClick={() => {
              if (!newCategory.trim()) return; // 빈 값 방지
              addCategory(newCategory);        // 카테고리 추가
              setNewCategory("");              // 입력 초기화
              setShowInput(false);             // 입력창 닫기
            }}
            className="bg-[#3F4A3F] text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      )}

      {/* ----------------------------- */}
      {/* Add Category 버튼 */}
      {/* ----------------------------- */}
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
