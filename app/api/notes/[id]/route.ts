import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

//for updating the notes 
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

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
      console.error(" Error updating note:", error)
      return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }

    return NextResponse.json({ note })
  } catch (error) {
    console.error("[ Error in update note API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

//for deleteing the notes
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("notes").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      console.error("[ Error deleting note:", error)
      return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Error in delete note API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
