import { useQuery } from '@tanstack/react-query';
import { api } from '.';

export const useGetFamilyTree = (id: string) => {
  return useQuery({
    queryKey: ['family-tree', id],
    queryFn: async () => {
      try {
        const res = await api.get(`individuals/${id}/family_tree`);
        return res.data;
      } catch (err) {
        return err;
      }
    }
  });
}

export const useGetIndividuals = () => {
  return useQuery({
    queryKey: ['individuals'],
    queryFn: async () => {
      try {
        const res = await api.get('individuals');
        return res.data;
      } catch (err) {
        return err;
      }
    }
  });
};

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