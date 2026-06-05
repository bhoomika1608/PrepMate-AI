import { Link } from 'react-router-dom';
import { Cpu, Terminal, Sparkles, Network, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center max-w-4xl px-4 mt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          AI-Powered Coding Interview & Career Prep
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Prepare for your dream job with AI code explanations, mock interviews, resume analysis, and a personalized career roadmap.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="bg-indigo-600 text-white font-medium text-lg px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            Get Started
            <ArrowRight size={20} className="ml-2" />
          </Link>
          <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 font-medium text-lg px-8 py-3 rounded-md hover:bg-indigo-50 transition-colors">
            Login
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mt-24 px-4 pb-12">
        <FeatureCard 
          icon={<Terminal size={24} className="text-indigo-600" />}
          title="Practice DSA"
          desc="Solve hand-picked data structure and algorithm questions."
        />
        <FeatureCard 
          icon={<Cpu size={24} className="text-indigo-600" />}
          title="AI Code Explainer"
          desc="Get time and space complexity explanations for your code instantly."
        />
        <FeatureCard 
          icon={<Network size={24} className="text-indigo-600" />}
          title="Career Roadmap"
          desc="Generate step-by-step roadmaps based on your target role."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default LandingPage;
