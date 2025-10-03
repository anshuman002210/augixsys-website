// Initialize EmailJS (replace with your real public key)
(function() {
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init("YOUR_PUBLIC_KEY"); // <-- REPLACE this with your EmailJS public key
    } catch (e) {
      console.warn('EmailJS init error', e);
    }
  }
})();

// Toggle biography preview / full
function toggleBio() {
  const bioPreview = document.getElementById('bio-preview');
  const bioFull = document.getElementById('bio-full');
  if (!bioPreview || !bioFull) return;
  bioPreview.classList.toggle('hidden');
  bioFull.classList.toggle('hidden');
}

// Show/hide sections
function showSection(sectionName) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(sectionName);
  if (target) target.classList.add('active');

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  const activeNavLink = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeNavLink) activeNavLink.classList.add('active');

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Career modal open/close
function openCareerModal() {
  const modal = document.getElementById('career-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeCareerModal() {
  const modal = document.getElementById('career-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Dropdown hover
  const aboutNav = document.getElementById('about-nav');
  const aboutDropdown = document.getElementById('about-dropdown');
  if (aboutNav && aboutDropdown && aboutNav.parentElement) {
    aboutNav.parentElement.addEventListener('mouseenter', () => aboutDropdown.classList.add('show'));
    aboutNav.parentElement.addEventListener('mouseleave', () => aboutDropdown.classList.remove('show'));
  }

  // Dropdown items click
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      dropdownItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const section = this.getAttribute('data-section');
      if (section === 'company') {
        showSection('about');
        document.getElementById('company-section')?.classList.remove('hidden');
        document.getElementById('team-section')?.classList.add('hidden');
      } else if (section === 'team') {
        showSection('about');
        document.getElementById('company-section')?.classList.add('hidden');
        document.getElementById('team-section')?.classList.remove('hidden');
      } else if (section === 'career') {
        openCareerModal();
      }
      aboutDropdown.classList.remove('show');
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const btnText = document.getElementById('btn-text');
      const btnLoading = document.getElementById('btn-loading');
      const successMsg = document.getElementById('contact-success');

      successMsg?.classList.add('hidden');
      btnText?.classList.add('hidden');
      btnLoading?.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(this);
      const name = formData.get('name') || 'No name';
      const email = formData.get('email') || 'No email';
      const phone = formData.get('phone') || 'Not provided';
      const message = formData.get('message') || '';

      const subject = encodeURIComponent(`Contact Form: ${name} - Enterprise Solutions Inquiry`);
      const body = encodeURIComponent(`Hello AugIx System Team,

CONTACT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone}

MESSAGE:
${message}

Best regards,
${name}`);

      const mailtoLink = `mailto:info@augixsys.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_self');

      setTimeout(() => {
        btnText?.classList.remove('hidden');
        btnLoading?.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
        successMsg?.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => successMsg?.classList.add('hidden'), 6000);
      }, 500);
    });
  }

  // Career form handler
  const careerForm = document.getElementById('career-form');
  if (careerForm) {
    careerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('career-submit-btn');
      const btnText = document.getElementById('career-btn-text');
      const btnLoading = document.getElementById('career-btn-loading');
      const successMsg = document.getElementById('career-success');

      successMsg?.classList.add('hidden');
      btnText?.classList.add('hidden');
      btnLoading?.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(this);
      const name = formData.get('name') || 'No name';
      const email = formData.get('email') || 'No email';
      const phone = formData.get('phone') || '';
      const location = formData.get('location') || '';
      const position = formData.get('position') || '';
      const experience = formData.get('experience') || '';
      const salary = formData.get('salary') || '';
      const skills = formData.get('skills') || '';
      const whyJoin = formData.get('why-join') || '';
      const resumeFile = formData.get('resume');

      const subject = encodeURIComponent(`Career Application: ${name} - ${position} Position`);
      const body = encodeURIComponent(`Hello AugIx System HR Team,

APPLICANT DETAILS:
Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone}
Current Location: ${location}
Position Applied For: ${position}
Experience Level: ${experience}
Expected Salary: ${salary}

KEY SKILLS:
${skills}

WHY I WANT TO JOIN AUGIX SYSTEM:
${whyJoin}

RESUME: ${resumeFile ? (resumeFile.name ? resumeFile.name : 'File selected') : 'No resume uploaded'}

Best regards,
${name}
${email}
${phone}`);

      const mailtoLink = `mailto:info@augixsys.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_self');

      setTimeout(() => {
        btnText?.classList.remove('hidden');
        btnLoading?.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
        successMsg?.classList.remove('hidden');
        careerForm.reset();
        document.getElementById('resume-file-name').textContent = '';
        document.getElementById('file-error')?.classList.add('hidden');
        setTimeout(() => { closeCareerModal(); successMsg?.classList.add('hidden'); }, 3000);
      }, 500);
    });
  }

  // File upload validation for resume input
  const fileInput = document.getElementById('resume');
  const fileName = document.getElementById('resume-file-name');
  const fileError = document.getElementById('file-error');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      fileName.textContent = '';
      fileError.textContent = '';
      fileError.classList.add('hidden');

      if (file.type !== 'application/pdf') {
        fileError.textContent = 'Please select a PDF file only.';
        fileError.classList.remove('hidden');
        fileInput.value = '';
        return;
      }
      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        fileError.textContent = 'File size must be less than 4MB.';
        fileError.classList.remove('hidden');
        fileInput.value = '';
        return;
      }
      fileName.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    });
  }

  // initial default section
  showSection('home');
}); // DOMContentLoaded end
