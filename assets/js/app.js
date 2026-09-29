/* RUANGAJAR — logika aplikasi (tanpa pustaka luar). */
(function () {
  'use strict';

  const RA = window.RA;
  const q = RA.q;
  const st = () => RA.store.state;
  const save = () => RA.store.save();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = p => p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const DAY = 864e5;

  /* ---------- Ikon (garis sederhana) ---------- */
  const P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h4.5v-5h4v5h4.5V10"/>',
    book: '<path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z"/><path d="M12 6.5V19"/>',
    clip: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="M9 11h6M9 15h4"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15"/>',
    chart: '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c1.8.8 3 2.6 3 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c0-4 3.4-7 7.5-7s7.5 3 7.5 7"/>',
    school: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5"/>',
    building: '<path d="M4 20.5V9l8-5 8 5v11.5"/><path d="M2.5 20.5h19M9.5 20.5v-5h5v5M8 11h.01M12 11h.01M16 11h.01"/>',
    out: '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.4"/><path d="M12 16.8v.2"/>',
    down: '<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 19.5h15"/>',
    up: '<path d="M12 16V5M7 9.5l5-5 5 5"/><path d="M4.5 19.5h15"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="M5 12.5 10 17 19 7"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    file: '<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4"/>',
    wifi: '<path d="M3 3l18 18"/><path d="M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 4-2.3M19 12.5a10 10 0 0 0-3.2-2M2 8.5a15 15 0 0 1 4.5-2.7M22 8.5A15 15 0 0 0 11 4.5"/><path d="M12 20h.01"/>',
    cycle: '<path d="M20 11a8 8 0 0 0-14.3-4.3L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 14.3 4.3L20 15.5"/><path d="M20 20v-4.5h-4.5"/>',
    bellring: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/><path d="M3 7.5a9 9 0 0 1 2.5-3.5M21 7.5A9 9 0 0 0 18.5 4"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l2 2"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    in: '<path d="M10 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H10"/><path d="M14 8l4 4-4 4M18 12H8"/>'
  };
  const ic = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;

  /* ---------- Bantuan tampilan ---------- */
  const AV = ['#3d5a80', '#8a5a44', '#4c7a5f', '#7a4f7f', '#9a6b1f', '#2f6f7a', '#a04a3a', '#566078'];
  function avatar(u, size = '') {
    if (!u) return '';
    let h = 0; for (const ch of u.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const parts = u.name.replace(/^(Bu|Pak|Ibu|Bapak)\s+/i, '').split(/\s+/).filter(Boolean);
    const ini = ((parts[0] || '?')[0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    return `<span class="avatar ${size}" style="--av:${AV[h % AV.length]}" aria-hidden="true">${esc(ini)}</span>`;
  }
  const firstName = u => u.name.replace(/^(Bu|Pak|Ibu|Bapak)\s+/i, '').split(' ')[0];
  const shortName = u => { const m = u.name.match(/^(Bu|Pak|Ibu|Bapak)\s+(\S+)/i); return m ? `${m[1]} ${m[2]}` : u.name.split(' ')[0]; };

  const fmtDate = iso => new Date(iso).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtShort = iso => new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  const fmtTime = iso => new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const fmtFull = iso => `${fmtDate(iso)}, pukul ${fmtTime(iso)}`;
  function dayDiff(iso) {
    const a = new Date(); a.setHours(0, 0, 0, 0);
    const b = new Date(iso); b.setHours(0, 0, 0, 0);
    return Math.round((b - a) / DAY);
  }
  function relDue(iso) {
    const d = dayDiff(iso);
    const past = Date.now() > new Date(iso).getTime();
    if (past) return d === 0 ? 'tenggat baru saja lewat' : `lewat ${-d} hari`;
    if (d === 0) return `hari ini, pukul ${fmtTime(iso)}`;
    if (d === 1) return `besok, pukul ${fmtTime(iso)}`;
    return `${d} hari lagi`;
  }
  function ago(iso) {
    const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return 'baru saja';
    if (m < 60) return `${m} menit lalu`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h} jam lalu`;
    const d = Math.round(h / 24);
    return d === 1 ? 'kemarin' : `${d} hari lalu`;
  }
  function greeting() {
    const h = new Date().getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
  }
  const scoreClass = s => (s >= 85 ? 'hi' : s < 70 ? 'lo' : 'mid');
  const levelOf = u => (u.role === 'siswa' ? (q.cls(u.classId) || {}).level : null);
  const isSD = u => levelOf(u) === 'SD';
  const codeChip = (code, label) => `<span class="code-chip"><span class="code">${esc(code)}</span><button type="button" class="btn btn-sm btn-ghost" data-action="copy" data-text="${esc(code)}" aria-label="Salin ${esc(label || 'kode')}">${ic('copy', 'ico-sm')}Salin</button></span>`;

  /* Label umpan balik tiga bagian (Lipnevich & Panadero, 2021) */
  function fbLabels(level) {
    return level === 'SD'
      ? { good: 'Yang sudah hebat', wrong: 'Yang perlu diperbaiki', next: 'Coba lakukan ini' }
      : { good: 'Yang sudah baik', wrong: 'Yang masih keliru', next: 'Langkah berikutnya' };
  }

  function richText(body) {
    return String(body || '').split(/\n{2,}/).map(block => {
      const lines = block.split('\n');
      if (lines.every(l => l.trim().startsWith('- '))) {
        return '<ul>' + lines.map(l => `<li>${esc(l.trim().slice(2))}</li>`).join('') + '</ul>';
      }
      return `<p>${esc(block).replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }

  function statusPill(item, s) {
    if (item.kind === 'kuis') {
      if (s.done) return `<span class="pill ok">Selesai · ${s.score}</span>`;
      return `<span class="pill ${s.overdue ? 'bad' : 'warn'}">Belum dikerjakan</span>`;
    }
    if (s.graded) return `<span class="pill ok">Sudah dinilai · ${s.score}</span>`;
    if (s.done) return `<span class="pill info">${s.late ? 'Terkirim (terlambat)' : 'Terkirim'} · menunggu nilai</span>`;
    return `<span class="pill ${s.overdue ? 'bad' : 'warn'}">Belum dikumpulkan</span>`;
  }

  /* ---------- Notifikasi ---------- */
  function notify(userIds, text, link) {
    const now = new Date().toISOString();
    [].concat(userIds).filter(Boolean).forEach(id => {
      st().notifications.unshift({ id: uid('n'), userId: id, at: now, read: false, text, link: link || '#/beranda' });
    });
  }
  const myNotifs = u => st().notifications.filter(n => n.userId === u.id).sort((a, b) => b.at.localeCompare(a.at));

  /* ---------- Toast & modal ---------- */
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = ic('check') + `<span>${msg}</span>`;
    $('#toast-root').appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
  let modalCleanup = null;
  function openModal(html, opts = {}) {
    closeModal();
    const root = $('#modal-root');
    root.innerHTML = `<div class="modal-back" data-action="close-modal-back"><div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title">${html}</div></div>`;
    const first = root.querySelector('input, textarea, select, button:not([data-action="close-modal"])');
    if (first && !opts.noFocus) first.focus();
  }
  function closeModal() {
    $('#modal-root').innerHTML = '';
    if (modalCleanup) { const fn = modalCleanup; modalCleanup = null; fn(); }
  }
  const modalHead = (title, sub) => `
    <div class="modal-head">
      <div><h2 id="modal-title">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>
      <button class="icon-btn" data-action="close-modal" aria-label="Tutup">${ic('x')}</button>
    </div>`;

  /* Konfirmasi buatan sendiri (tanpa confirm() bawaan peramban) */
  let pendingConfirm = null;
  function askConfirm(title, text, yesLabel, fn, danger) {
    pendingConfirm = fn;
    openModal(`${modalHead(title)}<div class="modal-body stack"><p>${text}</p>
      <div class="form-actions"><button class="btn btn-ghost" data-action="close-modal">Batal</button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm-yes">${yesLabel}</button></div></div>`);
  }

  function showError(form, msg) {
    const box = $('.form-error', form);
    if (!box) { if (msg) toast(msg); return; }
    box.textContent = msg;
    box.hidden = !msg;
    if (msg) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  const csvCell = v => /[",\n;]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ---------- Rute & sesi ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [page, id] = h.split('/');
    return { page: page || 'beranda', id: id || null };
  }
  const go = hash => { if (location.hash === hash) render(); else location.hash = hash; };
  const me = () => { const id = RA.session.get(); return id ? q.user(id) || null : null; };

  /* =========================================================
     Navigasi per peran
     ========================================================= */
  function navFor(u) {
    if (u.role === 'guru') {
      const c = teacherClass(u);
      const pending = c ? q.itemsOf(c.id, 'tugas').reduce((n, i) => n + q.subsOf(i.id).filter(s => s.score == null).length, 0) : 0;
      return [
        ['beranda', 'Beranda', 'home'],
        ['kelas', 'Kelas Saya', 'school'],
        ['materi', 'Materi', 'book'],
        ['tugas', 'Tugas & Kuis', 'clip'],
        ['menilai', 'Menilai', 'pen', pending],
        ['nilai', 'Buku Nilai', 'table'],
        ['laporan', 'Laporan', 'chart']
      ];
    }
    if (u.role === 'siswa') {
      const todo = u.classId ? q.itemsOf(u.classId, 'tugas').filter(i => !q.status(i, u.id).done).length : 0;
      if (isSD(u)) return [['beranda', 'Rumahku', 'home'], ['materi', 'Bacaanku', 'book'], ['tugas', 'Tugasku', 'clip', todo], ['kuis', 'Kuisku', 'bulb'], ['nilai', 'Nilaiku', 'star']];
      return [['beranda', 'Beranda', 'home'], ['materi', 'Materi', 'book'], ['tugas', 'Tugas', 'clip', todo], ['kuis', 'Kuis', 'bulb'], ['nilai', 'Nilai & Masukan', 'star']];
    }
    if (u.role === 'ortu') return [['beranda', 'Ringkasan Anak', 'heart']];
    return [['beranda', 'Ringkasan', 'home'], ['kelas', 'Kelas', 'school'], ['pengguna', 'Pengguna', 'users']];
  }
  const roleName = u => ({ guru: 'Guru', siswa: 'Peserta didik', ortu: 'Orang tua', operator: 'Operator sekolah' }[u.role]);
  function whoLine(u) {
    if (u.role === 'siswa') { const c = q.cls(u.classId); return c ? `${c.name} · ${c.level}` : 'Belum bergabung ke kelas'; }
    if (u.role === 'ortu') { const k = q.childrenOf(u); return k.length ? `Orang tua ${k.map(firstName).join(' & ')}` : 'Belum terhubung dengan anak'; }
    return u.note || roleName(u);
  }

  function teacherClass(u) {
    const list = q.classesOfTeacher(u.id);
    const sel = st().ui.activeClass[u.id];
    return list.find(c => c.id === sel) || list[0] || null;
  }

  /* =========================================================
     Kerangka
     ========================================================= */
  const brandMark = () => `<span class="brand-mark">${ic('pen')}</span>`;
  const brand = () => `<a class="brand" href="#/beranda">${brandMark()}<span>ruang<b>ajar</b></span></a>`;

  function shell(u, r, body) {
    const nav = navFor(u);
    const unread = myNotifs(u).filter(n => !n.read).length;
    const links = where => nav.map(([p, label, icon, count]) =>
      `<a href="#/${p}" class="${r.page === p ? 'on' : ''}" ${r.page === p ? 'aria-current="page"' : ''}>${ic(icon)}<span>${label}</span>${where === 'side' && count ? `<span class="count">${count}</span>` : ''}</a>`).join('');

    let context = '';
    const school = q.school(u.schoolId);
    if (u.role === 'guru') {
      const list = q.classesOfTeacher(u.id);
      const c = teacherClass(u);
      if (list.length > 1) {
        context = `<label class="class-switch"><span class="lbl">Kelas yang dibuka</span>
          <select id="class-switch" data-change="switch-class" aria-label="Pilih kelas">${list.map(k => `<option value="${k.id}" ${c && c.id === k.id ? 'selected' : ''}>${esc(k.name)} · ${esc(k.subject)}</option>`).join('')}</select></label>`;
      } else if (c) {
        context = `<span class="class-label"><span class="tag lvl-${c.level}">${c.level}</span>${esc(c.name)} · ${esc(c.subject)}</span>`;
      } else if (school) context = `<span class="class-label">${esc(school.name)}</span>`;
    } else if (u.role === 'siswa') {
      const c = q.cls(u.classId);
      if (c) context = `<span class="class-label"><span class="tag lvl-${c.level}">${c.level}</span>${esc(c.name)}</span>`;
    } else if (school) {
      context = `<span class="class-label">${esc(school.name)}</span>`;
    }

    return `
    <div class="shell">
      <aside class="side" aria-label="Menu utama">
        ${brand()}
        <button class="side-who" data-action="account" aria-label="Buka akun saya">${avatar(u)}<span><strong>${esc(u.name)}</strong><span>${esc(whoLine(u))}</span></span></button>
        <nav class="nav">${links('side')}</nav>
        <div class="side-foot">
          <button data-action="account">${ic('user')}Akun saya</button>
          <button data-action="help">${ic('help')}Panduan singkat</button>
          <button data-action="logout">${ic('out')}Keluar</button>
        </div>
      </aside>
      <div class="main">
        <header class="topbar">
          ${brand()}
          ${context}
          <div class="spacer"></div>
          <div class="notif-wrap">
            <button class="icon-btn" data-action="notif" aria-label="Pemberitahuan${unread ? `, ${unread} belum dibaca` : ''}" aria-expanded="false">${ic('bell')}${unread ? `<span class="dot">${unread}</span>` : ''}</button>
            <div class="notif-panel" id="notif-panel" hidden></div>
          </div>
          <button class="icon-btn mobile-only" data-action="account" aria-label="Akun saya">${ic('user')}</button>
        </header>
        <div class="offline" id="offline" ${navigator.onLine ? 'hidden' : ''}>${ic('wifi')}<span>Sedang tidak ada sinyal. Tenang, pekerjaanmu tetap tersimpan di perangkat ini.</span></div>
        ${u.demo ? `<div class="demo-ribbon">${ic('eye', 'ico-sm')}<span>Anda sedang memakai <b>akun contoh</b>. Data di sini hanya untuk mencoba.</span></div>` : ''}
        <main class="content" id="content">${body}</main>
      </div>
      <nav class="bottomnav" aria-label="Menu utama">${links('bottom')}</nav>
    </div>`;
  }

  function pageHead({ eyebrow, title, sub, actions, hand }) {
    return `<div class="page-head"><div>
      ${hand ? `<span class="greet-hand">${hand}</span>` : ''}
      ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
      <h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      ${actions ? `<div class="actions">${actions}</div>` : ''}</div>`;
  }
  const empty = (title, text, action = '') => `<div class="empty"><strong>${title}</strong>${text}${action ? `<div style="margin-top:14px">${action}</div>` : ''}</div>`;

  /* =========================================================
     Halaman masuk & daftar
     ========================================================= */
  const DEMO = [
    ['laras', 'Guru IPA · SMP'],
    ['raka', 'Siswa SMP · Kelas 8B'],
    ['nadia', 'Siswa SD · Kelas 4A'],
    ['bima', 'Siswa SMA · Kelas XI-2'],
    ['wati', 'Orang tua Raka'],
    ['joko', 'Operator sekolah']
  ];

  function authStory() {
    return `
      <section class="login-story">
        <a class="brand" href="#/masuk">${brandMark()}<span>ruang<b>ajar</b></span></a>
        <h1>Satu ruang kelas, <mark>tanpa</mark> berkas yang tercecer.</h1>
        <p class="lede">Materi, tugas, nilai, dan masukan guru ada di satu tempat. Cukup satu tautan dan satu akun, bisa dibuka dari HP maupun komputer.</p>
        <ol class="cycle" aria-label="Cara kerja RUANGAJAR">
          <li><span class="n">1</span><span>Guru membagikan materi dan tugas. Semua siswa di kelas langsung diberi tahu.</span></li>
          <li><span class="n">2</span><span>Siswa membaca dan mengerjakan kapan saja, lalu mengirim jawaban.</span></li>
          <li><span class="n">3</span><span>Kuis pilihan ganda dinilai otomatis. Tugas uraian dinilai guru di satu halaman.</span></li>
          <li><span class="n">4</span><span>Guru menulis masukan tiga bagian: yang sudah baik, yang masih keliru, dan langkah berikutnya.</span></li>
          <li><span class="n">5</span><span>Nilai langsung terlihat di buku nilai, halaman siswa, dan ringkasan orang tua.</span></li>
        </ol>
        <p class="cycle-note">Guru tetap memegang kendali. Kami hanya merapikan sisanya.</p>
      </section>`;
  }

  function passField(id, name, label, auto) {
    return `<div class="field"><label for="${id}">${label}</label>
      <div class="pass-wrap"><input class="input" type="password" id="${id}" name="${name}" autocomplete="${auto}">
      <button type="button" class="pass-toggle" data-action="toggle-pass" data-target="${id}" aria-label="Tampilkan kata sandi">${ic('eye', 'ico-sm')}</button></div></div>`;
  }

  function viewLogin() {
    const demoBtns = DEMO.map(([un, desc]) => {
      const u = q.userByUsername(un);
      if (!u) return '';
      return `<button type="button" class="person-btn" data-action="demo-login" data-username="${un}">${avatar(u, 'sm')}<span>${esc(u.name)}<small>${esc(desc)}</small></span></button>`;
    }).join('');
    return `
    <div class="login">
      ${authStory()}
      <section class="login-pick">
        <div class="auth-card">
          <div class="auth-tabs" role="tablist">
            <a href="#/masuk" class="on" role="tab" aria-selected="true">Masuk</a>
            <a href="#/daftar" role="tab" aria-selected="false">Buat akun baru</a>
          </div>
          <form class="form" data-form="login" novalidate>
            <div><h2>Selamat datang kembali</h2><p class="muted small">Masuk dengan nama pengguna dan kata sandi Anda.</p></div>
            <div class="field"><label for="li-user">Nama pengguna</label><input class="input" id="li-user" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="contoh: laras"></div>
            ${passField('li-pass', 'password', 'Kata sandi', 'current-password')}
            <label class="check"><input type="checkbox" name="remember" id="li-remember" checked> Ingat saya di perangkat ini</label>
            <p class="form-error" role="alert" hidden></p>
            <button class="btn btn-primary btn-block">${ic('in')}Masuk</button>
            <p class="small muted" style="text-align:center">Belum punya akun? <a href="#/daftar">Buat akun baru</a>. Gratis dan mulai dari kosong.</p>
          </form>
        </div>

        <div class="auth-card demo-card">
          <div><h3>Ingin mencoba dulu?</h3>
          <p class="small muted">Pakai akun contoh yang sudah berisi materi, tugas, dan nilai. Tekan salah satu nama untuk langsung masuk. Semua akun contoh memakai kata sandi <code>${RA.DEMO_PASS}</code>.</p></div>
          <div class="who-people">${demoBtns}</div>
        </div>
        <p class="login-foot">Semua data tersimpan di peramban ini saja. <button type="button" class="link-btn" data-action="wipe-all">Hapus semua data di perangkat ini</button></p>
      </section>
    </div>`;
  }

  function viewRegister() {
    const roles = [
      ['guru', 'Guru', 'Membuat kelas, membagikan materi, dan menilai.', 'pen'],
      ['siswa', 'Siswa', 'Membaca materi, mengerjakan tugas, dan melihat nilai.', 'book'],
      ['ortu', 'Orang tua', 'Melihat perkembangan belajar anak.', 'heart'],
      ['operator', 'Operator sekolah', 'Mendaftarkan sekolah, mengatur kelas dan akun.', 'building']
    ];
    return `
    <div class="login">
      ${authStory()}
      <section class="login-pick">
        <div class="auth-card">
          <div class="auth-tabs" role="tablist">
            <a href="#/masuk" role="tab" aria-selected="false">Masuk</a>
            <a href="#/daftar" class="on" role="tab" aria-selected="true">Buat akun baru</a>
          </div>
          <form class="form" data-form="register" novalidate>
            <div><h2>Buat akun baru</h2><p class="muted small">Akun baru masih kosong. Anda bisa mengisinya sendiri setelah masuk.</p></div>
            <fieldset class="role-pick"><legend class="label">Saya mendaftar sebagai</legend>
              ${roles.map(([v, t, d, icn], i) => `<label class="role-opt"><input type="radio" name="role" value="${v}" ${i === 0 ? 'checked' : ''} data-change="reg-role"><span class="ro-ic">${ic(icn)}</span><span><b>${t}</b><small>${d}</small></span></label>`).join('')}
            </fieldset>
            <div class="field"><label for="rg-name">Nama lengkap</label><input class="input" id="rg-name" name="name" autocomplete="name" placeholder="contoh: Bu Rina Marlina"></div>
            <div class="field"><label for="rg-user">Nama pengguna</label><input class="input" id="rg-user" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="contoh: rina.m">
              <span class="help">Dipakai untuk masuk. Huruf kecil, angka, titik, atau garis bawah (3–20 karakter).</span></div>
            <div class="field-row">
              ${passField('rg-pass', 'password', 'Kata sandi', 'new-password')}
              ${passField('rg-pass2', 'password2', 'Ulangi kata sandi', 'new-password')}
            </div>
            <span class="help" style="margin-top:-8px">Minimal 6 karakter.</span>

            <div class="reg-extra" data-roles="guru">
              <div class="field"><label for="rg-scode">Kode sekolah <span class="muted">(jika sekolah Anda sudah terdaftar)</span></label><input class="input code-input" id="rg-scode" name="schoolCode" autocapitalize="characters" autocomplete="off" placeholder="contoh: CONTOH">
                <span class="help">Minta ke operator sekolah. Coba <b>CONTOH</b> untuk bergabung ke sekolah contoh.</span></div>
              <div class="field"><label for="rg-sname-g">Atau nama sekolah baru</label><input class="input" id="rg-sname-g" name="schoolNameGuru" placeholder="contoh: SMP Negeri 1 Sukamaju">
                <span class="help">Isi ini kalau belum punya kode sekolah. Anda bisa langsung membuat kelas sendiri.</span></div>
            </div>
            <div class="reg-extra" data-roles="operator" hidden>
              <div class="field"><label for="rg-sname">Nama sekolah</label><input class="input" id="rg-sname" name="schoolName" placeholder="contoh: SD Negeri 2 Harapan"><span class="help">Sekolah baru akan dibuat. Setelah itu Anda mendapat kode sekolah untuk dibagikan kepada guru.</span></div>
            </div>
            <div class="reg-extra" data-roles="siswa" hidden>
              <div class="field"><label for="rg-ccode">Kode kelas <span class="muted">(tidak wajib)</span></label><input class="input code-input" id="rg-ccode" name="classCode" autocapitalize="characters" autocomplete="off" placeholder="contoh: IPA8BX">
                <span class="help">Minta ke gurumu. Boleh dikosongkan dan diisi nanti.</span></div>
            </div>
            <div class="reg-extra" data-roles="ortu" hidden>
              <div class="field"><label for="rg-kcode">Kode anak <span class="muted">(tidak wajib)</span></label><input class="input code-input" id="rg-kcode" name="childCode" autocapitalize="characters" autocomplete="off" placeholder="contoh: RK7P2M">
                <span class="help">Ada di halaman akun anak Anda. Boleh dikosongkan dan diisi nanti.</span></div>
            </div>

            <p class="form-error" role="alert" hidden></p>
            <button class="btn btn-primary btn-block">${ic('check')}Buat akun & masuk</button>
            <p class="small muted" style="text-align:center">Sudah punya akun? <a href="#/masuk">Masuk di sini</a>.</p>
          </form>
        </div>
      </section>
    </div>`;
  }

  function doLogin(u, remember) {
    RA.session.set(u.id, remember);
    lastPath = '';
    if (location.hash === '#/beranda') render(); else location.hash = '#/beranda';
    toast(`${greeting()}, ${esc(firstName(u))}!`);
  }

  /* =========================================================
     GURU
     ========================================================= */
  function noClass(u) {
    const school = q.school(u.schoolId);
    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(shortName(u))}.`, sub: 'Akun Anda masih kosong. Mari mulai dengan tiga langkah sederhana.' })}
      <ol class="onboard">
        <li class="on"><b>Buat kelas pertama</b><span>Tulis nama kelas, mata pelajaran, dan jenjangnya.</span>
          <button class="btn btn-primary" data-action="new-class-guru">${ic('plus')}Buat kelas</button></li>
        <li><b>Bagikan kode kelas ke siswa</b><span>Setiap kelas mendapat kode unik. Siswa memakainya saat mendaftar atau di beranda mereka.</span></li>
        <li><b>Bagikan materi dan tugas</b><span>Setelah siswa bergabung, bagikan bacaan pertama dan tugas bertenggat.</span></li>
      </ol>
      ${school ? `<div class="callout info">${ic('building')}<p>Anda terdaftar di <b>${esc(school.name)}</b>. Rekan guru bisa bergabung ke sekolah yang sama dengan kode sekolah ${codeChip(school.code, 'kode sekolah')}</p></div>` : ''}`;
  }

  function hardestOf(classId) {
    const quizzes = q.itemsOf(classId, 'kuis').filter(k => q.attemptsOf(k.id).length).sort((a, b) => b.due.localeCompare(a.due));
    const quiz = quizzes[0];
    if (!quiz) return null;
    const stats = q.questionStats(quiz).sort((a, b) => a.pct - b.pct);
    return { quiz, worst: stats[0] };
  }

  function gBeranda(u) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const studs = q.studentsOf(c.id);
    const tasks = q.itemsOf(c.id, 'tugas');
    const pending = tasks.flatMap(i => q.subsOf(i.id).filter(s => s.score == null).map(s => ({ s, i })));
    const upcoming = q.itemsOf(c.id).filter(i => new Date(i.due) > Date.now());
    const next = upcoming[0];
    const nextDone = next ? studs.filter(s => q.status(next, s.id).done).length : 0;
    const avg = q.classAverage(c.id);
    const hard = hardestOf(c.id);
    const needHelp = studs.map(s => ({ s, avg: q.average(s.id), miss: q.missing(s.id) }))
      .filter(x => (x.avg != null && x.avg < 75) || x.miss.length);
    const latestMat = q.materialsOf(c.id)[0];

    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(shortName(u))}.`, sub: `Hari ini ${fmtDate(new Date().toISOString())}. Berikut hal-hal di ${esc(c.name)} yang perlu Anda ketahui.` })}

      ${!studs.length ? `<div class="callout">${ic('users')}<p><b>Belum ada siswa di ${esc(c.name)}.</b> Bagikan kode kelas ini kepada siswa agar mereka bisa bergabung: ${codeChip(c.code, 'kode kelas')}</p></div>` : ''}

      <div class="stats">
        <a class="stat ${pending.length ? 'hl' : ''}" href="#/menilai"><span class="k">Menunggu dinilai</span><span class="v">${pending.length}</span><span class="d">${pending.length ? 'jawaban siswa' : 'Tidak ada yang menunggu'}</span></a>
        <div class="stat"><span class="k">Tenggat terdekat</span><span class="v num">${next ? `${nextDone}<small>/${studs.length}</small>` : '–'}</span><span class="d">${next ? `sudah mengerjakan "${esc(next.title)}"` : 'Belum ada tenggat'}</span></div>
        <a class="stat" href="#/nilai"><span class="k">Rata-rata kelas</span><span class="v num">${avg ?? '–'}</span><span class="d">${avg == null ? 'Belum ada nilai' : 'dari semua nilai yang masuk'}</span></a>
        <a class="stat" href="#/kelas"><span class="k">Siswa</span><span class="v num">${studs.length}</span><span class="d">${needHelp.length ? `${needHelp.length} perlu didampingi` : 'di kelas ini'}</span></a>
      </div>

      <section>
        <div class="section-title"><h2>Siklus pertemuan</h2></div>
        <div class="meeting">
          <div><span class="when">sebelum bertemu</span><h3>Siapkan materi & tugas</h3>
            <p>${latestMat ? `Materi terakhir: "${esc(latestMat.title)}", sudah dibaca ${(st().reads[latestMat.id] || []).length} dari ${studs.length} siswa.` : 'Belum ada materi untuk kelas ini. Mulailah dengan satu bacaan singkat.'}</p>
            <a class="btn btn-sm" href="#/materi">${ic('plus', 'ico-sm')}Bagikan materi</a></div>
          <div><span class="when">saat bertemu</span><h3>Bahas yang paling sering keliru</h3>
            <p>${hard ? `Di "${esc(hard.quiz.title)}", soal nomor ${hard.worst.index + 1} hanya dijawab benar oleh ${hard.worst.pct}% siswa: <em>${esc(hard.worst.q.q)}</em>` : 'Belum ada hasil kuis. Setelah siswa mengerjakan kuis, soal tersulit muncul di sini.'}</p>
            <a class="btn btn-sm" href="#/laporan${hard ? '/' + hard.quiz.id : ''}">${ic('chart', 'ico-sm')}Lihat sebaran jawaban</a></div>
          <div><span class="when">setelah bertemu</span><h3>Beri nilai & masukan</h3>
            <p>${pending.length ? `${pending.length} jawaban menunggu nilai dan masukan tiga bagian dari Anda.` : 'Tidak ada jawaban yang menunggu nilai saat ini.'}</p>
            <a class="btn btn-sm ${pending.length ? 'btn-primary' : ''}" href="#/menilai">${ic('pen', 'ico-sm')}Mulai menilai</a></div>
        </div>
      </section>

      <div class="split">
        <section>
          <div class="section-title"><h2>Tenggat berikutnya</h2><a href="#/tugas">Semua tugas & kuis</a></div>
          ${upcoming.length ? `<div class="list">${upcoming.slice(0, 4).map(i => {
            const done = studs.filter(s => q.status(i, s.id).done).length;
            return `<a class="li" href="${i.kind === 'tugas' ? '#/menilai/' + i.id : '#/laporan/' + i.id}">
              <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
              <span><span class="t">${esc(i.title)}</span><span class="m"><span>${ic('clock', 'ico-sm')} ${relDue(i.due)}</span><span>${done} dari ${studs.length} sudah mengerjakan</span></span></span>
              <span class="r"><span class="tag ${i.kind}">${i.kind}</span></span></a>`;
          }).join('')}</div>` : empty('Tidak ada tenggat', 'Buat tugas atau kuis baru dari menu Tugas & Kuis.', `<a class="btn" href="#/tugas">${ic('plus')}Buat tugas</a>`)}
        </section>
        <section>
          <div class="section-title"><h2>Perlu didampingi</h2></div>
          ${needHelp.length ? `<div class="list">${needHelp.map(x => `
            <div class="li">${avatar(x.s)}<span><span class="t">${esc(x.s.name)}</span>
            <span class="m">${x.avg != null ? `<span>Rata-rata ${x.avg}</span>` : ''}${x.miss.length ? `<span>${x.miss.length} pekerjaan lewat tenggat</span>` : ''}</span></span>
            <span class="r">${x.miss.length ? `<button class="btn btn-sm btn-ghost" data-action="remind" data-student="${x.s.id}" data-item="${x.miss[0].id}">${ic('bellring', 'ico-sm')}Ingatkan</button>` : ''}</span></div>`).join('')}</div>`
            : empty('Semua aman', studs.length ? 'Tidak ada siswa yang tertinggal saat ini.' : 'Daftar ini terisi setelah siswa bergabung.')}
        </section>
      </div>`;
  }

  /* ---------- Kelas saya (guru) ---------- */
  function gKelas(u) {
    const list = q.classesOfTeacher(u.id);
    if (!list.length) return noClass(u);
    const school = q.school(u.schoolId);
    const active = teacherClass(u);
    return `
      ${pageHead({ title: 'Kelas Saya', sub: 'Bagikan kode kelas kepada siswa. Mereka memasukkannya saat mendaftar atau dari beranda mereka.', actions: `<button class="btn btn-primary" data-action="new-class-guru">${ic('plus')}Buat kelas</button>` })}
      ${list.map(c => {
        const studs = q.studentsOf(c.id);
        const isActive = active && active.id === c.id;
        return `<section class="panel stack">
          <div class="row" style="justify-content:space-between">
            <div><div class="row"><span class="tag lvl-${c.level}">${c.level}</span><h2 style="font-size:19px">${esc(c.name)} · ${esc(c.subject)}</h2></div>
            <p class="small muted">${studs.length} siswa${isActive ? ' · sedang dibuka' : ''}</p></div>
            <div class="row"><span class="small muted">Kode kelas</span>${codeChip(c.code, 'kode kelas')}
              ${isActive ? '' : `<button class="btn btn-sm" data-action="open-class" data-id="${c.id}">Buka kelas ini</button>`}</div>
          </div>
          ${studs.length ? `<div class="list">${studs.map(s => `<div class="li">${avatar(s)}<span><span class="t">${esc(s.name)}</span><span class="m"><span>@${esc(s.username)}</span>${q.average(s.id) != null ? `<span>Rata-rata ${q.average(s.id)}</span>` : ''}</span></span>
            <span class="r"><button class="btn btn-sm btn-ghost btn-danger" data-action="kick-student" data-id="${s.id}">Keluarkan</button></span></div>`).join('')}</div>`
            : empty('Belum ada siswa', `Minta siswa mendaftar sebagai <b>Siswa</b> lalu memasukkan kode <b>${esc(c.code)}</b>.`)}
        </section>`;
      }).join('')}
      ${school ? `<p class="small muted">Sekolah: ${esc(school.name)} · kode sekolah <b>${esc(school.code)}</b> (untuk rekan guru).</p>` : ''}`;
  }

  function classFormGuru() {
    openModal(`${modalHead('Buat kelas', 'Kelas baru akan mendapat kode unik untuk dibagikan ke siswa.')}
      <form class="modal-body form" data-form="class-guru" novalidate>
        <div class="field-row">
          <div class="field"><label for="cg-name">Nama kelas</label><input class="input" id="cg-name" name="name" placeholder="contoh: Kelas 7A"></div>
          <div class="field"><label for="cg-subject">Mata pelajaran</label><input class="input" id="cg-subject" name="subject" placeholder="contoh: Matematika"></div>
        </div>
        <div class="field"><label for="cg-level">Jenjang</label><select class="select" id="cg-level" name="level"><option value="SD">SD (menu besar dan bergambar)</option><option value="SMP" selected>SMP</option><option value="SMA">SMA (ada tugas kelompok)</option></select>
          <span class="help">Tampilan siswa menyesuaikan jenjang ini secara otomatis.</span></div>
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Buat kelas</button></div>
      </form>`);
  }

  /* ---------- Materi (guru) ---------- */
  function gMateri(u) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const mats = q.materialsOf(c.id);
    const n = q.studentsOf(c.id).length;
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Materi', sub: 'Bacaan yang Anda bagikan bisa dibuka siswa kapan saja, dan bisa disimpan untuk dibaca tanpa internet.', actions: `<button class="btn btn-primary" data-action="new-material">${ic('plus')}Tambah materi</button>` })}
      ${mats.length ? `<div class="cards">${mats.map(m => {
        const r = (st().reads[m.id] || []).length;
        return `<article class="mcard">
          <div class="row"><span class="muted small">${fmtShort(m.createdAt)}</span>${m.attachment ? `<span class="attach">${ic('file', 'ico-sm')}${esc(m.attachment.name)}</span>` : ''}</div>
          <h3>${esc(m.title)}</h3>
          ${m.target ? `<p class="goal">${esc(m.target)}</p>` : ''}
          <div><div class="row small" style="justify-content:space-between"><span class="muted">Sudah dibaca</span><b class="num">${r}/${n} siswa</b></div>
          <div class="readbar"><i style="width:${n ? (r / n) * 100 : 0}%"></i></div></div>
          <div class="foot"><button class="btn btn-sm" data-action="open-material" data-id="${m.id}">Buka</button>
          <button class="btn btn-sm btn-ghost btn-danger" data-action="delete-material" data-id="${m.id}">${ic('trash', 'ico-sm')}Hapus</button></div>
        </article>`;
      }).join('')}</div>` : empty('Belum ada materi', 'Mulai dengan satu bacaan singkat untuk pertemuan berikutnya.', `<button class="btn btn-primary" data-action="new-material">${ic('plus')}Tambah materi</button>`)}`;
  }

  function materialForm() {
    openModal(`${modalHead('Tambah materi', 'Siswa di kelas ini akan langsung mendapat pemberitahuan.')}
      <form class="modal-body form" data-form="material" novalidate>
        <div class="field"><label for="m-title">Judul</label><input class="input" id="m-title" name="title" placeholder="contoh: Mengenal sistem pernapasan"></div>
        <div class="field"><label for="m-target">Target belajar</label><input class="input" id="m-target" name="target" placeholder="Setelah membaca ini, kamu bisa…"><span class="help">Satu kalimat tentang apa yang bisa dilakukan siswa setelah membaca.</span></div>
        <div class="field"><label for="m-body">Isi bacaan</label><textarea class="textarea" id="m-body" name="body" rows="7" placeholder="Tulis dengan kalimat pendek. Awali baris dengan tanda - untuk membuat daftar."></textarea></div>
        <div class="field"><span class="label">Lampiran (tidak wajib)</span>
          <label class="file-drop" for="m-file">${ic('up')}<span id="m-file-name">Pilih berkas PDF, gambar, atau dokumen</span><input type="file" id="m-file" name="file" data-change="file-name" data-target="m-file-name"></label>
          <span class="help">Berkas di bawah 700 KB disimpan agar siswa bisa mengunduhnya.</span></div>
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan ke kelas</button></div>
      </form>`);
  }

  function openMaterial(id) {
    const m = q.material(id); if (!m) return;
    const u = me();
    if (u.role === 'siswa' && !q.isRead(id, u.id)) {
      (st().reads[id] = st().reads[id] || []).push(u.id); save();
    }
    const c = q.cls(m.classId);
    const t = c ? q.user(c.teacherId) : null;
    openModal(`${modalHead(esc(m.title), `Dari ${esc(t ? t.name : 'guru')} · ${fmtDate(m.createdAt)}`)}
      <div class="modal-body stack">
        ${m.target ? `<div class="callout">${ic('star')}<p><b>Target belajar:</b> ${esc(m.target)}</p></div>` : ''}
        <div class="reader">${m.body ? richText(m.body) : '<p class="muted">Materi ini berupa lampiran.</p>'}</div>
        <div class="row" style="justify-content:flex-end">
          ${m.attachment ? `<button class="btn" data-action="download-attachment" data-id="${m.id}">${ic('file')}Unduh ${esc(m.attachment.name)}</button>` : ''}
          <button class="btn btn-pencil" data-action="download-material" data-id="${m.id}">${ic('down')}Simpan untuk dibaca tanpa internet</button>
        </div>
      </div>`, { wide: true, noFocus: true });
    if (u.role === 'siswa') modalCleanup = () => render();
  }

  /* ---------- Tugas & kuis (guru) ---------- */
  function gTugas(u) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const items = q.itemsOf(c.id).slice().reverse();
    const studs = q.studentsOf(c.id);
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Tugas & Kuis', sub: 'Setiap tugas punya tenggat. Kuis pilihan ganda dinilai otomatis begitu siswa selesai.', actions: `<button class="btn" data-action="new-kuis">${ic('bulb')}Buat kuis</button><button class="btn btn-primary" data-action="new-tugas">${ic('plus')}Buat tugas</button>` })}
      ${items.length ? `<div class="list">${items.map(i => {
        const done = studs.filter(s => q.status(i, s.id).done).length;
        const pend = i.kind === 'tugas' ? q.subsOf(i.id).filter(s => s.score == null).length : 0;
        const past = Date.now() > new Date(i.due).getTime();
        return `<div class="li">
          <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
          <span><span class="t">${esc(i.title)} ${i.group ? '<span class="tag">kelompok</span>' : ''}</span>
            <span class="m"><span>${ic('clock', 'ico-sm')} ${fmtShort(i.due)}, ${fmtTime(i.due)} (${relDue(i.due)})</span><span>${done}/${studs.length} sudah ${i.kind === 'kuis' ? 'mengerjakan' : 'mengumpulkan'}</span>${i.kind === 'kuis' ? `<span>${i.questions.length} soal</span>` : ''}</span></span>
          <span class="r">
            ${pend ? `<span class="pill warn">${pend} perlu dinilai</span>` : past ? '<span class="pill plain">Tenggat lewat</span>' : '<span class="pill info">Berjalan</span>'}
            <a class="btn btn-sm" href="${i.kind === 'tugas' ? '#/menilai/' + i.id : '#/laporan/' + i.id}">${i.kind === 'tugas' ? 'Nilai' : 'Lihat hasil'}</a>
            <button class="btn btn-sm btn-ghost btn-danger" data-action="delete-item" data-id="${i.id}" aria-label="Hapus ${esc(i.title)}">${ic('trash', 'ico-sm')}</button>
          </span></div>`;
      }).join('')}</div>` : empty('Belum ada tugas atau kuis', 'Buat yang pertama. Siswa akan langsung diberi tahu.', `<button class="btn btn-primary" data-action="new-tugas">${ic('plus')}Buat tugas</button>`)}`;
  }

  function localInput(days) {
    const d = new Date(Date.now() + days * DAY); d.setHours(23, 59, 0, 0);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  function tugasForm() {
    const c = teacherClass(me());
    openModal(`${modalHead('Buat tugas', `Untuk ${esc(c.name)}. Siswa langsung diberi tahu.`)}
      <form class="modal-body form" data-form="tugas" novalidate>
        <div class="field"><label for="t-title">Judul tugas</label><input class="input" id="t-title" name="title" placeholder="contoh: Poster ajakan menjaga paru-paru"></div>
        <div class="field"><label for="t-target">Target belajar</label><input class="input" id="t-target" name="target" placeholder="Apa yang ingin dicapai lewat tugas ini?"></div>
        <div class="field"><label for="t-ins">Petunjuk</label><textarea class="textarea" id="t-ins" name="instructions" placeholder="Jelaskan langkahnya dengan kalimat pendek."></textarea></div>
        <div class="field"><label for="t-due">Tenggat</label><input class="input" type="datetime-local" id="t-due" name="due" value="${localInput(3)}"></div>
        ${c.level === 'SMA' ? `<label class="check"><input type="checkbox" name="group" id="t-group"> Ini tugas kelompok</label>` : ''}
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan tugas</button></div>
      </form>`);
  }

  let qbCount = 0;
  function qbItem() {
    const i = qbCount++;
    return `<div class="qb-item" data-qi="${i}">
      <div class="qb-head"><b>Soal</b><button type="button" class="btn btn-sm btn-ghost" data-action="qb-remove">${ic('x', 'ico-sm')}Hapus soal</button></div>
      <input class="input" name="q" placeholder="Tulis pertanyaannya" aria-label="Pertanyaan">
      <div class="qb-opts">${[0, 1, 2, 3].map(o => `<label class="qb-opt"><input type="radio" name="ans-${i}" value="${o}" ${o === 0 ? 'checked' : ''} aria-label="Tandai pilihan ${'ABCD'[o]} sebagai jawaban benar"><input class="input" name="opt" placeholder="Pilihan ${'ABCD'[o]}"></label>`).join('')}</div>
      <span class="help small muted">Pilih bulatan di samping jawaban yang benar.</span>
    </div>`;
  }
  function kuisForm() {
    const c = teacherClass(me());
    qbCount = 0;
    openModal(`${modalHead('Buat kuis', `Untuk ${esc(c.name)}. Nilai dihitung otomatis.`)}
      <form class="modal-body form" data-form="kuis" novalidate>
        <div class="field-row">
          <div class="field"><label for="k-title">Judul kuis</label><input class="input" id="k-title" name="title" placeholder="contoh: Kuis organ pernapasan"></div>
          <div class="field"><label for="k-due">Tenggat</label><input class="input" type="datetime-local" id="k-due" name="due" value="${localInput(5)}"></div>
        </div>
        <div class="qb" id="qb">${qbItem()}${qbItem()}</div>
        <button type="button" class="btn" data-action="qb-add">${ic('plus')}Tambah soal</button>
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan kuis</button></div>
      </form>`, { wide: true });
  }

  /* ---------- Menilai (guru) ---------- */
  function gMenilai(u, id) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const tasks = q.itemsOf(c.id, 'tugas');
    if (!tasks.length) return pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Menilai' }) + empty('Belum ada tugas uraian', 'Kuis pilihan ganda dinilai otomatis. Tugas uraian akan muncul di sini untuk Anda nilai.', `<a class="btn" href="#/tugas">${ic('plus')}Buat tugas</a>`);
    const it = tasks.find(t => t.id === id) || tasks.find(t => q.subsOf(t.id).some(s => s.score == null)) || tasks[tasks.length - 1];
    const only = st().ui.onlyPending;
    const studs = q.studentsOf(c.id);
    const L = fbLabels(c.level);

    const cards = studs.map(s => {
      const sub = q.sub(it.id, s.id);
      if (!sub) {
        if (only) return '';
        const over = Date.now() > new Date(it.due).getTime();
        return `<div class="grade-card done"><div class="who">${avatar(s)}<strong>${esc(s.name)}</strong>
          <span class="pill ${over ? 'bad' : 'warn'}">Belum mengumpulkan</span><span style="flex:1"></span>
          <button class="btn btn-sm" data-action="remind" data-student="${s.id}" data-item="${it.id}">${ic('bellring', 'ico-sm')}Ingatkan</button></div></div>`;
      }
      if (only && sub.score != null) return '';
      const late = sub.submittedAt > it.due;
      const f = sub.feedback || {};
      return `<form class="grade-card ${sub.score != null ? 'done' : ''}" data-form="grade" data-sub="${sub.id}" novalidate>
        <div class="who">${avatar(s)}<strong>${esc(s.name)}</strong>
          <span class="pill ${late ? 'warn' : 'ok'}">${late ? 'Terlambat' : 'Tepat waktu'}</span>
          <span class="muted small">${ic('clock', 'ico-sm')} ${fmtShort(sub.submittedAt)}, ${fmtTime(sub.submittedAt)}</span>
          ${sub.score != null ? `<span class="pill info">Sudah dinilai</span>` : ''}</div>
        ${sub.members ? `<div class="small muted"><b>Anggota kelompok:</b> ${esc(sub.members)}</div>` : ''}
        <div class="answer">${esc(sub.text) || '<span class="muted">Tanpa teks jawaban.</span>'}</div>
        ${sub.fileName ? `<div><span class="attach">${ic('file', 'ico-sm')}${esc(sub.fileName)}</span></div>` : ''}
        <div class="fb3">
          <div class="field"><label for="g-${sub.id}-good"><i style="background:var(--bluepen)"></i>${L.good}</label><textarea class="textarea" id="g-${sub.id}-good" name="good" placeholder="Apa yang sudah tepat?">${esc(f.good)}</textarea></div>
          <div class="field"><label for="g-${sub.id}-wrong"><i style="background:var(--redpen)"></i>${L.wrong}</label><textarea class="textarea" id="g-${sub.id}-wrong" name="wrong" placeholder="Bagian mana yang belum tepat?">${esc(f.wrong)}</textarea></div>
          <div class="field"><label for="g-${sub.id}-next"><i style="background:var(--ink)"></i>${L.next}</label><textarea class="textarea" id="g-${sub.id}-next" name="next" placeholder="Apa yang sebaiknya dilakukan setelah ini?">${esc(f.next)}</textarea></div>
        </div>
        <div class="grade-row">
          <div class="field"><label for="g-${sub.id}-score">Nilai (0–100)</label><input class="input score-input" type="number" min="0" max="100" id="g-${sub.id}-score" name="score" value="${sub.score ?? ''}"></div>
          <button class="btn btn-primary">${ic('check')}${sub.score != null ? 'Perbarui nilai' : 'Simpan nilai & masukan'}</button>
        </div>
      </form>`;
    }).join('');

    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Menilai', sub: 'Semua jawaban kelas ada di satu halaman. Nilai yang Anda simpan langsung masuk ke buku nilai, halaman siswa, dan ringkasan orang tua.' })}
      <div class="chips" role="tablist" aria-label="Pilih tugas">${tasks.slice().reverse().map(t => {
        const p = q.subsOf(t.id).filter(s => s.score == null).length;
        return `<a class="chip ${t.id === it.id ? 'on' : ''}" href="#/menilai/${t.id}" role="tab" aria-selected="${t.id === it.id}">${esc(t.title)}${p ? `<span class="c">${p}</span>` : ''}</a>`;
      }).join('')}</div>
      <div class="panel stack">
        <div class="row" style="justify-content:space-between">
          <div><h2 style="font-size:19px">${esc(it.title)} ${it.group ? '<span class="tag">kelompok</span>' : ''}</h2><p class="muted small">Tenggat ${fmtFull(it.due)}</p></div>
          <label class="check"><input type="checkbox" id="only-pending" data-change="only-pending" ${only ? 'checked' : ''}> Tampilkan yang belum dinilai saja</label>
        </div>
        <p class="small" style="color:var(--ink-2)">${esc(it.instructions)}</p>
      </div>
      <div class="stack">${cards || (studs.length ? empty('Beres!', 'Tidak ada jawaban yang menunggu nilai untuk tugas ini.') : empty('Belum ada siswa', `Bagikan kode kelas <b>${esc(c.code)}</b> agar siswa bisa bergabung.`))}</div>`;
  }

  /* ---------- Buku nilai (guru) ---------- */
  function gNilai(u) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const items = q.itemsOf(c.id);
    const studs = q.studentsOf(c.id);
    const colAvg = items.map(i => {
      const sc = studs.map(s => q.status(i, s.id)).filter(x => x.graded).map(x => x.score);
      return sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : null;
    });
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Buku Nilai', sub: 'Terisi sendiri dari hasil kuis dan nilai tugas yang Anda simpan. Inilah rekap resmi sekolah, jadi tidak perlu disalin ulang ke tempat lain.', actions: items.length && studs.length ? `<button class="btn" data-action="export-grades">${ic('down')}Unduh (CSV / Excel)</button>` : '' })}
      ${items.length && studs.length ? `<div class="table-wrap"><table class="grades">
        <thead><tr><th scope="col">Nama siswa</th>${items.map(i => `<th scope="col"><span class="tag ${i.kind}">${i.kind}</span><span class="t">${esc(i.title)}</span></th>`).join('')}<th scope="col">Rata-rata</th></tr></thead>
        <tbody>${studs.map(s => `<tr><th scope="row" style="font-weight:600"><span class="row" style="flex-wrap:nowrap">${avatar(s, 'sm')}${esc(s.name)}</span></th>${items.map(i => {
          const x = q.status(i, s.id);
          if (x.graded) return `<td class="sc ${scoreClass(x.score)}">${x.score}</td>`;
          if (x.done) return `<td class="pend">perlu dinilai</td>`;
          return `<td class="miss">${x.overdue ? 'belum' : '·'}</td>`;
        }).join('')}<td class="avg num">${q.average(s.id) ?? '–'}</td></tr>`).join('')}</tbody>
        <tfoot><tr><td>Rata-rata kelas</td>${colAvg.map(v => `<td class="num">${v ?? '–'}</td>`).join('')}<td class="num">${q.classAverage(c.id) ?? '–'}</td></tr></tfoot>
      </table></div>
      <p class="small muted">Keterangan: <b style="color:var(--good)">hijau</b> 85 ke atas, <b style="color:var(--bad)">merah</b> di bawah 70. "belum" artinya tenggat sudah lewat tapi belum dikerjakan; titik artinya tenggat belum tiba.</p>`
        : empty('Buku nilai masih kosong', !studs.length ? `Belum ada siswa. Bagikan kode kelas <b>${esc(c.code)}</b>.` : 'Nilai akan muncul di sini begitu ada tugas atau kuis yang dikerjakan.')}`;
  }

  function exportGrades(c, onlySid) {
    const items = q.itemsOf(c.id);
    const studs = onlySid ? [q.user(onlySid)] : q.studentsOf(c.id);
    const rows = [['Nama', ...items.map(i => `${i.kind === 'kuis' ? 'Kuis' : 'Tugas'}: ${i.title}`), 'Rata-rata']];
    studs.forEach(s => rows.push([s.name, ...items.map(i => { const x = q.status(i, s.id); return x.graded ? x.score : x.done ? 'perlu dinilai' : ''; }), q.average(s.id) ?? '']));
    const csv = '﻿' + rows.map(r => r.map(csvCell).join(';')).join('\r\n');
    download(`nilai-${slug(c.name)}${onlySid ? '-' + slug(studs[0].name) : ''}.csv`, csv, 'text/csv;charset=utf-8');
    toast('Rekap nilai diunduh. Bisa dibuka di Excel atau Google Sheets.');
  }

  /* ---------- Laporan kelas (guru) ---------- */
  function gLaporan(u, id) {
    const c = teacherClass(u); if (!c) return noClass(u);
    const studs = q.studentsOf(c.id);
    const quizzes = q.itemsOf(c.id, 'kuis');
    const quiz = quizzes.find(k => k.id === id) || quizzes.filter(k => q.attemptsOf(k.id).length).pop() || quizzes[0];
    let quizHtml = empty('Belum ada kuis', 'Buat kuis agar sebaran jawaban siswa bisa terlihat di sini.', `<a class="btn" href="#/tugas">${ic('bulb')}Buat kuis</a>`);
    if (quiz) {
      const stats = q.questionStats(quiz);
      const n = q.attemptsOf(quiz.id).length;
      const worst = n ? stats.slice().sort((a, b) => a.pct - b.pct)[0] : null;
      let wrongPick = '';
      if (worst) {
        let best = -1, bi = -1;
        worst.picks.forEach((p, i) => { if (i !== worst.q.answer && p > best) { best = p; bi = i; } });
        if (bi >= 0 && best > 0) wrongPick = ` Jawaban salah yang paling banyak dipilih adalah "${esc(worst.q.options[bi])}".`;
      }
      quizHtml = `
        <div class="chips">${quizzes.map(k => `<a class="chip ${k.id === quiz.id ? 'on' : ''}" href="#/laporan/${k.id}">${esc(k.title)}</a>`).join('')}</div>
        <div class="panel stack">
          <div class="row" style="justify-content:space-between"><h2 style="font-size:18px">${esc(quiz.title)}</h2><span class="muted small num">${n} dari ${studs.length} siswa sudah mengerjakan</span></div>
          ${n ? `
          ${worst && worst.pct < 70 ? `<div class="callout">${ic('bulb')}<p><b>Bahas ini saat tatap muka:</b> soal nomor ${worst.index + 1} hanya dijawab benar oleh ${worst.pct}% siswa.${wrongPick}</p></div>` : `<div class="callout info">${ic('check')}<p>Sebagian besar soal sudah dipahami dengan baik oleh kelas.</p></div>`}
          <div class="bars">${stats.map(s => `<div class="bar-row ${s.pct < 70 ? 'low' : ''}">
            <span class="lbl"><b>${s.index + 1}</b><span>${esc(s.q.q)}</span></span>
            <div class="bar" role="img" aria-label="${s.pct}% benar"><i style="width:${s.pct}%"></i></div><span class="pct">${s.pct}%</span></div>`).join('')}</div>
          <p class="small muted">Batang menunjukkan persentase siswa yang menjawab benar. Warna merah berarti di bawah 70%.</p>` : '<p class="muted">Belum ada siswa yang mengerjakan kuis ini.</p>'}
        </div>`;
    }

    const total = q.itemsOf(c.id).length;
    const rows = studs.map(s => ({ s, avg: q.average(s.id), miss: q.missing(s.id), done: q.itemsOf(c.id).filter(i => q.status(i, s.id).done).length }));
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Laporan Kelas', sub: 'Lihat bagian mana yang paling banyak keliru, supaya jam pelajaran dipakai untuk berdiskusi, bukan mengulang semua materi.' })}
      <section class="stack"><div class="section-title" style="margin:0"><h2>Sebaran jawaban kuis</h2></div>${quizHtml}</section>
      <section>
        <div class="section-title"><h2>Perkembangan tiap siswa</h2></div>
        ${rows.length ? `<div class="list">${rows.map(x => `<div class="li">${avatar(x.s)}
          <span><span class="t">${esc(x.s.name)}</span><span class="m"><span class="num">${x.done}/${total} pekerjaan selesai</span>${x.miss.length ? `<span style="color:var(--bad)">${x.miss.length} lewat tenggat</span>` : ''}</span></span>
          <span class="r">${x.avg == null ? '<span class="pill plain">Belum ada nilai</span>' : x.avg < 75 ? `<span class="pill bad">Perlu didampingi · ${x.avg}</span>` : x.avg >= 85 ? `<span class="pill ok">Siap pengayaan · ${x.avg}</span>` : `<span class="pill info">Sesuai jalur · ${x.avg}</span>`}</span></div>`).join('')}</div>`
          : empty('Belum ada siswa', `Bagikan kode kelas <b>${esc(c.code)}</b> agar siswa bisa bergabung.`)}
      </section>`;
  }

  /* =========================================================
     PESERTA DIDIK
     ========================================================= */
  function sJoin(u) {
    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(firstName(u))}!`, sub: 'Akunmu sudah siap, tapi kamu belum bergabung ke kelas mana pun.' })}
      <div class="grid-2">
        <form class="panel form" data-form="join-class" novalidate>
          <div><h2 style="font-size:19px">Gabung ke kelas</h2><p class="small muted">Masukkan kode kelas dari gurumu. Kodenya berisi 6 huruf dan angka.</p></div>
          <div class="field"><label for="jc-code">Kode kelas</label><input class="input code-input big" id="jc-code" name="code" autocapitalize="characters" autocomplete="off" placeholder="contoh: IPA8BX"></div>
          <p class="form-error" role="alert" hidden></p>
          <button class="btn btn-primary">${ic('arrow')}Gabung</button>
        </form>
        <div class="panel stack">
          <h2 style="font-size:19px">Kode untuk orang tuamu</h2>
          <p class="small" style="color:var(--ink-2)">Berikan kode ini kepada Ayah atau Ibu, supaya mereka bisa melihat perkembangan belajarmu dari akun orang tua.</p>
          ${codeChip(u.code, 'kode anak')}
        </div>
      </div>`;
  }

  function sBeranda(u) {
    const c = q.cls(u.classId);
    const items = q.itemsOf(u.classId);
    const todo = items.filter(i => !q.status(i, u.id).done);
    const lastFb = st().submissions.filter(s => s.studentId === u.id && s.feedback).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''))[0];
    const avg = q.average(u.id);
    const teacher = q.user(c.teacherId);

    if (c.level === 'SD') {
      const tugasTodo = q.itemsOf(u.classId, 'tugas').filter(i => !q.status(i, u.id).done).length;
      const kuisTodo = q.itemsOf(u.classId, 'kuis').filter(i => !q.status(i, u.id).done).length;
      const unreadMat = q.materialsOf(u.classId).filter(m => !q.isRead(m.id, u.id)).length;
      return `
        ${pageHead({ hand: 'Halo,', title: `${esc(firstName(u))}! Mau belajar apa hari ini?`, sub: 'Pilih salah satu kotak di bawah ini.' })}
        <div class="tiles">
          <a class="tile t1" href="#/materi"><span class="pic">${ic('book')}</span><b>Bacaanku</b><span>Materi dari ${esc(teacher ? shortName(teacher) : 'gurumu')}</span>${unreadMat ? `<span class="badge">${unreadMat} baru</span>` : ''}</a>
          <a class="tile t2" href="#/tugas"><span class="pic">${ic('clip')}</span><b>Tugasku</b><span>Pekerjaan rumah</span>${tugasTodo ? `<span class="badge">${tugasTodo} belum</span>` : ''}</a>
          <a class="tile t3" href="#/kuis"><span class="pic">${ic('bulb')}</span><b>Kuisku</b><span>Tebak-tebakan pelajaran</span>${kuisTodo ? `<span class="badge">${kuisTodo} belum</span>` : ''}</a>
          <a class="tile t4" href="#/nilai"><span class="pic">${ic('star')}</span><b>Nilaiku</b><span>Lihat bintang dan pesan guru</span></a>
        </div>
        ${lastFb ? `<section><div class="section-title"><h2>Pesan terbaru dari gurumu</h2></div>${sheet(lastFb, 'SD')}</section>` : ''}
        <div class="callout info">${ic('heart')}<p>Kalau bingung, minta tolong Ayah, Ibu, atau Bapak/Ibu guru untuk menemanimu, ya. Kode untuk orang tuamu: <b>${esc(u.code)}</b></p></div>`;
    }

    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(firstName(u))}.`, sub: !items.length ? `Kamu sudah bergabung di ${esc(c.name)}. Belum ada tugas dari gurumu, jadi santai dulu.` : todo.length ? `Ada ${todo.length} pekerjaan yang menunggumu. Kerjakan yang tenggatnya paling dekat dulu.` : 'Semua pekerjaanmu sudah selesai. Kerja bagus!' })}
      <div class="stats">
        <a class="stat" href="#/nilai"><span class="k">Rata-rata nilaimu</span><span class="v num">${avg ?? '–'}</span><span class="d">${avg == null ? 'Belum ada nilai' : `Rata-rata kelas ${q.classAverage(u.classId) ?? '–'}`}</span></a>
        <a class="stat ${todo.length ? 'hl' : ''}" href="#/tugas"><span class="k">Belum dikerjakan</span><span class="v num">${todo.length}</span><span class="d">tugas & kuis</span></a>
        <a class="stat" href="#/materi"><span class="k">Materi dibaca</span><span class="v num">${q.materialsOf(u.classId).filter(m => q.isRead(m.id, u.id)).length}<small>/${q.materialsOf(u.classId).length}</small></span><span class="d">bacaan dari guru</span></a>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>Yang perlu kamu kerjakan</h2></div>
          ${todo.length ? `<div class="list">${todo.map(i => itemRow(u, i)).join('')}</div>` : empty('Tidak ada yang tertunda', 'Tugas baru dari gurumu akan muncul di sini.')}
        </section>
        <section class="stack">
          <div><div class="section-title"><h2>Masukan terbaru</h2><a href="#/nilai">Semua masukan</a></div>
          ${lastFb ? `<p class="small muted" style="margin-bottom:8px">Untuk "${esc(q.item(lastFb.itemId).title)}"</p>${sheet(lastFb, c.level)}` : empty('Belum ada masukan', 'Masukan guru akan muncul di sini setelah tugasmu dinilai.')}</div>
          <div class="panel row" style="justify-content:space-between"><span class="small" style="color:var(--ink-2)">Kode untuk orang tuamu</span>${codeChip(u.code, 'kode anak')}</div>
        </section>
      </div>`;
  }

  function itemRow(u, i) {
    const s = q.status(i, u.id);
    return `<a class="li" href="#/${i.kind === 'kuis' ? 'kuis' : 'tugas'}/${i.id}">
      <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
      <span><span class="t">${esc(i.title)} ${i.group ? '<span class="tag">kelompok</span>' : ''}</span>
      <span class="m"><span>${ic('clock', 'ico-sm')} ${s.done ? `dikirim ${fmtShort(s.at)}` : relDue(i.due)}</span></span></span>
      <span class="r">${statusPill(i, s)}</span></a>`;
  }

  /* Lembar umpan balik bergaya kertas buku tulis */
  function sheet(sub, level) {
    const f = sub.feedback || {};
    const L = fbLabels(level);
    const item = q.item(sub.itemId);
    const c = item ? q.cls(item.classId) : null;
    const t = c ? q.user(c.teacherId) : null;
    return `<div class="sheet">
      <span class="mark num">${sub.score}</span>
      ${f.good ? `<div class="part good"><span class="k">${L.good}</span><span class="v">${esc(f.good)}</span></div>` : ''}
      ${f.wrong ? `<div class="part wrong"><span class="k">${L.wrong}</span><span class="v">${esc(f.wrong)}</span></div>` : ''}
      ${f.next ? `<div class="part next"><span class="k">${L.next}</span><span class="v">${esc(f.next)}</span></div>` : ''}
      ${t ? `<div class="sig">— ${esc(shortName(t))}</div>` : ''}
    </div>`;
  }

  function sMateri(u) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    const mats = q.materialsOf(u.classId);
    return `
      ${pageHead({ title: sd ? 'Bacaanku' : 'Materi', sub: sd ? 'Pilih bacaan, lalu tekan tombol Baca.' : 'Baca kapan saja sesuai kecepatanmu. Kamu juga bisa menyimpannya untuk dibaca tanpa internet.' })}
      ${mats.length ? `<div class="cards">${mats.map(m => {
        const read = q.isRead(m.id, u.id);
        return `<article class="mcard">
          <div class="row" style="justify-content:space-between"><span class="muted small">${fmtShort(m.createdAt)}</span>${read ? `<span class="pill ok">Sudah dibaca</span>` : `<span class="pill warn">Baru</span>`}</div>
          <h3>${esc(m.title)}</h3>
          ${m.target ? `<p class="goal">${esc(m.target)}</p>` : ''}
          <div class="foot"><button class="btn btn-primary btn-sm" data-action="open-material" data-id="${m.id}">${ic('book', 'ico-sm')}Baca</button>
          <button class="btn btn-sm btn-ghost" data-action="download-material" data-id="${m.id}">${ic('down', 'ico-sm')}Simpan</button></div>
        </article>`;
      }).join('')}</div>` : empty('Belum ada materi', 'Gurumu belum membagikan bacaan. Nanti muncul di sini.')}`;
  }

  function sTugas(u, id) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    if (id) {
      const it = q.item(id);
      if (it && it.kind === 'tugas' && it.classId === u.classId) return sTugasDetail(u, it, c);
    }
    const list = q.itemsOf(u.classId, 'tugas');
    const todo = list.filter(i => !q.status(i, u.id).done);
    const done = list.filter(i => q.status(i, u.id).done).reverse();
    return `
      ${pageHead({ title: sd ? 'Tugasku' : 'Tugas', sub: sd ? 'Tugas dari gurumu ada di sini.' : 'Kirim jawabanmu sebelum tenggat. Waktu pengiriman tercatat otomatis.' })}
      <section><div class="section-title"><h2>${sd ? 'Belum dikerjakan' : 'Belum dikumpulkan'}</h2></div>
        ${todo.length ? `<div class="list">${todo.map(i => itemRow(u, i)).join('')}</div>` : empty(list.length ? (sd ? 'Hore, semua tugas sudah selesai!' : 'Semua tugas sudah dikumpulkan') : 'Belum ada tugas', list.length ? '' : 'Tugas dari gurumu akan muncul di sini.')}</section>
      ${done.length ? `<section><div class="section-title"><h2>${sd ? 'Sudah dikerjakan' : 'Sudah dikumpulkan'}</h2></div><div class="list">${done.map(i => itemRow(u, i)).join('')}</div></section>` : ''}`;
  }

  function sTugasDetail(u, it, c) {
    const sd = c.level === 'SD';
    const s = q.status(it, u.id);
    const sub = s.record;
    const t = q.user(c.teacherId);
    const canEdit = !s.graded;
    return `
      <a class="btn btn-ghost btn-sm" href="#/tugas" style="align-self:flex-start">${ic('back', 'ico-sm')}${sd ? 'Kembali ke Tugasku' : 'Kembali ke daftar tugas'}</a>
      ${pageHead({ eyebrow: `Tugas dari ${esc(t ? t.name : 'guru')}`, title: esc(it.title) + (it.group ? ' <span class="tag">kelompok</span>' : ''), sub: `Tenggat: ${fmtFull(it.due)} (${relDue(it.due)})` })}
      <div class="split">
        <div class="stack">
          <div class="panel stack">
            ${it.target ? `<div class="callout">${ic('star')}<p><b>Target:</b> ${esc(it.target)}</p></div>` : ''}
            <div><h2 style="font-size:17px;margin-bottom:6px">${sd ? 'Yang harus kamu lakukan' : 'Petunjuk'}</h2><div class="reader">${richText(it.instructions)}</div></div>
          </div>
          ${canEdit ? `
          <form class="panel form" data-form="submit-tugas" data-item="${it.id}" novalidate>
            <h2 style="font-size:17px">${sub ? 'Ubah jawabanmu' : sd ? 'Tulis jawabanmu di sini' : 'Kirim jawabanmu'}</h2>
            ${it.group ? `<div class="field"><label for="sb-members">Nama anggota kelompok</label><input class="input" id="sb-members" name="members" value="${esc(sub ? sub.members : '')}" placeholder="contoh: Bima, Kirana, Yoga"></div>` : ''}
            <div class="field"><label for="sb-text">${sd ? 'Jawabanku' : 'Jawaban'}</label><textarea class="textarea" id="sb-text" name="text" rows="6" placeholder="${sd ? 'Tulis di sini, ya…' : 'Tulis jawabanmu di sini.'}">${esc(sub ? sub.text : '')}</textarea></div>
            <div class="field"><span class="label">${sd ? 'Foto atau berkas (kalau ada)' : 'Lampiran (tidak wajib)'}</span>
              <label class="file-drop" for="sb-file">${ic('up')}<span id="sb-file-name">${sub && sub.fileName ? esc(sub.fileName) : 'Pilih foto atau berkas'}</span><input type="file" id="sb-file" name="file" data-change="file-name" data-target="sb-file-name"></label></div>
            <p class="form-error" role="alert" hidden></p>
            <div class="form-actions"><button class="btn btn-primary">${ic('up')}${sub ? 'Kirim ulang' : sd ? 'Kirim ke guru' : 'Kumpulkan'}</button></div>
            ${sub ? `<p class="small muted">Terakhir dikirim ${fmtFull(sub.submittedAt)}. Kamu masih bisa mengubahnya sebelum dinilai.</p>` : ''}
          </form>` : `
          <div class="panel stack"><h2 style="font-size:17px">Jawabanmu</h2>
            ${sub.members ? `<p class="small"><b>Anggota:</b> ${esc(sub.members)}</p>` : ''}
            <div class="answer">${esc(sub.text) || '<span class="muted">Tanpa teks.</span>'}</div>
            ${sub.fileName ? `<div><span class="attach">${ic('file', 'ico-sm')}${esc(sub.fileName)}</span></div>` : ''}
            <p class="small muted">Dikirim ${fmtFull(sub.submittedAt)}${s.late ? ' (lewat tenggat)' : ''}.</p></div>`}
        </div>
        <aside class="stack">
          <div class="panel stack"><h2 style="font-size:17px">Status</h2>${statusPill(it, s)}
            ${s.graded ? `<div class="row">${scoreRing(s.score, sd)}<p class="small" style="color:var(--ink-2);flex:1">${sd ? 'Baca pesan gurumu di bawah, ya!' : 'Baca masukan gurumu untuk tahu langkah selanjutnya.'}</p></div>` : `<p class="small muted">${s.done ? 'Gurumu akan menilai dan menulis masukan.' : 'Belum ada jawaban yang dikirim.'}</p>`}
          </div>
          ${s.graded && sub.feedback ? sheet(sub, c.level) : ''}
        </aside>
      </div>`;
  }

  function scoreRing(score, sd) {
    const col = score >= 85 ? 'var(--good)' : score < 70 ? 'var(--redpen)' : 'var(--navy)';
    return `<div class="score-ring" style="--p:${score};--c:${col}"><span class="num">${score}<small>${sd ? 'nilaimu' : 'dari 100'}</small></span></div>`;
  }
  function starsFor(score) {
    const n = score >= 90 ? 5 : score >= 80 ? 4 : score >= 70 ? 3 : score >= 60 ? 2 : 1;
    return `<span class="stars" aria-label="${n} dari 5 bintang">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" class="${i > n ? 'off' : ''}" aria-hidden="true">${P.star}</svg>`).join('')}</span>`;
  }

  /* ---------- Kuis (siswa) ---------- */
  const draftKey = (qid, sid) => `ruangajar:draft:${qid}:${sid}`;
  function readDraft(qid, sid) { try { return JSON.parse(localStorage.getItem(draftKey(qid, sid)) || 'null'); } catch (e) { return null; } }
  function writeDraft(qid, sid, v) { try { localStorage.setItem(draftKey(qid, sid), JSON.stringify(v)); return true; } catch (e) { return false; } }
  function clearDraft(qid, sid) { try { localStorage.removeItem(draftKey(qid, sid)); } catch (e) { /* abaikan */ } }

  function sKuis(u, id) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    if (id) {
      const it = q.item(id);
      if (it && it.kind === 'kuis' && it.classId === u.classId) return sKuisDetail(u, it, c);
    }
    const list = q.itemsOf(u.classId, 'kuis');
    return `
      ${pageHead({ title: sd ? 'Kuisku' : 'Kuis', sub: sd ? 'Jawab pertanyaannya, lalu lihat berapa yang benar!' : 'Kuis pilihan ganda. Nilainya langsung keluar begitu kamu selesai.' })}
      ${list.length ? `<div class="list">${list.slice().reverse().map(i => itemRow(u, i)).join('')}</div>` : empty('Belum ada kuis', 'Gurumu belum membuat kuis. Nanti muncul di sini.')}`;
  }

  function sKuisDetail(u, it, c) {
    const sd = c.level === 'SD';
    const att = q.attempt(it.id, u.id);
    const back = `<a class="btn btn-ghost btn-sm" href="#/kuis" style="align-self:flex-start">${ic('back', 'ico-sm')}${sd ? 'Kembali ke Kuisku' : 'Kembali ke daftar kuis'}</a>`;
    if (att) {
      const right = att.answers.filter((a, i) => a === it.questions[i].answer).length;
      return `${back}
        ${pageHead({ eyebrow: 'Hasil kuis', title: esc(it.title), sub: `Dikerjakan ${fmtFull(att.submittedAt)}.` })}
        <div class="panel row" style="gap:20px">${scoreRing(att.score, sd)}
          <div class="stack" style="gap:6px;flex:1;min-width:200px">
            ${sd ? starsFor(att.score) : ''}
            <p style="font-size:17px"><b>${right} dari ${it.questions.length}</b> jawaban benar.</p>
            <p class="small" style="color:var(--ink-2)">${att.score >= 80 ? (sd ? 'Keren! Kamu sudah paham.' : 'Bagus sekali. Pemahamanmu sudah kuat.') : (sd ? 'Tidak apa-apa. Baca lagi bacaannya, ya.' : 'Lihat soal yang keliru di bawah, lalu baca ulang bagian materinya.')}</p>
          </div></div>
        <div class="quiz">${it.questions.map((qq, i) => `
          <div class="qcard"><span class="qn">Soal ${i + 1}</span><h3>${esc(qq.q)}</h3>
            <div class="opts">${qq.options.map((o, oi) => {
              const cls = oi === qq.answer ? 'right' : oi === att.answers[i] ? 'wrongpick' : '';
              return `<div class="opt static ${cls}"><span class="l">${'ABCD'[oi]}</span><span>${esc(o)}</span>${oi === qq.answer ? '<span class="pill ok" style="margin-left:auto">Jawaban benar</span>' : oi === att.answers[i] ? '<span class="pill bad" style="margin-left:auto">Pilihanmu</span>' : ''}</div>`;
            }).join('')}</div></div>`).join('')}</div>`;
    }
    const draft = readDraft(it.id, u.id) || {};
    const answered = Object.keys(draft.answers || {}).length;
    return `${back}
      ${pageHead({ eyebrow: `${it.questions.length} soal · tenggat ${fmtShort(it.due)}`, title: esc(it.title), sub: sd ? 'Pilih satu jawaban untuk setiap soal. Tenang, jawabanmu tersimpan sendiri.' : 'Pilih satu jawaban untuk setiap soal. Jawabanmu tersimpan otomatis di perangkat ini, jadi aman kalau sinyal putus.' })}
      <form class="quiz" data-form="quiz" data-item="${it.id}" novalidate>
        ${it.questions.map((qq, i) => `
          <fieldset class="qcard" style="margin:0"><legend class="sr-only">Soal ${i + 1}</legend><span class="qn">Soal ${i + 1}</span><h3>${esc(qq.q)}</h3>
            <div class="opts">${qq.options.map((o, oi) => `<label class="opt"><input type="radio" name="qa-${i}" value="${oi}" ${draft.answers && draft.answers[i] === oi ? 'checked' : ''} data-change="quiz-draft"><span class="l">${'ABCD'[oi]}</span><span>${esc(o)}</span></label>`).join('')}</div>
          </fieldset>`).join('')}
        <div class="quiz-bar">
          <span class="saved" id="draft-state">${answered ? `${ic('check', 'ico-sm')}<span>${answered} dari ${it.questions.length} dijawab · tersimpan ${draft.at ? fmtTime(draft.at) : ''}</span>` : `<span class="muted">0 dari ${it.questions.length} dijawab</span>`}</span>
          <button class="btn btn-primary">${ic('check')}${sd ? 'Selesai!' : 'Kirim jawaban'}</button>
        </div>
      </form>`;
  }

  /* ---------- Nilai (siswa) ---------- */
  function sNilai(u) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    const sc = q.scoresOf(u.id).reverse();
    const avg = q.average(u.id);
    const cavg = q.classAverage(u.classId);
    const fbs = st().submissions.filter(s => s.studentId === u.id && s.feedback && s.score != null).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''));
    const trendNote = avg == null || cavg == null ? '' : avg >= cavg
      ? (sd ? 'Kamu sudah belajar dengan baik. Pertahankan, ya!' : 'Capaianmu sudah di atas rata-rata kelas. Coba tantang dirimu dengan langkah berikutnya dari guru.')
      : (sd ? 'Pelan-pelan saja. Baca pesan gurumu dan coba lagi.' : 'Capaianmu masih di bawah rata-rata kelas. Mulailah dari masukan "langkah berikutnya" di bawah ini.');
    return `
      ${pageHead({ title: sd ? 'Nilaiku' : 'Nilai & Masukan', sub: sd ? 'Bintang dan pesan dari gurumu.' : 'Semua nilai dan masukan guru untukmu. Angka di sini sama persis dengan yang dilihat guru dan orang tuamu.', actions: c.level === 'SMA' && sc.length ? `<button class="btn" data-action="export-mine">${ic('down')}Unduh rekap nilaiku</button>` : '' })}
      <div class="panel row" style="gap:22px">
        ${avg != null ? scoreRing(avg, sd) : ''}
        <div class="stack" style="gap:6px;flex:1;min-width:220px">
          <p class="small muted">Rata-rata nilaimu${cavg != null && !sd ? ` · rata-rata kelas ${cavg}` : ''}</p>
          ${sd && avg != null ? starsFor(avg) : ''}
          <p>${avg == null ? 'Belum ada nilai. Kerjakan tugas atau kuis dulu, ya.' : trendNote}</p>
        </div>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>${sd ? 'Semua nilaiku' : 'Rincian nilai'}</h2></div>
          ${sc.length ? `<div class="panel bars">${sc.map(x => `<div class="bar-row ${x.st.score < 70 ? 'low' : ''}">
            <span class="lbl"><span class="tag ${x.item.kind}">${x.item.kind}</span><a href="#/${x.item.kind === 'kuis' ? 'kuis' : 'tugas'}/${x.item.id}" style="color:inherit">${esc(x.item.title)}</a></span>
            <div class="bar"><i style="width:${x.st.score}%"></i></div><span class="pct">${x.st.score}</span></div>`).join('')}</div>` : empty('Belum ada nilai', 'Nilai muncul setelah tugas dinilai atau kuis dikerjakan.')}
        </section>
        <section>
          <div class="section-title"><h2>${sd ? 'Pesan dari guru' : 'Masukan guru'}</h2></div>
          ${fbs.length ? `<div class="stack">${fbs.map(s => `<div><p class="small muted" style="margin-bottom:6px">${esc(q.item(s.itemId).title)} · ${fmtShort(s.gradedAt)}</p>${sheet(s, c.level)}</div>`).join('')}</div>` : empty('Belum ada masukan', 'Masukan muncul setelah gurumu menilai tugasmu.')}
        </section>
      </div>`;
  }

  /* =========================================================
     ORANG TUA
     ========================================================= */
  function linkChildForm(first, inModal) {
    return `<form class="${inModal ? '' : 'panel '}form" data-form="link-child" novalidate>
      ${inModal ? '' : `<div><h2 style="font-size:19px">${first ? 'Hubungkan dengan akun anak' : 'Tambah anak lain'}</h2></div>`}
      <p class="small muted">Masukkan kode anak. Kode ini ada di halaman beranda akun siswa, atau tanyakan kepada wali kelas.</p>
      <div class="field"><label for="lc-code">Kode anak</label><input class="input code-input big" id="lc-code" name="code" autocapitalize="characters" autocomplete="off" placeholder="contoh: RK7P2M"></div>
      <p class="form-error" role="alert" hidden></p>
      <button class="btn btn-primary">${ic('link')}Hubungkan</button>
    </form>`;
  }

  function oBeranda(u) {
    const kids = q.childrenOf(u);
    if (!kids.length) {
      return `${pageHead({ hand: `${greeting()},`, title: `${esc(u.name)}.`, sub: 'Akun Anda sudah siap. Hubungkan dengan akun anak untuk melihat perkembangan belajarnya.' })}
        <div class="grid-2">${linkChildForm(true)}
          <div class="panel stack"><h2 style="font-size:19px">Apa yang bisa Anda lihat?</h2>
            <ol class="help-steps"><li><span><b>Nilai dan rata-rata</b>Sama persis dengan yang dicatat guru.</span></li>
            <li><span><b>Tugas yang belum dikerjakan</b>Lengkap dengan tenggatnya.</span></li>
            <li><span><b>Masukan dari guru</b>Termasuk langkah berikutnya untuk didampingi di rumah.</span></li></ol></div>
        </div>`;
    }
    const sel = st().ui.activeChild[u.id];
    const child = kids.find(k => k.id === sel) || kids[0];
    const chips = kids.length > 1 ? `<div class="chips">${kids.map(k => `<button class="chip ${k.id === child.id ? 'on' : ''}" data-action="pick-child" data-id="${k.id}">${esc(firstName(k))}</button>`).join('')}</div>` : '';
    const c = q.cls(child.classId);
    const head = pageHead({ hand: `${greeting()},`, title: `${esc(u.name)}.`, sub: `Berikut perkembangan belajar ${esc(firstName(child))}. Halaman ini hanya untuk dilihat, jadi Anda tidak perlu khawatir salah tekan.`, actions: `<button class="btn" data-action="add-child">${ic('plus')}Tambah anak</button>` });
    if (!c) {
      return `${head}${chips}<div class="panel row" style="gap:16px">${avatar(child, 'lg')}<div><h2 style="font-size:20px">${esc(child.name)}</h2><p class="muted small">Belum bergabung ke kelas.</p></div></div>
        ${empty('Belum ada data belajar', `${esc(firstName(child))} belum bergabung ke kelas. Minta ${esc(firstName(child))} memasukkan kode kelas dari gurunya.`)}`;
    }
    const t = q.user(c.teacherId);
    const avg = q.average(child.id);
    const items = q.itemsOf(child.classId);
    const todo = items.filter(i => !q.status(i, child.id).done);
    const sc = q.scoresOf(child.id).reverse().slice(0, 5);
    const fb = st().submissions.filter(s => s.studentId === child.id && s.feedback && s.score != null).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''))[0];
    const done = items.length - todo.length;
    return `
      ${head}${chips}
      <div class="panel row" style="gap:16px">${avatar(child, 'lg')}<div style="flex:1;min-width:180px"><h2 style="font-size:20px">${esc(child.name)}</h2><p class="muted small">${esc(c.name)} · ${c.level} · ${esc(c.subject)} bersama ${esc(t ? t.name : '-')}</p></div>
        ${avg != null ? scoreRing(avg) : ''}</div>
      <div class="stats">
        <div class="stat"><span class="k">Rata-rata nilai</span><span class="v num">${avg ?? '–'}</span><span class="d">${avg == null ? 'Belum ada nilai' : `Rata-rata kelas ${q.classAverage(c.id) ?? '–'}`}</span></div>
        <div class="stat"><span class="k">Pekerjaan selesai</span><span class="v num">${done}<small>/${items.length}</small></span><span class="d">tugas & kuis</span></div>
        <div class="stat ${todo.length ? 'hl' : ''}"><span class="k">Belum dikerjakan</span><span class="v num">${todo.length}</span><span class="d">${todo.filter(i => Date.now() > new Date(i.due)).length} di antaranya lewat tenggat</span></div>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>Yang belum dikerjakan</h2></div>
          ${todo.length ? `<div class="list">${todo.map(i => { const s = q.status(i, child.id); return `<div class="li"><span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
            <span><span class="t">${esc(i.title)}</span><span class="m"><span>${ic('clock', 'ico-sm')} Tenggat ${fmtShort(i.due)} (${relDue(i.due)})</span></span></span><span class="r">${statusPill(i, s)}</span></div>`; }).join('')}</div>` : empty(items.length ? 'Semua sudah dikerjakan' : 'Belum ada tugas', items.length ? `${esc(firstName(child))} sudah menyelesaikan semua tugas dan kuis.` : 'Guru belum memberikan tugas.')}
          <div class="section-title" style="margin-top:22px"><h2>Nilai terbaru</h2></div>
          ${sc.length ? `<div class="panel bars">${sc.map(x => `<div class="bar-row ${x.st.score < 70 ? 'low' : ''}"><span class="lbl"><span class="tag ${x.item.kind}">${x.item.kind}</span>${esc(x.item.title)}</span><div class="bar"><i style="width:${x.st.score}%"></i></div><span class="pct">${x.st.score}</span></div>`).join('')}</div>` : empty('Belum ada nilai', '')}
        </section>
        <section>
          <div class="section-title"><h2>Masukan guru terbaru</h2></div>
          ${fb ? `<p class="small muted" style="margin-bottom:6px">${esc(q.item(fb.itemId).title)}</p>${sheet(fb, c.level)}` : empty('Belum ada masukan', '')}
          <div class="callout info" style="margin-top:16px">${ic('heart')}<p><b>Cara mendampingi di rumah:</b> tanyakan satu hal yang ${esc(firstName(child))} pelajari hari ini, lalu bacakan bersama bagian "langkah berikutnya" dari guru. ${c.level === 'SD' ? 'Untuk anak SD, temani saat membuka materi dan mengerjakan tugas.' : ''}</p></div>
        </section>
      </div>`;
  }

  /* =========================================================
     OPERATOR SEKOLAH
     ========================================================= */
  function aBeranda(u) {
    const school = q.school(u.schoolId);
    const U = q.usersOfSchool(u.schoolId);
    const count = r => U.filter(x => x.role === r).length;
    const studentIds = new Set(U.filter(x => x.role === 'siswa').map(x => x.id));
    const parents = st().users.filter(x => x.role === 'ortu' && (x.childIds || []).some(id => studentIds.has(id))).length;
    const recent = st().submissions.filter(s => studentIds.has(s.studentId)).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 5);
    const classes = q.classesOfSchool(u.schoolId);
    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(shortName(u))}.`, sub: `Ringkasan ${esc(school ? school.name : 'sekolah')}.` })}
      ${school ? `<div class="panel row" style="justify-content:space-between;gap:16px">
        <div><h2 style="font-size:18px">Kode sekolah</h2><p class="small muted" style="max-width:52ch">Bagikan kode ini kepada guru. Mereka memasukkannya saat membuat akun agar tergabung ke sekolah ini.</p></div>
        ${codeChip(school.code, 'kode sekolah')}
      </div>` : ''}
      <div class="stats">
        <a class="stat" href="#/kelas"><span class="k">Kelas</span><span class="v num">${classes.length}</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Guru</span><span class="v num">${count('guru')}</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Peserta didik</span><span class="v num">${count('siswa')}</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Orang tua terhubung</span><span class="v num">${parents}</span></a>
      </div>
      ${!classes.length ? `<ol class="onboard">
        <li class="on"><b>Tambahkan guru</b><span>Bagikan kode sekolah, atau buatkan akun guru dari menu Pengguna.</span><a class="btn btn-primary" href="#/pengguna">${ic('users')}Buka Pengguna</a></li>
        <li><b>Buat kelas</b><span>Pilih jenjang dan guru untuk setiap kelas. Guru juga bisa membuat kelas sendiri.</span></li>
        <li><b>Siswa bergabung</b><span>Siswa mendaftar sendiri dengan kode kelas, atau Anda buatkan akunnya.</span></li>
      </ol>` : ''}
      <div class="split">
        <section><div class="section-title"><h2>Kegiatan terbaru</h2></div>
          ${recent.length ? `<div class="list">${recent.map(s => { const stu = q.user(s.studentId); const it = q.item(s.itemId); if (!stu || !it) return ''; return `<div class="li">${avatar(stu)}<span><span class="t">${esc(stu.name)} mengumpulkan "${esc(it.title)}"</span><span class="m"><span>${ago(s.submittedAt)}</span><span>${esc((q.cls(stu.classId) || {}).name || '')}</span></span></span><span class="r">${s.score != null ? '<span class="pill ok">Dinilai</span>' : '<span class="pill warn">Menunggu nilai</span>'}</span></div>`; }).join('')}</div>` : empty('Belum ada kegiatan', 'Pengumpulan tugas siswa akan tampil di sini.')}
        </section>
        <section class="stack"><div class="section-title" style="margin:0"><h2>Kesepakatan sekolah</h2></div>
          <div class="panel stack"><p class="small" style="color:var(--ink-2)">Buku nilai di RUANGAJAR disepakati sebagai rekap resmi sekolah, supaya guru tidak mengerjakan rekap dua kali.</p>
            ${school && school.id === RA.DEMO_SCHOOL ? `<p class="small muted">Ini sekolah contoh. Kembalikan data contoh bila ingin mengulang uji coba. Akun buatan sendiri tidak ikut terhapus.</p>
            <button class="btn btn-danger" data-action="reset-demo">${ic('cycle')}Kembalikan data contoh</button>` : ''}</div>
        </section>
      </div>`;
  }

  function aKelas(u) {
    const classes = q.classesOfSchool(u.schoolId);
    return `
      ${pageHead({ title: 'Kelas', sub: 'Setiap kelas punya satu jenjang dan satu guru. Tampilan siswa menyesuaikan jenjangnya secara otomatis.', actions: `<button class="btn btn-primary" data-action="new-class">${ic('plus')}Tambah kelas</button>` })}
      ${classes.length ? `<div class="list">${classes.map(c => { const t = q.user(c.teacherId); const n = q.studentsOf(c.id).length; return `<div class="li"><span class="li-icon">${ic('school')}</span>
        <span><span class="t">${esc(c.name)} · ${esc(c.subject)}</span><span class="m"><span>${esc(t ? t.name : 'Belum ada guru')}</span><span class="num">${n} siswa</span><span>kode ${esc(c.code)}</span></span></span>
        <span class="r"><span class="tag lvl-${c.level}">${c.level}</span><button class="btn btn-sm btn-ghost btn-danger" data-action="del-class" data-id="${c.id}" aria-label="Hapus ${esc(c.name)}">${ic('trash', 'ico-sm')}</button></span></div>`; }).join('')}</div>`
        : empty('Belum ada kelas', 'Tambahkan kelas pertama sekolah Anda.', `<button class="btn btn-primary" data-action="new-class">${ic('plus')}Tambah kelas</button>`)}
      <div class="callout info">${ic('help')}<p><b>SD:</b> menu besar bergambar dan istilah akrab seperti "Tugasku". <b>SMP:</b> istilah pelajaran biasa, siswa mulai mengatur waktunya sendiri. <b>SMA:</b> tambahan tugas kelompok dan unduh rekap nilai.</p></div>`;
  }

  function aPengguna(u) {
    const U = q.usersOfSchool(u.schoolId);
    const studentIds = new Set(U.filter(x => x.role === 'siswa').map(x => x.id));
    const parents = st().users.filter(x => x.role === 'ortu' && (x.childIds || []).some(id => studentIds.has(id)));
    const groups = [['Guru', U.filter(x => x.role === 'guru')], ['Peserta didik', U.filter(x => x.role === 'siswa')], ['Orang tua', parents], ['Operator', U.filter(x => x.role === 'operator')]];
    return `
      ${pageHead({ title: 'Pengguna', sub: 'Setiap orang punya satu akun dengan hak akses sesuai perannya. Anda bisa membuatkan akun, atau membiarkan mereka mendaftar sendiri.', actions: `<button class="btn btn-primary" data-action="new-user">${ic('plus')}Tambah pengguna</button>` })}
      ${groups.map(([label, list]) => `<section><div class="section-title"><h2>${label} <span class="muted num" style="font-weight:500">(${list.length})</span></h2></div>
        ${list.length ? `<div class="list">${list.map(x => `<div class="li">${avatar(x)}<span><span class="t">${esc(x.name)}</span><span class="m"><span>@${esc(x.username)}</span><span>${esc(whoLine(x))}</span></span></span>
          <span class="r">${x.id !== u.id ? `<button class="btn btn-sm btn-ghost" data-action="reset-pass" data-id="${x.id}">${ic('key', 'ico-sm')}Atur ulang sandi</button><button class="btn btn-sm btn-ghost btn-danger" data-action="del-user" data-id="${x.id}" aria-label="Hapus ${esc(x.name)}">${ic('trash', 'ico-sm')}</button>` : '<span class="pill plain">Anda</span>'}</span></div>`).join('')}</div>`
          : `<p class="small muted">Belum ada ${label.toLowerCase()}.</p>`}</section>`).join('')}`;
  }

  function classForm() {
    const u = me();
    const gurus = q.usersOfSchool(u.schoolId).filter(x => x.role === 'guru');
    openModal(`${modalHead('Tambah kelas')}
      <form class="modal-body form" data-form="add-class" novalidate>
        <div class="field-row">
          <div class="field"><label for="c-name">Nama kelas</label><input class="input" id="c-name" name="name" placeholder="contoh: Kelas 7A"></div>
          <div class="field"><label for="c-subject">Mata pelajaran</label><input class="input" id="c-subject" name="subject" placeholder="contoh: Matematika"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="c-level">Jenjang</label><select class="select" id="c-level" name="level"><option>SD</option><option selected>SMP</option><option>SMA</option></select></div>
          <div class="field"><label for="c-teacher">Guru</label><select class="select" id="c-teacher" name="teacherId"><option value="">Belum ditentukan</option>${gurus.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></div>
        </div>
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Simpan kelas</button></div>
      </form>`);
  }
  function userForm() {
    const u = me();
    const classes = q.classesOfSchool(u.schoolId);
    const kids = q.usersOfSchool(u.schoolId).filter(x => x.role === 'siswa');
    openModal(`${modalHead('Tambah pengguna', 'Setelah disimpan, berikan nama pengguna dan kata sandinya kepada yang bersangkutan.')}
      <form class="modal-body form" data-form="add-user" novalidate>
        <div class="field"><label for="u-role">Peran</label><select class="select" id="u-role" name="role" data-change="role-fields">
          <option value="guru">Guru</option><option value="siswa">Peserta didik</option><option value="ortu">Orang tua</option><option value="operator">Operator sekolah</option></select></div>
        <div class="field"><label for="u-name">Nama lengkap</label><input class="input" id="u-name" name="name" placeholder="contoh: Bu Rina Marlina"></div>
        <div class="field-row">
          <div class="field"><label for="u-user">Nama pengguna</label><input class="input" id="u-user" name="username" autocapitalize="none" spellcheck="false" placeholder="contoh: rina.m"></div>
          <div class="field"><label for="u-pass">Kata sandi awal</label><input class="input" id="u-pass" name="password" value="${RA.newPassword()}"></div>
        </div>
        <div class="field" data-for="guru"><label for="u-note">Keterangan</label><input class="input" id="u-note" name="note" placeholder="contoh: Guru Matematika"></div>
        <div class="field" data-for="siswa" hidden><label for="u-class">Kelas</label><select class="select" id="u-class" name="classId"><option value="">Belum ada kelas</option>${classes.map(c => `<option value="${c.id}">${esc(c.name)} · ${c.level}</option>`).join('')}</select></div>
        <div class="field" data-for="ortu" hidden><label for="u-child">Nama anak</label><select class="select" id="u-child" name="childId"><option value="">Hubungkan nanti</option>${kids.map(k => `<option value="${k.id}">${esc(k.name)}</option>`).join('')}</select></div>
        <p class="form-error" role="alert" hidden></p>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Simpan pengguna</button></div>
      </form>`);
  }

  function showCredentials(u, pass, title) {
    openModal(`${modalHead(title || 'Akun siap dipakai', `Berikan info masuk ini kepada ${esc(u.name)}. Kata sandi tidak akan ditampilkan lagi.`)}
      <div class="modal-body stack">
        <div class="cred"><span class="k">Nama pengguna</span><span class="v">${esc(u.username)}</span>
          <span class="k">Kata sandi</span><span class="v">${esc(pass)}</span></div>
        <div class="form-actions"><button class="btn" data-action="copy" data-text="Nama pengguna: ${esc(u.username)} | Kata sandi: ${esc(pass)}">${ic('copy')}Salin info masuk</button><button class="btn btn-primary" data-action="close-modal">Selesai</button></div>
      </div>`, { noFocus: true });
  }

  /* =========================================================
     Akun saya
     ========================================================= */
  function accountModal() {
    const u = me();
    const school = q.school(u.schoolId);
    let codes = '';
    if (u.role === 'siswa') codes = `<div class="panel stack"><b>Kode untuk orang tuamu</b><p class="small muted">Orang tua memasukkan kode ini di akun mereka.</p>${codeChip(u.code, 'kode anak')}</div>`;
    if (u.role === 'guru') {
      const list = q.classesOfTeacher(u.id);
      codes = `<div class="panel stack"><b>Kode kelas Anda</b>${list.length ? list.map(c => `<div class="row" style="justify-content:space-between"><span>${esc(c.name)} · ${esc(c.subject)}</span>${codeChip(c.code, 'kode kelas')}</div>`).join('') : '<p class="small muted">Belum ada kelas.</p>'}
        ${school ? `<div class="row" style="justify-content:space-between"><span class="small muted">Kode sekolah (untuk rekan guru)</span>${codeChip(school.code, 'kode sekolah')}</div>` : ''}</div>`;
    }
    if (u.role === 'operator' && school) codes = `<div class="panel stack"><b>Kode sekolah</b>${codeChip(school.code, 'kode sekolah')}</div>`;

    openModal(`${modalHead('Akun saya')}
      <div class="modal-body stack">
        <div class="row" style="gap:14px">${avatar(u, 'lg')}<div><b style="font-size:17px">${esc(u.name)}</b><p class="small muted">@${esc(u.username)} · ${roleName(u)}${school ? ' · ' + esc(school.name) : ''}</p></div></div>
        ${codes}
        <form class="form" data-form="profile" novalidate>
          <div class="field"><label for="ac-name">Nama lengkap</label><div class="row" style="flex-wrap:nowrap"><input class="input" id="ac-name" name="name" value="${esc(u.name)}"><button class="btn">Simpan</button></div></div>
        </form>
        <details class="acc-pass"><summary>Ganti kata sandi</summary>
          <form class="form" data-form="password" novalidate style="margin-top:12px">
            ${passField('ac-old', 'old', 'Kata sandi sekarang', 'current-password')}
            <div class="field-row">${passField('ac-new', 'pw', 'Kata sandi baru', 'new-password')}${passField('ac-new2', 'pw2', 'Ulangi kata sandi baru', 'new-password')}</div>
            <p class="form-error" role="alert" hidden></p>
            <div class="form-actions"><button class="btn btn-primary">${ic('key')}Ganti kata sandi</button></div>
          </form>
        </details>
        <div class="form-actions" style="justify-content:space-between"><button class="btn btn-ghost" data-action="help">${ic('help')}Panduan singkat</button><button class="btn btn-danger" data-action="logout">${ic('out')}Keluar</button></div>
      </div>`, { noFocus: true });
  }

  /* =========================================================
     Panduan singkat per peran
     ========================================================= */
  function helpModal() {
    const u = me();
    const sd = isSD(u);
    const steps = {
      guru: [
        ['Buat kelas', 'Di menu Kelas Saya, buat kelas lalu bagikan kodenya kepada siswa.'],
        ['Bagikan materi', 'Buka menu Materi, tekan "Tambah materi", tulis bacaan singkat beserta targetnya.'],
        ['Beri tugas atau kuis', 'Di menu Tugas & Kuis, atur tenggatnya. Siswa langsung mendapat pemberitahuan.'],
        ['Nilai di satu halaman', 'Menu Menilai menampilkan semua jawaban kelas. Isi nilai dan masukan tiga bagian.'],
        ['Tidak perlu rekap ulang', 'Buku Nilai terisi sendiri dan bisa diunduh untuk arsip.']
      ],
      siswa: sd ? [
        ['Bacaanku', 'Tekan kotak hijau untuk membaca materi dari guru.'],
        ['Tugasku', 'Tulis jawabanmu, lalu tekan "Kirim ke guru".'],
        ['Kuisku', 'Pilih satu jawaban di setiap soal, lalu tekan "Selesai!".'],
        ['Nilaiku', 'Lihat bintangmu dan baca pesan dari guru.']
      ] : [
        ['Gabung ke kelas', 'Masukkan kode kelas dari gurumu di beranda.'],
        ['Baca materi', 'Buka menu Materi. Tekan "Simpan" untuk membaca tanpa internet.'],
        ['Kumpulkan tugas', 'Buka tugas, tulis jawaban atau lampirkan berkas, lalu tekan "Kumpulkan".'],
        ['Kerjakan kuis', 'Jawabanmu tersimpan otomatis. Nilai langsung keluar setelah dikirim.'],
        ['Baca masukan guru', 'Di menu Nilai & Masukan, mulailah dari bagian "Langkah berikutnya".']
      ],
      ortu: [
        ['Hubungkan dengan anak', 'Masukkan kode anak yang ada di akun siswa.'],
        ['Lihat ringkasan', 'Rata-rata nilai, pekerjaan yang belum selesai, dan masukan guru ada di satu halaman.'],
        ['Dampingi di rumah', 'Bacakan bagian "langkah berikutnya" bersama anak.'],
        ['Pantau pemberitahuan', 'Tanda lonceng di atas memberi tahu saat ada nilai baru.']
      ],
      operator: [
        ['Bagikan kode sekolah', 'Guru memakainya saat membuat akun agar masuk ke sekolah Anda.'],
        ['Atur kelas', 'Tambahkan kelas beserta jenjang dan gurunya di menu Kelas.'],
        ['Atur pengguna', 'Buatkan akun atau atur ulang kata sandi di menu Pengguna.']
      ]
    }[u.role];
    openModal(`${modalHead('Panduan singkat', sd ? 'Cara memakai RUANGAJAR' : `Untuk ${roleName(u).toLowerCase()}`)}
      <div class="modal-body"><ol class="help-steps">${steps.map(([t, d]) => `<li><span><b>${t}</b>${d}</span></li>`).join('')}</ol>
      <p class="small muted" style="margin-top:14px">Setiap fitur penting bisa dicapai paling banyak dengan tiga kali klik.</p></div>`);
  }

  /* =========================================================
     Render utama
     ========================================================= */
  const VIEWS = {
    guru: { beranda: gBeranda, kelas: gKelas, materi: gMateri, tugas: gTugas, menilai: gMenilai, nilai: gNilai, laporan: gLaporan },
    siswa: { beranda: sBeranda, materi: sMateri, tugas: sTugas, kuis: sKuis, nilai: sNilai },
    ortu: { beranda: oBeranda },
    operator: { beranda: aBeranda, kelas: aKelas, pengguna: aPengguna }
  };
  let lastPath = '';
  function render() {
    const u = me();
    const app = $('#app');
    document.body.className = '';
    const r = route();
    if (!u) {
      const reg = r.page === 'daftar';
      app.innerHTML = reg ? viewRegister() : viewLogin();
      document.title = reg ? 'Buat akun · RUANGAJAR' : 'Masuk · RUANGAJAR';
      document.body.classList.add('is-auth');
      return;
    }
    const lvl = levelOf(u);
    document.body.classList.add('role-' + u.role);
    if (lvl) document.body.classList.add('lvl-' + lvl.toLowerCase());
    const views = VIEWS[u.role];
    if (!views[r.page]) r.page = 'beranda';
    const body = u.role === 'siswa' && !q.cls(u.classId) ? sJoin(u) : views[r.page](u, r.id);
    app.innerHTML = shell(u, r, body);
    const label = (navFor(u).find(n => n[0] === r.page) || [])[1];
    document.title = `${label ? label + ' · ' : ''}RUANGAJAR`;
    const path = location.hash;
    if (path !== lastPath) { window.scrollTo(0, 0); lastPath = path; }
  }

  /* =========================================================
     Aksi (klik)
     ========================================================= */
  function copyText(text) {
    const fallback = () => toast(`Salin manual: <b>${esc(text)}</b>`);
    try {
      navigator.clipboard.writeText(text).then(() => toast(`Tersalin: <b>${esc(text)}</b>`), fallback);
    } catch (e) { fallback(); }
  }

  const actions = {
    'demo-login'(el) {
      const u = q.userByUsername(el.dataset.username);
      if (u && u.passHash === RA.hashPass(RA.DEMO_PASS, u.salt)) doLogin(u, false);
      else toast('Kata sandi akun contoh ini sudah diubah. Masuk lewat formulir, atau hapus semua data untuk memulai ulang.');
    },
    'toggle-pass'(el) {
      const inp = document.getElementById(el.dataset.target);
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      el.setAttribute('aria-label', inp.type === 'password' ? 'Tampilkan kata sandi' : 'Sembunyikan kata sandi');
    },
    'wipe-all'() {
      askConfirm('Hapus semua data?', 'Semua akun dan data yang Anda buat di perangkat ini akan dihapus. Hanya sekolah contoh yang tersisa.', 'Ya, hapus semua', () => {
        RA.store.wipe(); lastPath = ''; location.hash = '#/masuk'; render(); toast('Semua data sudah dihapus.');
      }, true);
    },
    logout() {
      askConfirm('Keluar dari RUANGAJAR?', 'Anda bisa masuk lagi kapan saja dengan nama pengguna dan kata sandi.', 'Ya, keluar', () => {
        RA.session.clear(); lastPath = ''; location.hash = '#/masuk'; render();
      });
    },
    account: accountModal,
    help: helpModal,
    copy(el) { copyText(el.dataset.text); },
    'close-modal': closeModal,
    'close-modal-back'(el, e) { if (e.target === el) closeModal(); },
    'confirm-yes'() { const fn = pendingConfirm; pendingConfirm = null; closeModal(); if (fn) fn(); },
    notif(el) {
      const panel = $('#notif-panel');
      const open = panel.hidden;
      panel.hidden = !open;
      el.setAttribute('aria-expanded', String(open));
      if (!open) return;
      const list = myNotifs(me()).slice(0, 20);
      panel.innerHTML = `<header><h3>Pemberitahuan</h3>${list.some(n => !n.read) ? '<button class="btn btn-sm btn-ghost" data-action="notif-read">Tandai sudah dibaca</button>' : ''}</header>
        <div class="notif-list">${list.length ? list.map(n => `<a class="notif-item ${n.read ? '' : 'unread'}" href="${esc(n.link)}" data-action="notif-open" data-id="${n.id}"><span class="d"></span><span>${esc(n.text)}<time>${ago(n.at)}</time></span></a>`).join('') : '<div class="notif-empty">Belum ada pemberitahuan.</div>'}</div>`;
    },
    'notif-read'() { const u = me(); st().notifications.forEach(n => { if (n.userId === u.id) n.read = true; }); save(); render(); },
    'notif-open'(el) { const n = st().notifications.find(x => x.id === el.dataset.id); if (n) { n.read = true; save(); } setTimeout(render, 0); },

    'new-class-guru': classFormGuru,
    'open-class'(el) { st().ui.activeClass[me().id] = el.dataset.id; save(); go('#/beranda'); toast('Kelas dibuka.'); },
    'kick-student'(el) {
      const s = q.user(el.dataset.id);
      askConfirm('Keluarkan siswa?', `${esc(s.name)} akan keluar dari kelas. Nilainya tetap tersimpan dan terlihat lagi jika ia bergabung kembali.`, 'Keluarkan', () => {
        s.classId = null; save(); render(); toast(`${esc(firstName(s))} sudah dikeluarkan dari kelas.`);
      }, true);
    },
    'pick-child'(el) { st().ui.activeChild[me().id] = el.dataset.id; save(); render(); },
    'add-child'() { openModal(`${modalHead('Tambah anak')}<div class="modal-body">${linkChildForm(false, true)}</div>`); },

    'new-material': materialForm,
    'open-material'(el) { openMaterial(el.dataset.id); },
    'download-material'(el) {
      const m = q.material(el.dataset.id);
      const c = q.cls(m.classId);
      const text = `${m.title}\n${c.name} · ${c.subject}\n\n${m.target ? 'Target belajar: ' + m.target + '\n\n' : ''}${m.body}\n\n— Disimpan dari RUANGAJAR, ${fmtDate(new Date().toISOString())}`;
      download(`${slug(m.title)}.txt`, text);
      const u = me();
      if (u.role === 'siswa' && !q.isRead(m.id, u.id)) { (st().reads[m.id] = st().reads[m.id] || []).push(u.id); save(); }
      toast('Materi tersimpan di perangkatmu. Bisa dibaca tanpa internet.');
    },
    'download-attachment'(el) {
      const m = q.material(el.dataset.id);
      if (m.attachment && m.attachment.data) {
        fetch(m.attachment.data).then(r => r.blob()).then(b => download(m.attachment.name, b));
      } else toast('Berkas ini terlalu besar untuk disimpan di versi percontohan.');
    },
    'delete-material'(el) {
      const m = q.material(el.dataset.id);
      askConfirm('Hapus materi ini?', `"${esc(m.title)}" akan hilang dari halaman siswa.`, 'Hapus materi', () => {
        st().materials = st().materials.filter(x => x.id !== m.id); delete st().reads[m.id]; save(); render(); toast('Materi dihapus.');
      }, true);
    },
    'new-tugas': tugasForm,
    'new-kuis': kuisForm,
    'qb-add'() { $('#qb').insertAdjacentHTML('beforeend', qbItem()); const last = $$('#qb .qb-item').pop(); $('input[name=q]', last).focus(); },
    'qb-remove'(el) { if ($$('#qb .qb-item').length > 1) el.closest('.qb-item').remove(); else toast('Kuis perlu minimal satu soal.'); },
    'delete-item'(el) {
      const it = q.item(el.dataset.id);
      askConfirm(`Hapus ${it.kind} ini?`, `"${esc(it.title)}" beserta semua jawaban dan nilainya akan dihapus dari buku nilai.`, 'Hapus', () => {
        const s = st();
        s.items = s.items.filter(x => x.id !== it.id);
        s.submissions = s.submissions.filter(x => x.itemId !== it.id);
        s.attempts = s.attempts.filter(x => x.quizId !== it.id);
        save(); render(); toast('Sudah dihapus.');
      }, true);
    },
    remind(el) {
      const stu = q.user(el.dataset.student); const it = q.item(el.dataset.item); const u = me();
      notify([stu.id], `${shortName(u)} mengingatkan: "${it.title}" belum kamu kerjakan. Masih bisa dikirim, ya.`, `#/${it.kind === 'kuis' ? 'kuis' : 'tugas'}/${it.id}`);
      notify(q.parentsOf(stu.id).map(p => p.id), `${firstName(stu)} belum mengerjakan "${it.title}". Mohon bantu ingatkan di rumah.`, '#/beranda');
      save(); toast(`Pengingat terkirim ke ${esc(firstName(stu))}${q.parentsOf(stu.id).length ? ' dan orang tuanya' : ''}.`);
    },
    'export-grades'() { exportGrades(teacherClass(me())); },
    'export-mine'() { const u = me(); exportGrades(q.cls(u.classId), u.id); },
    'reset-demo'() { askConfirm('Kembalikan data contoh?', 'Semua perubahan pada sekolah contoh akan diganti data awal. Akun yang Anda buat sendiri tetap aman.', 'Ya, kembalikan', () => { RA.store.resetDemo(); render(); toast('Data contoh sudah dikembalikan.'); }, true); },
    'new-class': classForm,
    'new-user': userForm,
    'reset-pass'(el) {
      const x = q.user(el.dataset.id);
      askConfirm('Atur ulang kata sandi?', `${esc(x.name)} akan mendapat kata sandi baru. Kata sandi lama tidak berlaku lagi.`, 'Buat sandi baru', () => {
        const pass = RA.newPassword();
        x.salt = RA.newSalt(); x.passHash = RA.hashPass(pass, x.salt); save();
        showCredentials(x, pass, 'Kata sandi baru');
      });
    },
    'del-class'(el) {
      const c = q.cls(el.dataset.id);
      if (q.studentsOf(c.id).length) { toast('Masih ada siswa di kelas ini. Keluarkan dulu siswanya lewat akun guru, atau hapus akun mereka.'); return; }
      askConfirm('Hapus kelas?', `${esc(c.name)} beserta materi dan tugasnya akan dihapus.`, 'Hapus kelas', () => {
        const s = st(); s.classes = s.classes.filter(x => x.id !== c.id);
        const ids = s.items.filter(i => i.classId === c.id).map(i => i.id);
        s.items = s.items.filter(i => i.classId !== c.id); s.materials = s.materials.filter(m => m.classId !== c.id);
        s.submissions = s.submissions.filter(x => !ids.includes(x.itemId)); s.attempts = s.attempts.filter(x => !ids.includes(x.quizId));
        save(); render(); toast('Kelas dihapus.');
      }, true);
    },
    'del-user'(el) {
      const x = q.user(el.dataset.id);
      askConfirm('Hapus pengguna?', `Akun ${esc(x.name)} akan dihapus beserta pekerjaannya.`, 'Hapus akun', () => {
        const s = st();
        s.users = s.users.filter(y => y.id !== x.id);
        s.users.forEach(y => { if (y.childIds) y.childIds = y.childIds.filter(id => id !== x.id); });
        s.submissions = s.submissions.filter(y => y.studentId !== x.id);
        s.attempts = s.attempts.filter(y => y.studentId !== x.id);
        s.notifications = s.notifications.filter(y => y.userId !== x.id);
        s.classes.forEach(c => { if (c.teacherId === x.id) c.teacherId = null; });
        save(); render(); toast('Pengguna dihapus.');
      }, true);
    }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) {
      if ((el.tagName === 'A' && el.dataset.action !== 'notif-open') || el.tagName === 'BUTTON') e.preventDefault();
      actions[el.dataset.action](el, e);
    }
    const panel = $('#notif-panel');
    if (panel && !panel.hidden && !e.target.closest('.notif-wrap')) panel.hidden = true;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if ($('#modal-root').innerHTML) closeModal(); const p = $('#notif-panel'); if (p) p.hidden = true; }
  });

  /* =========================================================
     Perubahan input
     ========================================================= */
  document.addEventListener('change', e => {
    const el = e.target;
    const k = el.dataset.change;
    if (!k) return;
    if (k === 'switch-class') { st().ui.activeClass[me().id] = el.value; save(); go('#/' + route().page); }
    if (k === 'only-pending') { st().ui.onlyPending = el.checked; save(); render(); }
    if (k === 'file-name') { const f = el.files[0]; const t = document.getElementById(el.dataset.target); if (t) t.textContent = f ? `${f.name} (${Math.max(1, Math.round(f.size / 1024))} KB)` : 'Pilih berkas'; }
    if (k === 'role-fields') { $$('[data-for]', el.form).forEach(f => { f.hidden = f.dataset.for !== el.value; }); }
    if (k === 'reg-role') {
      $$('.reg-extra', el.form).forEach(f => { f.hidden = !f.dataset.roles.split(' ').includes(el.value); });
      const nm = $('#rg-name', el.form);
      nm.placeholder = { guru: 'contoh: Bu Rina Marlina', siswa: 'contoh: Aditya Putra', ortu: 'contoh: Ibu Siti Aminah', operator: 'contoh: Pak Budi Hartono' }[el.value];
      showError(el.form, '');
    }
    if (k === 'quiz-draft') {
      const form = el.form; const u = me(); const it = q.item(form.dataset.item);
      const answers = {};
      it.questions.forEach((_, i) => { const c = form.querySelector(`input[name="qa-${i}"]:checked`); if (c) answers[i] = Number(c.value); });
      const at = new Date().toISOString();
      const ok = writeDraft(it.id, u.id, { answers, at });
      $('#draft-state').innerHTML = `${ic('check', 'ico-sm')}<span>${Object.keys(answers).length} dari ${it.questions.length} dijawab · ${ok ? 'tersimpan ' + fmtTime(at) : 'belum bisa disimpan di perangkat ini'}</span>`;
    }
  });

  /* =========================================================
     Formulir
     ========================================================= */
  function readFile(file, limit = 700 * 1024) {
    return new Promise(res => {
      if (!file) return res(null);
      if (file.size > limit) return res({ name: file.name, size: file.size, data: null });
      const r = new FileReader();
      r.onload = () => res({ name: file.name, size: file.size, data: r.result });
      r.onerror = () => res({ name: file.name, size: file.size, data: null });
      r.readAsDataURL(file);
    });
  }
  const val = (d, k) => String(d.get(k) || '').trim();
  const USERNAME_RE = /^[a-z0-9._]{3,20}$/;
  function checkUsername(username) {
    if (!USERNAME_RE.test(username)) return 'Nama pengguna harus 3–20 karakter: huruf kecil, angka, titik, atau garis bawah (tanpa spasi).';
    if (q.userByUsername(username)) return `Nama pengguna "${username}" sudah dipakai. Coba yang lain, misalnya "${username}${Math.floor(Math.random() * 90 + 10)}".`;
    return '';
  }

  const forms = {
    login(f) {
      const d = new FormData(f);
      const username = val(d, 'username').toLowerCase();
      const pw = String(d.get('password') || '');
      if (!username || !pw) return showError(f, 'Isi nama pengguna dan kata sandi dulu, ya.');
      const u = q.userByUsername(username);
      if (!u || u.passHash !== RA.hashPass(pw, u.salt)) return showError(f, 'Nama pengguna atau kata sandi salah. Periksa lagi, ya.');
      doLogin(u, !!d.get('remember'));
    },
    register(f) {
      const d = new FormData(f);
      const role = d.get('role');
      const name = val(d, 'name');
      const username = val(d, 'username').toLowerCase();
      const pw = String(d.get('password') || '');
      const pw2 = String(d.get('password2') || '');
      if (name.length < 3) return showError(f, 'Tulis nama lengkap Anda (minimal 3 huruf).');
      const uErr = checkUsername(username); if (uErr) return showError(f, uErr);
      if (pw.length < 6) return showError(f, 'Kata sandi minimal 6 karakter.');
      if (pw !== pw2) return showError(f, 'Kedua kata sandi belum sama. Ketik ulang, ya.');

      const u = { id: uid(role === 'siswa' ? 's' : role === 'ortu' ? 'o' : 'u'), username, name, role, schoolId: null, salt: RA.newSalt(), createdAt: new Date().toISOString() };
      u.passHash = RA.hashPass(pw, u.salt);
      let joined = null, newSchool = null, child = null;

      if (role === 'operator') {
        const sname = val(d, 'schoolName');
        if (sname.length < 3) return showError(f, 'Tulis nama sekolah yang ingin didaftarkan.');
        newSchool = { id: uid('sch'), name: sname, code: RA.newCode(), createdAt: u.createdAt };
        u.note = 'Operator sekolah';
      }
      if (role === 'guru') {
        const code = val(d, 'schoolCode'); const sname = val(d, 'schoolNameGuru');
        if (code) {
          const sc = q.schoolByCode(code);
          if (!sc) return showError(f, `Kode sekolah "${code.toUpperCase()}" tidak ditemukan. Periksa lagi, atau kosongkan dan isi nama sekolah baru.`);
          u.schoolId = sc.id;
        } else if (sname.length >= 3) {
          newSchool = { id: uid('sch'), name: sname, code: RA.newCode(), createdAt: u.createdAt };
        } else return showError(f, 'Isi kode sekolah jika sekolah Anda sudah terdaftar, atau tulis nama sekolah baru.');
        u.note = 'Guru';
      }
      if (role === 'siswa') {
        u.code = RA.newCode();
        const code = val(d, 'classCode');
        if (code) {
          joined = q.classByCode(code);
          if (!joined) return showError(f, `Kode kelas "${code.toUpperCase()}" tidak ditemukan. Periksa lagi, atau kosongkan dan isi nanti.`);
          u.classId = joined.id; u.schoolId = joined.schoolId;
        } else u.classId = null;
      }
      if (role === 'ortu') {
        u.childIds = [];
        const code = val(d, 'childCode');
        if (code) {
          child = q.studentByCode(code);
          if (!child) return showError(f, `Kode anak "${code.toUpperCase()}" tidak ditemukan. Periksa lagi, atau kosongkan dan isi nanti.`);
          u.childIds.push(child.id);
        }
      }
      if (newSchool) { st().schools.push(newSchool); u.schoolId = newSchool.id; }
      st().users.push(u);
      if (joined && joined.teacherId) notify([joined.teacherId], `${u.name} bergabung ke ${joined.name}.`, '#/kelas');
      save();
      doLogin(u, true);
      toast(joined ? `Akun dibuat dan kamu sudah bergabung ke ${esc(joined.name)}.` : newSchool ? `Akun dibuat. Kode sekolah Anda: <b>${newSchool.code}</b>` : child ? `Akun dibuat dan terhubung dengan ${esc(firstName(child))}.` : 'Akun dibuat. Selamat datang!');
    },
    'join-class'(f) {
      const u = me(); const code = val(new FormData(f), 'code');
      if (!code) return showError(f, 'Masukkan kode kelas dulu, ya.');
      const c = q.classByCode(code);
      if (!c) return showError(f, `Kode "${code.toUpperCase()}" tidak ditemukan. Coba periksa lagi huruf dan angkanya.`);
      u.classId = c.id; u.schoolId = c.schoolId;
      if (c.teacherId) notify([c.teacherId], `${u.name} bergabung ke ${c.name}.`, '#/kelas');
      save(); lastPath = ''; go('#/beranda'); toast(`Berhasil! Kamu sekarang anggota ${esc(c.name)}.`);
    },
    'link-child'(f) {
      const u = me(); const code = val(new FormData(f), 'code');
      if (!code) return showError(f, 'Masukkan kode anak dulu.');
      const child = q.studentByCode(code);
      if (!child) return showError(f, `Kode "${code.toUpperCase()}" tidak ditemukan. Periksa lagi di akun anak Anda.`);
      u.childIds = u.childIds || [];
      if (u.childIds.includes(child.id)) return showError(f, `${child.name} sudah terhubung dengan akun Anda.`);
      u.childIds.push(child.id);
      st().ui.activeChild[u.id] = child.id;
      save(); closeModal(); render(); toast(`Terhubung dengan ${esc(child.name)}.`);
    },
    'class-guru'(f) {
      const u = me(); const d = new FormData(f);
      const name = val(d, 'name'), subject = val(d, 'subject');
      if (!name) return showError(f, 'Tulis nama kelasnya, misalnya "Kelas 7A".');
      if (!subject) return showError(f, 'Tulis mata pelajarannya.');
      const c = { id: uid('k'), schoolId: u.schoolId, code: RA.newCode(), name, subject, level: d.get('level'), teacherId: u.id };
      st().classes.push(c); st().ui.activeClass[u.id] = c.id;
      save(); closeModal(); lastPath = ''; go('#/kelas');
      toast(`${esc(c.name)} dibuat. Kode kelasnya <b>${c.code}</b>, bagikan ke siswa.`);
    },
    async material(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      const file = d.get('file');
      const title = val(d, 'title'), body = val(d, 'body');
      if (!title) return showError(f, 'Tulis judul materinya dulu.');
      if (!body && !(file && file.size)) return showError(f, 'Isi bacaan atau lampirkan berkas, supaya siswa punya sesuatu untuk dibaca.');
      const att = await readFile(file && file.size ? file : null);
      const m = { id: uid('m'), classId: c.id, createdAt: new Date().toISOString(), title, target: val(d, 'target'), body };
      if (att) m.attachment = att;
      st().materials.push(m);
      notify(q.studentsOf(c.id).map(s => s.id), `Materi baru dari ${shortName(u)}: ${m.title}.`, '#/materi');
      if (!save() && att && att.data) { m.attachment.data = null; save(); }
      const n = q.studentsOf(c.id).length;
      closeModal(); render(); toast(`Materi dibagikan${n ? `. ${n} siswa sudah diberi tahu` : ''}.`);
    },
    tugas(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      const title = val(d, 'title'), ins = val(d, 'instructions'), due = d.get('due');
      if (!title) return showError(f, 'Tulis judul tugasnya.');
      if (!ins) return showError(f, 'Tulis petunjuk tugas supaya siswa tahu apa yang harus dikerjakan.');
      if (!due) return showError(f, 'Tentukan tenggatnya.');
      const it = { id: uid('t'), classId: c.id, kind: 'tugas', createdAt: new Date().toISOString(), due: new Date(due).toISOString(), title, target: val(d, 'target'), instructions: ins, group: !!d.get('group') };
      st().items.push(it);
      notify(q.studentsOf(c.id).map(s => s.id), `Tugas baru dari ${shortName(u)}: ${it.title}. Tenggat ${fmtShort(it.due)}.`, `#/tugas/${it.id}`);
      save(); closeModal(); render(); toast('Tugas dibagikan.');
    },
    kuis(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      const title = val(d, 'title'), due = d.get('due');
      if (!title) return showError(f, 'Tulis judul kuisnya.');
      if (!due) return showError(f, 'Tentukan tenggatnya.');
      const questions = $$('.qb-item', f).map(b => ({
        q: $('input[name=q]', b).value.trim(),
        options: $$('input[name=opt]', b).map(i => i.value.trim()),
        answer: Number(($('input[type=radio]:checked', b) || { value: 0 }).value)
      }));
      const bad = questions.findIndex(x => !x.q || x.options.some(o => !o));
      if (bad >= 0) return showError(f, `Soal ke-${bad + 1} belum lengkap. Isi pertanyaan dan keempat pilihannya.`);
      const it = { id: uid('q'), classId: c.id, kind: 'kuis', createdAt: new Date().toISOString(), due: new Date(due).toISOString(), title, questions };
      st().items.push(it);
      notify(q.studentsOf(c.id).map(s => s.id), `Kuis baru: ${it.title} (${questions.length} soal). Tenggat ${fmtShort(it.due)}.`, `#/kuis/${it.id}`);
      save(); closeModal(); render(); toast(`Kuis berisi ${questions.length} soal sudah dibagikan.`);
    },
    grade(f) {
      const sub = st().submissions.find(s => s.id === f.dataset.sub);
      const d = new FormData(f);
      const raw = String(d.get('score') || '').trim();
      if (raw === '' || isNaN(Number(raw))) { toast('Isi nilainya dulu (angka 0–100).'); return; }
      const score = Math.max(0, Math.min(100, Math.round(Number(raw))));
      const fb = { good: val(d, 'good'), wrong: val(d, 'wrong'), next: val(d, 'next') };
      if (!fb.good && !fb.wrong && !fb.next) { toast('Tulis minimal satu bagian masukan, supaya siswa tahu apa yang harus diperbaiki.'); return; }
      const first = sub.score == null;
      sub.score = score; sub.feedback = fb; sub.gradedAt = new Date().toISOString();
      const stu = q.user(sub.studentId); const it = q.item(sub.itemId); const u = me();
      notify([stu.id], `Nilai "${it.title}" sudah keluar${first ? '' : ' (diperbarui)'}: ${score}. Baca masukan dari ${shortName(u)}.`, `#/tugas/${it.id}`);
      notify(q.parentsOf(stu.id).map(p => p.id), `${firstName(stu)} mendapat nilai ${score} untuk "${it.title}".`, '#/beranda');
      save(); render();
      toast(`Tersimpan. Nilai ${esc(firstName(stu))} sudah masuk buku nilai${q.parentsOf(stu.id).length ? ' dan terlihat oleh orang tuanya' : ''}.`);
    },
    'submit-tugas'(f) {
      const u = me(); const it = q.item(f.dataset.item); const d = new FormData(f);
      const text = val(d, 'text');
      const file = d.get('file');
      const hasFile = file && file.size;
      let sub = q.sub(it.id, u.id);
      if (!text && !hasFile && !(sub && sub.fileName)) return showError(f, 'Tulis jawaban atau lampirkan berkas dulu, ya.');
      const now = new Date().toISOString();
      if (!sub) { sub = { id: uid('sb'), itemId: it.id, studentId: u.id, score: null, feedback: null, gradedAt: null, fileName: '' }; st().submissions.push(sub); }
      sub.text = text; sub.submittedAt = now; sub.members = val(d, 'members');
      if (hasFile) sub.fileName = file.name;
      const late = now > it.due;
      const c = q.cls(u.classId);
      if (c.teacherId) notify([c.teacherId], `${u.name} mengumpulkan "${it.title}"${late ? ' (lewat tenggat)' : ''}.`, `#/menilai/${it.id}`);
      save(); render();
      toast(isSD(u) ? 'Terkirim! Gurumu akan segera membacanya.' : `Terkirim pukul ${fmtTime(now)}${late ? ' (lewat tenggat)' : ''}.`);
    },
    quiz(f) {
      const u = me(); const it = q.item(f.dataset.item);
      const answers = it.questions.map((_, i) => { const c = f.querySelector(`input[name="qa-${i}"]:checked`); return c ? Number(c.value) : null; });
      const blank = answers.filter(a => a == null).length;
      const submit = () => {
        const correct = answers.filter((a, i) => a === it.questions[i].answer).length;
        const score = Math.round((correct / it.questions.length) * 100);
        st().attempts.push({ id: uid('at'), quizId: it.id, studentId: u.id, answers, score, submittedAt: new Date().toISOString() });
        clearDraft(it.id, u.id);
        const c = q.cls(u.classId);
        if (c.teacherId) notify([c.teacherId], `${u.name} selesai mengerjakan "${it.title}" dengan nilai ${score}.`, `#/laporan/${it.id}`);
        notify(q.parentsOf(u.id).map(p => p.id), `${firstName(u)} mendapat nilai ${score} untuk "${it.title}".`, '#/beranda');
        save(); render(); toast(isSD(u) ? `Selesai! Kamu menjawab benar ${correct} soal.` : `Kuis terkirim. Nilaimu ${score}.`);
      };
      if (blank) askConfirm('Masih ada soal yang kosong', `${blank} soal belum dijawab. Soal kosong dihitung salah. Tetap kirim sekarang?`, 'Tetap kirim', submit);
      else submit();
    },
    'add-class'(f) {
      const u = me(); const d = new FormData(f);
      const name = val(d, 'name'), subject = val(d, 'subject');
      if (!name || !subject) return showError(f, 'Isi nama kelas dan mata pelajarannya.');
      const c = { id: uid('k'), schoolId: u.schoolId, code: RA.newCode(), name, subject, level: d.get('level'), teacherId: d.get('teacherId') || null };
      st().classes.push(c);
      if (c.teacherId) notify([c.teacherId], `Operator menambahkan ${c.name} (${c.subject}) untuk Anda. Kode kelas: ${c.code}.`, '#/kelas');
      save(); closeModal(); render(); toast(`Kelas ditambahkan. Kodenya <b>${c.code}</b>.`);
    },
    'add-user'(f) {
      const op = me(); const d = new FormData(f); const role = d.get('role');
      const name = val(d, 'name'), username = val(d, 'username').toLowerCase(), pass = String(d.get('password') || '');
      if (name.length < 3) return showError(f, 'Tulis nama lengkapnya.');
      const uErr = checkUsername(username); if (uErr) return showError(f, uErr);
      if (pass.length < 6) return showError(f, 'Kata sandi awal minimal 6 karakter.');
      const u = { id: uid(role === 'siswa' ? 's' : role === 'ortu' ? 'o' : 'u'), username, name, role, salt: RA.newSalt(), createdAt: new Date().toISOString(), schoolId: role === 'ortu' ? null : op.schoolId };
      u.passHash = RA.hashPass(pass, u.salt);
      if (role === 'siswa') { u.code = RA.newCode(); u.classId = d.get('classId') || null; }
      if (role === 'ortu') u.childIds = d.get('childId') ? [d.get('childId')] : [];
      if (role === 'guru') u.note = val(d, 'note') || 'Guru';
      if (role === 'operator') u.note = 'Operator sekolah';
      st().users.push(u); save(); render();
      showCredentials(u, pass);
    },
    profile(f) {
      const u = me(); const name = val(new FormData(f), 'name');
      if (name.length < 3) { toast('Nama minimal 3 huruf.'); return; }
      u.name = name; save(); render(); accountModal(); toast('Nama diperbarui.');
    },
    password(f) {
      const u = me(); const d = new FormData(f);
      if (u.passHash !== RA.hashPass(String(d.get('old') || ''), u.salt)) return showError(f, 'Kata sandi sekarang tidak cocok.');
      const pw = String(d.get('pw') || ''), pw2 = String(d.get('pw2') || '');
      if (pw.length < 6) return showError(f, 'Kata sandi baru minimal 6 karakter.');
      if (pw !== pw2) return showError(f, 'Kedua kata sandi baru belum sama.');
      u.salt = RA.newSalt(); u.passHash = RA.hashPass(pw, u.salt); save();
      closeModal(); toast('Kata sandi sudah diganti. Pakai yang baru saat masuk berikutnya.');
    }
  };

  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-form]');
    if (!f) return;
    e.preventDefault();
    const fn = forms[f.dataset.form];
    if (fn) fn(f);
  });

  /* ---------- Sinyal internet ---------- */
  function syncOnline() { const b = $('#offline'); if (b) b.hidden = navigator.onLine; }
  window.addEventListener('online', () => { syncOnline(); toast('Sinyal kembali. Semua aman.'); });
  window.addEventListener('offline', syncOnline);

  window.addEventListener('hashchange', () => { closeModal(); render(); });

  RA.store.load();
  render();
})();
