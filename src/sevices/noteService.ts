import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes';
axios.defaults.headers.common.Authorization = `Bearer ${myKey}`;

interface NoteHttpRequest {
  notes: Note[];
  totalPages: number;
}

interface NewNoteContent {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  search: string,
  page: number,
  perPage = 16
): Promise<NoteHttpRequest> => {
  const params = {
    search,
    page,
    perPage,
  };

  const res = await axios.get<NoteHttpRequest>('', { params });
  console.log(res.data);

  return res.data;
};

export const createNote = async (newNote: NewNoteContent) => {
  const res = await axios.post<Note>('', newNote);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await axios.delete<Note>(`/${id}`);
  return res.data;
};
