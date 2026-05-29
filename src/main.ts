import './styles.css'
import { content, type Lang } from './content'

const baseUrl = import.meta.env.BASE_URL

function asset(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${normalized}`
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function langAttr(lang: Lang): string {
  return lang === 'hi' ? ' lang="hi"' : ' lang="en"'
}

function renderParagraphs(paragraphs: readonly string[], lang: Lang): string {
  return paragraphs.map((p) => `<p${langAttr(lang)}>${escapeHtml(p)}</p>`).join('')
}

function renderHearts(): string {
  const hearts = ['♥', '♡', '❤', '💕', '💖']
  return Array.from({ length: 28 }, (_, i) => {
    const left = (i * 3.6 + 2) % 96
    const delay = (i * 0.9) % 16
    const duration = 10 + (i % 8) * 2
    const heart = hearts[i % hearts.length]
    const size = 0.7 + (i % 4) * 0.15
    return `<span class="heart-float" style="left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;font-size:${size}rem" aria-hidden="true">${heart}</span>`
  }).join('')
}

function renderTicker(): string {
  const items = [...content.ticker, ...content.ticker]
    .map((t) => `<span class="ticker__item">${escapeHtml(t)}</span>`)
    .join('')
  return `<div class="ticker" aria-hidden="true"><div class="ticker__track">${items}</div></div>`
}

function renderAmbient(): string {
  const blobs = [
    { top: '8%', left: '-10%', size: '45vmin', delay: '0s' },
    { top: '40%', left: '75%', size: '38vmin', delay: '-4s' },
    { top: '70%', left: '5%', size: '42vmin', delay: '-8s' },
  ]
    .map(
      (b) =>
        `<div class="ambient-blob" style="top:${b.top};left:${b.left};width:${b.size};height:${b.size};animation-delay:${b.delay}" aria-hidden="true"></div>`
    )
    .join('')

  const sparkles = Array.from({ length: 24 }, (_, i) => {
    const top = (i * 17 + 7) % 98
    const left = (i * 23 + 11) % 98
    const delay = (i * 0.35) % 5
    const scale = 0.6 + (i % 3) * 0.25
    return `<span class="sparkle" style="top:${top}%;left:${left}%;animation-delay:${delay}s;transform:scale(${scale})" aria-hidden="true"></span>`
  }).join('')

  return `<div class="ambient" aria-hidden="true">${blobs}${sparkles}</div>`
}

function wrapOrnateCard(inner: string, cardClass: string, reveal = true): string {
  const revealAttr = reveal ? ' reveal" data-reveal' : '"'
  return `
    <div class="envelope-card${revealAttr}>
      <div class="envelope-card__corner envelope-card__corner--tl" aria-hidden="true"></div>
      <div class="envelope-card__corner envelope-card__corner--tr" aria-hidden="true"></div>
      <div class="envelope-card__corner envelope-card__corner--bl" aria-hidden="true"></div>
      <div class="envelope-card__corner envelope-card__corner--br" aria-hidden="true"></div>
      <div class="${cardClass}">${inner}</div>
    </div>
  `
}

function renderQuote(
  quote: (typeof content.quotes)[number],
  index: number
): string {
  const text = quote.text.trim()
  const lang = quote.lang
  const featured = quote.featured
  const langClass = lang === 'hi' ? ' quote-card--hi' : ' quote-card--en'
  const featuredClass = featured ? ' quote-card--featured' : ''

  const textHtml = `<p class="quote-card__text"${langAttr(lang)}>${escapeHtml(text)}</p>`
  const author = quote.author.trim()
  const authorHtml = author
    ? `<p class="quote-card__author">${escapeHtml(author)}</p>`
    : ''

  return `
    <article class="quote-card${langClass}${featuredClass}" data-reveal style="transition-delay:${index * 50}ms">
      <span class="quote-card__mark" aria-hidden="true">❝</span>
      ${textHtml}
      ${authorHtml}
    </article>
  `
}

function renderImpact(
  moment: (typeof content.impactMoments)[number],
  index: number
): string {
  return `
    <div class="moment-screen" data-reveal data-moment style="transition-delay:${index * 100}ms">
      <p class="moment-screen__text"${langAttr(moment.lang)}>${escapeHtml(moment.text)}</p>
    </div>
  `
}

function renderPhoto(
  photo: (typeof content.photos)[number],
  index: number
): string {
  const src = asset(photo.src)
  const heroClass = 'hero' in photo && photo.hero ? ' photo-card--hero' : ''
  const caption = photo.caption
    ? `<p class="photo-card__caption" lang="hi">${escapeHtml(photo.caption)}</p>`
    : ''
  const tilt = index % 2 === 0 ? ' photo-card--tilt-l' : ' photo-card--tilt-r'
  return `
    <figure class="photo-card photo-card--polaroid${heroClass}${tilt}" data-reveal style="transition-delay:${index * 100}ms">
      <div class="photo-card__frame">
        <img class="photo-card__img" src="${escapeHtml(src)}" alt="${escapeHtml(photo.alt)}" loading="lazy" width="400" height="300" />
      </div>
      ${caption}
    </figure>
  `
}

function renderQuotesWithImpact(): string {
  const quotes = content.quotes
  const impacts = content.impactMoments
  if (impacts.length === 0) {
    return quotes.map((q, i) => renderQuote(q, i)).join('')
  }
  let html = ''
  let impactIdx = 0
  const chunkSize = 3
  for (let i = 0; i < quotes.length; i += chunkSize) {
    const chunk = quotes.slice(i, i + chunkSize)
    html += chunk.map((q, j) => renderQuote(q, i + j)).join('')
    if (impactIdx < impacts.length && i + chunkSize < quotes.length) {
      html += renderImpact(impacts[impactIdx], impactIdx)
      impactIdx += 1
    }
  }
  while (impactIdx < impacts.length) {
    html += renderImpact(impacts[impactIdx], impactIdx)
    impactIdx += 1
  }
  return html
}

function renderApp(): void {
  const sorryHtml =
    renderParagraphs(content.sorryEn, 'en') +
    renderParagraphs(content.sorryHi, 'hi')
  const loveHtml =
    renderParagraphs(content.loveHi, 'hi') + renderParagraphs(content.loveEn, 'en')
  const quotesHtml = renderQuotesWithImpact()
  const photosHtml = content.photos.map(renderPhoto).join('')
  const whispers = content.heroWhispers.map((w) => escapeHtml(w)).join('|')

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="scroll-progress" aria-hidden="true"><div class="scroll-progress__bar"></div></div>

    <div class="intro" id="intro">
      <div class="intro__glow" aria-hidden="true"></div>
      <p class="intro__line">${escapeHtml(content.intro.line)}</p>
      <p class="intro__sub" lang="hi">${escapeHtml(content.intro.sub)}</p>
      <button type="button" class="intro__btn" id="intro-btn">${escapeHtml(content.intro.button)}</button>
    </div>

    ${renderAmbient()}
    <div class="hearts-bg" aria-hidden="true">${renderHearts()}</div>
    ${renderTicker()}

    <header class="hero hero--framed" id="top">
      <div class="hero__frame" aria-hidden="true"></div>
      <div class="hero__content">
        <p class="hero__tagline" lang="hi">${escapeHtml(content.hero.tagline)}</p>
        <h1 class="hero__title"><span class="hero__title-text">${escapeHtml(content.hero.title)}</span></h1>
        <p class="hero__subtitle" lang="hi">${escapeHtml(content.hero.subtitle)}</p>
        <p class="hero__typewriter" id="typewriter" lang="hi" data-whispers="${whispers}"></p>
        <a class="hero__scroll" href="#sorry">${escapeHtml(content.hero.scrollLabel)}</a>
      </div>
    </header>

    <section class="section section--sorry" id="sorry" aria-labelledby="sorry-title">
      <div class="section__inner section__inner--narrow">
        <h2 class="section__title section__title--small section__title--decorated" id="sorry-title" lang="hi">${escapeHtml(content.sections.sorry)}</h2>
        ${wrapOrnateCard(sorryHtml, 'card card--sorry')}
      </div>
    </section>

    <section class="section section--love section--hi" id="love" aria-labelledby="love-title">
      <div class="section__inner">
        <h2 class="section__title section__title--hi section__title--decorated" id="love-title" lang="hi">${escapeHtml(content.sections.love)}</h2>
        ${wrapOrnateCard(loveHtml, 'card letter letter--hi letter--love')}
      </div>
    </section>

    <section class="section section--quotes" id="quotes" aria-labelledby="quotes-title">
      <div class="section__inner section__inner--wide">
        <h2 class="section__title section__title--decorated" id="quotes-title" lang="hi">${escapeHtml(content.sections.quotes)}</h2>
        <div class="quotes">${quotesHtml}</div>
      </div>
    </section>

    <section class="section section--photos" id="photos" aria-labelledby="photos-title">
      <div class="section__inner section__inner--photos">
        <h2 class="section__title section__title--decorated" id="photos-title" lang="hi">${escapeHtml(content.sections.photos)}</h2>
        <div class="gallery-wrap">
          <div class="gallery" role="list">${photosHtml}</div>
          <p class="gallery-hint" lang="hi">Swipe karo — har photo tumhari yaad dilati hai</p>
        </div>
      </div>
    </section>

    <section class="section closing" id="closing" aria-labelledby="closing-title">
      <div class="section__inner">
        <h2 class="section__title section__title--decorated" id="closing-title" lang="hi">${escapeHtml(content.sections.closing)}</h2>
        ${wrapOrnateCard(
          `<p class="closing__pulse" aria-hidden="true">${escapeHtml(content.closing.pulse)}</p>
          <p class="closing__line" lang="hi">${escapeHtml(content.closing.lineHi)}</p>
          <p class="closing__line closing__line--en" lang="en">${escapeHtml(content.closing.lineEn)}</p>
          <p class="closing__signature-label" lang="hi">${escapeHtml(content.closing.signature)}</p>
          <p class="closing__signature">${escapeHtml(content.closing.signatory)}</p>`,
          'card card--closing'
        )}
      </div>
    </section>

    <footer class="footer">
      <span class="footer__heart" aria-hidden="true">♥</span>${escapeHtml(content.footer)}
    </footer>
  `
}

function initIntro(): void {
  const intro = document.getElementById('intro')
  const btn = document.getElementById('intro-btn')
  const dismiss = () => {
    intro?.classList.add('intro--hide')
    document.body.classList.add('is-unlocked')
    setTimeout(() => intro?.remove(), 800)
  }
  btn?.addEventListener('click', dismiss)
  setTimeout(() => intro?.classList.add('intro--ready'), 400)
}

function initTypewriter(): void {
  const el = document.getElementById('typewriter')
  if (!el) return
  const raw = el.dataset.whispers
  if (!raw) return
  const lines = raw.split('|')
  let lineIdx = 0
  let charIdx = 0
  let deleting = false

  const tick = () => {
    const line = lines[lineIdx]
    if (!deleting) {
      el.textContent = line.slice(0, charIdx + 1)
      charIdx += 1
      if (charIdx === line.length) {
        setTimeout(() => {
          deleting = true
          tick()
        }, 2200)
        return
      }
      setTimeout(tick, 55)
    } else {
      el.textContent = line.slice(0, charIdx)
      charIdx -= 1
      if (charIdx === 0) {
        deleting = false
        lineIdx = (lineIdx + 1) % lines.length
        setTimeout(tick, 400)
        return
      }
      setTimeout(tick, 28)
    }
  }
  tick()
}

function initScrollProgress(): void {
  const bar = document.querySelector<HTMLElement>('.scroll-progress__bar')
  if (!bar) return
  const update = () => {
    const doc = document.documentElement
    const scrollTop = doc.scrollTop
    const max = doc.scrollHeight - doc.clientHeight
    const pct = max > 0 ? (scrollTop / max) * 100 : 0
    bar.style.width = `${pct}%`
  }
  window.addEventListener('scroll', update, { passive: true })
  update()
}

function initScrollReveal(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elements = document.querySelectorAll<HTMLElement>(
    '[data-reveal], .quote-card, .moment-screen, .envelope-card'
  )

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.08 }
  )

  elements.forEach((el) => observer.observe(el))
}

function initParallaxHearts(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return
  const bg = document.querySelector<HTMLElement>('.hearts-bg')
  if (!bg) return
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY * 0.15
      bg.style.transform = `translateY(${y}px)`
    },
    { passive: true }
  )
}

renderApp()
initIntro()
initTypewriter()
initScrollProgress()
initScrollReveal()
initParallaxHearts()
