import { LanguageProvider } from './context/LanguageContext';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MocChauFeatureSection } from './components/MocChauFeatureSection';
import { StatsDashboardSection } from './components/StatsDashboardSection';
import { RaceCalendarSection } from './components/RaceCalendarSection';
import { ChallengesSection } from './components/ChallengesSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { InteractiveToolsSection } from './components/InteractiveToolsSection';
import { LabsSection } from './components/LabsSection';
import { ShopSection } from './components/ShopSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen w-full bg-black text-white selection:bg-emerald-400 selection:text-black overflow-x-hidden">
        <BackgroundVideo />
        <Navbar />
        <HeroSection />
        <MocChauFeatureSection />
        <StatsDashboardSection />
        <RaceCalendarSection />
        <ChallengesSection />
        <KnowledgeSection />
        <InteractiveToolsSection />
        <LabsSection />
        <ShopSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}

export default App;
