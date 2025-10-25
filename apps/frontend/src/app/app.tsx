import { AgriSmartShared } from '@agri-smart/shared';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <AgriSmartShared />
      <div className="bg-red-300 text-center font-bold text-xl">Prajwal</div>
      <NxWelcome title="@agri-smart/frontend" />
    </div>
  );
}

export default App;
