import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Family from './Family';
import './App.css'


// https://www.react-graph-gallery.com/network-chart
// https://airbnb.io/visx/network
// https://github.com/vasturiano/react-force-graph
// https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
// ^ to render a network grpah with data

type Individual = {
  id: string;
  name: string;
  children: Individual[] | [];
  parents: Individual[] | [];
  siblings: Individual[] | [];
};

function App() {
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <h1>My fam</h1>
      <Family id={'4'}/>
    </QueryClientProvider>
  );
}


// const Individual = ({ individual_id, individual = null }: { individual_id?: string, individual?: Individual | null }) => {
//   let individualToRender = individual;
  
//   if (individual_id) {
//     const { data } = useGetIndividual({id: individual_id});
//     individualToRender = data;
//   }

//   return (
//     <p>{individualToRender?.name}</p>
//   );
// };

// const LinkedParents = ({startingIndividual}: {startingIndividual: Individual}) => {
//   const parents = startingIndividual?.parents;

//   return (
//     <div>
//       {parents.length > 0 && parents.map(
//         (parent, i) => <Individual key={`parent-${parent.id}-${i}`} individual_id={parent.id} />
//       )}
//     </div>
//   );
// };

// const LinkedSiblings = ({startingIndividual}: {startingIndividual: Individual}) => {
//   const siblings = startingIndividual?.siblings;

//   return (
//     <div>
//       {siblings.length > 0 && siblings.map(
//         (sibling, i) => <Individual  key={`sibling-${sibling.id}-${i}`} individual_id={sibling.id} />
//       )}
//     </div>
//   );  
// };

// const LinkedChildren = ({startingIndividual}: {startingIndividual: Individual}) => {
//   const children = startingIndividual?.children;

//     return (
//       <div>
//         {children.length > 0 && children.map((child, i) => <Individual key={`child-${child.id}-${i}`} individual_id={child.id} /> )}
//       </div>
//     )
// };



export default App
