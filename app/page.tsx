'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FaRegClock } from 'react-icons/fa'
import { FaSkullCrossbones, FaRegLightbulb } from 'react-icons/fa6'
import { IoMail, IoLinkOutline, IoClose } from 'react-icons/io5'
import { SiSubstack, SiYoutube, SiX, SiThreads, SiGithub } from 'react-icons/si'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [fid, setFid] = useState<number | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [ref, setRef] = useState<number | null>(null)
  const [heroEmail, setHeroEmail] = useState('')
  const [heroEmailError, setHeroEmailError] = useState('')
  const [section6Email, setSection6Email] = useState('')
  const [section6EmailError, setSection6EmailError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section6Ref = useRef<HTMLDivElement>(null)

  const validateEmail = (email: string): boolean => {
    // More strict validation: requires valid domain with at least 2 characters TLD
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email)
  }

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = heroEmail.trim()
    
    if (!email) {
      setHeroEmailError('Please enter your email')
      return
    }
    
    if (!validateEmail(email)) {
      setHeroEmailError('Please enter a valid email address')
      return
    }
    
    setHeroEmailError('')
    
    try {
      // First, save to MongoDB (if fid exists)
      const response = await fetch('/api/setSubscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          fid: fid ?? null,
          username: username ?? null,
          ref: fid !== null ? (ref ?? null) : null,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setHeroEmailError(data.error || 'Failed to save subscriber information.')
        return
      }
      
      // Then submit to Substack from the browser (to avoid 403 errors)
      try {
        const substackForm = document.createElement('form')
        substackForm.method = 'POST'
        substackForm.action = 'https://abundances.substack.com/api/v1/free'
        substackForm.target = '_blank'
        substackForm.style.display = 'none'
        
        const emailInput = document.createElement('input')
        emailInput.type = 'hidden'
        emailInput.name = 'email'
        emailInput.value = email
        substackForm.appendChild(emailInput)
        
        document.body.appendChild(substackForm)
        substackForm.submit()
        document.body.removeChild(substackForm)
        
        // Success - clear email field
        setHeroEmail('')
        
        // Show success modal if fid exists
        if (fid !== null) {
          setShowSuccessModal(true)
        }
      } catch (substackError) {
        console.error('Error submitting to Substack:', substackError)
        // Still clear email since MongoDB save succeeded
        setHeroEmail('')
        // Show success modal if fid exists (MongoDB save succeeded)
        if (fid !== null) {
          setShowSuccessModal(true)
        }
      }
    } catch (error) {
      setHeroEmailError('An error occurred. Please try again.')
    }
  }

  const handleSection6Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = section6Email.trim()
    
    if (!email) {
      setSection6EmailError('Please enter your email')
      return
    }
    
    if (!validateEmail(email)) {
      setSection6EmailError('Please enter a valid email address')
      return
    }
    
    setSection6EmailError('')
    
    try {
      // First, save to MongoDB (if fid exists)
      const response = await fetch('/api/setSubscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          fid: fid ?? null,
          username: username ?? null,
          ref: fid !== null ? (ref ?? null) : null,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setSection6EmailError(data.error || 'Failed to save subscriber information.')
        return
      }
      
      // Then submit to Substack from the browser (to avoid 403 errors)
      try {
        const substackForm = document.createElement('form')
        substackForm.method = 'POST'
        substackForm.action = 'https://abundances.substack.com/api/v1/free'
        substackForm.target = '_blank'
        substackForm.style.display = 'none'
        
        const emailInput = document.createElement('input')
        emailInput.type = 'hidden'
        emailInput.name = 'email'
        emailInput.value = email
        substackForm.appendChild(emailInput)
        
        document.body.appendChild(substackForm)
        substackForm.submit()
        document.body.removeChild(substackForm)
        
        // Success - clear email field
        setSection6Email('')
        
        // Show success modal if fid exists
        if (fid !== null) {
          setShowSuccessModal(true)
        }
      } catch (substackError) {
        console.error('Error submitting to Substack:', substackError)
        // Still clear email since MongoDB save succeeded
        setSection6Email('')
        // Show success modal if fid exists (MongoDB save succeeded)
        if (fid !== null) {
          setShowSuccessModal(true)
        }
      }
    } catch (error) {
      setSection6EmailError('An error occurred. Please try again.')
    }
  }

  const shareCast = async () => {
    try {
      const url = `https://abundance.id/?ref=${fid}`;
      let text = `I just joined the New Economic Revolution\n\nCheck it out here:`;

      const encodedText = encodeURIComponent(text);
      const encodedUrl = encodeURIComponent(url);
      const shareLink = `https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${[encodedUrl]}`;
      const { sdk } = await import('@farcaster/miniapp-sdk')
      const inMiniApp = await sdk.isInMiniApp();
      if (!inMiniApp) {
        window.open(shareLink, '_blank');
        return;
      }
      await sdk.actions.composeCast({ text, embeds: [url], close: false });
    } catch (e) {
      console.warn('Share failed:', e);
    }
  };

  useEffect(() => {
    // Read ref query parameter from URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const refParam = urlParams.get('ref')
      if (refParam) {
        const refNumber = Number(refParam)
        if (!isNaN(refNumber) && refNumber > 0) {
          setRef(refNumber)
          console.log('ref', refNumber)
        }
      }
    }
  }, [])

  useEffect(() => {
    (async () => {
      const mod = await import("@farcaster/miniapp-sdk");
      const sdk = mod.sdk;
      const isMiniApp: boolean = await sdk.isInMiniApp();

      // sdk.context might be a Promise<any>
      const userProfile = await sdk.context;

      if (isMiniApp) {
        setFid(userProfile?.user?.fid ? Number(userProfile.user.fid) : null);
        setUsername(userProfile?.user?.username ? userProfile.user.username : null);
        sdk.actions.ready();
      }
    })();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollLeft = () => {
    if (cardsContainerRef.current) {
      const scrollAmount = 320 // Card width (w-80) + gap
      cardsContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (cardsContainerRef.current) {
      const scrollAmount = 320 // Card width (w-80) + gap
      cardsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollToSection2 = () => {
    if (section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToSection6 = () => {
    if (section6Ref.current) {
      section6Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/images/future.png"
          alt="Future background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20"  style={{ backdropFilter: 'blur(6px)', background: 'linear-gradient(60deg, #660000dd 0%, #660000dd 10%, #001445dd 100%)' }}
      >
        {/* Tinted Blur Overlay */}
        <div className="absolute" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Eyebrow label */}
          <div className="animate-fade-in-up mb-6">
            <span className="text-xl md:text-2xl font-semibold tracking-wide" style={{ color: '#66ddff' }}>
              THE ABUNDANCE ECONOMY
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight animate-fade-in-up text-white leading-[1.05]" style={{ animationDelay: '0.1s' }}>
            The Digital Economy
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl">can't run on Industrial Age thinking</span>
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-2xl lg:text-3xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Our current business models were designed for factories and scarcity — not for networks and abundance. We’re developing a new model built for the Digital Age
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl  text-gray-100 mb-4 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join the <strong><em>New Economic Revolution</em></strong>
          </p>
        </div>

         <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-6">
           <form 
             onSubmit={handleHeroSubmit}
             className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center"
           >
            <div className="flex-1 flex flex-col relative">
              <input 
                type="email" 
                name="email" 
                value={heroEmail}
                onChange={(e) => {
                  setHeroEmail(e.target.value)
                  if (heroEmailError) setHeroEmailError('')
                }}
                placeholder="Type your email..." 
                required
                className={`flex-1 px-4 py-3 md:px-6 md:py-5 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                  heroEmailError ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {heroEmailError && (
                <p className="text-red-500 text-sm mt-1 text-left sm:absolute sm:top-full sm:left-0 w-full">{heroEmailError}</p>
              )}
            </div>
            <button 
              type="submit"
              className="px-6 py-3 md:px-9 md:py-5 text-lg md:text-2xl bg-red-800 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-[12px]"
            >
              <SiSubstack className="w-4 h-4 md:w-6 md:h-6" />
              Join
            </button>
          </form>
        </div>


        {/* macOS Restart Dialog Box */}
        <div className="mt-12 relative animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-10 w-full max-w-[750px] mx-auto float-animation border-2 border-gray-800/20">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              {/* Warning Icon */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Yellow triangle background with rounded corners */}
                  <path d="M12 2L2 20h20L12 2z" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                  {/* Black exclamation mark */}
                  <path d="M12 8v5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="black"/>
                </svg>
              </div>

              {/* Dialog Content */}
              <div className="flex-1 w-full">
                {/* Main Text */}
                <h3 className="text-gray-900 text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-center md:text-left">
                  System Alert: Your economy is out of date
                </h3>
                <p className="text-gray-700 text-base md:text-lg mb-4 md:mb-6 text-left flex items-start justify-start gap-2">
                  <FaRegClock color="#333333" className="text-gray-600 flex-shrink-0 mt-1" />
                  <span>Last major upgrade: <strong>18th century</strong></span>
                </p>
                <p className="text-gray-700 text-base md:text-lg mb-4 md:mb-6 text-left flex items-start justify-start gap-2">
                  <FaSkullCrossbones color="#880000" className="text-gray-600 flex-shrink-0 mt-1" />
                  <span>Running social media, AI, and other Digital Age processes may cause <strong>system failure</strong></span>
                </p>
                <p className="text-gray-700 text-base md:text-lg mb-4 md:mb-6 text-left flex items-start justify-start gap-2">
                  <FaRegLightbulb color="#996600" className="text-orange-400 flex-shrink-0 mt-1" />
                  <span><strong>New business model is available</strong></span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:justify-end">
                  <button onClick={scrollToSection2} className="w-full md:w-auto px-6 md:px-9 py-2.5 md:py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 text-sm md:text-base">
                    Read More...
                  </button>
                  <button onClick={scrollToSection6} className="w-full md:w-auto px-6 md:px-9 py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 text-sm md:text-base">
                    Upgrade Economy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section ref={section2Ref} className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Fixing a Broken System
            </h2>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] max-w-[52.8rem] mx-auto px-2 mb-6">
              Our Industrial Age business models break down in the digital economy
            </p>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] text-gray-600 max-w-xl mx-auto px-2 mb-6">
              They keep producing outcomes that harm the networks we all depend on
            </p>
            
            {/* Three sections in horizontal layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-2 mb-16">
              {/* Social Media */}
              <div className="flex flex-col items-center w-[90%] mx-auto">
                <div className="w-40 h-40 mb-4">
                  <Image 
                    src="/images/Social-media.png" 
                    alt="Social Media" 
                    width={200} 
                    height={200}
                    className="w-full h-full object-contain"
                    style={{ filter: 'sepia(100%) saturate(300%) hue-rotate(180deg) brightness(0.9)' }}
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 font-bold mb-2">
                    Social media
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-2">
                    The network wants relevant content for each user
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    But the model sells <strong>attention</strong> — pushing outrage and addiction
                  </p>
                </div>
              </div>
              
              {/* News Media */}
              <div className="flex flex-col items-center w-[90%] mx-auto">
                <div className="w-40 h-40 mb-4">
                  <Image 
                    src="/images/News.png" 
                    alt="News Media" 
                    width={200} 
                    height={200}
                    className="w-full h-full object-contain"
                    style={{ filter: 'sepia(100%) saturate(700%) hue-rotate(-50deg) brightness(0.92)' }}
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 font-bold mb-2">
                    News media
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-2">
                    The network wants verified, shared facts
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    But the model sells <strong>ratings</strong> — rewarding popularity, not truth
                  </p>
                </div>
              </div>
              
              {/* AI */}
              <div className="flex flex-col items-center w-[90%] mx-auto">
                <div className="w-40 h-40 mb-4">
                  <Image 
                    src="/images/ai.png" 
                    alt="Artificial Intelligence" 
                    width={200} 
                    height={200}
                    className="w-full h-full object-contain"
                    style={{ filter: 'sepia(100%) saturate(300%) hue-rotate(180deg) brightness(0.9)' }}
                  />
                </div>
                <div className="text-left w-full">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 font-bold mb-2">
                    Artificial Intelligence
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-2">
                    The network wants broad prosperity for all
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    But the model sells <strong>usage</strong> — driving joblessness, not productivity
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 max-w-xl mx-auto px-2 mb-4">
              <strong>To fix the digital economy, we have to fix the incentives shaping it</strong>
            </p>
          </div>

        </div>
      </section>

      {/* Apple-style Dark Section */}
      <section
        className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
        style={{
          backdropFilter: 'blur(5px)',
          background: 'linear-gradient(-60deg, #660000dd 0%, #660000dd 10%, #001445dd 100%)'
        }}
      >
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="mb-12 md:mb-16 lg:mb-20 animate-on-scroll">
            <p className="text-lg md:text-2xl text-gray-100 mb-3 md:mb-4 font-medium tracking-wide">
              Aligning incentives
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
              A Network-first approach
              {/* <br />
              more places. */}
            </h2>
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10">
                The digital economy runs on <strong>networks</strong> — but our business models serve <strong>consumers (B2C)</strong> and <strong>businesses (B2B)</strong> instead
              </p>
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10">
                These models often benefit some participants at the expense of the network as a whole
              </p>
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-extrabold">
                To unlock the abundance of the Digital Age, we need a model that serves the network itself — so that companies are rewarded when the entire network thrives
              </p>
             {/* <br />
             But our business models were never designed for networks. */}
          </div>

          {/* Content Grid - You can add content here */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Example content cards - customize as needed */}
          </div>
        </div>
      </section>

      {/* Feature Gallery */}
      <section
        ref={featuresRef}
        className="py-16 md:py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-12 md:mb-16 animate-on-scroll">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Image on the left */}
              <div className="flex-shrink-0 w-full md:w-1/3 lg:w-2/5">
                <Image 
                  src="/images/network-04.png"
                  alt="Network visualization"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  style={{ filter: 'sepia(100%) saturate(300%) hue-rotate(180deg) brightness(0.9)' }}
                />
              </div>
              
              {/* Text content on the right */}
              <div className="flex-1">
                <p className="text-lg md:text-2xl text-gray-600 mb-3 md:mb-4 font-semibold">Business-to-Network (B2N)</p>
                <h2 className="font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  <span className="block text-3xl md:text-4xl lg:text-5xl">A Business Model</span>
                  <span className="block text-4xl md:text-5xl lg:text-6xl">Designed for Networks</span>
                </h2>
                <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10">
                  Instead of rewarding companies for extracting value from a network, B2N rewards them for improving the network</p>
                <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10">
                  In a <strong>Business-to-Network</strong> model the greater your impact on the network, the more you earn
                </p>
                <p className="text-base md:text-xl lg:text-2xl text-gray-900 leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10">
                  Here's how the B2N model realigns incentives across the digital economy:
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative md:flex md:items-center md:gap-4">
            {/* Left Navigation Button (Desktop) */}
            <button onClick={scrollLeft} className="hidden md:flex w-12 h-12 rounded-full bg-white border border-gray-600 items-center justify-center hover:bg-gray-50 transition-colors shadow-lg flex-shrink-0">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div ref={cardsContainerRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-12 md:pb-8 scrollbar-hide snap-x snap-mandatory">
              {/* Card 1 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll">
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <Image 
                        src="/images/Social-media.png"
                        alt="Social Media"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      Social Media
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Business</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Platforms sell attention. Algorithms optimize for engagement — even when it drives outrage, addiction, and polarization</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(0deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Platforms earn by improving the quality and usefulness of content distribution. The better they serve the network's interests, the more they profit.</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <Image 
                        src="/images/News.png"
                        alt="News Media"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      News Media
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">B2B or B2C</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Media profits from clicks, ratings, and audience retention. Incentives favor sensationalism and reinforcing bias</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(180deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Media earns by providing accurate, balanced reporting that improves collective understanding. Reward is tied to network-wide informational value</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <Image 
                        src="/images/ai.png"
                        alt="Artificial Intelligence"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      Artificial Intelligence
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Consumer</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">A.I. profits from subscriptions and usage. Profit doesn’t depend on whether the technology benefits or harms society</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(60deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">A.I. is open and contributive. Developers and data providers are rewarded based on measurable positive impact. Network well-being becomes the core performance metric</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <span className="text-gray-900 text-lg">💡</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      Innovation
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Business</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Innovators profit by owning and restricting access to ideas. Value comes from monopoly pricing — only those who can pay benefit</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(90deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Innovators are rewarded based on the measured impact they create across the network. Everyone has access — maximizing adoption, benefit, and further innovation</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <Image 
                        src="/images/Social-media.png"
                        alt="Social Media"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      Science
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">None</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Fundamental research has no sustainable business model.
                        Discoveries often can’t be sold or patented, so science depends on grants, donations, and short-term funding cycles — limiting progress</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(120deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Research is rewarded based on benefit for the network — including downstream applications and derived innovations.
                        Breakthroughs that advance the network generate ongoing reward for contributors.</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="flex-shrink-0 w-64 md:w-80 snap-start animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white rounded-3xl border border-gray-900 overflow-hidden shadow-lg mb-4">
                  {/* Header with icon */}
                  <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-900">
                    <div className="hidden w-10 h-10 rounded-full border border-gray-900 overflow-hidden flex items-center justify-center bg-white">
                      <Image 
                        src="/images/Social-media.png"
                        alt="Social Media"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      Medical Research
                    </h3>
                  </div>

                  {/* Slider Content */}
                  <div className="relative h-[460px]">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top Side - Current Economy */}
                      <div className="h-1/2 bg-gray-100 border-b border-gray-900 flex flex-col items-center justify-center p-6 pt-16 pb-16">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Consumer</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Research is profitable only when it leads to a marketable product. Value is captured through patents and monopoly pricing — which increases costs and limits access.</p>
                      </div>

                      {/* Bottom Side - Abundance Economy */}
                      <div className="h-1/2 flex flex-col items-center justify-center p-6 pt-16 pb-12" style={{ background: 'linear-gradient(150deg, #ffbbbb 0%, #ffbbbb 2%, #88ccff 100%)' }}>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 text-center">Business-to-Network</h4>
                        <p className="text-sm md:text-base text-gray-900 text-center">Research is rewarded based on health impact across the network, regardless of whether it produces a consumer product. Knowledge is open for others to build on, accelerating medical progress</p>
                      </div>
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-900 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Navigation Button (Desktop) */}
            <button onClick={scrollRight} className="hidden md:flex w-12 h-12 rounded-full bg-white border border-gray-600 items-center justify-center hover:bg-gray-50 transition-colors shadow-lg flex-shrink-0">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Navigation Arrows (Mobile Only) */}
            <div className="flex md:hidden gap-2 justify-center -mt-10">
              <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white border border-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white border border-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Transformation Sliders Section */}
      <section className="py-12 md:py-24 relative overflow-hidden" style={{ backdropFilter: 'blur(2px)', background: 'linear-gradient(-90deg, #660000dd 0%, #660000dd 10%, #001445dd 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-2 md:mb-2 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 px-2">
              How B2N Works
            </h2>
            <div className="flex justify-center">
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10 text-center">
                Businesses work because they are unified economic units: they know what they value, control shared resources, and reward actions that strengthen them.
              </p>
            </div>
            <div className="flex justify-center">
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10 text-center">
                B2N applies this same structure to networks
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-3xl mx-auto px-0 md:px-6 mb-14 md:mb-11 animate-on-scroll">
            <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-2 gap-px bg-gray-700/40">
                <div className="bg-gray-900/10 backdrop-blur-sm px-3 md:px-6 py-3 md:py-4">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">Business</h3>
                </div>
                <div className="bg-gray-900/10 backdrop-blur-sm px-3 md:px-6 py-3 md:py-4">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">Network</h3>
                </div>
              </div>
              
              {/* Table Rows */}
              <div className="grid grid-cols-2 gap-px bg-gray-700/20">
                {/* Row 1 */}
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Optimizes for <strong>profit</strong></p>
                </div>
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Optimizes for <strong>shared prosperity</strong></p>
                </div>
                
                {/* Row 2 */}
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Has <strong>shared treasury</strong></p>
                </div>
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Has <strong>shared currency</strong></p>
                </div>
                
                {/* Row 3 */}
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Measures <strong>ROI</strong></p>
                </div>
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Measures <strong>network impact</strong></p>
                </div>
                
                {/* Row 4 */}
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Rewards <strong>contributors</strong></p>
                </div>
                <div className="bg-gray-900/30 backdrop-blur-sm px-3 md:px-6 py-4 md:py-6">
                  <p className="text-sm md:text-lg lg:text-xl text-white">Rewards <strong>value creators</strong></p>
                </div>
              </div>
            </div>
          </div>



          <div className="text-center mb-2 md:mb-2 animate-on-scroll">
            <div className="flex justify-center">
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-10 text-center">
                In B2N, the more you improve the network, the more you earn
              </p>
            </div>
            <div className="flex justify-center">
              <p className="text-base md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed md:!leading-[1.5] font-bold md:font-medium mb-2.5 text-center">
                This aligns incentives across the entire digital economy — instead of benefiting a few at the expense of the whole
              </p>
            </div>
          </div>




          {/* B2N Content */}
          <div className="max-w-4xl mx-auto px-4 md:px-6 mb-16 md:mb-24 animate-on-scroll">            
              {/* CTA Section */}
              <div className="mt-6 text-center">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-4">
                  For more in-depth explanation of the B2N model see
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://book.abundance.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors inline-block"
                  >
                    Abundance Economy book
                  </a>
                  <a 
                    href="https://whitepaper.abundance.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors inline-block"
                  >
                    Read Whitepaper
                  </a>
                </div>
              </div>
          </div>
        </div>
      </section>



      {/* Section 6 - Newsletter Subscription */}
      <section ref={section6Ref} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 bg-white">


      <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-8 md:mb-8 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Join the New Economic Revolution
            </h2>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] text-gray-600 max-w-[52.8rem] mx-auto px-2 mb-6">
              We're building the business model for the Digital Age
              <br />
              a model designed for networks, not just corporations
            </p>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] text-gray-600 max-w-[45rem] mx-auto px-2 mb-6">
              Help shape the future of the digital economy
            </p>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-900 leading-relaxed md:!leading-[1.5] text-gray-600 max-w-[30rem] mx-auto px-0 mb-2">
              Subscrible to the <strong><em>New Economic Revolution</em></strong> on Substack
            </p>
          </div>
        </div>

        <div className="max-w-[45rem] mx-auto px-4 md:px-6 text-center">
          <form 
            onSubmit={handleSection6Submit}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center"
          >
            <div className="flex-1 flex flex-col relative">
              <input 
                type="email" 
                name="email" 
                value={section6Email}
                onChange={(e) => {
                  setSection6Email(e.target.value)
                  if (section6EmailError) setSection6EmailError('')
                }}
                placeholder="Type your email..." 
                required
                className={`flex-1 px-4 py-3 md:px-6 md:py-5 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                  section6EmailError ? 'border-red-500' : 'border-gray-500'
                }`}
              />
              {section6EmailError && (
                <p className="text-red-500 text-sm mt-1 text-left sm:absolute sm:top-full sm:left-0 w-full">{section6EmailError}</p>
              )}
            </div>
            <button 
              type="submit"
              className="px-6 py-3 md:px-9 md:py-5 text-lg md:text-2xl bg-red-800 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-[12px]"
            >
              <SiSubstack className="w-4 h-4 md:w-6 md:h-6" />
                Join
            </button>
          </form>

          {/* Social Media Buttons */}
          <div className="mt-24 flex flex-wrap justify-center gap-4">
            <a
              href="https://x.com/Abundance_DAO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <SiX className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@AbundanceProtocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-colors"
              style={{ backgroundColor: '#FF0000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF0000'}
              aria-label="YouTube"
            >
              <SiYoutube className="w-6 h-6" />
            </a>
            <a
              href="https://threads.net/@abundance.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              aria-label="Threads"
            >
              <SiThreads className="w-6 h-6" />
            </a>
            <a
              href="https://warpcast.com/abundance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-colors"
              style={{ backgroundColor: '#6B46C1' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5B21B6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6B46C1'}
              aria-label="Farcaster"
            >
              <svg className="w-8 h-8" viewBox="0 0 1000 1000" fill="currentColor">
                <path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z" fill="currentColor"/>
                <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" fill="currentColor"/>
                <path d="M675.556 746.667C663.282 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://github.com/AbundanceProtocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              aria-label="GitHub"
            >
              <SiGithub className="w-6 h-6" />
            </a>
            <a
              href="https://abundances.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-colors"
              style={{ backgroundColor: '#FF6719' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E55A0F'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6719'}
              aria-label="Substack"
            >
              <SiSubstack className="w-6 h-6" />
            </a>
            <a
              href="mailto:michael@abundance.id"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              aria-label="Email"
            >
              <IoMail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            Excepteur sint occaecat cupidatat non proident
          </p>
        </div>
      </footer> */}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 md:p-8 relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <IoClose className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Subscribed successfully
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Share on Farcaster
              </p>
              
              <button
                onClick={() => {
                  shareCast()
                  setShowSuccessModal(false)
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <IoLinkOutline className="w-5 h-5" />
                Share on Farcaster
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}