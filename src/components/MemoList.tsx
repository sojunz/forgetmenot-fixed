import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemoStore } from "../store/memoStore";
import { useFlowStore } from "../store/flowStore";

export default function MemoList() {
  /* 메모 목록과 삭제 기능 가져오기 */
  const { memos, removeMemo } = useMemoStore();

  /* 카테고리 목록 + 카테고리에 메모 추가 + 카운트 증가 기능 */
  const {
    categories,
    increaseCategoryCount,
    addMemoToCategory,
  } = useFlowStore();

  /* 어떤 메모를 이동할지 저장하는 상태 (null이면 모달 닫힘) */
  const [moveTarget, setMoveTarget] = useState<number | null>(null);

  /* 선택된 카테고리 이름 저장 */
  const [selectedCategory, setSelectedCategory] = useState("");

  /* 메모가 없을 때 보여주는 문구 */
  if (memos.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No memos yet. Write something above!
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3 max-w-md mx-auto">

      {/* ----------------------------- */}
      {/* 메모 리스트 영역 */}
      {/* ----------------------------- */}
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="bg-[#F3F8F4] p-4 rounded-xl shadow-sm flex justify-between items-center"
        >
          {/* 메모 텍스트 */}
          <span className="text-[#3F4A3F]">{memo.text}</span>

          <div className="flex gap-3 items-center">

            {/* Move 버튼 (민트색 pill 스타일) */}
            {/* → 메모 이동 모달을 열기 위한 버튼 */}
            <button
              onClick={() => setMoveTarget(memo.id)}
              className="px-3 py-1 rounded-full bg-[#E6F7EC] text-[#3F4A3F] text-xs font-medium hover:bg-[#d7f0e0] transition"
            >
              Move
            </button>

            {/* 삭제 버튼 */}
            <button
              onClick={() => removeMemo(memo.id)}
              className="text-red-400 text-sm hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* ----------------------------- */}
      {/* Move 모달 (Bottom Sheet) */}
      {/* ----------------------------- */}
      <AnimatePresence>
        {moveTarget !== null && (
          <motion.div
            /* 모달 배경 (반투명 검정) */
            className="fixed inset-0 bg-black/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              /* Bottom Sheet 본체 */
              className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-xl"
              initial={{ y: "100%" }}   /* 아래에서 올라옴 */
              animate={{ y: 0 }}        /* 제자리 */
              exit={{ y: "100%" }}      /* 아래로 내려감 */
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* 상단 그립바 (모달 손잡이) */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-1 mb-3" />

              {/* 감성 아이콘 🌿 */}
              {/* → ForgetMeNot 브랜드 느낌 강조 */}
              <div className="w-full flex justify-center mb-4 text-2xl">
                🌿
              </div>

              {/* 모달 제목 */}
              <p className="text-[#3F4A3F] mb-3 font-medium">Move memo to:</p>

              {/* 카테고리 선택 드롭다운 */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Move 버튼 (민트색 pill 스타일) */}
              {/* → 선택된 카테고리로 메모 이동 */}
              <button
                onClick={() => {
                  const memo = memos.find((m) => m.id === moveTarget);
                  if (!memo) return;

                  /* 카테고리에 메모 추가 */
                  addMemoToCategory(selectedCategory, memo.text);

                  /* 카테고리 count 증가 */
                  increaseCategoryCount(selectedCategory);

                  /* 홈 화면에서 메모 삭제 */
                  removeMemo(moveTarget);

                  /* 모달 닫기 */
                  setMoveTarget(null);
                  setSelectedCategory("");
                }}
                className="w-full py-2 rounded-full bg-[#E6F7EC] text-[#3F4A3F] font-medium hover:bg-[#d7f0e0] transition"
              >
                Move
              </button>

              {/* Cancel 버튼 */}
              <button
                onClick={() => setMoveTarget(null)}
                className="w-full text-gray-500 mt-2 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
