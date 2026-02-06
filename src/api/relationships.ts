import { useMutation } from '@tanstack/react-query';
import { api } from '.';

export const useCreateRelationshipWithNewIndividual = ({
  id,
  name,
  relationship_type_id
}: {
  id: string;
  name: string;
  relationship_type_id: string;
}) => {
  return useMutation({
    mutationFn: async () => {
      if (!name) {return}
      const res = await api.post(`relationships/create_with_new_person`, {
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