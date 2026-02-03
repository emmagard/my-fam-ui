import { useGetRelationshipTypes } from "../../../api/relationshipsTypes";
import type { Relationship } from "../../../types";

export const RelationshipSelector = ({onChange}: {onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) => {
  const { data } = useGetRelationshipTypes();
  
  return (
    <>
      <label htmlFor="relationship_type_id">Select a relationship</label>
      <select className="bg-white text-black" name="relationship_type_id" onChange={onChange}>
        {data?.map((relationship: Relationship) => (
          <option key={`relationship-${relationship.id}`} value={relationship.id}>
            {relationship.value}
          </option>
      ))}
    </select>
  </>
)};