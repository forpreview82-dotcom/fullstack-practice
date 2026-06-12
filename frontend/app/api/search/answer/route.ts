import { NextResponse } from "next/server";

export async function GET() {
  const fastapiUrl = process.env.FASTAPI_URL;

  if (!fastapiUrl) {
    return NextResponse.json(
      { detail: "FASTAPI_URL 환경 변수가 설정되지 않았습니다" },
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
