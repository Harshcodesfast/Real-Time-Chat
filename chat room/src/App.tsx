import { RecoilRoot } from "recoil";
import { ThemeProvider } from "./components/theme-provider";
import { JoinPage } from "./pages/joinPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatPage } from "./pages/chatRoom";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<JoinPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
