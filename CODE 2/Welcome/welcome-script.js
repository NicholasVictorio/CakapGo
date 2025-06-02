// Authentication and navigation system for CakapGo Welcome Page

class WelcomeManager {
  constructor() {
    this.currentUser = null
    this.init()
  }

  init() {
    // Hide loading overlay after page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hideLoading()
        this.checkAuthStatus()
      }, 1000)
    })

    // Check authentication status on page load
    this.checkAuthStatus()

    // Add keyboard navigation
    this.setupKeyboardNavigation()

    // Add intersection observer for animations
    this.setupAnimations()
  }

  hideLoading() {
    const loadingOverlay = document.getElementById("loadingOverlay")
    if (loadingOverlay) {
      loadingOverlay.classList.add("hide")
      setTimeout(() => {
        loadingOverlay.style.display = "none"
      }, 400)
    }
  }

  checkAuthStatus() {
    try {
      // Check if user is logged in (from localStorage)
      const userData = localStorage.getItem("cakapgo_user")
      const isLoggedIn = localStorage.getItem("cakapgo_logged_in") === "true"

      if (isLoggedIn && userData) {
        this.currentUser = JSON.parse(userData)
        this.showUserView()
      } else {
        this.showGuestView()
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      this.showGuestView()
    }
  }

  showGuestView() {
    const guestView = document.getElementById("guestView")
    const userView = document.getElementById("userView")

    if (guestView && userView) {
      guestView.style.display = "block"
      userView.style.display = "none"

      // Add entrance animation
      guestView.style.animation = "fadeInUp 0.8s ease-out"
    }
  }

  showUserView() {
    const guestView = document.getElementById("guestView")
    const userView = document.getElementById("userView")

    if (guestView && userView) {
      guestView.style.display = "none"
      userView.style.display = "block"

      // Add entrance animation
      userView.style.animation = "fadeInUp 0.8s ease-out"

      // Update user information
      this.updateUserInfo()
    }
  }

  updateUserInfo() {
    if (!this.currentUser) return

    // Update user name and initial
    const userName = document.getElementById("userName")
    const userInitial = document.getElementById("userInitial")

    if (userName && this.currentUser.username) {
      userName.textContent = this.currentUser.username
    }

    if (userInitial && this.currentUser.username) {
      userInitial.textContent = this.currentUser.username.charAt(0).toUpperCase()
    }

    // Update user statistics
    this.updateUserStats()
  }

  updateUserStats() {
    // Get user progress from localStorage or set defaults
    const userProgress = this.getUserProgress()

    // Animate counter updates
    this.animateCounter("lessonsCompleted", userProgress.lessonsCompleted)
    this.animateCounter("currentStreak", userProgress.currentStreak)
    this.animateCounter("totalPoints", userProgress.totalPoints)
  }

  getUserProgress() {
    try {
      const progress = localStorage.getItem("cakapgo_progress")
      if (progress) {
        return JSON.parse(progress)
      }
    } catch (error) {
      console.error("Error getting user progress:", error)
    }

    // Default progress
    return {
      lessonsCompleted: Math.floor(Math.random() * 25) + 5, // Random for demo
      currentStreak: Math.floor(Math.random() * 15) + 1,
      totalPoints: Math.floor(Math.random() * 1000) + 100,
    }
  }

  animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId)
    if (!element) return

    const startValue = 0
    const duration = 1500
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart)

      element.textContent = currentValue

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = targetValue
      }
    }

    requestAnimationFrame(updateCounter)
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Enter key on buttons
      if (e.key === "Enter" && e.target.classList.contains("btn")) {
        e.target.click()
      }

      // Escape key to close notifications
      if (e.key === "Escape") {
        this.hideNotification()
      }
    })
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out"
        }
      })
    }, observerOptions)

    // Observe feature cards
    document.querySelectorAll(".feature-card, .stat-card").forEach((card) => {
      observer.observe(card)
    })
  }

  // Navigation methods
  navigateToLogin() {
    this.showNotification("Redirecting to login...", "info")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 500)
  }

  navigateToRegister() {
    this.showNotification("Redirecting to registration...", "info")
    setTimeout(() => {
      window.location.href = "register.html"
    }, 500)
  }

  navigateToMenu() {
    // Check if user is still logged in
    if (!this.isUserLoggedIn()) {
      this.showNotification("Please log in first to access the menu.", "error")
      setTimeout(() => {
        this.navigateToLogin()
      }, 2000)
      return
    }

    this.showNotification("Loading your learning dashboard...", "success")
    setTimeout(() => {
      window.location.href = "menu.html"
    }, 1000)
  }

  logout() {
    // Show confirmation
    if (confirm("Are you sure you want to logout?")) {
      // Clear user data
      localStorage.removeItem("cakapgo_user")
      localStorage.removeItem("cakapgo_logged_in")
      localStorage.removeItem("cakapgo_progress")

      this.currentUser = null
      this.showNotification("Successfully logged out!", "success")

      // Switch to guest view
      setTimeout(() => {
        this.showGuestView()
      }, 1000)
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem("cakapgo_logged_in") === "true" && localStorage.getItem("cakapgo_user") !== null
  }

  // Notification system
  showNotification(message, type = "info") {
    const notification = document.getElementById("notification")
    const notificationText = document.getElementById("notificationText")

    if (notification && notificationText) {
      notificationText.textContent = message

      // Set notification style based on type
      notification.className = `notification ${type}`

      // Show notification
      notification.classList.add("show")

      // Auto hide after 4 seconds
      setTimeout(() => {
        this.hideNotification()
      }, 4000)
    }
  }

  hideNotification() {
    const notification = document.getElementById("notification")
    if (notification) {
      notification.classList.remove("show")
    }
  }

  // Utility methods
  saveUserProgress(progress) {
    try {
      localStorage.setItem("cakapgo_progress", JSON.stringify(progress))
    } catch (error) {
      console.error("Error saving user progress:", error)
    }
  }

  // Demo method to simulate user activity
  simulateUserActivity() {
    if (this.currentUser) {
      const progress = this.getUserProgress()
      progress.lessonsCompleted += 1
      progress.totalPoints += 50

      // Update streak (simplified logic)
      const lastActivity = localStorage.getItem("cakapgo_last_activity")
      const today = new Date().toDateString()

      if (lastActivity !== today) {
        progress.currentStreak += 1
        localStorage.setItem("cakapgo_last_activity", today)
      }

      this.saveUserProgress(progress)
      this.updateUserStats()
    }
  }
}

// Global functions for HTML onclick events
function navigateToLogin() {
  welcomeManager.navigateToLogin()
}

function navigateToRegister() {
  welcomeManager.navigateToRegister()
}

function navigateToMenu() {
  welcomeManager.navigateToMenu()
}

function logout() {
  welcomeManager.logout()
}

function hideNotification() {
  welcomeManager.hideNotification()
}

// Initialize the welcome manager
const welcomeManager = new WelcomeManager()

// Add some interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effects to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Create ripple effect
      const ripple = document.createElement("div")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.6)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.left = e.clientX - button.offsetLeft + "px"
      ripple.style.top = e.clientY - button.offsetTop + "px"
      ripple.style.width = ripple.style.height = "20px"

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`)
    }, 0)
  })
}

// Service worker registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when you have a service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  })
}
