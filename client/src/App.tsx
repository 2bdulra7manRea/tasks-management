import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import MainLayout from './components/layout/Layout';

function App() {
  
const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
     <MainLayout/>
  </QueryClientProvider>

  );
}

export default App;
