import TreeNode from "./TreeNode";
import type { Individual } from '../../types';

const TreeNodeRelation = ({
  type,
  persons,
  newVisited
}: {
  type: string;
  persons: Individual[];
  newVisited: Set<string>;
}) => {
  if (!persons || persons.length === 0 || type === '') {
    return null;
  }

  if (type === 'parents') {
    const renderSpouse = persons[0]?.id !== persons[1]?.relationships?.spouses[0]?.id;

    return (
      <div className="parents flex mb-6 before:content-[''] before:block before:font-bold before:absolute before:h-[92px] before:w-[2px] before:bg-gray-300">
        {persons.map((parent: Individual, i: number) => (
          <div className={`flex relative ${!renderSpouse && i === 0 ? 'after:content-["+"] after:absolute after:bottom-[6px] after:right-[133px]' : ''}`} key={`parent-${parent.id}-${parent.name}`}>
            { (renderSpouse && i > 0) && <span className="mx-2 self-center">+</span>}
            <TreeNode
              person={parent}
              visited={newVisited}
              showParents={true}    // Keep going up
              showChildren={false}  // Don't go back down
              showSiblings={true}  // Don't show parent's siblings
              showSpouses={renderSpouse}    // Show parent's spouse
            />
            
          </div>
        ))}
      </div>
    );
  }

  if (type === 'spouses') {
    return (
      <div className="spouses flex">
        {persons.map(spouse => {
          return (
            <div key={`spouse-${spouse.id}-${spouse.name}`} className="flex">
              <span className="mx-2 self-center">+</span>
              <TreeNode
                person={spouse}
                visited={newVisited}
                showParents={true}   // Don't show spouse's parents
                showChildren={false}  // Children will be shown from main person
                showSiblings={false}  // Don't show spouse's siblings
                showSpouses={false}   // Prevent infinite spouse loop
                showBorder={false}
              />
            </div>
          )
        })}
      </div>
    );
  }

  if (type === 'siblings') {
    return (
      <div className="siblings flex">
        {persons.map((sibling, i) => (
          <div className='flex' key={`sibling-${sibling.id}-${sibling.name}`}>
            {<span className="mx-2 self-center">-</span>}
            <TreeNode
              person={sibling}
              visited={newVisited}
              showParents={false}   // Don't show sibling's parents
              showChildren={true}  // Children will be shown from main person
              showSiblings={false}  // Don't show sibling's siblings
              showSpouses={true}    // Show sibling's spouse
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'children') {
    return (

      <div className="absolute children flex flex-row mt-6 before:content-[''] before:bottom-0 before:block before:font-bold before:absolute before:h-[67px] before:w-[2px] before:bg-gray-300">
        {persons.map((child, i) => (

          <div key={`child-container-${child.id}-${child.name}`} className="flex">
            {i > 0 && <span className="mx-2 self-center">-</span>}
            <TreeNode
              person={child}
              visited={newVisited}
              showParents={true}   // Don't go back up to this person
              showChildren={true}   // Keep going down
              showSiblings={true}   // Show child's siblings
              showSpouses={true}    // Show child's spouse
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default TreeNodeRelation;