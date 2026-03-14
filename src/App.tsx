import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const CareerTree = lazy(() => import("./pages/CareerTree"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQChatWidget = lazy(() => import("./components/FAQChatWidget"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/career/:id" element={<CareerDetail />} />
        <Route path="/career-tree" element={<CareerTree />} />
        <Route path="/faq/:id" element={<FAQPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FAQChatWidget />
    </Suspense>
  </BrowserRouter>
);

export default App;
