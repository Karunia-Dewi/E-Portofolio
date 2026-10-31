/* ==========================================================================
   PORTOFOLIO SEMINAR PPG 2026 - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- INITIALIZE THEME ---
  initTheme();

  // --- STICKY NAVBAR SCROLL EFFECT ---
  initNavbarScroll();

  // --- MOBILE MENU TOGGLE ---
  initMobileMenu();

  // --- ACTIVE NAV LINK INTERSECTION OBSERVER ---
  initScrollSpy();

  // --- ARTIFACT FILTERING FOR SEMESTER 1 & 2 ---
  initArtifactFilters();

  // --- MODAL VIEWER SYSTEM ---
  initModalSystem();

  // --- ANIMATED COUNTERS ---
  initCounters();

  // --- BACK TO TOP BUTTON ---
  initBackToTop();

  // --- AUTO-SLIDING DOCUMENTATION CAROUSELS ---
  initDocCarousels();

  // --- CYCLE SUBMENU NAVIGATION ---
  initCycleSubmenu();
});

/* -------------------------------------------------------------------------- */
/* THEME MANAGER (LIGHT / DARK ARMY GREEN)                                     */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }

      showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} Diaktifkan`);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* NAVBAR SCROLL SHADOW EFFECT                                                */
/* -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.navbar-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* MOBILE MENU TOGGLE & DROPDOWN HANDLING                                     */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    dropdownToggles.forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          const parentDropdown = dropdownToggle.closest('.nav-item.dropdown');
          if (parentDropdown) {
            parentDropdown.classList.toggle('open');
          }
        }
      });
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
          // Keep drawer open on toggle click on mobile
          return;
        }
        navMenu.classList.remove('active');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* MULTI-PAGE ACTIVE NAV LINK HIGHLIGHTING                                    */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPath === '') {
    currentPath = 'index.html';
  }

  const sem1Pages = [
    'semester1.html',
    'filosofi-pendidikan.html',
    'pemahaman-peserta-didik.html',
    'pembelajaran-mendalam.html',
    'pola-pikir-bertumbuh.html',
    'computational-thinking.html',
    'mk-ppl-terbimbing.html'
  ];
  const pplPages = ['ppl-terbimbing.html', 'ppl-mandiri.html'];

  navLinks.forEach(link => {
    const href = link.getAttribute('href') ? link.getAttribute('href').split('#')[0] : '';
    const isSem1Active = sem1Pages.includes(currentPath) && href === 'semester1.html';
    const isPplActive = pplPages.includes(currentPath) && (link.id === 'navPpl' || href === 'ppl-terbimbing.html');
    
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html') || isSem1Active || isPplActive)) {
      link.classList.add('active');
    } else if (href && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* ARTIFACT FILTERING FOR SEMESTER 1 & SEMESTER 2                             */
/* -------------------------------------------------------------------------- */
function initArtifactFilters() {
  // Filter buttons container in Semester 1 & Semester 2
  const filterContainers = document.querySelectorAll('.artifact-filter-bar');

  filterContainers.forEach(container => {
    const filterBtns = container.querySelectorAll('.filter-btn');
    const targetSection = container.closest('section');
    const cards = targetSection ? targetSection.querySelectorAll('.artifact-card') : [];

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from buttons in this bar
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
}

/* Add fadeIn keyframes dynamically */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

/* -------------------------------------------------------------------------- */
/* MODAL PREVIEW SYSTEM                                                       */
/* -------------------------------------------------------------------------- */
const artifactData = {
  'sem1-art1': {
    title: 'Modul Ajar Pembelajaran Berdiferensiasi & RPP Terintegrasi PSE',
    course: 'Pemahaman tentang Peserta Didik dan Pembelajaran',
    category: 'Modul Ajar / RPP',
    date: 'Oktober 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester1/modul-ajar-diferensiasi.pdf',
    summary: 'Rancangan modul ajar interaktif berbasis Kurikulum Merdeka yang mengintegrasikan Pembelajaran Sosial Emosional (PSE) dan asesmen diagnostik untuk mengakomodasi berbagai gaya belajar murid.',
    points: [
      'Memuat pemetaan kebutuhan belajar murid berdasarkan minat dan profil belajar.',
      'Pengintegrasian 5 Kompetensi Sosial Emosional (KSE) dalam langkah pembelajaran.',
      'Instrumen asesmen diagnostik kognitif & non-kognitif awal bab.',
      'Rubrik penilaian proses (formatif) dan hasil akhir (sumatif).'
    ]
  },
  'sem1-art2': {
    title: 'Jurnal Refleksi Kritis - Model Gibbs & ALTR',
    course: 'Prinsip Pengajaran dan Asesmen yang Efektif I',
    category: 'Jurnal Refleksi',
    date: 'November 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester1/jurnal-refleksi-gibbs.pdf',
    summary: 'Analisis reflektif secara komprehensif menggunakan kerangka kerja Gibbs Reflective Cycle dalam mengidentifikasi kendala manajemen kelas dan respon peserta didik saat PPL I.',
    points: [
      'Evaluasi mendalam mengenai penerapan strategi instruksional di kelas PPL.',
      'Analisis tantangan keberagaman respon peserta didik saat diskusi kelompok.',
      'Rencana aksi tindak lanjut (Action Plan) perbaikan pembelajaran pada siklus berikutnya.'
    ]
  },
  'sem1-art3': {
    title: 'Media Pembelajaran Digital Interaktif Berbasis Quizizz & LKPD QR Code',
    course: 'Praktik Pengalaman Lapangan (PPL) I',
    category: 'Media Pembelajaran',
    date: 'Desember 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester1/media-pembelajaran-quizizz.pdf',
    summary: 'Paket media pembelajaran digital berbasis game interaktif dan Lembar Kerja Peserta Didik (LKPD) modern yang terhubung langsung melalui pemindaian QR Code.',
    points: [
      'Peningkatan keterlibatan aktif peserta didik hingga 85% berdasarkan instrumen observasi.',
      'Fitur penilaian otomatis langsung (real-time feedback) untuk refleksi mandiri murid.',
      'Desain LKPD visual berbantuan infografis ramah anak.'
    ]
  },
  'sem1-art4': {
    title: 'Video Praktik Pembelajaran Terbimbing & Rekaman Microteaching',
    course: 'Praktik Pengalaman Lapangan (PPL) I',
    category: 'Video Praktik',
    date: 'November 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester1/video-praktik-ppl1.pdf',
    summary: 'Dokumentasi video pelaksanaan Praktik Pengalaman Lapangan (PPL) terbimbing yang mencakup tahap pendahuluan, kegiatan inti berbasis Problem Based Learning (PBL), hingga penutup.',
    points: [
      'Demonstrasi keterampilan bertanya pemantik dan apersepsi kontekstual.',
      'Penerapan bimbingan kelompok kecil yang diferensiasi.',
      'Umpan balik terbuka dari Guru Pamong dan Dosen Pembimbing Lapangan.'
    ]
  },
  'sem2-art1': {
    title: 'Laporan Proyek Kepemimpinan: Edukasi Literasi Digital Komunitas Sekolah',
    course: 'Proyek Kepemimpinan II',
    category: 'Proyek Kepemimpinan',
    date: 'Maret 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester2/laporan-proyek-kepemimpinan.pdf',
    summary: 'Laporan komprehensif pelaksanaan Service Learning proyek kepemimpinan yang berkolaborasi dengan komunitas sekolah dan wali murid untuk meningkatkan literasi digital aman.',
    points: [
      'Perencanaan program berdasarkan analisis SWOT dan pemetaan aset sekolah.',
      'Pelaksanaan workshop pemanfaatan media digital secara bijak untuk murid.',
      'Hasil evaluasi dampak kepuasan peserta program mencapai 92% keberhasilan.'
    ]
  },
  'sem2-art2': {
    title: 'Portofolio Studi Kasus Pembelajaran Berdiferensiasi & Inklusif',
    course: 'Pembelajaran Inklusif & Berdiferensiasi',
    category: 'Studi Kasus',
    date: 'April 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester2/studi-kasus-inklusif.pdf',
    summary: 'Dokumentasi penanganan studi kasus peserta didik dengan kebutuhan khusus/kesulitan belajar spesifik melalui pendekatan Teaching at the Right Level (TaRL).',
    points: [
      'Hasil skrining awal dan asesmen individual peserta didik.',
      'Desain modifikasi kurikulum dan pendampingan khusus (individualized support).',
      'Evaluasi perkembangan belajar murid setelah 4 minggu intervensi.'
    ]
  },
  'sem2-art3': {
    title: 'Jurnal Refleksi Mandiri Praktik Pengalaman Lapangan (PPL) II Mandiri',
    course: 'Praktik Pengalaman Lapangan (PPL) II',
    category: 'Jurnal Refleksi',
    date: 'Mei 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester2/jurnal-refleksi-ppl2.pdf',
    summary: 'Catatan reflektif pelaksanaan pengajaran mandiri penuh selama siklus PPL II di sekolah mitra, menyoroti penguasaan kelas dan inovasi asesmen otentik.',
    points: [
      'Kemandirian penuh dalam merancang, melaksanakan, dan mengevaluasi 3 siklus pembelajaran.',
      'Implementasi Portofolio Berbasis Kinerja (Performance-based Assessment).',
      'Refleksi kompetensi profesionalisme dan sosial-kepribadian guru.'
    ]
  },
  'sem2-art4': {
    title: 'Naskah Portofolio Akhir & Panduan Presentasi Seminar PPG 2026',
    course: 'Seminar Portofolio PPG 2026',
    category: 'Portofolio Akhir',
    date: 'Juni 2026',
    author: 'Siti Karunia Dewi',
    pdfPath: 'assets/docs/semester2/naskah-portofolio-akhir.pdf',
    summary: 'Dokumen sintesis utama yang merangkum seluruh pengalaman belajar, filosofi pendidikan pribadi, dan bukti karya terbaik sepanjang Semester 1 dan Semester 2 PPG 2026.',
    points: [
      'Ringkasan filosofi Ki Hajar Dewantara yang diinternalisasi dalam praktik mengajar.',
      'Pemetaan keterkaitan antar mata kuliah dan perubahan paradigma mengajar.',
      'Kumpulan artefak unggulan untuk dipertahankan dalam Seminar Portofolio PPG.'
    ]
  }
};

function initModalSystem() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const previewBtns = document.querySelectorAll('.js-preview-btn');

  if (!modalOverlay) return;

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const artId = btn.getAttribute('data-id');
      const data = artifactData[artId];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCourse').textContent = data.course;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalDate').textContent = data.date;
        document.getElementById('modalAuthor').textContent = data.author;
        document.getElementById('modalSummary').textContent = data.summary;

        if (modalDownloadBtn) {
          modalDownloadBtn.setAttribute('data-pdf', data.pdfPath || '');
        }

        const pointsList = document.getElementById('modalPoints');
        pointsList.innerHTML = '';
        data.points.forEach(pt => {
          const li = document.createElement('li');
          li.textContent = pt;
          pointsList.appendChild(li);
        });

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', () => {
      const pdfPath = modalDownloadBtn.getAttribute('data-pdf');
      if (pdfPath) {
        // Try opening/downloading file
        const tempLink = document.createElement('a');
        tempLink.href = pdfPath;
        tempLink.target = '_blank';
        tempLink.download = pdfPath.split('/').pop();
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
        showToast('Membuka / Mengunduh dokumen PDF artefak...');
      } else {
        showToast('File PDF artefak belum diunggah ke folder assets.');
      }
    });
  }

  // Handle CV Download Button
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      showToast('Mengunduh / Membuka Berkas Ringkasan CV PDF...');
    });
  }
}

/* -------------------------------------------------------------------------- */
/* ANIMATED STAT COUNTERS                                                      */
/* -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 40;
      let count = 0;

      const updateCount = () => {
        const inc = Math.ceil(target / speed);
        if (count < target) {
          count += inc;
          if (count > target) count = target;
          counter.textContent = count + (counter.getAttribute('data-suffix') || '');
          setTimeout(updateCount, 40);
        } else {
          counter.textContent = target + (counter.getAttribute('data-suffix') || '');
        }
      };

      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const statsElem = document.querySelector('.hero-stats');
    if (statsElem && !animated) {
      const rect = statsElem.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        countUp();
        animated = true;
      }
    }
  });

  // Run on initial load if visible
  setTimeout(() => {
    const statsElem = document.querySelector('.hero-stats');
    if (statsElem) {
      const rect = statsElem.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        countUp();
        animated = true;
      }
    }
  }, 300);
}

/* -------------------------------------------------------------------------- */
/* BACK TO TOP BUTTON                                                         */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/* TOAST NOTIFICATION UTILITY                                                 */
/* -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* -------------------------------------------------------------------------- */
/* AUTO-SLIDING DOCUMENTATION CAROUSEL                                        */
/* -------------------------------------------------------------------------- */
function initDocCarousels() {
  const carousels = document.querySelectorAll('.doc-carousel');
  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.doc-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const intervalTime = parseInt(carousel.dataset.autoSlide, 10) || 3500;
    let timer = null;

    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    const currentSlideSpan = carousel.querySelector('.current-slide');
    const totalSlidesSpan = carousel.querySelector('.total-slides');

    if (totalSlidesSpan) {
      totalSlidesSpan.textContent = slides.length;
    }

    // Build indicators if container exists
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(idx);
          resetTimer();
        });
        indicatorsContainer.appendChild(dot);
      });
    }

    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.carousel-dot') : [];

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
      if (currentSlideSpan) currentSlideSpan.textContent = currentIndex + 1;
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      if (!timer) {
        timer = setInterval(nextSlide, intervalTime);
      }
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Navigation buttons
    const prevBtn = carousel.querySelector('.carousel-nav-prev');
    const nextBtn = carousel.querySelector('.carousel-nav-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        resetTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        resetTimer();
      });
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    // Touch swipe support on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopTimer();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        nextSlide();
      } else if (touchEndX - touchStartX > 40) {
        prevSlide();
      }
      startTimer();
    }, { passive: true });

    // Start auto slide
    startTimer();
  });
}

/* -------------------------------------------------------------------------- */
/* CYCLE SUBMENU SMOOTH SCROLL & ACTIVE STATE                                  */
/* -------------------------------------------------------------------------- */
function initCycleSubmenu() {
  const submenuLinks = document.querySelectorAll('.cycle-submenu-link');
  if (!submenuLinks.length) return;

  submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      submenuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sections = document.querySelectorAll('#perencanaan, #materi, #video, #media');
  if (!sections.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    if (current) {
      submenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

