import { useEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import StaggeredMenu from './components/StaggeredMenu.jsx'
import gulmerImg from './assets/images/gulmer.jpeg'
import jerukImg from './assets/images/jeruk.jpeg'
import airImg from './assets/images/air.jpg'
import oneImg from './assets/images/cacah.jpeg'
import twoImg from './assets/images/larut.jpeg'
import threeImg from './assets/images/tiga.jpeg'
import fourImg from './assets/images/tuang.jpeg'
import fiveImg from './assets/images/kocok.jpeg'
import sixImg from './assets/images/pantau.jpeg'
import heroImg from './assets/images/hero.jpeg'
import pshtImg from './assets/images/psht.jpeg'
import galonImg from './assets/images/galon.jpeg'
import emberImg from './assets/images/ember.jpeg'
import timbanganImg from './assets/images/timbangan.jpeg'
import pembuatanImg from './assets/dump/WhatsApp Image 2026-11-04 at 9.54.08 AM.jpeg'
import logoImg from './assets/images/logo.svg'
import DomeGallery from './components/DomeGallery.jsx'
import './App.css'

const dumpModules = import.meta.glob('./assets/dump/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG}', {
  eager: true,
  import: 'default',
})

const dumpImages = Object.values(dumpModules).map((src, index) => ({
  src,
  alt: `Dokumentasi Praktikum Eco-enzyme ${index + 1}`,
}))

const menuItems = [
  { label: 'Beranda.', ariaLabel: 'Ke beranda', to: '/' },
  { label: 'Perlengkapan.', ariaLabel: 'Lihat perlengkapan', to: '/perlengkapan' },
  { label: 'Pembuatan.', ariaLabel: 'Lihat cara membuat', to: '/pembuatan' },
  { label: 'Dokumentasi.', ariaLabel: 'Lihat dokumentasi', to: '/dokumentasi' },
]

const ingredients = [
  {
    name: 'Gula merah.',
    detail: 'Gula merah, molase, atau gula aren menjadi sumber nutrisi & energi mikroba selama proses fermentasi.',
    image: gulmerImg,
    alt: 'Gula merah untuk eco-enzyme',
  },
  {
    name: 'Buah jeruk.',
    detail: 'Gunakan potongan buah atau kulit jeruk segar. Menghasilkan aroma eco-enzyme yang harum dan segar alami.',
    image: jerukImg,
    alt: 'Buah jeruk segar untuk eco-enzyme',
  },
  {
    name: 'Air bersih.',
    detail: 'Gunakan air sumur, air mineral, atau air tanpa kaporit. Sisakan ruang di wadah untuk gas fermentasi.',
    image: airImg,
    alt: 'Air bersih untuk fermentasi eco-enzyme',
  },
]

const tools = [
  {
    name: 'Pisau.',
    detail: 'Digunakan untuk mencacah gula merah dan memotong buah jeruk menjadi bagian kecil agar cepat larut dan mudah terurai.',
    image: pshtImg,
    alt: 'Pisau dapur untuk memotong bahan praktikum',
  },
  {
    name: 'Talenan.',
    detail: 'Alas pemotong bahan agar proses pencacahan gula merah dan buah jeruk lebih aman, stabil, dan bersih.',
    image: pshtImg,
    alt: 'Talenan alas memotong bahan',
  },
  {
    name: 'Saringan.',
    detail: 'Menyaring larutan gula dari ampas kotoran kasar serta memisahkan cairan murni eco-enzyme dari ampas saat panen.',
    image: pshtImg,
    alt: 'Saringan halus larutan eco-enzyme',
  },
  {
    name: 'Galon.',
    detail: 'Wadah plastik bening bertutup rapat untuk proses fermentasi anaerob. Berikan ruang kosong 20% untuk ruang gas.',
    image: galonImg,
    alt: 'Galon plastik wadah fermentasi',
  },
  {
    name: 'Ember.',
    detail: 'Wadah perantara untuk mencampurkan cacahan gula merah dengan air bersih dan mengaduknya hingga benar-benar larut.',
    image: emberImg,
    alt: 'Ember wadah pelarutan gula dan air',
  },
  {
    name: 'Timbangan.',
    detail: 'Menakar berat bahan secara presisi agar memenuhi perbandingan rasio baku eco-enzyme 1 bagian gula : 3 buah : 10 air.',
    image: timbanganImg,
    alt: 'Timbangan untuk menakar bahan',
  },
]

const steps = [
  {
    title: 'Cacah gula merah.',
    description: 'Gula merah dipotong kecil-kecil di atas talenan supaya cepat larut di air. Pakai pisau yang besar dan hati-hati, pegang gula dengan tangan yang jauh dari mata pisau.',
    image: oneImg,
    alt: 'Gula merah dipotong kecil-kecil di atas talenan',
  },
  {
    title: 'Larutkan gula dengan air.',
    description: 'Gula merah yang sudah dicacah dimasukkan ke ember, lalu air bersih dituang sambil diaduk dengan centong sampai gulanya larut dan air berwarna cokelat. Kalau ada ampas, larutan bisa disaring.',
    image: twoImg,
    alt: 'Air dituang ke ember berisi gula merah sambil diaduk dengan centong hijau',
  },
  {
    title: 'Masukkan buah jeruk ke galon.',
    description: 'Potongan buah jeruk dimasukkan satu per satu ke galon bening lewat mulut botol. Potongan yang kecil lebih mudah masuk dan lebih cepat terurai.',
    image: threeImg,
    alt: 'Potongan buah jeruk dimasukkan ke dalam galon bening lewat mulut botol',
  },
  {
    title: 'Tuang larutan ke galon.',
    description: 'Tuang larutan gula merah pelan-pelan ke dalam galon, Sisakan sekitar seperempat galon kosong untuk ruang gas hasil fermentasi.',
    image: fourImg,
    alt: 'Larutan gula merah dituang ke dalam galon berisi buah jeruk',
  },
  {
    title: 'Tutup, kocok, dan simpan.',
    description: 'Galon ditutup rapat lalu digoyang pelan agar buah dan larutan tercampur. Beri label tanggal mulai, kemudian simpan di tempat teduh yang tidak kena sinar matahari langsung.',
    image: fiveImg,
    alt: 'Galon berisi potongan buah jeruk dan larutan gula ditutup rapat dan disimpan',
  },
  {
    title: 'Pantau dan buang gas berkala.',
    description: 'Beri label tanggal pembuatan pada galon. Pada bulan pertama, buka tutup sedikit setiap 1–2 hari untuk membuang gas fermentasi, lalu rapatkan kembali agar proses anaerob tetap optimal.',
    image: sixImg,
    alt: 'Pemeriksaan galon fermentasi dan pembuangan gas secara berkala',
  },
]

const teamMembers = [
  'Evan Arganta',
  'Alief Rizky Ramadhan Atmadja',
  'Ahmad Haikal Ramadhan',
  'Ignatius Nino Jumantoro',
  'M Vallerian Aprilio Gunawan',
  'Nicolas Peb Zolo',
]

function useParallax(speed = 0.3) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let rafId = null

    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY <= container.offsetHeight + 60) {
        image.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`
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
  }, [speed])

  return [containerRef, imageRef]
}

function LazyImage({ src, alt }) {
  return (
    <img
      alt={alt}
      loading="lazy"
      onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
      ref={(el) => {
        if (el?.complete) el.classList.add('is-loaded')
      }}
      src={src}
    />
  )
}

function PageHero({ title, image }) {
  const [heroRef, heroImageRef] = useParallax(0.28)

  return (
    <section className="page-hero" ref={heroRef}>
      <div
        aria-hidden="true"
        className="page-hero-image"
        ref={heroImageRef}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(14, 22, 17, 0.40) 0%, rgba(14, 22, 17, 0.65) 50%, rgba(17, 26, 20, 0.96) 100%), url('${image}')`,
        }}
      />
      <div className="page-hero-content page-width">
        <h1>{title}</h1>
      </div>
    </section>
  )
}

function HomePage() {
  const [heroRef, heroImageRef] = useParallax(0.30)

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div
          className="hero-image"
          ref={heroImageRef}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(14, 22, 17, 0.45) 0%, rgba(18, 28, 22, 0.80) 55%, rgba(14, 22, 17, 0.96) 100%), linear-gradient(100deg, rgba(14, 22, 17, 0.85) 0%, rgba(14, 22, 17, 0.35) 100%), url('${heroImg}')`,
          }}
        />
        <div className="hero-content page-width">
          <h1>Pembuatan<br /><em>Eco-enzyme</em>.</h1>
          <p className="hero-description">Oleh Kelompok 3 dari XI RPL 1.</p>
        </div>
      </section>

      <section className="home-info">
        <div className="page-width">
          <div className="home-info-heading">
            <h2>Manfaat nyata cairan hasil fermentasi.</h2>
          </div>
          <p className="home-info-copy">
            Fermentasi gula merah dan buah jeruk menghasilkan cairan organik serbaguna yang kaya enzim aktif.
            Digunakan untuk kebersihan rumah tangga, perawatan tanaman, hingga sanitasi lingkungan tanpa bahan kimia sintetis.
          </p>
          <div className="home-benefits-grid">
            <article className="benefit-card">
              <h3>Pembersih alami serbaguna.</h3>
              <p>Pengganti sabun kimia untuk mengepel lantai, mencuci piring, membersihkan kaca jendela, dan melarutkan kerak lemak dapur.</p>
            </article>
            <article className="benefit-card">
              <h3>Pupuk organik cair.</h3>
              <p>Menyuburkan mikroba tanah, mempercepat penyerapan nutrisi akar, serta merangsang pertumbuhan tunas dan bunga tanaman.</p>
            </article>
            <article className="benefit-card">
              <h3>Pengusir hama dan netralisir bau.</h3>
              <p>Aroma asam-segar citrus efektif mengusir serangga, serta melancarkan dan menghilangkan bau selokan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-team page-width">
        <div className="home-team-header">
          <h2>Anggota Kelompok 3 dari XI RPL 1.</h2>
        </div>
        <div className="home-team-grid">
          {teamMembers.map((name, index) => (
            <article className="team-card" key={name || index}>
              <span className="team-card-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="team-card-name">{name}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function EquipmentPage() {
  return (
    <main className="inner-page">
      <PageHero image={pshtImg} title="Perlengkapan." />
      <section className="content-section page-width">
        <div className="equipment-section-head">
          <h2>Bahan.</h2>
          <p>Tiga komponen baku dalam fermentasi dengan perbandingan standar 1 : 3 : 10.</p>
        </div>

        <div className="ingredient-grid">
          {ingredients.map((item, index) => (
            <article className="ingredient-card" key={item.name}>
              <div className="ingredient-photo">
                <LazyImage alt={item.alt} src={item.image} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="ingredient-body">
                <div className="ingredient-title-row">
                  <h2>{item.name}</h2>
                </div>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="ratio-example">
          <span className="section-number">CONTOH TAKARAN:</span>
          <div className="ratio-cards">
            <span className="ratio-badge"><strong>100 g</strong> gula merah</span>
            <span className="ratio-plus">+</span>
            <span className="ratio-badge"><strong>300 g</strong> buah jeruk</span>
            <span className="ratio-plus">+</span>
            <span className="ratio-badge"><strong>1 liter</strong> air bersih</span>
          </div>
        </div>

        <div className="equipment-section-head" style={{ marginTop: '56px' }}>
          <h2>Alat.</h2>
          <p>Alat yang digunakan selama proses persiapan, pencacahan, penakaran, hingga fermentasi di galon.</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <article className="tool-card" key={tool.name}>
              <div className="tool-photo">
                <LazyImage alt={tool.alt} src={tool.image} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="tool-body">
                <h2>{tool.name}</h2>
                <p>{tool.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function StepsPage() {
  return (
    <main className="inner-page steps-page">
      <PageHero image={pembuatanImg} title="Pembuatan." />
      <section className="content-section page-width">
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <div className="step-photo">
                <LazyImage alt={step.alt} src={step.image} />
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
            <article><span>Bulan 1.</span><p>Buka tutup secara berkala dengan hati-hati untuk mengeluarkan gas.</p></article>
            <article><span>Bulan 2.</span><p>Simpan di tempat teduh. Catat perubahan warna, aroma, dan kondisi wadah.</p></article>
            <article><span>Bulan 3.</span><p>Periksa hasil fermentasi sebelum disaring dan simpan catatan akhir kelompok.</p></article>
          </div>
        </div>
      </section>
    </main>
  )
}

function DocumentationPage() {
  return (
    <main className="inner-page documentation-page">
      <section className="documentation-fullscreen-hero">
        <div className="dome-gallery-fullscreen">
          <DomeGallery
            dragDampening={0.8}
            dragSensitivity={16}
            fit={0.8}
            grayscale={false}
            imageBorderRadius="16px"
            images={dumpImages}
            minRadius={680}
            openedImageBorderRadius="24px"
            openedImageHeight="min(88vw, 540px)"
            openedImageWidth="min(88vw, 540px)"
            overlayBlurColor="#121814"
            padFactor={0.12}
            segments={22}
          />
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="inner-page">
      <PageHero image={heroImg} title="Halaman tidak ditemukan." />
      <div className="page-width content-section">
        <Link className="hero-link" to="/">Kembali ke beranda <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  )
}

function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])

  return null
}

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    [heroImg, pshtImg, pembuatanImg].forEach((src) => {
      new Image().src = src
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
        logoUrl={logoImg}
        position="right"
      />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<EquipmentPage />} path="/perlengkapan" />
        <Route element={<EquipmentPage />} path="/bahan" />
        <Route element={<StepsPage />} path="/pembuatan" />
        <Route element={<DocumentationPage />} path="/dokumentasi" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  )
}

export default App
