import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import { HomePage } from "./pages/home-page";
import { RedirectPage } from "./pages/redirect-page";
import { NotFoundPage } from "./pages/not-found-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortenedUrl" element={<RedirectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
