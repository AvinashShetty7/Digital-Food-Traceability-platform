// 'use client'

// import React, { useState } from 'react'
// import { Leaf, Truck, QrCode, Users, ArrowRight, Menu, X } from 'lucide-react'

// export default function HomePage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [showLoginModal, setShowLoginModal] = useState(false)
//   const [showRegisterModal, setShowRegisterModal] = useState(false)
//   const [loginRole, setLoginRole] = useState('')
//   const [registerRole, setRegisterRole] = useState('')

//   const handleLoginClose = () => {
//     setShowLoginModal(false)
//     setLoginRole('')
//   }

//   const handleRegisterClose = () => {
//     setShowRegisterModal(false)
//     setRegisterRole('')
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 font-sans">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//               <Leaf className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <span className="text-2xl font-bold text-foreground">Digital Raitha</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-8">
//             <button className="text-foreground hover:text-primary transition-colors">
//               Features
//             </button>
//             <button className="text-foreground hover:text-primary transition-colors">
//               About
//             </button>
//             <button className="text-foreground hover:text-primary transition-colors">
//               Contact
//             </button>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowLoginModal(true)}
//                 className="px-6 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-colors font-semibold"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setShowRegisterModal(true)}
//                 className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-accent transition-colors font-semibold"
//               >
//                 Register
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
//           >
//             {mobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-border bg-card">
//             <div className="px-6 py-4 flex flex-col gap-4">
//               <button className="text-left text-foreground hover:text-primary transition-colors">
//                 Features
//               </button>
//               <button className="text-left text-foreground hover:text-primary transition-colors">
//                 About
//               </button>
//               <button className="text-left text-foreground hover:text-primary transition-colors">
//                 Contact
//               </button>
//               <div className="flex gap-3 pt-4 border-t border-border">
//                 <button
//                   onClick={() => {
//                     setShowLoginModal(true)
//                     setMobileMenuOpen(false)
//                   }}
//                   className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-colors font-semibold"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowRegisterModal(true)
//                     setMobileMenuOpen(false)
//                   }}
//                   className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-accent transition-colors font-semibold"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
//               <span className="text-primary">Farm to Table</span> Transparency
//             </h1>
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               Trace every ingredient from farmer to consumer. Digital Raitha connects the entire agricultural supply chain with transparency, trust, and technology.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={() => setShowRegisterModal(true)}
//                 className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all flex items-center justify-center gap-2"
//               >
//                 Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Hero Illustration */}
//           <div className="relative">
//             <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
//               <div className="space-y-8 w-full px-8">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
//                     <Leaf className="w-8 h-8 text-primary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">Farmer</p>
//                     <p className="text-sm text-muted-foreground">Grows & Lists</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
//                     <Truck className="w-8 h-8 text-accent" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">Manufacturer</p>
//                     <p className="text-sm text-muted-foreground">Creates Products</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center">
//                     <QrCode className="w-8 h-8 text-secondary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">Customer</p>
//                     <p className="text-sm text-muted-foreground">Scans & Trusts</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
//         <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
//           How Digital Raitha Works
//         </h2>
//         <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
//           A complete ecosystem connecting farmers, manufacturers, and consumers with transparent traceability at every step.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <div className="bg-card rounded-xl p-8 border border-border hover:border-primary transition-colors hover:shadow-lg">
//             <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
//               <Leaf className="w-7 h-7 text-primary" />
//             </div>
//             <h3 className="text-xl font-bold text-foreground mb-3">Farmer Listings</h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Farmers add raw crops to the system with pricing, creating a transparent marketplace for fresh agricultural products.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="bg-card rounded-xl p-8 border border-border hover:border-accent transition-colors hover:shadow-lg">
//             <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
//               <Truck className="w-7 h-7 text-accent" />
//             </div>
//             <h3 className="text-xl font-bold text-foreground mb-3">Manufacturer Processing</h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Manufacturers view available raw materials, purchase offline, and create finished products using farmer-sourced ingredients.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="bg-card rounded-xl p-8 border border-border hover:border-secondary transition-colors hover:shadow-lg">
//             <div className="w-14 h-14 bg-secondary/20 rounded-lg flex items-center justify-center mb-6">
//               <QrCode className="w-7 h-7 text-secondary" />
//             </div>
//             <h3 className="text-xl font-bold text-foreground mb-3">QR Code Tracking</h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Admin generates QR codes for each product. Customers scan to trace the complete journey from farm to table.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* User Roles Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
//         <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
//           Join as a Participant
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Farmer Card */}
//           <div className="bg-gradient-to-br from-card to-primary/5 rounded-xl p-8 border border-border">
//             <Users className="w-10 h-10 text-primary mb-4" />
//             <h3 className="text-2xl font-bold text-foreground mb-3">Farmer</h3>
//             <p className="text-muted-foreground mb-6">
//               List your fresh crops, set competitive prices, and reach manufacturers directly.
//             </p>
//             <ul className="space-y-2 mb-8">
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-primary rounded-full"></span>
//                 Easy product listing
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-primary rounded-full"></span>
//                 Set your own prices
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-primary rounded-full"></span>
//                 Direct sales channel
//               </li>
//             </ul>
//             <button
//               onClick={() => {
//                 setRegisterRole('farmer')
//                 setShowRegisterModal(true)
//               }}
//               className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
//             >
//               Register as Farmer
//             </button>
//           </div>

//           {/* Manufacturer Card */}
//           <div className="bg-gradient-to-br from-card to-accent/5 rounded-xl p-8 border border-border">
//             <Truck className="w-10 h-10 text-accent mb-4" />
//             <h3 className="text-2xl font-bold text-foreground mb-3">Manufacturer</h3>
//             <p className="text-muted-foreground mb-6">
//               Source quality raw materials and create products with verified traceability.
//             </p>
//             <ul className="space-y-2 mb-8">
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-accent rounded-full"></span>
//                 Verified suppliers
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-accent rounded-full"></span>
//                 Quality assurance
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-accent rounded-full"></span>
//                 Supply tracking
//               </li>
//             </ul>
//             <button
//               onClick={() => {
//                 setRegisterRole('manufacturer')
//                 setShowRegisterModal(true)
//               }}
//               className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-primary transition-colors"
//             >
//               Register as Manufacturer
//             </button>
//           </div>

//           {/* Consumer Card */}
//           <div className="bg-gradient-to-br from-card to-secondary/5 rounded-xl p-8 border border-border">
//             <QrCode className="w-10 h-10 text-secondary mb-4" />
//             <h3 className="text-2xl font-bold text-foreground mb-3">Consumer</h3>
//             <p className="text-muted-foreground mb-6">
//               Scan QR codes and trace products back to their source for complete transparency.
//             </p>
//             <ul className="space-y-2 mb-8">
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-secondary rounded-full"></span>
//                 Full transparency
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-secondary rounded-full"></span>
//                 Origin verification
//               </li>
//               <li className="flex items-center gap-2 text-sm text-foreground">
//                 <span className="w-2 h-2 bg-secondary rounded-full"></span>
//                 Trust & confidence
//               </li>
//             </ul>
//             <button
//               onClick={() => {
//                 setRegisterRole('consumer')
//                 setShowRegisterModal(true)
//               }}
//               className="w-full px-6 py-3 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/10 transition-colors"
//             >
//               Browse Products
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//           Ready to Join the Food Traceability Revolution?
//         </h2>
//         <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
//           Be part of a transparent agricultural ecosystem where trust, quality, and technology meet.
//         </p>
//         <button
//           onClick={() => setShowRegisterModal(true)}
//           className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors inline-flex items-center gap-2"
//         >
//           Get Started Today <ArrowRight className="w-5 h-5" />
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border bg-card mt-20">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                   <Leaf className="w-5 h-5 text-primary-foreground" />
//                 </div>
//                 <span className="font-bold text-foreground">Digital Raitha</span>
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 Connecting farmers, manufacturers, and consumers through transparent traceability.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Product</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Company</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-sm text-muted-foreground">
//               © 2025 Digital Raitha. All rights reserved.
//             </p>
//             <div className="flex gap-4 mt-4 md:mt-0">
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
//               <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-card rounded-xl p-8 max-w-md w-full border border-border">
//             <h2 className="text-2xl font-bold text-foreground mb-6">Login</h2>

//             {!loginRole ? (
//               <div className="space-y-4">
//                 <p className="text-muted-foreground mb-6">Select your role:</p>
//                 <button
//                   onClick={() => setLoginRole('farmer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-primary hover:bg-primary/5 transition-all text-left font-semibold"
//                 >
//                   Farmer
//                 </button>
//                 <button
//                   onClick={() => setLoginRole('manufacturer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-accent hover:bg-accent/5 transition-all text-left font-semibold"
//                 >
//                   Manufacturer
//                 </button>
//                 <button
//                   onClick={() => setLoginRole('admin')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-secondary hover:bg-secondary/5 transition-all text-left font-semibold"
//                 >
//                   Admin
//                 </button>
//                 <button
//                   onClick={() => setLoginRole('consumer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-primary hover:bg-primary/5 transition-all text-left font-semibold"
//                 >
//                   Consumer
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <button
//                   onClick={() => setLoginRole('')}
//                   className="text-primary hover:text-accent transition-colors text-sm font-semibold mb-4"
//                 >
//                   ← Back
//                 </button>
//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
//                   Login as {loginRole.charAt(0).toUpperCase() + loginRole.slice(1)}
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={handleLoginClose}
//               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Register Modal */}
//       {showRegisterModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-auto">
//           <div className="bg-card rounded-xl p-8 max-w-md w-full border border-border my-8">
//             <h2 className="text-2xl font-bold text-foreground mb-6">Register</h2>

//             {!registerRole ? (
//               <div className="space-y-4">
//                 <p className="text-muted-foreground mb-6">Join as:</p>
//                 <button
//                   onClick={() => setRegisterRole('farmer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-primary hover:bg-primary/5 transition-all text-left font-semibold"
//                 >
//                   Farmer
//                 </button>
//                 <button
//                   onClick={() => setRegisterRole('manufacturer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-accent hover:bg-accent/5 transition-all text-left font-semibold"
//                 >
//                   Manufacturer
//                 </button>
//                 <button
//                   onClick={() => setRegisterRole('consumer')}
//                   className="w-full p-4 border-2 border-border rounded-lg text-foreground hover:border-primary hover:bg-primary/5 transition-all text-left font-semibold"
//                 >
//                   Consumer
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <button
//                   onClick={() => setRegisterRole('')}
//                   className="text-primary hover:text-accent transition-colors text-sm font-semibold mb-4"
//                 >
//                   ← Back
//                 </button>
//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     placeholder="Your name"
//                     className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 {registerRole !== 'consumer' && (
//                   <div>
//                     <label className="block text-sm font-semibold text-foreground mb-2">Business Name</label>
//                     <input
//                       type="text"
//                       placeholder="Your business name"
//                       className="w-full px-4 py-2 border border-input rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 )}
//                 <label className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <input type="checkbox" className="rounded" />
//                   I agree to the Terms & Conditions
//                 </label>
//                 <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
//                   Create Account
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={handleRegisterClose}
//               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import React, { useState } from 'react'
import { Leaf, Truck, QrCode, Users, ArrowRight, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">Digital Raitha</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button className="hover:text-green-700 transition">Features</button>
            <button className="hover:text-green-700 transition">About</button>
            <button className="hover:text-green-700 transition">Contact</button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 flex flex-col gap-4">
              <button className="text-left hover:text-green-700 transition">Features</button>
              <button className="text-left hover:text-green-700 transition">About</button>
              <button className="text-left hover:text-green-700 transition">Contact</button>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate('/login')
                    setMobileMenuOpen(false)
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register')
                    setMobileMenuOpen(false)
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-800">
            Farm to Table Transparency
          </h1>
          <p className="text-lg text-gray-700">
            Trace every ingredient from farmer to consumer. Digital Raitha connects farmers, manufacturers,
            and customers with full supply chain visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate('/register')}
              className="group px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative rounded-2xl bg-gradient-to-br from-green-200 to-green-100 p-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Farmer</p>
                <p className="text-sm text-gray-600">Grows & Lists Crops</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <Truck className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Manufacturer</p>
                <p className="text-sm text-gray-600">Processes & Creates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Customer</p>
                <p className="text-sm text-gray-600">Scans & Trusts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Transparent traceability connecting farmers, manufacturers, and consumers effortlessly.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <Leaf className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">Farmer Listings</h3>
            <p className="text-gray-600">
              Farmers list crops and prices to supply genuine agri-products directly to manufacturers.
            </p>
          </div>
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <Truck className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">Manufacturer Processing</h3>
            <p className="text-gray-600">
              Manufacturers buy raw products offline and record finished goods made from farmer-supplied items.
            </p>
          </div>
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <QrCode className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">QR Code Tracking</h3>
            <p className="text-gray-600">
              Admin generates QR codes, enabling customers to trace the origin of each product.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-green-50 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Join the Food Traceability Movement</h2>
        <p className="text-lg text-gray-700 mb-8">
          Experience transparent trust between farmers, manufacturers, and consumers.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="px-10 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Digital Raitha. All rights reserved.
      </footer>
    </div>
  )
}
