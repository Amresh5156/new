import { MainNav } from "@/components/main-nav"
import { NotesHeader } from "@/components/notes-header"
import { NotesGrid } from "@/components/notes-grid"
import { CreateNoteDialog } from "@/components/create-note-dialog"

export default async function NotesPage() {
  const mockNotes: any[] = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <NotesHeader />
        <div className="mt-8">
          <NotesGrid notes={mockNotes} />
        </div>
        <CreateNoteDialog />
      </div>
    </div>
  )
}
