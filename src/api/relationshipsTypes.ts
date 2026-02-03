import { useQuery } from '@tanstack/react-query';
import { api } from '.';

export const useGetRelationshipTypes = () => {  
  return useQuery({
    queryKey: ['relationship-types'],
    queryFn: async () => {
      try {
        const res = await api.get(`/relationship_types`);
        return res.data;
      } catch (err) {
        return err;
      }
    }
  });
}