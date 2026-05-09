// ─── Typing animation ───
const words = ['продажи', 'поддержку', 'магазин', 'CRM', 'рассылки']
let wi = 0,
	ci = 0,
	deleting = false
const typEl = document.getElementById('typing')

function typeLoop() {
	if (!typEl) return
	const word = words[wi]
	if (!deleting) {
		typEl.textContent = word.slice(0, ++ci)
		if (ci === word.length) {
			deleting = true
			setTimeout(typeLoop, 1800)
			return
		}
	} else {
		typEl.textContent = word.slice(0, --ci)
		if (ci === 0) {
			deleting = false
			wi = (wi + 1) % words.length
		}
	}
	setTimeout(typeLoop, deleting ? 55 : 95)
}
typeLoop()

// ─── Scroll reveal ───
const revealEls = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(
	entries => {
		entries.forEach((e, i) => {
			if (e.isIntersecting) {
				setTimeout(() => e.target.classList.add('visible'), i * 90)
				observer.unobserve(e.target)
			}
		})
	},
	{ threshold: 0.08 },
)
revealEls.forEach(el => observer.observe(el))

// ─── Nav scroll style ───
const navEl = document.querySelector('nav')
window.addEventListener(
	'scroll',
	() => {
		if (window.scrollY > 60) {
			navEl.classList.add('scrolled')
		} else {
			navEl.classList.remove('scrolled')
		}
	},
	{ passive: true },
)

// ─── Smooth scroll ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener('click', e => {
		e.preventDefault()
		const target = document.querySelector(a.getAttribute('href'))
		if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
	})
})

// ─── Stat number counter animation ───
function animateCounter(el, target, suffix = '') {
	const duration = 1400
	const start = performance.now()
	const isDecimal = target % 1 !== 0

	function update(now) {
		const elapsed = now - start
		const progress = Math.min(elapsed / duration, 1)
		const eased = 1 - Math.pow(1 - progress, 3)
		const current = isDecimal
			? (eased * target).toFixed(1)
			: Math.round(eased * target)
		el.textContent = current + suffix
		if (progress < 1) requestAnimationFrame(update)
	}
	requestAnimationFrame(update)
}

const statsObserver = new IntersectionObserver(
	entries => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				const nums = e.target.querySelectorAll('.stat-num')
				nums.forEach(num => {
					const text = num.textContent
					const match = text.match(/^(\d+)(.*)$/)
					if (match) {
						const val = parseInt(match[1])
						const suffix = match[2]
						animateCounter(num, val, suffix)
					}
				})
				statsObserver.unobserve(e.target)
			}
		})
	},
	{ threshold: 0.3 },
)

const statsBar = document.querySelector('.stats-bar')
if (statsBar) statsObserver.observe(statsBar)

// ─── Parallax orbs on mouse move ───
const orbs = document.querySelectorAll('.orb')
let mouseX = 0,
	mouseY = 0
let currentX = 0,
	currentY = 0

document.addEventListener(
	'mousemove',
	e => {
		mouseX = (e.clientX / window.innerWidth - 0.5) * 2
		mouseY = (e.clientY / window.innerHeight - 0.5) * 2
	},
	{ passive: true },
)

function animateOrbs() {
	currentX += (mouseX - currentX) * 0.05
	currentY += (mouseY - currentY) * 0.05

	orbs.forEach((orb, i) => {
		const factor = (i + 1) * 12
		orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`
	})

	requestAnimationFrame(animateOrbs)
}
animateOrbs()
