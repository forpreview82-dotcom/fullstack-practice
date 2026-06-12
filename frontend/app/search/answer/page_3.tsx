// app/search/page.tsx — 검색 페이지 (Client Component)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

  // 런박스 환경에서 주소 유실을 막기 위해 앞에 붙여주는 안전장치 경로입니다.
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===========================================================================
  // [완성 예시] 방식 A: Direct Fetch 방식
  //   설명: 브라우저가 직접 외부 8000포트(FastAPI)를 호출합니다.
  //   특징: 브라우저가 직접 읽어야 하므로 NEXT_PUBLIC_ 이 붙은 환경변수를 사용합니다.
  // ===========================================================================
  /*
  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. 브라우저 공개용 환경변수 주소로 직접 fetch 요청을 보냅니다.
    fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다");
        return res.json(); // 응답이 성공적이면 JSON으로 변환
      })
      .then((data) => {
        setResults(data); // 2. 성공 시 받아온 전체 데이터를 results 상태에 저장
      })
      .catch((err) => {
        setError(err.message); // 3. 에러 발생 시 에러 메시지 저장
      })
      .finally(() => {
        setLoading(false); // 4. 성공하든 실패하든 로딩 상태를 해제
      });
  }, []);
  */

  // ===========================================================================
  // [실습 1] 방식 B: Route Handler 방식
  //   설명: 브라우저는 내부 주소(/api/search)를 호출하고, Next.js 서버가 FastAPI를 대신 호출합니다.
  //   미션: 위의 'Direct Fetch 방식' 코드를 참고하여, 아래 fetch 주소만 변경해 완성해 보세요!
  // ===========================================================================
  useEffect(() => {
    setLoading(true);
    setError(null);

    // ✍️ 실습: 주소창 뒤에 붙은 상대 경로인 `${BASE_PATH}/api/search` 로 요청을 보냅니다.
    //          (위의 예시 코드를 보고 .then() 이하 체이닝을 똑같이 완성해 보세요!)
    fetch(`${BASE_PATH}/api/search`)
      .then((res) => {
        if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다");
        return res.json();
      })
      .then((data) => setResults(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ===========================================================================
  // [실습 2] 실시간 검색 필터링 로직
  //   설명: 서버에서 한 번 가져온 전체 데이터(results)를 자바스크립트의 filter()를 이용해 실시간 검색합니다.
  //   미션: post의 title 또는 content에 검색어(query)가 포함되어 있는지 검사하는 조건식을 완성하세요.
  // ===========================================================================
  const filtered: Post[] = results.filter((post) => {
    // ✍️ 실습: post.title 또는 post.content에 query(입력값)가 포함(includes)되어 있는지 확인하세요.
    return post.title.includes(query) || post.content.includes(query);
  });

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
