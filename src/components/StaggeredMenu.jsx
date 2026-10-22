import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import './StaggeredMenu.css'

function StaggeredMenu({
  accentColor = '#a9bd83',
  closeOnClickAway = true,
  colors = ['#26392d', '#344a38'],
  displayItemNumbering = true,
  items = [],
  logoUrl,
  onMenuClose,
  onMenuOpen,
  position = 'right',
}) {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const wrapperRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const iconRef = useRef(null)
  const timelineRef = useRef(null)
  const layersRef = useRef([])
  const location = useLocation()

  useLayoutEffect(() => {
    const panel = panelRef.current
    const wrapper = wrapperRef.current
    if (!panel || !wrapper) return undefined

    const icon = iconRef.current
    const layers = Array.from(wrapper.querySelectorAll('.sm-prelayer'))
    layersRef.current = layers
    const offscreen = position === 'left' ? -100 : 100
    gsap.set([panel, ...layers], { xPercent: offscreen })
    gsap.set(icon, { rotate: 0 })

    return () => {
      timelineRef.current?.kill()
      gsap.killTweensOf([panel, ...layers, icon])
    }
  }, [position])

  const closeMenu = useCallback(() => {
    if (!openRef.current) return
    openRef.current = false
    setOpen(false)
    onMenuClose?.()
    timelineRef.current?.kill()

    const offscreen = position === 'left' ? -100 : 100
    const targets = [...layersRef.current, panelRef.current].filter(Boolean)
    const timeline = gsap.timeline({
      onComplete: () => {
        const labels = panelRef.current?.querySelectorAll('.sm-panel-itemLabel')
        if (labels?.length) gsap.set(labels, { clearProps: 'transform' })
      },
    })
    timeline.to(targets, { xPercent: offscreen, duration: 0.35, ease: 'power3.in' })
    timeline.to(iconRef.current, { rotate: 0, duration: 0.3, ease: 'power2.out' }, 0)
    timelineRef.current = timeline
  }, [onMenuClose, position])

  const toggleMenu = useCallback(() => {
    if (openRef.current) {
      closeMenu()
      return
    }

    openRef.current = true
    setOpen(true)
    onMenuOpen?.()
    timelineRef.current?.kill()

    const labels = panelRef.current?.querySelectorAll('.sm-panel-itemLabel')
    if (labels?.length) gsap.set(labels, { yPercent: 140, rotate: 8 })
    const timeline = gsap.timeline()
    timeline.to(layersRef.current, {
      xPercent: 0,
      duration: 0.55,
      ease: 'power4.out',
      stagger: 0.07,
    })
    timeline.to(panelRef.current, { xPercent: 0, duration: 0.6, ease: 'power4.out' }, '-=0.38')
    if (labels?.length) {
      timeline.to(labels, {
        yPercent: 0,
        rotate: 0,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.08,
      }, '-=0.3')
    }
    timeline.fromTo(iconRef.current, { rotate: 0 }, { rotate: 225, duration: 0.5, ease: 'power3.out' }, 0)
    timelineRef.current = timeline
  }, [closeMenu, onMenuOpen])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    const handlePointerDown = (event) => {
      if (
        closeOnClickAway
        && panelRef.current
        && !panelRef.current.contains(event.target)
        && !buttonRef.current?.contains(event.target)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [closeMenu, closeOnClickAway, open])

  const accentStyle = { '--sm-accent': accentColor }
  const menuStyle = { '--sm-menu-width': 'min(430px, 88vw)' }

  return (
    <div
      className="staggered-menu-wrapper"
      data-open={open || undefined}
      data-position={position}
      ref={wrapperRef}
      style={accentStyle}
    >
      <div aria-hidden="true" className="sm-prelayers">
        {colors.slice(0, 3).map((color, index) => (
          <div className="sm-prelayer" key={`${color}-${index}`} style={{ backgroundColor: color }} />
        ))}
      </div>
      <header className="staggered-menu-header">
        <Link aria-label="Eco Enzyme, ke beranda" className="sm-logo" onClick={closeMenu} to="/">
          <img alt="" className="sm-logo-img" draggable="false" src={logoUrl} />
        </Link>
        <button
          aria-controls="staggered-menu-panel"
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          className="sm-toggle"
          onClick={toggleMenu}
          ref={buttonRef}
          type="button"
        >
          <span>{open ? 'Tutup' : 'Menu'}</span>
          <span aria-hidden="true" className="sm-icon" ref={iconRef}>
            <span />
            <span />
          </span>
        </button>
      </header>
      <aside
        aria-hidden={!open}
        className="staggered-menu-panel"
        id="staggered-menu-panel"
        inert={!open}
        ref={panelRef}
        style={menuStyle}
      >
        <nav aria-label="Navigasi utama" className="sm-panel-inner">
          <ul className="sm-panel-list">
            {items.map((item, index) => {
              const isActive = location.pathname === item.to
              return (
                <li key={item.to || index}>
                  <Link
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.ariaLabel}
                    className={`sm-panel-item ${isActive ? 'is-active' : ''}`}
                    data-active={isActive ? 'true' : undefined}
                    onClick={closeMenu}
                    to={item.to}
                  >
                    {displayItemNumbering && (
                      <span aria-hidden="true" className="sm-panel-item-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default StaggeredMenu
