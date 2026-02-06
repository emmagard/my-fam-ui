import { useGetRelationshipTypes } from "../../../api/relationshipsTypes";
import type { Relationship } from "../../../types";

export const RelationshipSelector = ({onChange}: {onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) => {
  const { data } = useGetRelationshipTypes();
  
  return (
    <>
      <label className="mb-1" htmlFor="relationship_type_id">Select a relationship</label>
      <select className="bg-white text-black mb-4" name="relationship_type_id" onChange={onChange}>
        {data?.map((relationship: Relationship) => (
          <option key={`relationship-${relationship.id}`} value={relationship.id}>
            {relationship.value}
          </option>
      ))}
    </select>
  </>
)};