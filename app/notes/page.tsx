"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { NotesHeader } from "@/components/notes-header"
import { NotesGrid } from "@/components/notes-grid"

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([])

  const fetchNotes = async () => {
    const res = await fetch("/api/notes")
    const data = await res.json()
    if (Array.isArray(data)) {
      setNotes(data)
    } else {
      setNotes([]) // or handle the error as appropriate
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <NotesHeader onNoteCreated={fetchNotes} />
        <div className="mt-8">
          <NotesGrid notes={notes} />
        </div>
      </div>
    </div>
  )
}
