import { useGetIndividual } from './api/individuals';
import Tree from './Tree';

const Family = ({id}:{id: string}) => {
  const { data } = useGetIndividual({id});

  return (
   <Tree data={[data]} />
  );
};

export default Family;