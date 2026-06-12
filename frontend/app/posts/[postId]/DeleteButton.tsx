"use client";

import axios from "axios";

export default function DeleteButton({ postId }: { postId: number }) {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===========================================================================
  // [실습 2 완성] axios 기반 삭제 요청
  // ===========================================================================
  async function handleDelete() {
    if (!confirm("정말 삭제할까요?")) return;

    try {
      await axios.delete(`${BASE_PATH}/api/posts/${postId}`);
      window.location.href = `${BASE_PATH}/posts`;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail ?? "게시글 삭제에 실패했습니다");
      } else {
        alert("알 수 없는 오류가 발생했습니다");
      }
    }
  }

  // ===========================================================================
  // [실습 1 완성] fetch 기반 삭제 요청 (주석 처리)
  // ===========================================================================
  // async function handleDelete() {
  //   if (!confirm("정말 삭제할까요?")) return;
  //
  //   const res = await fetch(`${BASE_PATH}/api/posts/${postId}`, {
  //     method: "DELETE",
  //   });
  //
  //   if (res.ok) {
  //     window.location.href = `${BASE_PATH}/posts`;
  //   }
  // }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
    >
      삭제하기
    </button>
  );
}
