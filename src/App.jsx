import { useEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import StaggeredMenu from './components/StaggeredMenu.jsx'
import './App.css'

const menuItems = [
  { label: 'Beranda.', ariaLabel: 'Ke beranda', to: '/' },
  { label: 'Bahan.', ariaLabel: 'Lihat bahan', to: '/bahan' },
  { label: 'Pembuatan.', ariaLabel: 'Lihat cara membuat', to: '/pembuatan' },
  { label: 'Dokumentasi.', ariaLabel: 'Lihat dokumentasi', to: '/dokumentasi' },
]

const ingredients = [
  {
    amount: '1 bagian',
    name: 'Gula merah',
    detail: 'Gula merah, molase, atau gula aren menjadi sumber makanan selama fermentasi.',
  },
  {
    amount: '3 bagian',
    name: 'Kulit buah & sayur',
    detail: 'Pilih sisa buah dan sayur segar. Potong kecil agar mudah tercampur.',
  },
  {
    amount: '10 bagian',
    name: 'Air bersih',
    detail: 'Gunakan air bersih. Sisakan ruang di wadah untuk gas fermentasi.',
  },
]

const steps = [
  {
    title: 'Siapkan bahan',
    description: 'Potong kecil sisa buah dan sayur. Hindari bahan berminyak, daging, dan makanan matang.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85',
    alt: 'Buah untuk bahan eco enzim',
  },
  {
    title: 'Campur gula dan air',
    description: 'Larutkan gula merah di dalam air, lalu tuang ke wadah plastik bertutup.',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=85',
    alt: 'Bahan alami untuk campuran eco enzim',
  },
  {
    title: 'Masukkan sisa organik',
    description: 'Tambahkan potongan kulit buah. Sisakan ruang kosong di bagian atas wadah.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
    alt: 'Sayur dan kulit buah',
  },
  {
    title: 'Fermentasikan',
    description: 'Tutup dan simpan di tempat teduh selama 3 bulan. Buka tutup sebentar secara berkala pada bulan pertama.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    alt: 'Bahan organik yang sudah disiapkan',
  },
]

const gallery = [
  {
    title: 'Bahan',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85',
    alt: 'Bahan buah untuk praktikum',
  },
  {
    title: 'Pencampuran',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
    alt: 'Bahan organik untuk dicampur',
  },
  {
    title: 'Fermentasi',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    alt: 'Dokumentasi bahan fermentasi',
  },
  {
    title: 'Pengamatan',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=85',
    alt: 'Dokumentasi pengamatan bahan',
  },
  {
    title: 'Hasil penyaringan',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85',
    alt: 'Dokumentasi bahan hasil praktikum',
  },
  {
    title: 'Eco enzim siap disimpan',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
    alt: 'Dokumentasi hasil praktikum',
  },
]

function PageHero({ title, image }) {
  const heroRef = useRef(null)
  const heroImageRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const heroImage = heroImageRef.current
    if (!hero || !heroImage) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let rafId = null

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = hero.offsetHeight

      if (scrollY <= heroHeight + 60) {
        // Parallax translation for the background image
        const imageTranslate = scrollY * 0.28
        heroImage.style.transform = `translate3d(0, ${imageTranslate}px, 0)`
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="page-hero" ref={heroRef}>
      <div
        className="page-hero-image"
        ref={heroImageRef}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(14, 22, 17, 0.40) 0%, rgba(14, 22, 17, 0.65) 50%, rgba(17, 26, 20, 0.96) 100%), url('${image}')`,
        }}
        aria-hidden="true"
      />
      <div className="page-hero-content page-width">
        <h1>{title}</h1>
      </div>
    </section>
  )
}

const PageHeading = PageHero

function HomePage() {
  const heroRef = useRef(null)
  const heroImageRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const heroImage = heroImageRef.current
    if (!hero || !heroImage) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let rafId = null

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = hero.offsetHeight

      if (scrollY <= heroHeight + 60) {
        // Parallax translation for the background image
        const imageTranslate = scrollY * 0.30
        heroImage.style.transform = `translate3d(0, ${imageTranslate}px, 0)`
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div className="hero-image" ref={heroImageRef} />
        <div className="hero-content page-width">
          <h1>Pembuatan<br /><em>Eco Enzim</em>.</h1>
          <p className="hero-description">
            Disiapkan oleh Kelompok berapa lah itu pokonya, XI RPL 1
          </p>
        </div>
      </section>
      <section className="home-info">
        <div className="page-width">
          <div className="home-info-heading">
            <h2>Mengolah sisa organik melalui fermentasi.</h2>
          </div>
          <p className="home-info-copy">
            Eco enzim dibuat dengan memfermentasikan gula, sisa buah dan sayur,
            serta air. Proyek ini mendokumentasikan persiapan bahan, proses
            fermentasi, dan pengamatan yang dilakukan kelompok.
          </p>
          <div className="home-facts">
            <article><strong>1 : 3 : 10</strong><span>Rasio bahan</span></article>
            <article><strong>3 bulan</strong><span>Waktu fermentasi</span></article>
            <article><strong>Wadah tertutup</strong><span>Simpan di tempat teduh</span></article>
          </div>
        </div>
      </section>
      <section className="home-guide page-width">
        <span className="section-number">ALUR PRAKTIKUM</span>
        <div className="home-guide-grid">
          <article><span>01</span><h3>Siapkan</h3><p>Ukur bahan dan siapkan wadah bersih.</p></article>
          <article><span>02</span><h3>Fermentasikan</h3><p>Campur bahan, tutup, lalu amati berkala.</p></article>
          <article><span>03</span><h3>Dokumentasikan</h3><p>Catat tanggal, perubahan, dan hasil akhir.</p></article>
        </div>
      </section>
    </main>
  )
}

function IngredientsPage() {
  return (
    <main className="inner-page">
      <PageHero
        image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=2000&q=85"
        title="Bahan."
      />
      <section className="content-section page-width">
        <div className="ingredient-grid">
          {ingredients.map((item) => (
            <article className="ingredient-card" key={item.name}>
              <span>{item.amount}</span>
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="ratio-example">
          <span className="section-number">CONTOH TAKARAN</span>
          <p><strong>100 g gula</strong><span>+</span><strong>300 g sisa organik</strong><span>+</span><strong>1 liter air</strong></p>
        </div>
        <div className="material-guidance">
          <article>
            <h2>Bahan yang bisa dipakai</h2>
            <p>Kulit jeruk, nanas, apel, pepaya, serta sisa sayur yang masih segar.</p>
          </article>
          <article>
            <h2>Hindari</h2>
            <p>Sisa daging, produk susu, minyak, makanan matang, dan bahan yang sudah berjamur.</p>
          </article>
          <article>
            <h2>Wadah</h2>
            <p>Gunakan wadah plastik bersih dan bertutup. Jangan isi penuh agar tersedia ruang untuk gas.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

function StepsPage() {
  return (
    <main className="inner-page steps-page">
      <PageHero
        image="https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=2000&q=85"
        title="Pembuatan."
      />
      <section className="content-section page-width">
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <div className="step-photo">
                <img alt={step.alt} loading="lazy" src={step.image} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="fermentation-guide">
          <span className="section-number">PENGAMATAN FERMENTASI</span>
          <div className="fermentation-guide-grid">
            <article><span>Bulan 1</span><p>Buka tutup secara berkala dengan hati-hati untuk mengeluarkan gas.</p></article>
            <article><span>Bulan 2</span><p>Simpan di tempat teduh. Catat perubahan warna, aroma, dan kondisi wadah.</p></article>
            <article><span>Bulan 3</span><p>Periksa hasil fermentasi sebelum disaring dan simpan catatan akhir kelompok.</p></article>
          </div>
        </div>
        <aside className="safety-note">
          <strong>Perhatian</strong>
          <p>Jangan mengisi wadah sampai penuh. Jika tercium bau busuk menyengat atau terlihat kontaminasi, jangan gunakan hasilnya.</p>
        </aside>
      </section>
    </main>
  )
}

function DocumentationPage() {
  return (
    <main className="inner-page">
      <PageHero
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=85"
        title="Dokumentasi."
      />
      <section className="content-section page-width">
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure className="gallery-item" key={item.title}>
              <img alt={item.alt} loading="lazy" src={item.image} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="documentation-log">
          <div>
            <span className="section-number">CATATAN KELOMPOK</span>
            <h2>Rekam prosesnya.</h2>
            <p>Tambahkan tanggal dan hasil pengamatan saat foto praktikum diganti.</p>
          </div>
          <div className="log-rows">
            <article><span>Persiapan</span><strong>Tanggal pembuatan · komposisi bahan</strong></article>
            <article><span>Pengamatan</span><strong>Perubahan aroma, warna, dan kondisi wadah</strong></article>
            <article><span>Hasil akhir</span><strong>Tanggal panen · kondisi eco enzim</strong></article>
          </div>
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="inner-page">
      <PageHero
        image="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85"
        title="Halaman tidak ditemukan."
      />
      <div className="page-width content-section">
        <Link className="hero-link" to="/">Kembali ke beranda <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  )
}

function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])

  return null
}

const PRELOAD_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85',
]

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    PRELOAD_HERO_IMAGES.forEach((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <ScrollToTop lenisRef={lenisRef} />
      <StaggeredMenu
        accentColor="#a9bd83"
        colors={['#26392d', '#344a38', '#526344']}
        displayItemNumbering
        items={menuItems}
        logoUrl="https://upload.wikimedia.org/wikipedia/commons/2/27/Plants-and-animals_-_DarkZaitzev_-_white_-_game-icons.svg"
        position="right"
      />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<IngredientsPage />} path="/bahan" />
        <Route element={<StepsPage />} path="/pembuatan" />
        <Route element={<DocumentationPage />} path="/dokumentasi" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
      <footer className="site-footer">
        <div className="page-width">
          <span>Eco Enzyme.</span>
          <span>XI RPL 1</span>
        </div>
      </footer>
    </>
  )
}

export default App
