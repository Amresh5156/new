"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Star, Clock, BookOpen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"

interface Note {
  id: string
  title: string
  content: string
  topic_id: string
  is_favorite: boolean
  created_at: string
  updated_at: string
  topics?: {
    name: string
    category: string
  }
}

interface NotesGridProps {
  notes: Note[]
}

export function NotesGrid({ notes }: NotesGridProps) {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])

  const toggleFavorite = async (noteId: string) => {
    // TODO: Implement favorite toggle
    console.log("[v0] Toggle favorite for note:", noteId)
  }

  const deleteNote = async (noteId: string) => {
    // TODO: Implement note deletion
    console.log("[v0] Delete note:", noteId)
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-600 mb-4">Start creating notes to organize your learning materials</p>
        <Button className="bg-blue-600 hover:bg-blue-700">Create your first note</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{note.title}</CardTitle>
                {note.topics && (
                  <Badge variant="secondary" className="mt-2">
                    {note.topics.name}
                  </Badge>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleFavorite(note.id)}>
                    <Star className={`h-4 w-4 mr-2 ${note.is_favorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    {note.is_favorite ? "Remove from favorites" : "Add to favorites"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => deleteNote(note.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{note.content}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
