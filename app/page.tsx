"use client";

import { useEffect, useRef, useState } from "react";

const programs = [
  ["01", "Keagamaan", "Maulid Nabi dan kegiatan sosial keagamaan yang memperkuat kebersamaan."],
  ["02", "Lingkungan", "Kerja bakti dan aksi nyata untuk lingkungan RT 05 yang lebih bersih."],
  ["03", "Olahraga", "Lomba futsal untuk membangun kekompakan dan sportivitas pemuda."],
  ["04", "17 Agustus", "Perlombaan warga, panggung ceria, hadiah, dan doorprize."],
];

const activities = [
  ["Maulid Nabi", "Keagamaan", "maulid"],
  ["Lomba Futsal", "Olahraga", "futsal"],
  ["Kerja Bakti", "Lingkungan", "bakti"],
  ["Lomba 17-an", "Kemerdekaan", "merdeka"],
  ["Panggung Ceria", "Kebersamaan", "panggung"],
];

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1000, 1);
        setNumber(Math.round(value * (1 - Math.pow(1 - progress, 4))));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <article className="stat"><span ref={ref}>{number}{suffix}</span><small>{label}</small></article>;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(Math.round(((now - start) / 1200) * 100), 100);
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setLoaded(true), 180);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = !loaded || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loaded, menu]);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [loaded]);

  const whatsapp = "https://wa.me/6289635705217?text=Halo%20Admin%20KARTUN05%2C%20saya%20ingin%20mendaftar%20dan%20mendapatkan%20informasi%20kegiatan%2017%20Agustus%202026.";

  return <>
    <div className={`loader ${loaded ? "done" : ""}`} aria-hidden={loaded}>
      <b>KARTUN / 05</b><span>{String(progress).padStart(3, "0")}</span><i><em style={{ width: `${progress}%` }} /></i>
    </div>

    <header className="nav">
      <a className="logo" href="#top">KARTUN<span>05</span></a>
      <div className="clock">UTC+7 · BOGOR&nbsp;&nbsp;&nbsp;{time}</div>
      <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="menu">{menu ? "TUTUP" : "MENU"}<i /></button>
    </header>

    <nav id="menu" className={`menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
      <small>NAV / 05</small>
      <div>{[["Tentang", "#tentang"], ["Program", "#program"], ["Kegiatan", "#kegiatan"], ["Agenda", "#agenda"], ["Kontak", "#kontak"]].map(([label, href], i) =>
        <a key={href} href={href} onClick={() => setMenu(false)}><span>0{i + 1}</span>{label}</a>)}</div>
      <a className="menu-ig" href="https://www.instagram.com/kartun512_/" target="_blank" rel="noreferrer">@kartun512_ <Arrow /></a>
    </nav>

    <main id="top">
      <section className="hero">
        <div className="grid-bg" />
        <div className="hero-meta"><span>KARANG TARUNA</span><span>RT 05 / RW 12</span><span>BOGOR · INDONESIA</span></div>
        <h1><span>KARTUN</span><b>0</b><span>5</span></h1>
        <div className="tile tile-a"><i /><b>GERAK</b></div>
        <div className="tile tile-b"><b>50+</b><small>PEMUDA AKTIF</small></div>
        <div className="tile tile-c"><i /><small>05 / 12</small></div>
        <div className="hero-signal" aria-hidden="true"><span>AKSI</span><b>2026</b></div>
        <div className="tile tile-d"><small>AGENDA UTAMA</small><b>17</b><span>AGT / 2026</span></div>
        <div className="hero-stream" aria-label="Kegiatan KARTUN05">
          <span><i>01</i> MAULID</span><span><i>02</i> FUTSAL</span><span><i>03</i> KERJA BAKTI</span><span><i>04</i> 17 AGUSTUS</span>
        </div>
        <div className="hero-foot"><p>Visi Misi tanpa Aksi hanyalah Halusinasi.</p><a href={whatsapp} target="_blank" rel="noreferrer">DAFTAR <Arrow /></a></div>
      </section>

      <section className="about pad" id="tentang">
        <div className="section-head" data-reveal><span>[01]</span><span>TENTANG KAMI</span><span>RT 05 · RW 12</span></div>
        <div className="about-body">
          <p data-reveal>Wadah pemuda untuk bertumbuh, bekerja sama, dan menghadirkan manfaat nyata.</p>
          <h2 data-reveal>50+ PEMUDA.<br />SATU LINGKUNGAN.<br /><em>BANYAK AKSI.</em></h2>
          <div className="about-copy" data-reveal><p>KARTUN05 adalah Karang Taruna RT 05 RW 12. Kami bergerak lewat kegiatan keagamaan, lingkungan, olahraga, dan perayaan kemerdekaan.</p><p>Dari Maulid Nabi sampai panggung ceria, setiap kegiatan menjadi ruang untuk saling mengenal, berkontribusi, dan menjaga kekompakan warga.</p></div>
        </div>
      </section>

      <section className="stats pad" aria-label="Statistik KARTUN05">
        <Counter value={50} suffix="+" label="Anggota aktif" /><Counter value={5} suffix="+" label="Kegiatan terlaksana" /><Counter value={4} label="Bidang program" /><Counter value={1} label="Agenda 2026" />
      </section>

      <section className="programs pad" id="program">
        <div className="section-head light" data-reveal><span>[02]</span><span>PROGRAM UTAMA</span><span>EMPAT GERAKAN</span></div>
        <div className="intro"><h2 data-reveal>VISI YANG<br />DIKERJAKAN.</h2><p data-reveal>Program yang dekat dengan kebutuhan pemuda dan warga, dijalankan lewat kolaborasi sederhana yang konsisten.</p></div>
        <div className="program-list">{programs.map(([no, title, text], i) => <article key={title} data-reveal><small>{no}</small><h3>{title}</h3><p>{text}</p><div className={`program-art art-${i}`}><i /><b>{no}</b></div><Arrow /></article>)}</div>
      </section>

      <section className="activities pad" id="kegiatan">
        <div className="section-head" data-reveal><span>[03]</span><span>JEJAK KEGIATAN</span><span>[05] TERLAKSANA</span></div>
        <div className="intro"><h2 data-reveal>BUKAN CUMA<br />RENCANA.</h2><p data-reveal>Lima jejak awal dari kegiatan yang sudah mempertemukan pemuda dan warga RT 05.</p></div>
        <div className="activity-grid">{activities.map(([title, category, art], i) => <article key={title} className={`activity card-${i + 1}`} data-reveal>
          <div className={`visual ${art}`} role="img" aria-label={`Visual ${title}`}><span>0{i + 1}</span><i /><b>K05</b></div>
          <small><span>{category}</span><span>TERLAKSANA</span></small><h3>{title}</h3>
        </article>)}</div>
      </section>

      <section className="agenda pad" id="agenda">
        <div className="section-head light" data-reveal><span>[04]</span><span>AGENDA 2026</span><span>TERBUKA UNTUK WARGA</span></div>
        <div className="agenda-body"><div className="date" data-reveal><b>17</b><span>AGUSTUS</span></div><div className="agenda-copy" data-reveal><small>SEMARAK KEMERDEKAAN 2026</small><h2>LOMBA.<br />PANGGUNG.<br /><em>DOORPRIZE.</em></h2><p>Rayakan kemerdekaan bersama KARTUN05. Informasi perlombaan, waktu, dan lokasi dapat ditanyakan langsung kepada admin.</p><a href={whatsapp} target="_blank" rel="noreferrer">CHAT ADMIN UNTUK DAFTAR <Arrow /></a></div></div>
      </section>

      <section className="social pad">
        <div className="section-head" data-reveal><span>[05]</span><span>DOKUMENTASI</span><span>INSTAGRAM</span></div>
        <div><p data-reveal>Ikuti kegiatan, proses, dan cerita terbaru kami.</p><a href="https://www.instagram.com/kartun512_/" target="_blank" rel="noreferrer" data-reveal>@KARTUN512_ <Arrow /></a></div>
        <aside>GERAK BERSAMA · TUMBUH BERSAMA · KARTUN05 · GERAK BERSAMA · TUMBUH BERSAMA · KARTUN05 ·</aside>
      </section>
    </main>

    <footer id="kontak">
      <div><p>SIAP IKUT<br />BERGERAK?</p><a href="https://wa.me/6289635705217" target="_blank" rel="noreferrer">+62 896-3570-5217 <Arrow /></a></div>
      <h2>KARTUN05</h2>
      <small><span>Karang Taruna RT 05 RW 12</span><span>Bogor · Indonesia</span><a href="https://www.instagram.com/kartun512_/" target="_blank" rel="noreferrer">Instagram</a><span>© 2026</span></small>
    </footer>
  </>;
}
