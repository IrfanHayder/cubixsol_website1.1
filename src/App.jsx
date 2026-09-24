import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Component } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ServicesProvider } from './context/ServicesContext';
import { EstimateModalProvider } from './context/EstimateModalContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AiSeoAuditor from './pages/AiSeoAuditor';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import PmsIntegration from './pages/PmsIntegration';
import ShopifyDevelopment from './pages/ShopifyDevelopment';
import GoHighLevelAutomation from './pages/GoHighLevelAutomation';
import HubSpotCrm from './pages/HubSpotCrm';
import AiWorkflows from './pages/AiWorkflows';
import AiChatbots from './pages/AiChatbots';
import EmailLeadNurture from './pages/EmailLeadNurture';
import GuestyIntegration from './pages/GuestyIntegration';
import HostawayIntegration from './pages/HostawayIntegration';
import HostfullyIntegration from './pages/HostfullyIntegration';
import ZeevouIntegration from './pages/ZeevouIntegration';
import SmoobuIntegration from './pages/SmoobuIntegration';
import NewbookIntegration from './pages/NewbookIntegration';
import JurnyIntegration from './pages/JurnyIntegration';
import LodgifyIntegration from './pages/LodgifyIntegration';
import RentalsUnitedIntegration from './pages/RentalsUnitedIntegration';
import OwnerRezIntegration from './pages/OwnerRezIntegration';
import HostifyIntegration from './pages/HostifyIntegration';
import TokeetIntegration from './pages/TokeetIntegration';
import UplistingIntegration from './pages/UplistingIntegration';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Catches render errors so the whole app does not go blank white */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Something went wrong' };
  }

  componentDidCatch(error, info) {
    console.error('Page error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-lg font-bold text-ink">This page failed to load</p>
          <p className="text-sm text-gray-500 max-w-md">{this.state.message}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              this.setState({ hasError: false, message: '' });
              window.location.href = '/';
            }}
          >
            Go home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 1. Services -> /all-services */}
        <Route path="/services" element={<Navigate to="/all-services" replace />} />
        <Route path="/all-services" element={<Services />} />

        {/* Audit 301 / Permanent Redirects */}
        {/* 2. AI Document Intelligence -> /ai-development */}
        <Route path="/ai-document-intelligence" element={<Navigate to="/ai-development" replace />} />
        <Route path="/services/ai-document-intelligence" element={<Navigate to="/ai-development" replace />} />

        {/* 3. Android App Development -> /android-development */}
        <Route path="/android-app-development" element={<Navigate to="/android-development" replace />} />
        <Route path="/services/android-app-development" element={<Navigate to="/android-development" replace />} />

        {/* 4. API Development & Integration -> /api-development */}
        <Route path="/api-development-and-integration" element={<Navigate to="/api-development" replace />} />
        <Route path="/services/api-development-and-integration" element={<Navigate to="/api-development" replace />} />

        {/* 5. Data Migration duplicate -> /data-migration-services */}
        <Route path="/data-migration" element={<Navigate to="/data-migration-services" replace />} />
        <Route path="/services/data-migration" element={<Navigate to="/data-migration-services" replace />} />
        <Route path="/services/data-migration-services" element={<Navigate to="/data-migration-services" replace />} />

        {/* 6. DevOps duplicate -> /devops-engineering */}
        <Route path="/devops" element={<Navigate to="/devops-engineering" replace />} />
        <Route path="/services/devops" element={<Navigate to="/devops-engineering" replace />} />
        <Route path="/services/devops-engineering" element={<Navigate to="/devops-engineering" replace />} />

        {/* 7. E-Commerce Marketplace Redesign -> /ecommerce-solutions */}
        <Route path="/ecommerce-marketplace-redesign" element={<Navigate to="/ecommerce-solutions" replace />} />
        <Route path="/services/ecommerce-marketplace-redesign" element={<Navigate to="/ecommerce-solutions" replace />} />

        {/* 8. E-Commerce Retail -> /ecommerce-solutions */}
        <Route path="/ecommerce-retail" element={<Navigate to="/ecommerce-solutions" replace />} />
        <Route path="/services/ecommerce-retail" element={<Navigate to="/ecommerce-solutions" replace />} />

        {/* 9. UI/UX Designing duplicate -> /ui-ux-design */}
        <Route path="/ui-ux-designing" element={<Navigate to="/ui-ux-design" replace />} />
        <Route path="/services/ui-ux-designing" element={<Navigate to="/ui-ux-design" replace />} />
        <Route path="/services/ui-ux-design" element={<Navigate to="/ui-ux-design" replace />} />

        {/* Additional clean redirects */}
        <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/tools/ai-seo-auditor" element={<AiSeoAuditor />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:slug" element={<SolutionDetail />} />
        <Route path="/pms-integration" element={<PmsIntegration />} />
        <Route path="/services/pms-integration" element={<PmsIntegration />} />
        <Route path="/shopify-development" element={<ShopifyDevelopment />} />
        <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
        <Route path="/ghl-automation" element={<GoHighLevelAutomation />} />
        <Route path="/gohighlevel-automation" element={<GoHighLevelAutomation />} />
        <Route path="/services/ghl-automation" element={<GoHighLevelAutomation />} />
        <Route path="/services/gohighlevel-automation" element={<GoHighLevelAutomation />} />
        <Route path="/hubspot-crm" element={<HubSpotCrm />} />
        <Route path="/hubspot-automation" element={<HubSpotCrm />} />
        <Route path="/services/hubspot-crm" element={<HubSpotCrm />} />
        <Route path="/services/hubspot-automation" element={<HubSpotCrm />} />
        <Route path="/ai-workflows" element={<AiWorkflows />} />
        <Route path="/ai-workflow-automation" element={<AiWorkflows />} />
        <Route path="/services/ai-workflows" element={<AiWorkflows />} />
        <Route path="/services/ai-workflow-automation" element={<AiWorkflows />} />
        <Route path="/ai-chatbots" element={<AiChatbots />} />
        <Route path="/ai-chatbot-development" element={<AiChatbots />} />
        <Route path="/services/ai-chatbots" element={<AiChatbots />} />
        <Route path="/services/ai-chatbot-development" element={<AiChatbots />} />
        <Route path="/email-lead-nurture" element={<EmailLeadNurture />} />
        <Route path="/email-marketing-automation" element={<EmailLeadNurture />} />
        <Route path="/services/email-lead-nurture" element={<EmailLeadNurture />} />
        <Route path="/services/email-marketing-automation" element={<EmailLeadNurture />} />
        <Route path="/guesty-integration" element={<GuestyIntegration />} />
        <Route path="/services/guesty-integration" element={<GuestyIntegration />} />
        <Route path="/hostaway-integration" element={<HostawayIntegration />} />
        <Route path="/services/hostaway-integration" element={<HostawayIntegration />} />
        <Route path="/hostfully-integration" element={<HostfullyIntegration />} />
        <Route path="/services/hostfully-integration" element={<HostfullyIntegration />} />
        <Route path="/zeevou-integration" element={<ZeevouIntegration />} />
        <Route path="/services/zeevou-integration" element={<ZeevouIntegration />} />
        <Route path="/smoobu-integration" element={<SmoobuIntegration />} />
        <Route path="/services/smoobu-integration" element={<SmoobuIntegration />} />
        <Route path="/newbook-integration" element={<NewbookIntegration />} />
        <Route path="/services/newbook-integration" element={<NewbookIntegration />} />
        <Route path="/jurny-integration" element={<JurnyIntegration />} />
        <Route path="/services/jurny-integration" element={<JurnyIntegration />} />
        <Route path="/lodgify-integration" element={<LodgifyIntegration />} />
        <Route path="/services/lodgify-integration" element={<LodgifyIntegration />} />
        <Route path="/rentals-united-integration" element={<RentalsUnitedIntegration />} />
        <Route path="/services/rentals-united-integration" element={<RentalsUnitedIntegration />} />
        <Route path="/ownerrez-integration" element={<OwnerRezIntegration />} />
        <Route path="/services/ownerrez-integration" element={<OwnerRezIntegration />} />
        <Route path="/hostify-integration" element={<HostifyIntegration />} />
        <Route path="/services/hostify-integration" element={<HostifyIntegration />} />
        <Route path="/tokeet-integration" element={<TokeetIntegration />} />
        <Route path="/services/tokeet-integration" element={<TokeetIntegration />} />
        <Route path="/uplisting-integration" element={<UplistingIntegration />} />
        <Route path="/services/uplisting-integration" element={<UplistingIntegration />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/:slug" element={<ServiceDetail />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

function Main() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <AppRoutes />;
  }

  return (
    <main className={`flex-1 ${isHome ? '' : 'pt-20'}`}>
      <AppRoutes />
    </main>
  );
}

function AppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen">
        <Main />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServicesProvider>
          <EstimateModalProvider>
            <ScrollToTop />
            <AppShell />
          </EstimateModalProvider>
        </ServicesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
