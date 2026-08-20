import { Toaster } from "@/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from '@/PageNotFound';
import { AuthProvider, useAuth } from '@/AuthContext';
// Add page imports here
import Home from '@/Home';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  // Show loading spinner while the anonymous Supabase session is being established
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    console.error('Auth error:', authError.message);
    // Fall through and render the app anyway — the site is still browsable
    // even if the Supabase session failed to initialize; generation/saving
    // will just fail with a toast until the user retries.
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App