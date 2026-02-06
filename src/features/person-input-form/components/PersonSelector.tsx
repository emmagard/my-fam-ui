import { useContext } from "react";
import { useGetIndividuals } from "../../../api/individuals";
import { GlobalContext } from '../../global-context';
import type { Individual } from "../../../types";

export const PersonSelector = ({onChange}: {onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) => {
  const { data } = useGetIndividuals();
  const { familyId } = useContext(GlobalContext);

  return (
    <>
      <label className="mb-1" htmlFor="person_id">Select a person</label>
      <select className="bg-white text-black mb-4" name="person_id" onChange={onChange}>
        {data?.map((person: Individual) => (
          <option key={`person-${person.id}`} value={person?.id}>
            { person?.id == familyId ? 'You'  : person?.name}
          </option>
      ))}
    </select>
  </>
)};