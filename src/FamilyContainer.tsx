
import { useGetFamilyTree } from './api/individuals';
import Family from './Family';

const FamilyContainer = () => {
  const { data } = useGetFamilyTree('1');

  if (!data) {
    return null;
  }

  return (
    <div className="family-container">
       { data && <Family rootPerson={data} /> }
    </div>
  );
};

export default FamilyContainer;
