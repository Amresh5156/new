import { createServerClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, topic_id } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const { data: note, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        title,
        content,
        topic_id: topic_id || null,
        is_favorite: false,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating note:", error)
      return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
    }

    return NextResponse.json({ note })
  } catch (error) {
    console.error("[v0] Error in create note API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
