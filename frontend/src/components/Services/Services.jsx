import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ServiceModal from './ServiceModal'
import './Services.css'

const SERVICES = [
  {
    id: 1,
    title: 'Creative Thinking',
    icon: '🧠',
    color: '#e8141e',
    emoji: '🧠',
    shortDesc: 'Ideas that transcend the ordinary',
    description: 'Ideas that transform businesses. We dive deep into your brand identity to develop unique concepts that stand out in a crowded digital landscape.',
    features: ['Brand Strategy', 'Concept development', 'Ideation Workshops', 'Market Positioning'],
  },
  {
    id: 2,
    title: 'Web Development',
    icon: '💻',
    color: '#d4d4d8',
    emoji: '💻',
    shortDesc: 'Code that performs at 60fps',
    description: 'High-performance digital experiences. We build fast, responsive, and scalable websites using modern technologies like React and Next.js, ensuring your site is ready for any traffic.',
    features: ['Full Stack Development', 'E-Commerce Solutions', 'CMS Integration', 'Performance optimisation'],
  },
  {
    id: 3,
    title: 'Visual Design',
    icon: '🎨',
    color: '#ec4899',
    emoji: '🎨',
    shortDesc: 'Pixels with purpose',
    description: 'Design with purpose. We create stunning visuals that dont just look good but drive user engagement and reinforce your brands authority.',
    features: ['UI / UX design', 'Graphic Design', 'Prototyping', 'Visual Identity'],
  },
  {
    id: 4,
    title: 'Content Creation',
    icon: '📸',
    color: '#f59e0b',
    emoji: '📸',
    shortDesc: 'Stories that convert',
    description: 'Telling your story through media. From photography to copywriting, we create high-quality assets that resonate with your target audience across all platforms.',
    features: ['Copywriting', 'Social Media Assests', 'Multimedia Production', 'Narrative Design'],
  },
  {
    id: 5,
    title: 'Strategy & Growth',
    icon: '📈',
    color: '#10b981',
    emoji: '📈',
    shortDesc: 'Data-driven growth loops',
    description: 'Scaling your brand for the future. We dont just launch projects.we provide the data-driven strategy needed to grow your user base and increase your ROI.' ,
    features: ['SEO Optimization', 'Analytics Tracking', 'Marketing Strategy', 'Conversion Rate Optimization'],
  },
  {
    id: 6,
    title: 'Collaboration',
    icon: '🤝',
    color: '#06b6d4',
    emoji: '🤝',
    shortDesc: 'Your team, extended',
    description: 'We embed with your team as true partners, not just vendors. Daily stand-ups, Figma + GitHub access, shared Slack channels — we work the way you work, moving fast without breaking things.',
    features: ['Agile project management', 'Dedicated Slack channel', 'Weekly progress calls', 'Source code handoff'],
  },
]

// Pyramid rows: 3 on top, 2 in middle, 1 at bottom
const PYRAMID = [[0, 1, 2], [3, 4], [5]]

export default function Services() {
  const sectionRef = useRef(null)
  const [activeService, setActiveService] = useState(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Set initial hidden states
    gsap.set('.section-label-srv, .section-title-srv, .services-sub', { opacity: 0, y: 40 })
    gsap.set('.svc-card', { opacity: 0, y: 60, scale: 0.85 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to('.section-label-srv, .section-title-srv, .services-sub', {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12
          })
          gsap.to('.svc-card', {
            opacity: 1, y: 0, scale: 1, duration: 0.7,
            ease: 'back.out(1.4)', stagger: 0.09, delay: 0.25
          })
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section services-section" ref={sectionRef}>
      <div className="services-bg" />

      <div className="services-inner">
        <div className="services-header">
          <p className="section-label section-label-srv">What We Do</p>
          <h2 className="section-title section-title-srv">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="services-sub">
            Six specialisms. One unified vision.
          </p>
        </div>

        <div className="pyramid-container">
          {PYRAMID.map((row, rowIdx) => (
            <div key={rowIdx} className={`pyramid-row pyramid-row--${row.length}`}>
              {row.map((svcIdx) => {
                const svc = SERVICES[svcIdx]
                return (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                    onClick={() => setActiveService(svc)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  )
}

function ServiceCard({ service, onClick }) {
  return (
    <div
      className="svc-card glass"
      onClick={onClick}
      style={{ '--card-color': service.color }}
    >
      <div className="svc-card-glow" />
      <div className="svc-icon-wrap">
        <span className="svc-icon">{service.emoji}</span>
      </div>
      <h3 className="svc-title">{service.title}</h3>
      <p className="svc-desc">{service.shortDesc}</p>
      <div className="svc-cta">
        <span>Explore</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
