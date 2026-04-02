
import { useGetFamilyTree } from './api/individuals';
import FamilyTree from './Family';
import { GlobalProvider } from './features/global-context';

const FamilyContainer = () => {
  const { data } = useGetFamilyTree('1');

  if (!data) {
    return null;
  }

  return (
    <GlobalProvider>
      <div className="family-container">
        { data && <FamilyTree data={data} /> }
      </div>
    </GlobalProvider>
  );
};

export default FamilyContainer;
