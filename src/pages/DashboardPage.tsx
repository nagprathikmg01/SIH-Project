import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Dashboard } from '../components/Dashboard';
import { CropsSection } from '../components/CropsSection';
import { SoilInsights } from '../components/SoilInsights';
import { AIPredictions } from '../components/AIPredictions';
import { ProfileSection } from '../components/ProfileSection';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Toaster } from '../components/ui/sonner';

export function DashboardPage() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <Dashboard />
            <Testimonials />
          </>
        );
      case 'crops':
        return <CropsSection />;
      case 'soil':
        return <SoilInsights />;
      case 'predictions':
        return <AIPredictions />;
      case 'profile':
        return <ProfileSection />;
      default:
        return (
          <>
            <Dashboard />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      >
        {renderSection()}
        {currentSection === 'home' && <Footer />}
      </DashboardLayout>
      <Toaster />
    </div>
  );
}
