"use client";

// TODO: axios 를 import 하세요.
import axios from "axios";

export default function DeleteButton({ postId }: { postId: number }) {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===========================================================================
  // [실습 1 완성] fetch 기반 삭제 요청
  // ===========================================================================
  //
  // [실습 2] TODO: 아래 fetch 구현을 axios 로 리팩토링해보세요.
  //
  //   1. try / catch 구조로 교체하세요.
  //   2. axios.delete(`${BASE_PATH}/api/posts/${postId}`) 로 요청하세요.
  //   3. catch 블록에서 axios.isAxiosError(err) 로 에러를 구분하세요.
  //      → AxiosError 라면: alert(err.response?.data?.detail ?? "...")
  //   4. 완성 후 아래 fetch 블록은 주석 처리하세요.
  // ===========================================================================
  async function handleDelete() {
    if (!confirm("정말 삭제할까요?")) return;

    try {
      await axios.delete(`${BASE_PATH}/api/posts/${postId}`);
      window.location.href = `${BASE_PATH}/posts`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.detail ?? "알 수 없는 오류");
      } else {
        alert(error instanceof Error ? error.message : "알 수 없는 오류");
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
    >
      삭제하기
    </button>
  );
}
