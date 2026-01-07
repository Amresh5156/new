"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface CreateNoteDialogProps {
  className?: string
  onNoteCreated: () => void
}

// This error occurs because the props parameter in the CreateNoteDialog function lacks an explicit type annotation. In strict TypeScript settings, not specifying the type for props can lead to a type error. Adding a type, such as `props: any` or providing a specific type/interface, resolves the issue.
export function CreateNoteDialog({
  className,
  onNoteCreated,
}: CreateNoteDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topicId, setTopicId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    interface CreateNoteDialogProps {
  className?: string
  onNoteCreated: () => void
}


    try {
      const response = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          topic_id: topicId || null,
        }),
      })

      if (response.ok) {
        setTitle("")
        setContent("")
        setTopicId("")
        setOpen(false)
        onNoteCreated()
      }
    } catch (error) {
      console.error("Error creating note:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={className}
          size="icon"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              required
            />
          </div>

          <div>
            <Label htmlFor="topic">Topic (Optional)</Label>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arrays">Arrays</SelectItem>
                <SelectItem value="linked-lists">Linked Lists</SelectItem>
                <SelectItem value="trees">Trees</SelectItem>
                <SelectItem value="graphs">Graphs</SelectItem>
                <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                <SelectItem value="sorting">Sorting</SelectItem>
                <SelectItem value="searching">Searching</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content..."
              rows={8}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button id="createNotes" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Note"}
              
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


// classname=""fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg""