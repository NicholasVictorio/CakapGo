// Lesson progression system
class LessonProgressionSystem {
    constructor() {
        this.lessons = {
            beginner: {
                name: 'Beginner',
                totalLessons: 10,
                completedLessons: 0,
                status: 'unlocked',
                content: [
                    'Basic Greetings and Introductions',
                    'Numbers and Counting',
                    'Colors and Shapes',
                    'Family Members',
                    'Days of the Week',
                    'Common Objects',
                    'Basic Verbs',
                    'Simple Sentences',
                    'Question Words',
                    'Review and Practice'
                ]
            },
            intermediate: {
                name: 'Intermediate',
                totalLessons: 15,
                completedLessons: 0,
                status: 'locked',
                content: [
                    'Past Tense Verbs',
                    'Future Tense',
                    'Adjectives and Descriptions',
                    'Prepositions',
                    'Complex Sentences',
                    'Conditional Statements',
                    'Business Vocabulary',
                    'Travel Phrases',
                    'Food and Dining',
                    'Shopping and Money',
                    'Health and Body',
                    'Weather and Seasons',
                    'Hobbies and Interests',
                    'Technology Terms',
                    'Review and Assessment'
                ]
            },
            expert: {
                name: 'Expert',
                totalLessons: 20,
                completedLessons: 0,
                status: 'locked',
                content: [
                    'Advanced Grammar Structures',
                    'Idioms and Expressions',
                    'Academic Vocabulary',
                    'Professional Communication',
                    'Literary Analysis',
                    'Debate and Argumentation',
                    'Cultural References',
                    'Advanced Writing Techniques',
                    'Public Speaking',
                    'Business Negotiations',
                    'Technical Documentation',
                    'Research and Citations',
                    'Critical Thinking',
                    'Advanced Listening',
                    'Pronunciation Mastery',
                    'Slang and Colloquialisms',
                    'Regional Dialects',
                    'Translation Techniques',
                    'Final Project',
                    'Certification Exam'
                ]
            }
        };
        
        this.currentLesson = null;
        this.currentLessonIndex = 0;
        
        this.init();
    }
    
    init() {
        this.loadProgress();
        this.updateUI();
        this.bindEvents();
    }
    
    loadProgress() {
        // Load progress from localStorage
        const savedProgress = localStorage.getItem('cakapgo_progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            Object.keys(progress).forEach(level => {
                if (this.lessons[level]) {
                    this.lessons[level].completedLessons = progress[level].completedLessons;
                    this.lessons[level].status = progress[level].status;
                }
            });
        }
        
        // Update lesson statuses based on completion
        this.updateLessonStatuses();
    }
    
    saveProgress() {
        const progress = {};
        Object.keys(this.lessons).forEach(level => {
            progress[level] = {
                completedLessons: this.lessons[level].completedLessons,
                status: this.lessons[level].status
            };
        });
        localStorage.setItem('cakapgo_progress', JSON.stringify(progress));
    }
    
    updateLessonStatuses() {
        // Beginner is always unlocked
        this.lessons.beginner.status = 'unlocked';
        
        // Check if beginner is completed
        if (this.lessons.beginner.completedLessons >= this.lessons.beginner.totalLessons) {
            this.lessons.beginner.status = 'completed';
            this.lessons.intermediate.status = 'unlocked';
        }
        
        // Check if intermediate is completed
        if (this.lessons.intermediate.completedLessons >= this.lessons.intermediate.totalLessons) {
            this.lessons.intermediate.status = 'completed';
            this.lessons.expert.status = 'unlocked';
        }
        
        // Check if expert is completed
        if (this.lessons.expert.completedLessons >= this.lessons.expert.totalLessons) {
            this.lessons.expert.status = 'completed';
        }
    }
    
    updateUI() {
        Object.keys(this.lessons).forEach(level => {
            const lesson = this.lessons[level];
            const node = document.querySelector(`[data-level="${level}"]`);
            
            if (node) {
                // Update status attribute
                node.setAttribute('data-status', lesson.status);
                
                // Update progress bar
                const progressFill = node.querySelector('.progress-fill');
                const progressText = node.querySelector('.progress-text');
                const progress = (lesson.completedLessons / lesson.totalLessons) * 100;
                
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                    progressFill.setAttribute('data-progress', progress);
                }
                
                if (progressText) {
                    progressText.textContent = `${lesson.completedLessons}/${lesson.totalLessons} lessons`;
                }
                
                // Update button icon based on status
                const button = node.querySelector('.lesson-button');
                if (button) {
                    if (lesson.status === 'locked') {
                        button.classList.add('locked');
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        `;
                    } else if (lesson.status === 'completed') {
                        button.classList.remove('locked');
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                        `;
                    } else {
                        button.classList.remove('locked');
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                        `;
                    }
                }
                
                // Update lesson circle icon
                const circleIcon = node.querySelector('.lesson-icon');
                if (circleIcon) {
                    if (lesson.status === 'completed') {
                        circleIcon.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"/>
                            </svg>
                        `;
                    } else if (lesson.status === 'locked') {
                        circleIcon.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        `;
                    } else {
                        circleIcon.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        `;
                    }
                }
            }
        });
    }
    
    bindEvents() {
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('lessonModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    startLesson(level) {
        const lesson = this.lessons[level];
        
        if (lesson.status === 'locked') {
            this.showNotification('Complete the previous level first!');
            return;
        }
        
        this.currentLesson = level;
        this.currentLessonIndex = lesson.completedLessons;
        
        // Show modal with lesson content
        this.showLessonModal(level);
    }
    
    showLessonModal(level) {
        const lesson = this.lessons[level];
        const modal = document.getElementById('lessonModal');
        const modalTitle = document.getElementById('modalTitle');
        const lessonContent = document.getElementById('lessonContent');
        
        modalTitle.textContent = `${lesson.name} - Lesson ${this.currentLessonIndex + 1}`;
        
        // Generate lesson content
        const currentLessonContent = lesson.content[this.currentLessonIndex];
        lessonContent.innerHTML = `
            <div class="lesson-content">
                <h3>${currentLessonContent}</h3>
                <div class="lesson-body">
                    <p>This is a simulated lesson for: <strong>${currentLessonContent}</strong></p>
                    <div class="lesson-exercise">
                        <h4>Exercise:</h4>
                        <p>Practice translating the following words and phrases related to ${currentLessonContent.toLowerCase()}.</p>
                        <div class="exercise-content">
                            <div class="word-pair">
                                <span class="english">Hello</span>
                                <span class="arrow">→</span>
                                <span class="indonesian">Halo</span>
                            </div>
                            <div class="word-pair">
                                <span class="english">Good morning</span>
                                <span class="arrow">→</span>
                                <span class="indonesian">Selamat pagi</span>
                            </div>
                            <div class="word-pair">
                                <span class="english">Thank you</span>
                                <span class="arrow">→</span>
                                <span class="indonesian">Terima kasih</span>
                            </div>
                        </div>
                    </div>
                    <div class="lesson-tip">
                        <h4>💡 Tip:</h4>
                        <p>Practice these phrases daily to improve your memory and pronunciation!</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for lesson content
        const style = document.createElement('style');
        style.textContent = `
            .lesson-content h3 {
                color: #2196F3;
                margin-bottom: 2vh;
                font-size: 1.4rem;
            }
            .lesson-body {
                line-height: 1.8;
            }
            .lesson-exercise {
                background: #f8f9fa;
                padding: 2vh;
                border-radius: 10px;
                margin: 2vh 0;
            }
            .lesson-exercise h4 {
                color: #333;
                margin-bottom: 1vh;
            }
            .exercise-content {
                margin-top: 1.5vh;
            }
            .word-pair {
                display: flex;
                align-items: center;
                gap: 1vw;
                margin: 1vh 0;
                padding: 1vh;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .english {
                font-weight: bold;
                color: #2196F3;
                min-width: 120px;
            }
            .arrow {
                color: #666;
                font-weight: bold;
            }
            .indonesian {
                font-weight: bold;
                color: #4caf50;
            }
            .lesson-tip {
                background: linear-gradient(135deg, #fff3e0, #ffffff);
                padding: 2vh;
                border-radius: 10px;
                border-left: 4px solid #ff9800;
                margin-top: 2vh;
            }
            .lesson-tip h4 {
                color: #ff9800;
                margin-bottom: 1vh;
            }
        `;
        document.head.appendChild(style);
        
        modal.style.display = 'block';
    }
    
    completeLesson() {
        if (!this.currentLesson) return;
        
        const lesson = this.lessons[this.currentLesson];
        
        // Increment completed lessons
        lesson.completedLessons++;
        
        // Update statuses
        this.updateLessonStatuses();
        
        // Save progress
        this.saveProgress();
        
        // Update UI
        this.updateUI();
        
        // Show completion message
        if (lesson.completedLessons >= lesson.totalLessons) {
            this.showNotification(`🎉 Congratulations! You completed ${lesson.name} level!`);
        } else {
            this.showNotification(`✅ Lesson completed! ${lesson.totalLessons - lesson.completedLessons} lessons remaining.`);
        }
        
        // Close modal
        this.closeModal();
    }
    
    closeModal() {
        const modal = document.getElementById('lessonModal');
        modal.style.display = 'none';
        this.currentLesson = null;
        this.currentLessonIndex = 0;
    }
    
    attemptLockedLesson(level) {
        const requiredLevel = level === 'intermediate' ? 'beginner' : 'intermediate';
        const requiredLessonName = this.lessons[requiredLevel].name;
        this.showNotification(`🔒 Complete ${requiredLessonName} level first to unlock this lesson!`);
    }
    
    showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hidden');
        }, 4000);
    }
}

// Global functions for HTML onclick events
function startLesson(level) {
    progressionSystem.startLesson(level);
}

function attemptLockedLesson(level) {
    progressionSystem.attemptLockedLesson(level);
}

function completeLesson() {
    progressionSystem.completeLesson();
}

function closeModal() {
    progressionSystem.closeModal();
}

// Initialize the system when DOM is loaded
let progressionSystem;

document.addEventListener('DOMContentLoaded', function() {
    progressionSystem = new LessonProgressionSystem();
    
    // Add feature icon functionality
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            progressionSystem.showNotification(`${feature.charAt(0).toUpperCase() + feature.slice(1)} feature coming soon!`);
        });
    });
    
    // Add profile icon functionality
    document.querySelector('.profile-icon').addEventListener('click', function() {
        progressionSystem.showNotification('Profile settings coming soon!');
    });
});

// Add smooth animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate lesson nodes on load
    const lessonNodes = document.querySelectorAll('.lesson-node');
    lessonNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            node.style.transition = 'all 0.6s ease';
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate course title
    const courseTitle = document.querySelector('.course-title');
    courseTitle.style.opacity = '0';
    courseTitle.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        courseTitle.style.transition = 'all 0.6s ease';
        courseTitle.style.opacity = '1';
        courseTitle.style.transform = 'translateY(0)';
    }, 100);
});