import { createServerClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("[Notes API] Error fetching notes:", error)
      return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
    }

    return NextResponse.json(notes)
  } catch (error) {
    console.error("[Notes API] Internal server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

