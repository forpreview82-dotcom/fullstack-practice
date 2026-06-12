// app/search/page.tsx — 검색 페이지 (Client Component)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===========================================================================
  // [실습 2 완성] axios 기반 Route Handler 방식
  //   흐름: 브라우저 → /api/search (Route Handler) → FastAPI
  // ===========================================================================
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<Post[]>(`${BASE_PATH}/api/search`);
        setResults(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.detail ?? "게시글을 불러오는 데 실패했습니다",
          );
        } else {
          setError("알 수 없는 오류가 발생했습니다");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // ===========================================================================
  // [실습 1 완성] fetch 기반 Route Handler 방식 (주석 처리)
  // ===========================================================================
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //
  //   fetch(`${BASE_PATH}/api/search`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error("게시글을 불러오는 데 실패했습니다");
  //       return res.json();
  //     })
  //     .then((data: Post[]) => setResults(data))
  //     .catch((err: Error) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, []);

  const filtered = results.filter(
    (post) => post.title.includes(query) || post.content.includes(query),
  );

  return (
    <main>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`${BASE_PATH}/posts`}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">검색</h1>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="제목 또는 내용으로 검색하세요"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {loading && (
        <p className="text-center text-gray-400 py-10">불러오는 중...</p>
      )}

      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          {query ? "검색 결과가 없습니다." : "게시글이 없습니다."}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="space-y-3">
          {filtered.map((post) => (
            <li key={post.id}>
              <Link
                href={`${BASE_PATH}/posts/${post.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-gray-900">{post.title}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
