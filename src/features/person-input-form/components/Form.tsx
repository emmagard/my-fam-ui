import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../global-context';
import { RelationshipSelector } from './RelationshipSelector';
import { useCreateIndividual } from '../../../api/individuals';

export const Form = () => {
  const { familyId } = useContext(GlobalContext);
  const [formHasError, setFormHasError] = useState(false);
  const [relativeName, setRelativeName] = useState('');
  const [relationshipTypeId, setRelationshipTypeId] = useState('1');

   const {isPending, mutateAsync}  = useCreateIndividual({id:familyId, name: relativeName, relationship_type_id: relationshipTypeId});


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!relativeName) {setFormHasError(true); return;}
    await mutateAsync();
  };

  return (
    <div className="flex flex-col mr-[60px]">
      <h2>Add a person</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name-input">Enter the person's name</label>
        <input className="bg-white text-black mb-2" type="text" id="name-input" name="name" placeholder="Name" value={relativeName} onChange={(e) => setRelativeName(e.target.value)} />
        {formHasError && <p className="error">Name is required!</p>}
        <RelationshipSelector onChange={(e) => setRelationshipTypeId(e.target.value)} />
        <button className="bg-blue-500 text-white mt-4 p-2 rounded" type="submit" disabled={isPending}>Add</button>
      </form>
    </div>
  );
};