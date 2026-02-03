import TreeNode from "./TreeNode";
import type { Individual } from './types';

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
    return (
      <div className="parents flex mb-6 before:content-[''] before:block before:font-bold before:absolute before:h-[67px] before:w-[2px] before:bg-gray-300">
        {persons.map((parent: Individual, i: number) => (
          <>
           {i > 0 && <span className="mx-2 self-center">+</span>}
            <TreeNode
              key={parent.id}
              person={parent}
              visited={newVisited}
              showParents={true}    // Keep going up
              showChildren={false}  // Don't go back down
              showSiblings={false}  // Don't show parent's siblings
              showSpouses={true}    // Show parent's spouse
            />
          </>
        ))}
      </div>
    );
  }

  if (type === 'spouses') {
    return (
      <div className="spouses flex">
        {persons.map(spouse => {
          return (
            <>
              <span className="mx-2 self-center">+</span>
              <TreeNode
                key={spouse.id}
                person={spouse}
                visited={newVisited}
                showParents={false}   // Don't show spouse's parents
                showChildren={false}  // Children will be shown from main person
                showSiblings={false}  // Don't show spouse's siblings
                showSpouses={false}   // Prevent infinite spouse loop
                showBorder={false}
              />
            </>
          )
        })}
      </div>
    );
  }

  if (type === 'siblings') {
    return (
      <div className="siblings flex">
        {persons.map((sibling, i) => (
          <div className='flex' key={sibling.id}>
            {<span className="mx-2 self-center">-</span>}
            <TreeNode
              key={sibling.id}
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
          <>
            {i > 0 && <span className="mx-2 self-center">-</span>}
            <TreeNode
              key={child.id}
              person={child}
              visited={newVisited}
              showParents={false}   // Don't go back up to this person
              showChildren={true}   // Keep going down
              showSiblings={true}   // Show child's siblings
              showSpouses={true}    // Show child's spouse
            />
          </>
        ))}
      </div>
    );
  }

  return null;
};

export default TreeNodeRelation;