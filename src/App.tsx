import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import CareerDetail from "./pages/CareerDetail";
import FAQPage from "./pages/FAQPage";
import CareerTree from "./pages/CareerTree";
import NotFound from "./pages/NotFound";
import FAQChatWidget from "./components/FAQChatWidget";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/career/:id" element={<CareerDetail />} />
      <Route path="/career-tree" element={<CareerTree />} />
      <Route path="/faq/:id" element={<FAQPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FAQChatWidget />
  </BrowserRouter>
);

export default App;
