import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import selectedCreamImage from "@/imports/005030000007-2.jpg"
import selectedEffectorImage from "@/imports/005001000011.jpg"
import selectedProductImage from "@/imports/008000001666.jpg"
import selectedConcernImage from "@/imports/____.png"
import selectedSnsImage from "@/imports/______-1.jpg"
import heroPdrnMobileImage from "@/imports/hero-pdrn-mobile.png"
import IngredientDetailPage from "@/pages/IngredientDetailPage"

const SkinTypePage = lazy(() => import("@/pages/SkinTypePage"))

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")
const A = `${BASE}/assets`
const siteHref = (path: string) => `${BASE}${path}`

interface MenuGroup {
  title: string
  items: string[]
}

interface IconButtonProps {
  src: string
  label: string
}

interface SectionHeadingProps {
  title: string
  link?: string
}

const menus: Record<string, MenuGroup[]> = {
  ABOUT: [{ title: "스킨푸드 소개", items: ["브랜드 스토리"] }],
  "FOOD INGREDIENTS": [
    {
      title: "원료",
      items: [
        "당근",
        "감자",
        "미나리",
        "도토리",
        "블루캐모마일",
        "유자",
        "레몬그라스",
        "라이스",
        "블랙슈가",
        "샤인머스켓",
        "나주배",
        "무화과",
        "밀크쉐이크",
        "베리선",
        "수비드",
        "아보카도",
        "아스파라거스",
        "약초방",
        "에그화이트",
        "연어",
        "초코",
        "토마토",
        "파인애플",
        "피치뽀송",
        "바질 티트리",
        "바나나",
        "레드빈",
      ],
    },
  ],
  PRODUCTS: [
    {
      title: "베스트",
      items: ["당근 패드", "블랙슈가 스크럽", "로열허니 에센스"],
    },
    {
      title: "피부타입별",
      items: ["진정", "모공", "수분", "각질", "안티에이징", "브라이트닝"],
    },
    {
      title: "스킨케어",
      items: ["토너", "에멀전", "앰플/에센스/세럼", "크림", "미스트"],
    },
    { title: "클렌징", items: ["클렌징 폼", "클렌징 오일", "스크럽", "기타"] },
    { title: "선케어", items: ["선크림/스틱"] },
    { title: "기타", items: ["바디", "파우더", "색조", "헤어", "부자재"] },
  ],
  STORY: [{ title: "스킨푸드 활동", items: ["잘버렸습니다. 캠페인"] }],
  COMMUNITY: [
    {
      title: "스킨푸드 소식",
      items: ["이벤트", "멤버십", "공지사항", "매장안내", "1:1 문의"],
    },
  ],
}

const navTargets: Record<string, string> = {
  ABOUT: "/#top",
  "FOOD INGREDIENTS": "/#ingredients",
  PRODUCTS: "/#products",
  STORY: "/#campaign",
  REVIEW: "/#concern",
  COMMUNITY: "/#footer",
}

const ingredientRoutes: Record<string, string> = {
  당근: "/sub_02_01",
  감자: "/sub_02_02",
  블루캐모마일: "/sub_02_05",
  블랙슈가: "/sub_02_09",
}

const productRoutes: Record<string, string> = {
  진정: "/sub2_02_01",
  모공: "/sub2_02_02",
  수분: "/sub2_02_03",
}

const submenuRoutes: Record<string, string> = {
  ...ingredientRoutes,
  ...productRoutes,
}

function IconButton({ src, label }: IconButtonProps) {
  return (
    <button className="icon-button" type="button" aria-label={label}>
      <img src={`${A}/${src}`} alt="" />
    </button>
  )
}

function Header() {
  const { pathname } = useLocation()
  const aboutItemRef = useRef<HTMLDivElement>(null)
  const storyItemRef = useRef<HTMLDivElement>(null)
  const communityItemRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "FOOD INGREDIENTS",
  )
  const navItems = [
    "ABOUT",
    "FOOD INGREDIENTS",
    "PRODUCTS",
    "STORY",
    "REVIEW",
    "COMMUNITY",
  ]

  useEffect(() => {
    let alignmentFrame = 0
    const alignCommunityMenu = () => {
      if (window.innerWidth <= 767) return

      for (const itemRef of [aboutItemRef, storyItemRef, communityItemRef]) {
        const item = itemRef.current
        const link = item?.querySelector<HTMLElement>(":scope > a")
        const menu = item?.querySelector<HTMLElement>(".mega-menu")
        const inner = menu?.querySelector<HTMLElement>(".mega-inner")
        if (!link || !menu || !inner) continue

        const menuPadding = Number.parseFloat(
          getComputedStyle(menu).paddingLeft,
        )
        inner.style.paddingLeft = `${
          link.getBoundingClientRect().left -
          menu.getBoundingClientRect().left -
          menuPadding
        }px`
      }
    }
    const scheduleAlignment = () => {
      window.cancelAnimationFrame(alignmentFrame)
      alignmentFrame = window.requestAnimationFrame(alignCommunityMenu)
    }

    alignCommunityMenu()
    window.addEventListener("resize", scheduleAlignment)
    void document.fonts.ready.then(scheduleAlignment)
    return () => {
      window.removeEventListener("resize", scheduleAlignment)
      window.cancelAnimationFrame(alignmentFrame)
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
          >
            <img src={`${A}/ce7e6.svg`} alt="" />
          </button>
          <a
            className="brand-logo"
            href={siteHref("/")}
            aria-label="스킨푸드 메인"
          >
            <img src={`${A}/c7315.svg`} alt="SKINFOOD" />
          </a>
          <nav className="desktop-nav" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <div
                className="nav-item"
                key={item}
                ref={
                  item === "ABOUT"
                    ? aboutItemRef
                    : item === "STORY"
                      ? storyItemRef
                      : item === "COMMUNITY"
                        ? communityItemRef
                        : undefined
                }
              >
                <a
                  className={
                    (item === "FOOD INGREDIENTS" &&
                      Object.values(ingredientRoutes).includes(pathname)) ||
                    (item === "PRODUCTS" &&
                      Object.values(productRoutes).includes(pathname))
                      ? "active"
                      : undefined
                  }
                  href={siteHref(navTargets[item])}
                >
                  {item}
                </a>
                {menus[item] && (
                  <div
                    className={`mega-menu mega-${item.toLowerCase().replace(" ", "-")}`}
                  >
                    <div className="mega-inner">
                      {menus[item].map((group) => (
                        <div className="mega-group" key={group.title}>
                          <strong>{group.title}</strong>
                          <div className="mega-links">
                            {group.items.map((sub) => (
                              <a
                                className={
                                  submenuRoutes[sub] === pathname
                                    ? "active"
                                    : undefined
                                }
                                href={siteHref(
                                  submenuRoutes[sub] ?? navTargets[item],
                                )}
                                key={sub}
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="header-utils">
            <IconButton src="46b84.svg" label="검색" />
            <span className="desktop-util">
              <IconButton src="bfed7.svg" label="마이페이지" />
            </span>
            <IconButton src="3d6b0.svg" label="장바구니" />
            <span className="desktop-util">
              <IconButton src="77e7c.svg" label="언어 선택" />
            </span>
          </div>
        </div>
      </header>

      <div
        className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="drawer-top">
          <a href={siteHref("/")} aria-label="스킨푸드 메인">
            <img src={`${A}/b3c29.svg`} alt="SKINFOOD" />
          </a>
          <button onClick={() => setMobileOpen(false)} aria-label="메뉴 닫기">
            ×
          </button>
        </div>
        <nav aria-label="모바일 메뉴">
          {navItems.map((item) => (
            <div className="drawer-row" key={item}>
              <button
                className="drawer-title"
                onClick={() =>
                  menus[item]
                    ? setOpenAccordion(openAccordion === item ? null : item)
                    : (window.location.href = siteHref(navTargets[item]))
                }
                aria-expanded={openAccordion === item}
              >
                <span>{item}</span>
                <span>
                  {menus[item] ? (openAccordion === item ? "−" : "+") : "→"}
                </span>
              </button>
              {menus[item] && openAccordion === item && (
                <div className="drawer-submenu">
                  {menus[item].map((group) => (
                    <div key={group.title}>
                      <strong>{group.title}</strong>
                      <div>
                        {group.items.map((sub) => (
                          <a
                            className={
                              submenuRoutes[sub] === pathname
                                ? "active"
                                : undefined
                            }
                            href={siteHref(
                              submenuRoutes[sub] ?? navTargets[item],
                            )}
                            onClick={() => setMobileOpen(false)}
                            key={sub}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {mobileOpen && (
        <button
          className="drawer-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="메뉴 닫기"
        />
      )}
    </>
  )
}

const heroSlides = [
  {
    desktop: "b4489.png",
    mobile: `${A}/ca8cb.png`,
    kicker: "먹어서 좋은 음식은 피부에도 좋다",
    title: (
      <>
        TREAT YOUR SKIN
        <br />
        WITH FOOD
      </>
    ),
    desc: "스킨푸드는 푸드의 영양을 피부에 전달하며 건강한 푸드의 영양을 그대로 담아냅니다.",
    button: "브랜드 스토리 보기",
    target: "#campaign",
  },
  {
    desktop: "30a42.png",
    mobile: `${A}/1506f.png`,
    kicker: "내 피부에 필요한 원료를 찾아보세요",
    title: (
      <>
        내 피부 고민에 맞는
        <br />
        스킨푸드 만의 푸드 솔루션
      </>
    ),
    desc: "보습, 진정, 피부 결 케어까지 피부 고민에 맞는 푸드 솔루션을 확인해보세요.",
    button: "피부 고민별 원료 보기",
    target: "#ingredients",
  },
  {
    desktop: "2cdca.png",
    mobile: heroPdrnMobileImage,
    kicker: "NEW PDRN",
    title: (
      <>
        듀얼 캡슐로 채우는
        <br />
        당근 PDRN 속수분 세럼
      </>
    ),
    desc: "건조하고 지친 피부에 당근 PDRN의 수분 에너지를 전해줍니다.",
    button: "당근 PDRN 보기",
    target: "#products",
  },
]

function Hero() {
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(
      () => setSlide((value) => (value + 1) % heroSlides.length),
      5000,
    )
    return () => window.clearInterval(id)
  }, [playing])

  return (
    <section
      className={`hero hero-${slide}`}
      aria-roledescription="carousel"
      aria-label="메인 배너"
    >
      <div
        className="hero-track"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {heroSlides.map((item, index) => (
          <article
            className="hero-slide"
            key={item.desktop}
            aria-hidden={slide !== index}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={
                  index === 1
                    ? `${A}/hero-food-solution-mobile.png`
                    : item.mobile
                }
              />
              <img src={`${A}/${item.desktop}`} alt="" />
            </picture>
            <div
              className={index === 1 ? "hero-copy desktop-only" : "hero-copy"}
            >
              <p className="hero-kicker">{item.kicker}</p>
              <h1>{item.title}</h1>
              <p className="hero-desc">{item.desc}</p>
              <a
                className="cta"
                href={item.target}
                tabIndex={slide === index ? undefined : -1}
              >
                {item.button}
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <button
        className="hero-arrow prev"
        onClick={() => setSlide((slide + 2) % 3)}
        aria-label="이전 배너"
      >
        <img src={`${A}/44132.svg`} alt="" />
      </button>
      <button
        className="hero-arrow next"
        onClick={() => setSlide((slide + 1) % 3)}
        aria-label="다음 배너"
      >
        <img src={`${A}/243e8.svg`} alt="" />
      </button>
      <div className="hero-controls">
        {heroSlides.map((_, index) => (
          <button
            className={slide === index ? "active" : ""}
            onClick={() => setSlide(index)}
            key={index}
            aria-label={`${index + 1}번 배너`}
          />
        ))}
        <button
          className="play-toggle"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "자동 재생 일시정지" : "자동 재생 시작"}
        >
          {playing ? (
            <img src={`${A}/3b364.svg`} alt="" />
          ) : (
            <span className="play-icon" />
          )}
        </button>
      </div>
    </section>
  )
}

function SectionHeading({ title, link }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {link && (
        <a href="#top">
          {link}
          <span>›</span>
        </a>
      )}
    </div>
  )
}

const ingredients = [
  {
    image: "6b42a.png",
    en: "BLUE CHAMOMILE",
    name: "블루 캐모마일",
    text: "작은 꽃에 담긴 편안함, 피부를 위한 촉촉한 휴식.",
    href: "/sub_02_05",
  },
  {
    image: "c578b.png",
    en: "CARROT",
    name: "당근",
    text: "흙에서 자란 싱그러움을 매일의 진정 케어로.",
    href: "/sub_02_01",
  },
  {
    image: "85f80.png",
    en: "BLACK SUGAR",
    name: "블랙슈가",
    text: "풍부한 흑설탕 알갱이로 매끈하게 가꾸는 피부.",
    href: "/sub_02_09",
  },
]

function Ingredients() {
  const dragState = useRef<{
    pointerId: number
    pointerType: string
    startX: number
    startY: number
    scrollLeft: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)

  return (
    <section className="page-section ingredients-section" id="ingredients">
      <div className="content">
        <SectionHeading title="Food Ingredients" link="원료 전체 보기" />
        <div
          className="ingredient-grid swipe-row"
          onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
            if (
              (event.pointerType !== "touch" && event.button !== 0) ||
              event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
            ) {
              return
            }
            suppressClick.current = false
            dragState.current = {
              pointerId: event.pointerId,
              pointerType: event.pointerType,
              startX: event.clientX,
              startY: event.clientY,
              scrollLeft: event.currentTarget.scrollLeft,
              moved: false,
            }
          }}
          onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
            const drag = dragState.current
            if (!drag || drag.pointerId !== event.pointerId) return

            const deltaX = event.clientX - drag.startX
            const deltaY = event.clientY - drag.startY
            if (!drag.moved) {
              if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 6) return
              if (
                drag.pointerType === "touch" &&
                Math.abs(deltaY) >= Math.abs(deltaX)
              ) {
                dragState.current = null
                return
              }
              drag.moved = true
              event.currentTarget.classList.add("is-dragging")
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.setPointerCapture(event.pointerId)
              }
            }
            event.currentTarget.scrollLeft = drag.scrollLeft - deltaX
          }}
          onPointerUp={(event: PointerEvent<HTMLDivElement>) => {
            const drag = dragState.current
            if (!drag || drag.pointerId !== event.pointerId) return
            suppressClick.current = drag.moved
            dragState.current = null
            event.currentTarget.classList.remove("is-dragging")
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onPointerCancel={(event: PointerEvent<HTMLDivElement>) => {
            if (dragState.current?.pointerId !== event.pointerId) return
            dragState.current = null
            event.currentTarget.classList.remove("is-dragging")
          }}
          onClickCapture={(event) => {
            if (!suppressClick.current) return
            event.preventDefault()
            event.stopPropagation()
            suppressClick.current = false
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          {ingredients.map((item) => (
            <a
              className="ingredient-card"
              href={siteHref(item.href)}
              key={item.name}
            >
              <div className="card-image ingredient-image">
                <img src={`${A}/${item.image}`} alt={`${item.name} 원료`} />
                <span>INGREDIENT</span>
              </div>
              <div className="card-copy">
                <small>{item.en}</small>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <b>원료 상세 보기 →</b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

type Product = {
  image: string
  name: string
  text: string
  size: string
  price: string
  discount?: string
  originalPrice?: string
}

const products: Product[] = [
  {
    image: "blue-chamomile-edited.jpg",
    name: "블루 캐모마일 히알루로닉 겔 패드",
    text: "캐모마일의 편안함을 담은 수분 겔 패드",
    size: "70매",
    discount: "35%",
    price: "16,900원",
    originalPrice: "26,000원",
  },
  {
    image: "9211e.png",
    name: "캐롯 카로틴 카밍 워터 패드",
    text: "당근의 영양을 담은 데일리 진정 패드",
    size: "60매",
    discount: "35%",
    price: "16,900원",
    originalPrice: "26,000원",
  },
  {
    image: "2937b.png",
    name: "블랙슈가 마스크 워시오프",
    text: "흑설탕으로 부드럽게 씻어내는 각질 케어",
    size: "120g",
    discount: "50%",
    price: "7,500원",
    originalPrice: "15,000원",
  },
  {
    image: "44178.png",
    name: "블루 캐모마일 히알루로닉 크림",
    text: "촉촉하게 채우는 캐모마일 수분 크림",
    size: "70ml",
    price: "25,000원",
  },
]

function Products() {
  const [cartMessage, setCartMessage] = useState("")
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    {},
  )
  const dragState = useRef<{
    pointerId: number
    startX: number
    scrollLeft: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)

  return (
    <section className="page-section products-section" id="products">
      <div className="content">
        <SectionHeading title="Products" link="전체 제품" />
        <div className="product-carousel-shell">
          <div
            className="product-grid swipe-row"
            aria-label="추천 제품 캐러셀"
            onPointerDown={(event) => {
              suppressClick.current = false
              if (event.pointerType !== "mouse" || event.button !== 0) return
              if (
                event.target instanceof Element &&
                event.target.closest("button, a")
              ) {
                return
              }

              const carousel = event.currentTarget
              dragState.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                scrollLeft: carousel.scrollLeft,
                moved: false,
              }
              carousel.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              const drag = dragState.current
              if (!drag || drag.pointerId !== event.pointerId) return

              const distance = event.clientX - drag.startX
              if (!drag.moved && Math.abs(distance) > 5) {
                drag.moved = true
                event.currentTarget.classList.add("is-dragging")
              }
              if (drag.moved)
                event.currentTarget.scrollLeft = drag.scrollLeft - distance
            }}
            onPointerUp={(event) => {
              const drag = dragState.current
              if (!drag || drag.pointerId !== event.pointerId) return

              suppressClick.current = drag.moved
              event.currentTarget.classList.remove("is-dragging")
              dragState.current = null
            }}
            onPointerCancel={(event) => {
              if (dragState.current?.pointerId !== event.pointerId) return
              event.currentTarget.classList.remove("is-dragging")
              dragState.current = null
            }}
            onClickCapture={(event) => {
              if (!suppressClick.current) return
              event.preventDefault()
              event.stopPropagation()
              suppressClick.current = false
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            {[
              { ...products[0], image: "44178.png" },
              products[1],
              products[2],
              { ...products[3], image: "5bf8c.png" },
              {
                image: "b443d.png",
                name: "캐롯 카로틴 모이스트 이펙터",
                text: "피부 속까지 수분 가득 진정 앰플",
                size: "55ml",
                price: "27,000원",
              },
            ].map((item, index) => (
              <article className="product-card" key={`${item.name}-${index}`}>
                <div className="product-image-wrap">
                  <a className="product-card-image-link" href="#products">
                    <div className="card-image product-image">
                      <img
                        src={
                          index === 0
                            ? selectedProductImage
                            : index === 3
                              ? selectedCreamImage
                              : index === 4
                                ? selectedEffectorImage
                                : `${A}/${item.image}`
                        }
                        alt={item.name}
                      />
                      <span>BEST</span>
                    </div>
                  </a>
                  <div className="product-card-web-actions">
                    <button
                      className="product-web-cart"
                      type="button"
                      aria-label={`${item.name} 장바구니 담기`}
                      onClick={() =>
                        setCartMessage(`장바구니에 담았습니다: ${item.name}`)
                      }
                    >
                      <img src={`${A}/cart-hover.png`} alt="" />
                    </button>
                    <button
                      className={`product-web-favorite ${
                        likedProducts[item.name] ? "is-liked" : ""
                      }`}
                      type="button"
                      aria-label={`${item.name} ${
                        likedProducts[item.name] ? "찜 취소" : "찜하기"
                      }`}
                      aria-pressed={Boolean(likedProducts[item.name])}
                      onClick={() =>
                        setLikedProducts((current) => ({
                          ...current,
                          [item.name]: !current[item.name],
                        }))
                      }
                    >
                      <span aria-hidden="true">
                        {likedProducts[item.name] ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>
                </div>
                <button
                  className="product-cart-tab"
                  type="button"
                  aria-label={`${item.name} 장바구니 담기`}
                  onClick={() =>
                    setCartMessage(`장바구니에 담았습니다: ${item.name}`)
                  }
                >
                  <img src={`${A}/3d6b0.svg`} alt="" />
                  <span>담기</span>
                </button>
                <a className="product-card-info-link" href="#products">
                  <div className="card-copy">
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    <small>{item.size}</small>
                    <div className="product-pricing">
                      {item.discount && (
                        <span className="product-discount">
                          {item.discount}
                        </span>
                      )}
                      <span
                        className={
                          item.originalPrice
                            ? "product-current-price"
                            : undefined
                        }
                      >
                        {item.price}
                      </span>
                      {item.originalPrice && <del>{item.originalPrice}</del>}
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
          <button
            className="product-carousel-arrow prev"
            type="button"
            aria-label="이전 제품 보기"
            onClick={(event) => {
              const carousel =
                event.currentTarget.parentElement?.querySelector<HTMLElement>(
                  ".product-grid",
                )
              const card = carousel?.querySelector<HTMLElement>(".product-card")
              carousel?.scrollBy({
                left: -((card?.getBoundingClientRect().width ?? 320) + 24),
                behavior: "smooth",
              })
            }}
          >
            <img src={`${A}/44132.svg`} alt="" />
          </button>
          <button
            className="product-carousel-arrow next"
            type="button"
            aria-label="다음 제품 보기"
            onClick={(event) => {
              const carousel =
                event.currentTarget.parentElement?.querySelector<HTMLElement>(
                  ".product-grid",
                )
              const card = carousel?.querySelector<HTMLElement>(".product-card")
              carousel?.scrollBy({
                left: (card?.getBoundingClientRect().width ?? 320) + 24,
                behavior: "smooth",
              })
            }}
          >
            <img src={`${A}/243e8.svg`} alt="" />
          </button>
          {cartMessage && (
            <p
              className="product-cart-message"
              role="status"
              aria-live="polite"
            >
              {cartMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

const concernData = [
  {
    label: "진정",
    visual: "19856.png",
    visualSrc: selectedConcernImage,
    visualText: "추천 제품 보러가기 →",
    href: "/sub2_02_01",
    reviews: [
      [
        "8c128.png",
        "캐롯 카로틴 카밍 워터 패드",
        "당근의 영양을 담아 편안하게 가꾸는 데일리 진정 케어",
        "(21,944)",
      ],
      [
        "fddf9.png",
        "캐롯 카로틴 모이스트 이펙터",
        "민감한 피부를 진정 시켜주는 당근 앰플",
        "(1,162)",
      ],
    ],
  },
  {
    label: "모공",
    visual: "aadba.png",
    visualSrc: `${A}/brpg-prd-img3.jpg`,
    visualText: "추천 제품 보러가기 →",
    href: "/sub2_02_02",
    reviews: [
      [
        "aa22.png",
        "에이콘 포어 펩타이드 패드",
        "늘어진 피부를 위한 모공탱탱, 탄력올림!",
        "(387)",
      ],
      [
        "19d7e.jpg",
        "에이콘 포어 펩타이드 마스크",
        "탱글탱글 탄력 케어",
        "(746)",
      ],
    ],
  },
  {
    label: "수분",
    visual: "d79d5.png",
    visualText: "추천 제품 보러가기 →",
    href: "/sub2_02_03",
    reviews: [
      [
        "8c65b.png",
        "블루 캐모마일 히알루로닉 크림",
        "유수분 밸런스를 잡아 속 당김 없이 수분 공급",
        "(189)",
      ],
      [
        "803f4.png",
        "블루 캐모마일 히알루로닉 마스크",
        "마르지 않는 촉촉한 히알루로닉 수분 케어",
        "(744)",
      ],
    ],
  },
]

function Concern() {
  const [active, setActive] = useState(0)
  const current = concernData[active]
  return (
    <section className="page-section concern-section" id="concern">
      <div className="content">
        <SectionHeading title="By Skin Concern" />
        <div className="concern-tabs" role="tablist">
          {concernData.map((item, index) => (
            <button
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={active === index}
              key={item.label}
            >
              {item.label}
            </button>
          ))}
          <button>더보기 +</button>
        </div>
        <div className="concern-layout">
          <a
            className="concern-visual card-image"
            href={siteHref(current.href)}
          >
            <img
              src={
                "visualSrc" in current
                  ? current.visualSrc
                  : `${A}/${current.visual}`
              }
              alt={`${current.label} 추천 제품`}
            />
            <span>{current.visualText}</span>
          </a>
          <div className="reviews">
            <h3>Best Review</h3>
            {current.reviews.map((review) => (
              <a className="review-card" href="#products" key={review[1]}>
                <img src={`${A}/${review[0]}`} alt="" />
                <div>
                  <small>리뷰 자세히 보기 →</small>
                  <h4>{review[1]}</h4>
                  <p>{review[2]}</p>
                  <div className="rating">
                    ★★★★★ <span>{review[3]}</span>
                  </div>
                  <hr />
                  <q>촉촉하고 편안한 사용감이 마음에 들어요.</q>
                </div>
              </a>
            ))}
          </div>
          <div className="mobile-feature-info">
            <h3>{current.reviews[0][1]}</h3>
            <p>{current.reviews[0][2]}</p>
            <div className="rating">
              ★★★★★ <span>{current.reviews[0][3]}</span>
            </div>
            <hr />
            <b>Best Review</b>
            <q>도톰한 패드로 피부를 촉촉하게 감싸는 사용감.</q>
          </div>
        </div>
      </div>
    </section>
  )
}

function Campaign() {
  return (
    <section className="campaign" id="campaign">
      <img
        src={`${A}/979fe.png`}
        alt="다 쓴 스킨푸드 용기를 모은 자원 순환 캠페인"
      />
      <div className="campaign-shade" />
      <div className="campaign-copy">
        <h2>
          <span className="desktop-only">잘 버렸습니다 캠페인</span>
          <span className="mobile-only">잘 버렸습니다</span>
        </h2>
        <p>
          환경을 생각하는 작은 습관,
          <br className="mobile-only" /> 스킨푸드와 함께 시작해 보세요.
          <br />다 쓴 용기를 비우고, 씻고, 올바르게 분리해요.
        </p>
        <a className="cta" href="#campaign">
          캠페인 참여하기 <span>→</span>
        </a>
      </div>
    </section>
  )
}

const social = [
  ["69e50.png", "흔적 진정 루틴, 감자 패드"],
  ["4c4af.png", "당근에서 시작하는 데일리 케어"],
  ["31de8.png", "매끈한 피부를 위한 블랙슈가"],
  ["57a83.png", "푸드가 전하는 피부의 즐거움"],
]

function Sns() {
  return (
    <section className="page-section sns-section">
      <div className="content">
        <SectionHeading title="SNS" link="@skinfood_official" />
        <div className="sns-grid">
          {social.map(([image, text], index) => (
            <div className="sns-card" key={image}>
              <div className="card-image">
                <img
                  src={index === 2 ? selectedSnsImage : `${A}/${image}`}
                  alt={text}
                />
              </div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const footerGroups = [
  ["매장 안내", "매장 찾기", "오프라인 매장", "해외매장 안내"],
  ["고객지원", "자주 묻는 질문", "1:1 문의", "공지사항"],
  ["정책", "이용약관", "개인정보처리방침", "이용안내"],
]

function Footer() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <footer id="footer">
      <div className="content footer-main">
        <div className="footer-brand">
          <img src={`${A}/c7315.svg`} alt="SKINFOOD" />
          <p>
            TREAT YOUR SKIN WITH FOOD
            <br />
            푸드의 건강함을 피부에 전합니다.
          </p>
        </div>
        <div className="footer-groups">
          {footerGroups.map((group, index) => (
            <div
              className={`footer-group ${open === index ? "open" : ""}`}
              key={group[0]}
            >
              <button onClick={() => setOpen(open === index ? null : index)}>
                <strong>{group[0]}</strong>
                <span>{open === index ? "−" : "+"}</span>
              </button>
              <div>
                {group.slice(1).map((item) => (
                  <a href="#footer" key={item}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-social">
          <a href="#footer" aria-label="인스타그램">
            <img src={`${A}/656f8.svg`} alt="" />
          </a>
          <a href="#footer" aria-label="페이스북">
            <img src={`${A}/a2c8a.svg`} alt="" />
          </a>
          <a href="#footer" aria-label="유튜브">
            <img src={`${A}/6291d.svg`} alt="" />
          </a>
        </div>
      </div>
      <div className="content legal">
        <p>© SKINFOOD. ALL RIGHTS RESERVED.</p>
        <div>
          <a href="#footer">이용약관</a>
          <a href="#footer">
            <b>개인정보처리방침</b>
          </a>
        </div>
      </div>
    </footer>
  )
}

function MobileBottomNav() {
  const items = [
    ["0a7b4.svg", "홈", "/#top"],
    ["a731a.svg", "원료", "/#ingredients"],
    ["62d8d.svg", "제품", "/#products"],
    ["51cb9.svg", "스토리", "/#campaign"],
    ["68cda.svg", "MY", "/#footer"],
  ]
  return (
    <nav className="mobile-bottom-nav" aria-label="하단 메뉴">
      {items.map(([icon, label, href]) => (
        <a href={siteHref(href)} key={label}>
          <img src={`${A}/${icon}`} alt="" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Ingredients />
      <Products />
      <Concern />
      <Campaign />
      <Sns />
    </main>
  )
}

function Site() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div id="top">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sub_02_01"
          element={<IngredientDetailPage ingredient="carrot" />}
        />
        <Route
          path="/sub_02_02"
          element={<IngredientDetailPage ingredient="potato" />}
        />
        <Route
          path="/sub_02_05"
          element={<IngredientDetailPage ingredient="blue" />}
        />
        <Route
          path="/sub_02_09"
          element={<IngredientDetailPage ingredient="black" />}
        />
        <Route
          path="/sub2_02_01"
          element={
            <Suspense fallback={<main className="route-loading" />}>
              <SkinTypePage type="soothing" />
            </Suspense>
          }
        />
        <Route
          path="/sub2_02_02"
          element={
            <Suspense fallback={<main className="route-loading" />}>
              <SkinTypePage type="pore" />
            </Suspense>
          }
        />
        <Route
          path="/sub2_02_03"
          element={
            <Suspense fallback={<main className="route-loading" />}>
              <SkinTypePage type="moisture" />
            </Suspense>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <MobileBottomNav />
      <button
        className="top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
      >
        ↑
      </button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={BASE || undefined}>
      <Site />
    </BrowserRouter>
  )
}
