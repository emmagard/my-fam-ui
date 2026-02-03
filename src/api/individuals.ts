import { useQuery, useMutation } from '@tanstack/react-query';
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

export const useCreateIndividual = ({id, name, relationship_type_id}: {id: string, name: string, relationship_type_id: string}) => {
  return useMutation({
    mutationFn: async () => {
      if (!name) {return}
      const res = await api.post(`individuals/`, {
        id: id,
        name,
        relationship_type_id
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log('Individual created');
    }
  });
};