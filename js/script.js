// script.js - Main JavaScript file for GTenTransport

document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar Logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Auth Modal Logic
    const modal = document.getElementById('auth-modal');
    const btnSignin = document.getElementById('btn-signin');
    const closeModal = document.querySelector('.close-modal');

    if (btnSignin && modal && closeModal) {
        btnSignin.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Handle Auth Form Submission globally
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Authentication flow placeholder (Static UI)');
            modal.classList.remove('active');
            authForm.reset();
        });
    }

    // Multi-step Form Logic
    const multiStepForm = document.getElementById('multi-step-form');
    if (multiStepForm) {
        const steps = document.querySelectorAll('.form-step');
        const nextBtns = document.querySelectorAll('.btn-next');
        const prevBtns = document.querySelectorAll('.btn-prev');
        const progressContainer = document.querySelector('.progress-container');
        const stepIndicators = document.querySelectorAll('.progress-steps .step');
        let currentStep = 0;

        function showStep(index) {
            steps.forEach((step, i) => { step.classList.toggle('active', i === index); });
            stepIndicators.forEach((indicator, i) => { indicator.classList.toggle('active', i <= index); });
            progressContainer.setAttribute('data-step', index + 1);
        }

        function validateStep(index) {
            const inputs = steps[index].querySelectorAll('input[required], select[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) { isValid = false; input.style.borderColor = 'red'; }
                else { input.style.borderColor = 'rgba(255,255,255,0.1)'; }
            });
            return isValid;
        }

        multiStepForm.addEventListener('input', (e) => { if (e.target.required) e.target.style.borderColor = ''; });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    currentStep++; if (currentStep >= steps.length) currentStep = steps.length - 1;
                    showStep(currentStep);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--; if (currentStep < 0) currentStep = 0;
                showStep(currentStep);
            });
        });

        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                multiStepForm.style.display = 'none';
                document.getElementById('booking-success').style.display = 'block';
                document.querySelector('.progress-container').style.display = 'none';
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const vehicleParam = urlParams.get('vehicle');
        if (vehicleParam) {
            const vehicleSelect = document.getElementById('vehicle');
            if (vehicleSelect) vehicleSelect.value = vehicleParam;
        }
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
        });
    }
});
