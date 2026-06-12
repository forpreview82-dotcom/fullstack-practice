// app/api/search/route.ts — 검색용 Route Handler
//
// [실습 1] Route Handler 방식
//   흐름: 브라우저 → GET /api/search (이 파일) → FastAPI

import { NextResponse } from "next/server";

export async function GET() {
  const fastapiUrl = process.env.FASTAPI_URL;

  if (!fastapiUrl) {
    return NextResponse.json(
      { detail: "FASTAPI_URL is not configured" },
      { status: 500 },
    );
  }

  const res = await fetch(`${fastapiUrl}/posts`);

  if (!res.ok) {
    return NextResponse.json(
      { detail: "게시글 목록을 불러오는 데 실패했습니다" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
