import { LanguageProvider } from './context/LanguageContext';
import { TsingtaoShowcase } from './components/img2threejs/TsingtaoShowcase';

export function App() {
  return (
    <LanguageProvider>
      <main className="min-h-screen w-full bg-neutral-950 text-white selection:bg-emerald-400 selection:text-black overflow-x-hidden">
        <TsingtaoShowcase />
      </main>
    </LanguageProvider>
  );
}

export default App;
