import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

export default function useFavorites() {
  const { data, error, isLoading } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false, 
  });

  return {
    data,
    isLoading,
    error,
  };
}
