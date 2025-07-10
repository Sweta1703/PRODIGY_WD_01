// Get DOM elements
const navbar = document.getElementById("navbar")
const mobileToggle = document.getElementById("mobileToggle")
const navMenu = document.getElementById("navMenu")
const scrollIndicator = document.getElementById("scrollIndicator")
const navLinks = document.querySelectorAll(".nav-link")

// Handle scroll events
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100

  // Update scroll indicator
  scrollIndicator.style.width = scrollPercent + "%"

  // Change navbar appearance on scroll
  if (scrollTop > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger menu
  const spans = mobileToggle.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }

    // Close mobile menu if open
    navMenu.classList.remove("active")
    const spans = mobileToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Add active state to current section
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section")
  const scrollPos = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`)

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (correspondingLink) {
        correspondingLink.classList.add("active")
      }
    }
  })
})

// Add parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add click ripple effect to navigation items
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active link
  const homeLink = document.querySelector('a[href="#home"]')
  if (homeLink) {
    homeLink.classList.add("active")
  }

  // Add smooth loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})
