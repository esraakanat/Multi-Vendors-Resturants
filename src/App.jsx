import { Suspense } from 'react'
import { AppRouterProvider } from './routes';
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/features/restaurant/cart/context/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000, 
      retry: 3,
      retryDelay: 1000,
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans">Loading...</div>}>
          <AppRouterProvider />
          <Toaster />
        </Suspense>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
