import axios from 'axios';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api/notes';

export default async function fetchNotes(
  search: string,
  page: number,
  perPage = 16
) {
  const options: {
    params: {
      search;
      page;
      perPage;
    };
    headers: {
      accept: 'application/json';
      Authorization: `Bearer ${myKey}`;
    };
  };
  const res = await axios.get(BASE_URL, options);
}
