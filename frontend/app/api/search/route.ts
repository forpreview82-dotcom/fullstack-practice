// app/api/search/route.ts — 검색용 Route Handler
//
// [실습 1] Route Handler 방식
//   흐름: 브라우저 → GET /api/search (이 파일) → FastAPI
//
//   브라우저가 /api/search 로 요청하면 이 서버 사이드 핸들러가
//   FastAPI 를 대신 호출하고 결과를 브라우저에 반환합니다.
//   → 브라우저 입장에서는 같은 서버(Next.js)와만 통신하므로 CORS 불필요

import { NextResponse } from "next/server";

export async function GET() {
  // TODO: 아래 단계를 구현해보세요.
  //
  //   1. process.env.FASTAPI_URL 로 환경 변수를 읽어오세요.
  //      (서버에서 실행되므로 NEXT_PUBLIC_ 접두사 불필요)

  const fastapiUrl = process.env.FASTAPI_URL;

  //
  //   2. FASTAPI_URL 이 없다면 500 에러를 반환하세요.
  //

  if (!fastapiUrl) {
    return NextResponse.json(
      { detail: "FASTAPI_URL is not configured" },
      { status: 500 },
    );
  }
  //   3. `${fastapiUrl}/posts` 를 fetch 하여 게시글 목록을 가져오세요.

  const res = await fetch(`${fastapiUrl}/posts`);

  //
  //   4. FastAPI 응답이 실패라면 동일한 상태 코드로 에러를 반환하세요.

  if (!res.ok) {
    return NextResponse.json(
      { detail: "데이터를 불러오는데 실패했습니다." },
      { status: res.status },
    );
  }

  //
  //   5. 성공 시 FastAPI 응답 데이터를 NextResponse.json() 으로 반환하세요.
  const data = await res.json();
  return NextResponse.json(data);
}
