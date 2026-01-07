import { BookOpen, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateNoteDialog } from "./create-note-dialog"

export function NotesHeader({ onNoteCreated, }: { onNoteCreated: () => void }) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              <p className="text-gray-600">Organize your learning materials and insights</p>
            </div>
          </div>
            <CreateNoteDialog
              className="h-10 w-30 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
              onNoteCreated={onNoteCreated}
            />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search notes..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    )
}
