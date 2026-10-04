import { Link } from 'react-router-dom';
import { School, Megaphone, Users, Shield, Bot, Calendar, Bell, Globe, CheckCircle, ArrowRight, Star, Sparkles, BookOpen, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">AI School Noticeboard</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">How it Works</a>
            <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Free & Open Source</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600">Sign In</Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Register School</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> AI-Powered School Communication
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            One Smart Noticeboard.<br />
            <span className="text-indigo-600">Every School. Every Update.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A centralized digital noticeboard platform where schools manage notices, events, activities, and communicate with students, teachers, and parents — all powered by AI.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              Register Your School <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
              Explore Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free to try • No credit card required • Demo credentials available</p>
        </div>
        
        {/* Demo Preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2"><Megaphone className="w-4 h-4 text-blue-600" /><span className="text-xs font-medium text-blue-600">Important</span></div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Annual Sports Day 2026</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All students from Class 1-12 are requested to participate...</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-100 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2"><span className="text-xs">🚨</span><span className="text-xs font-medium text-red-600">Emergency</span></div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">School Closed Due to Heavy Rain</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">School will remain closed tomorrow due to waterlogging...</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4 text-green-600" /><span className="text-xs font-medium text-green-600">Homework</span></div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Science Project Submission</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All Class 9 students submit projects by 30th Jan...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything Your School Needs</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Complete digital noticeboard solution for modern schools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Megaphone, title: 'Smart Noticeboard', desc: 'Create, schedule, and publish notices with AI assistance. Target specific classes, sections, or the entire school.' },
              { icon: Bot, title: 'AI-Powered', desc: 'Generate notices, improve content, translate languages, and get smart answers about school information.' },
              { icon: Users, title: 'Multi-Role Access', desc: 'Separate dashboards for admins, teachers, students, and parents with role-based permissions.' },
              { icon: Calendar, title: 'Events & Calendar', desc: 'Manage school events, academic calendar, holidays, and exam schedules in one place.' },
              { icon: Bell, title: 'Smart Notifications', desc: 'In-app, email, and push notifications. Users configure what they want to receive.' },
              { icon: Shield, title: 'Secure & Private', desc: 'Multi-tenant architecture ensures complete data isolation between schools. Enterprise-grade security.' },
              { icon: Globe, title: 'Multi-Language', desc: 'Support for English, Hindi, Urdu and more. AI-powered translation for all notices.' },
              { icon: Award, title: 'Achievements', desc: 'Showcase student and school achievements with beautiful cards and recognition.' },
              { icon: BookOpen, title: 'Document Management', desc: 'Upload and share PDFs, circulars, and documents securely with access control.' },
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Get your school online in minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Sign up your school with basic details' },
              { step: '2', title: 'Setup', desc: 'Add teachers, students, and parents' },
              { step: '3', title: 'Publish', desc: 'Create notices, events, and announcements' },
              { step: '4', title: 'Connect', desc: 'Everyone stays informed and connected' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Everyone */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Built For Everyone</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { role: 'For Schools & Admins', items: ['Manage school profile & settings', 'Create & schedule notices', 'Add teachers, students & parents', 'View analytics & engagement', 'Manage events & calendar'] },
              { role: 'For Teachers', items: ['Create class announcements', 'Post homework & assignments', 'Share study materials', 'View school notices', 'Communicate with parents'] },
              { role: 'For Students', items: ['View all school notices', 'Check homework & exams', 'See upcoming events', 'Bookmark important notices', 'Get AI-powered answers'] },
              { role: 'For Parents', items: ['Stay updated on school activities', 'View notices for your children', 'Track exam schedules', 'Download circulars & documents', 'Switch between children'] },
            ].map((section, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{section.role}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Bot className="w-4 h-4" /> AI-Powered
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Intelligent Features</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Let AI help you communicate better</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'AI Notice Writer', desc: 'Describe what you want to communicate and AI generates a professional notice instantly.' },
              { title: 'AI Notice Improver', desc: 'Fix grammar, improve clarity, make content more professional or friendly.' },
              { title: 'Smart Summaries', desc: 'Long circulars automatically summarized into key points for quick reading.' },
              { title: 'AI Translation', desc: 'Translate notices to Hindi, Urdu, and other languages while keeping the original.' },
              { title: 'Smart Search', desc: 'Search naturally: "Show me exam notices next week" — AI understands context.' },
              { title: 'AI Assistant', desc: 'Ask questions like "Is there a holiday next Monday?" and get instant answers.' },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free & Open Source */}
      <section id="pricing" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" /> 100% Free & Open Source
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Free Forever. No Hidden Costs.</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI School Noticeboard is completely free to use for all schools. No subscriptions, no premium plans, no paywalls. Built for education, not profit.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Unlimited Schools', desc: 'Register as many schools as you want' },
              { title: 'Unlimited Users', desc: 'Add all teachers, students, and parents' },
              { title: 'Unlimited Notices', desc: 'No limits on notices, events, or features' },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/register" className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted by Schools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Rajesh Kumar', role: 'Principal, DPS Delhi', text: 'This platform transformed how we communicate with parents. Notices reach everyone instantly.' },
              { name: 'Mrs. Priya Sharma', role: 'Admin, GVI Bangalore', text: 'The AI features save us hours every week. Notice writing has never been easier.' },
              { name: 'Mr. Anil Mehta', role: 'Principal, Springfield Academy', text: 'Finally, a platform that keeps all stakeholders informed without the chaos of WhatsApp groups.' },
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white">Ready to Digitize Your School?</h2>
          <p className="mt-4 text-green-50">Start using AI School Noticeboard today — completely free, forever.</p>
          <Link to="/register" className="mt-6 inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">
            Register Your School — Free Forever
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><School className="w-4 h-4 text-white" /></div>
              <span className="font-bold text-white">AI School Noticeboard</span>
            </div>
            <p className="text-sm">One Smart Noticeboard. Every School. Every Update.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Open Source</a></li>
              <li><a href="#" className="hover:text-white">GitHub</a></li>
              <li><a href="#" className="hover:text-white">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Demo</h4>
            <ul className="space-y-2 text-sm">
              <li>Admin: admin@demo-school.com</li>
              <li>Teacher: teacher1@demo-school.com</li>
              <li>Student: student1@demo-school.com</li>
              <li>Parent: parent1@demo-school.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2026 AI School Noticeboard. Free & Open Source Software.</p>
          <p className="mt-2 text-gray-500">Made with ❤️ for schools everywhere. No paywalls. No subscriptions. Just education.</p>
        </div>
      </footer>
    </div>
  );
}
