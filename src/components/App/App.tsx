import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchNotes } from '../../services/noteService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [data]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <header className={css.toolbar}>
        <Toaster />
        <SearchBox
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button
          className={css.button}
          onClick={openModal}
        >
          Create note +
        </button>
      </header>
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
};

export default App;
