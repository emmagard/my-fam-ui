import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../global-context';
import { PersonSelector } from './PersonSelector';
import { RelationshipSelector } from './RelationshipSelector';
import { useCreateRelationshipWithNewIndividual } from '../../../api/relationships';

type IndividualWithRelative = [
  string, // an id for an individual
  string // the name of the individual, rendered in the UI
];

export const Form = () => {
  const { familyId } = useContext(GlobalContext);
  const [formHasError, setFormHasError] = useState(false);
  const [individualWithRelative, setIndividualWithRelative] = useState<IndividualWithRelative>([familyId, 'you']);
  const [relativeName, setRelativeName] = useState('');
  const [relationshipTypeId, setRelationshipTypeId] = useState('1');

  const {isPending, mutateAsync}  = useCreateRelationshipWithNewIndividual({id:individualWithRelative[0], name: relativeName, relationship_type_id: relationshipTypeId});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!relativeName) {setFormHasError(true); return;}
    await mutateAsync();
  };

  return (
    <div className="flex flex-col mr-[60px]">
      <h2 className='text-2xl font-bold mb-2'>Add a relative</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <PersonSelector onChange={(e) => setIndividualWithRelative([e.target.value, e.target.selectedOptions[0].label])} />
        <label className='mb-1' htmlFor="name-input">{`Enter ${individualWithRelative[0] !== familyId ? individualWithRelative[1] + "'s" : 'your'} relative's name`}</label>
        <input className="bg-white text-black mb-4" type="text" id="name-input" name="name" placeholder="Name" value={relativeName} onChange={(e) => setRelativeName(e.target.value)} />
        {formHasError && <p className="error">Name is required!</p>}
        <RelationshipSelector onChange={(e) => setRelationshipTypeId(e.target.value)} />
        <button className="bg-blue-500 text-white mt-4 p-2 rounded" type="submit" disabled={isPending}>Add</button>
      </form>
    </div>
  );
};