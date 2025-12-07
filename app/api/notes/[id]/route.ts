import { createServerClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, topic_id, is_favorite } = await request.json()

    const { data: note, error } = await supabase
      .from("notes")
      .update({
        title,
        content,
        topic_id,
        is_favorite,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating note:", error)
      return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }

    return NextResponse.json({ note })
  } catch (error) {
    console.error("[v0] Error in update note API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("notes").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      console.error("[v0] Error deleting note:", error)
      return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in delete note API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
