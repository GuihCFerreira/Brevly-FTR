import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import { HomePage } from "./pages/home-page";
import { RedirectPage } from "./pages/redirect-page";
import { NotFoundPage } from "./pages/not-found-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:shortenedUrl" element={<RedirectPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
