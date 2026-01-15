import { useQuery } from '@tanstack/react-query';
import { api } from '.';

export const useGetIndividual = ({ id }: { id: string }) => {  
  return useQuery({
    queryKey: ['individual-show', id],
    queryFn: async () => {
      try {
        const res = await api.get(`individuals/${id}`);
        return res.data;
      } catch (err) {
        return err;
      }
    }
  });
}