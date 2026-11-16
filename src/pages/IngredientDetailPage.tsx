import { useRef, useState, type PointerEvent } from "react"
import { useNavigate } from "react-router-dom"

type IngredientKey = "carrot" | "potato" | "blue" | "black"
type Product = {
  image: string
  name: string
  description: string
  price: string
  sale?: string
}

type IngredientData = {
  eyebrow: string
  title: string
  lineTitle: string
  tagline: string
  hero: string
  story: string[]
  methodTitle: string
  methodBackground?: string
  process: string
  steps: { label: string; text: string }[]
  featureScene: string
  featureProduct: string
  featureName: string
  featureDescription: string
  featurePrice: string
  tint: string
  tabs: Record<string, Product[]>
}

const I = `${import.meta.env.BASE_URL}ingredients`
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

const data: Record<IngredientKey, IngredientData> = {
  carrot: {
    eyebrow: "CARROT CAROTENE",
    title: "캐롯 카로틴 라인",
    lineTitle: "Carrot Carotene Line",
    tagline:
      "당근찜 추출법을 통해 화학적 용매 없는 순수한 당근 추출물이 함유되어\n수분, 진정에 효과적인 스킨푸드 최초의 비건 라인",
    hero: `${I}/carrot/dc68f.png`,
    story: [
      "제주에서 건강하게 자라 유기농산물 인증을 받은 무농약 당근을 사용하며, 당근찜추출법을 통해 순수한 당근추출을 완성합니다.",
      "또한 당근씨 오일에서 얻은 베타카로틴은 피부 건강을 높여주는데 탁월한 효과를 가지고 있습니다.",
    ],
    methodTitle: "Carrot Steaming Method",
    methodBackground: `${I}/carrot/339ba.png`,
    process: `${I}/carrot/f766c.png`,
    steps: [
      { label: "SELECT", text: "자연에서 건강하게 자란 당근만을 엄선합니다." },
      { label: "STEAM", text: "깨끗이 다듬은 당근을 찜요리처럼 쪄냅니다." },
      { label: "BREW", text: "화학적 용매 없이 당근추출물을 모아줍니다." },
      { label: "COMPLETE", text: "순수한 당근추출물 완성" },
    ],
    featureScene: `${I}/carrot/9da3b.png`,
    featureProduct: `${I}/carrot/3f4df.png`,
    featureName: "캐롯 카로틴 카밍 워터 패드",
    featureDescription:
      "피부 마찰을 고려한 와플형 순면패드로 부드럽게 꾸준한 촉촉함을 선사하는 스킨푸드만의 당근 패드",
    featurePrice: "16,900원",
    tint: "#f68b17",
    tabs: {
      Pad: [
        {
          image: `${I}/carrot-products/9211e.png`,
          name: "캐롯 카로틴 카밍 워터 패드 (60매)",
          description: "민감 피부를 위한 데일리 진정 패드",
          sale: "35%",
          price: "16,900원",
        },
        {
          image: `${I}/carrot-products/3ba1a.png`,
          name: "당근 PDRN 속수분 패드 100매",
          description: "당근 PDRN으로 채우는 속수분",
          sale: "35%",
          price: "16,900원",
        },
        {
          image: `${I}/carrot-products/90073.png`,
          name: "캐롯 카로틴 카밍 워터 패드 세트",
          description: "2매입×5매 휴대용 패드",
          price: "8,000원",
        },
      ],
      Skincare: [
        {
          image: `${I}/skincare-products/2143c.png`,
          name: "당근 PDRN 속수분 캡슐 세럼 30ml",
          description: "듀얼캡슐로 채우는 촉촉한 진정",
          price: "28,000원",
        },
        {
          image: `${I}/skincare-products/d00d6.png`,
          name: "캐롯 카로틴 수딩토너 & 미스트 세트",
          description: "수분 진정 당근 토너 세트",
          price: "28,000원",
        },
        {
          image: `${I}/skincare-products/2f7e6.png`,
          name: "캐롯 카로틴 릴리프 크림 (70ml)",
          description: "풍부한 보습과 편안한 진정",
          price: "32,000원",
        },
        {
          image: `${I}/skincare-products/b443d.png`,
          name: "캐롯 카로틴 모이스트 이펙터",
          description: "촉촉하게 채우는 당근 앰플",
          price: "27,000원",
        },
      ],
      Mask: [
        {
          image: `${I}/carrot-products/34fcd.png`,
          name: "캐롯 카로틴 릴리프 마스크",
          description: "편안한 당근 수분 마스크",
          price: "9,750원",
        },
        {
          image: `${I}/carrot-products/9f1a5.png`,
          name: "캐롯 카로틴 카밍 워터 패드 마스크",
          description: "부드럽고 촉촉한 집중 케어",
          price: "27,000원",
        },
        {
          image: `${I}/carrot-products/c634d.png`,
          name: "캐롯 카로틴 데일리 마스크",
          description: "매일 사용하는 순한 진정 마스크",
          price: "30,000원",
        },
      ],
      Cleansing: [
        {
          image: `${I}/carrot-products/0a560.png`,
          name: "캐롯 카로틴 릴리프 클렌저 (150ml)",
          description: "부드럽게 씻어내는 당근 클렌저",
          sale: "38%",
          price: "9,920원",
        },
      ],
    },
  },
  black: {
    eyebrow: "Black Sugar",
    title: "블랙슈가 라인",
    lineTitle: "Black Sugar Line",
    tagline: "먹지마세요! 영양을 듬뿍 담은 홈메이드 레시피의 블랙슈가",
    hero: `${I}/black/78f44.png`,
    story: [
      "블랙슈가는 사탕수수의 미네랄과 영양이 균형 있게 잡혀있습니다. 블랙슈가의 이 성분들은 묵은 각질 제거를 효과적으로 돕습니다.",
      "양조장에서 누룩을 빚는 장인의 하얗고 탄력있는 손에서 찾아낸 미용효모로 비타민과 아미노산이 풍부한 갈락토미세스 발효여과물을 담았습니다.",
    ],
    methodTitle: "Carrot Steaming Method",
    methodBackground: `${I}/black/0d346.png`,
    process: `${I}/black/6ee6f.png`,
    steps: [
      { label: "BLACK SUGAR", text: "미네랄이 풍부한 흑설탕" },
      { label: "RICE WINE", text: "맑은 물과 찹쌀로 빚은 청주" },
      { label: "FERMENT", text: "갈락토미세스를 더해 발효" },
      { label: "COMPLETE", text: "삼나무통에서 해풍 숙성" },
    ],
    featureScene: `${I}/black/78c0b.png`,
    featureProduct: `${I}/black/deb82.png`,
    featureName: "블랙슈가 퍼펙트 첫세럼 더 에센셜 부스터",
    featureDescription: "촘촘 매끈 피부를 완성해주는 더 촉촉한 첫세럼",
    featurePrice: "27,000원",
    tint: "#7a431f",
    tabs: {
      Pad: [
        {
          image: `${I}/black-products/34567.png`,
          name: "블랙슈가 퍼펙트 첫세럼 패드 (60매)",
          description: "매끈한 피부결을 위한 첫 단계",
          price: "26,000원",
        },
      ],
      Skincare: [
        {
          image: `${I}/black-products/3c231.png`,
          name: "블랙슈가 퍼펙트 퍼스트 앰플 50ml",
          description: "윤기 있는 피부결 케어",
          price: "27,000원",
        },
        {
          image: `${I}/black-products/9071d.png`,
          name: "블랙슈가 퍼펙트 첫세럼 더 에센셜 부스터",
          description: "촉촉하고 매끈한 첫세럼",
          price: "27,000원",
        },
        {
          image: `${I}/black-products/de86b.png`,
          name: "블랙슈가 퍼펙트 토너 2X 포맨",
          description: "거친 피부를 위한 토너",
          price: "20,000원",
        },
      ],
      Cleansing: [
        {
          image: `${I}/black-products/e5a2d.png`,
          name: "블랙슈가 퍼펙트 클렌징 오일",
          description: "부드럽게 녹여내는 클렌징",
          price: "26,000원",
        },
        {
          image: `${I}/black-products/d1bcb.png`,
          name: "블랙슈가 퍼펙트 엔자임 파우더 워시",
          description: "매끈한 피부결 파우더 워시",
          price: "24,000원",
        },
        {
          image: `${I}/black-products/81035.png`,
          name: "블랙슈가 퍼펙트 버블폼 (200ml)",
          description: "풍성한 거품의 데일리 세안",
          price: "13,000원",
        },
      ],
    },
  },
  potato: {
    eyebrow: "Potato",
    title: "감자 라인",
    lineTitle: "Potato Line",
    tagline:
      "클로로겐산이 풍부한 청정 강원도의 못난이 감자추출물로\n얼룩덜룩한 피부의 흔적 진정 케어",
    hero: `${I}/potato/90599.png`,
    story: [
      "국내 감자의 최대 주산지인 청정 강원도에서 자라 유효성분과 영양소는 풍부하지만, 상품성이 없어 외면받던 못난이 감자.",
      "스킨푸드는 상품 가치가 떨어져 버려지던 ‘못난이 감자’에서 화장품 원료로서의 가치를 발견하여 업사이클링 원료로 사용했습니다.",
    ],
    methodTitle: "Carrot Steaming Method",
    process: `${I}/potato/e4af6.png`,
    steps: [
      { label: "STEP 1", text: "분쇄 과정 없이 저온에서 24시간 동안 숙성" },
      { label: "STEP 2", text: "저온 숙성 후, 고온에서 한 번 더 뜸들이기" },
      { label: "STEP 3", text: "고온에서 뜸 들인 감자를 껍질 째 으깨기" },
      { label: "STEP 4", text: "클로로겐산 가득한 감자추출물 완성!" },
    ],
    featureScene: `${I}/potato/0a7c9.png`,
    featureProduct: `${I}/potato/44cf2.png`,
    featureName: "포테이토 마데카소사이드 마스크",
    featureDescription:
      "피부 진정과 흔적 케어에 도움을 주어 촉촉하고 뽀얀 피부로 가꾸어주는 마스크",
    featurePrice: "30,000원",
    tint: "#f6f3ed",
    tabs: {
      Pad: [
        {
          image: `${I}/potato-products/33f8f.png`,
          name: "포테이토 마데카소사이드 수딩 패드 (60매)",
          description: "못난 감자의 흔적 진정 패드",
          price: "26,000원",
        },
      ],
      Mask: [
        {
          image: `${I}/potato-products/9871f.png`,
          name: "포테이토 마데카소사이드 데일리 마스크 (30매)",
          description: "매일 하는 흔적 진정 마스크",
          price: "26,000원",
        },
        {
          image: `${I}/potato-products/bbcf7.png`,
          name: "포테이토 마데카소사이드 마스크",
          description: "흔적 진정 집중 케어",
          price: "30,000원",
        },
      ],
    },
  },
  blue: {
    eyebrow: "Blue Chamomile",
    title: "블루 캐모마일 라인",
    lineTitle: "Blue Chamomile Line",
    tagline:
      "캐모마일꽃수와 7중 히알루론산으로 촘촘한 수분을\n가득 채워 마르지 않는 피부로 케어해주는 수분 크림",
    hero: `${I}/blue/1a916.png`,
    story: [
      "대한민국 청주의 자연 속에서 자란 블루 캐모마일. 따스한 햇살과 맑은 바람을 맞으며 자라난 꽃의 싱그러움과 자연의 생명력을 고스란히 담았습니다.",
      "푸른 빛을 머금은 섬세한 꽃잎처럼, 자연이 선사하는 편안하고 순수한 에너지를 피부에 전합니다.",
    ],
    methodTitle: "Erbal Extraction Method",
    process: `${I}/blue/b4afc.png`,
    steps: [
      { label: "SELECT", text: "대한민국 청주산 캐모마일 꽃을 수확합니다." },
      { label: "DRY", text: "깨끗이 정돈한 꽃을 건조해 영양소를 농축합니다." },
      {
        label: "INFUSION",
        text: "건조된 꽃을 용매에 담가 유효 성분을 우려냅니다.",
      },
      { label: "COMPLETE", text: "깊고 진한 캐모마일꽃수 완성" },
    ],
    featureScene: `${I}/blue/16e5f.png`,
    featureProduct: `${I}/blue/7f7b4.png`,
    featureName: "블루 캐모마일 히알루로닉 겔 패드",
    featureDescription:
      "부드러운 거즈면과 투명한 겔 필름 원단으로 닦토와 팩토 모두 가능한 듀얼 패드",
    featurePrice: "16,900원",
    tint: "#d5f1ff",
    tabs: {
      Pad: [
        {
          image: `${I}/blue-products/44178.png`,
          name: "블루 캐모마일 히알루로닉 겔 패드 70매",
          description: "마르지 않는 촉촉한 듀얼 패드",
          sale: "35%",
          price: "16,900원",
        },
      ],
      Skincare: [
        {
          image: `${I}/blue-products/33593.png`,
          name: "블루 캐모마일 히알루로닉 토너 미스트",
          description: "촉촉하게 채우는 수분 미스트",
          price: "22,000원",
        },
        {
          image: `${I}/blue-products/1e269.png`,
          name: "블루 캐모마일 히알루로닉 앰플 50ML",
          description: "히알루론산 수분 앰플",
          price: "25,000원",
        },
        {
          image: `${I}/blue-products/5bf8c.png`,
          name: "블루 캐모마일 히알루로닉 크림 70ML",
          description: "마르지 않는 수분 크림",
          price: "25,000원",
        },
      ],
      Mask: [
        {
          image: `${I}/blue-products/7bc85.png`,
          name: "블루 캐모마일 히알루로닉 겔 마스크 (1매)",
          description: "고농축 히알루론산 수분 마스크",
          price: "5,000원",
        },
        {
          image: `${I}/blue-products/4280e.png`,
          name: "블루 캐모마일 히알루로닉 마스크",
          description: "매일 더하는 촉촉한 수분 케어",
          price: "30,000원",
        },
      ],
    },
  },
}

const related: {
  key: IngredientKey
  title: string
  path: string
  image: string
}[] = [
  {
    key: "blue",
    title: "블루 캐모마일 라인",
    path: "/sub_02_05",
    image: `${I}/blue/1a916.png`,
  },
  {
    key: "carrot",
    title: "캐롯 카로틴 라인",
    path: "/sub_02_01",
    image: `${I}/carrot/dc68f.png`,
  },
  {
    key: "potato",
    title: "감자 라인",
    path: "/sub_02_02",
    image: `${I}/potato/90599.png`,
  },
  {
    key: "black",
    title: "블랙슈가 라인",
    path: "/sub_02_09",
    image: `${I}/black/78f44.png`,
  },
]

function ProductLine({ item }: { item: IngredientData }) {
  const tabs = Object.keys(item.tabs)
  const [tab, setTab] = useState(tabs[0])
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{
    pointerId: number
    startX: number
    startScrollLeft: number
  } | null>(null)
  const products = item.tabs[tab]

  const move = (direction: number) => {
    const card = track.current?.querySelector<HTMLElement>(
      ".detail-product-card",
    )
    track.current?.scrollBy({
      left: direction * ((card?.offsetWidth ?? 320) + 24),
      behavior: "smooth",
    })
  }

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      event.currentTarget.scrollWidth <= event.currentTarget.clientWidth ||
      (event.target as Element).closest("button, a")
    ) {
      return
    }
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    }
    event.currentTarget.classList.add("is-dragging")
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return
    event.currentTarget.scrollLeft =
      drag.current.startScrollLeft - (event.clientX - drag.current.startX)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return
    drag.current = null
    event.currentTarget.classList.remove("is-dragging")
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section className="detail-products" aria-labelledby="product-line-title">
      <h2 id="product-line-title">{item.lineTitle}</h2>
      <div className="detail-tabs" role="tablist">
        {tabs.map((name) => (
          <button
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
            role="tab"
            aria-selected={tab === name}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="detail-product-shell">
        <div
          className="detail-product-track"
          ref={track}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
        >
          {products.map((product) => (
            <article className="detail-product-card" key={product.name}>
              <div
                className={`detail-product-image ${product.image === `${I}/blue-products/33593.png` ? "has-white-background" : ""}`}
              >
                <img src={product.image} alt={product.name} />
                <span
                  className="detail-cart-button"
                  aria-hidden="true"
                >
                  <img src={`${BASE}/assets/cart-hover.png`} alt="" />
                </span>
                <button
                  className={liked[product.name] ? "liked" : ""}
                  onClick={() =>
                    setLiked((current) => ({
                      ...current,
                      [product.name]: !current[product.name],
                    }))
                  }
                  aria-label={`${product.name} 찜하기`}
                >
                  {liked[product.name] ? "♥" : "♡"}
                </button>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="detail-price">
                {product.sale && <b>{product.sale}</b>}
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
        {products.length > 3 && (
          <>
            <button
              className="detail-arrow prev"
              onClick={() => move(-1)}
              aria-label="이전 상품"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="detail-arrow next"
              onClick={() => move(1)}
              aria-label="다음 상품"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export default function ({
  ingredient,
}: {
  ingredient: IngredientKey
}) {
  const item = data[ingredient]
  const navigate = useNavigate()
  const relatedSwipe = useRef<{
    pointerId: number
    pointerType: string
    startX: number
    startY: number
    startScrollLeft: number
    isHorizontal: boolean
    moved: boolean
  } | null>(null)
  const preventRelatedClick = useRef(false)

  const startRelatedSwipe = (event: PointerEvent<HTMLElement>) => {
    if (
      (event.pointerType !== "touch" && event.button !== 0) ||
      event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    ) {
      return
    }
    preventRelatedClick.current = false
    relatedSwipe.current = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: event.currentTarget.scrollLeft,
      isHorizontal: false,
      moved: false,
    }
  }

  const moveRelatedSwipe = (event: PointerEvent<HTMLElement>) => {
    const swipe = relatedSwipe.current
    if (!swipe || swipe.pointerId !== event.pointerId) return

    const deltaX = event.clientX - swipe.startX
    const deltaY = event.clientY - swipe.startY
    if (!swipe.isHorizontal) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 6) return
      if (swipe.pointerType === "touch" && Math.abs(deltaY) >= Math.abs(deltaX)) {
        relatedSwipe.current = null
        return
      }
      swipe.isHorizontal = true
      swipe.moved = true
      event.currentTarget.classList.add("is-dragging")
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId)
      }
    }
    event.currentTarget.scrollLeft = swipe.startScrollLeft - deltaX
  }

  const endRelatedSwipe = (event: PointerEvent<HTMLElement>) => {
    const swipe = relatedSwipe.current
    if (!swipe || swipe.pointerId !== event.pointerId) return
    preventRelatedClick.current = swipe.moved
    relatedSwipe.current = null
    event.currentTarget.classList.remove("is-dragging")
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <main className={`ingredient-detail detail-${ingredient}`}>
      <button
        className="detail-back"
        onClick={() => navigate(-1)}
        aria-label="이전 페이지로 돌아가기"
      >
        ← <span>BACK</span>
      </button>
      <section className="detail-hero">
        <img src={item.hero} alt="" />
        <div className="detail-hero-shade" />
        <div className="detail-hero-copy">
          <p>{item.eyebrow}</p>
          <h1>{item.title}</h1>
          <span>{item.tagline}</span>
        </div>
      </section>

      <section className="detail-story">
        <h2>Food Story</h2>
        {item.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section
        className="detail-method"
        style={{
          backgroundColor: item.tint,
          backgroundImage: item.methodBackground
            ? `${ingredient === "carrot" ? "linear-gradient(180deg,rgba(247,232,189,0) 0%, rgba(247,232,189,1) 100%), " : ""}linear-gradient(rgba(246,243,237,.18), rgba(246,243,237,.18)), url(${item.methodBackground})`
            : undefined,
        }}
      >
        <h2>{item.methodTitle}</h2>
        <div className="detail-steps">
          {item.steps.map((step, index) => (
            <article key={step.label}>
              <div
                className={`process-sprite process-${index + 1}`}
                style={{ backgroundImage: `url(${item.process})` }}
              />
              <h3>{step.label}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-feature">
        <div className="feature-scene">
          <img src={item.featureScene} alt={`${item.title} 제품 라인`} />
        </div>
        <div className="feature-copy">
          <small>대표제품</small>
          <h2>{item.featureName}</h2>
          <p>{item.featureDescription}</p>
          <img src={item.featureProduct} alt={item.featureName} />
          <strong>{item.featurePrice}</strong>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector(".detail-products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            구매하기
          </button>
        </div>
      </section>

      <ProductLine item={item} />

      <nav
        className="related-lines"
        aria-label="다른 원료 라인"
        onPointerDown={startRelatedSwipe}
        onPointerMove={moveRelatedSwipe}
        onPointerUp={endRelatedSwipe}
        onPointerCancel={endRelatedSwipe}
        onClickCapture={(event) => {
          if (!preventRelatedClick.current) return
          event.preventDefault()
          event.stopPropagation()
          preventRelatedClick.current = false
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {related
          .filter((relatedItem) => relatedItem.key !== ingredient)
          .slice(0, 3)
          .map((relatedItem) => (
            <a href={`${BASE}${relatedItem.path}`} key={relatedItem.key}>
              <img src={relatedItem.image} alt="" />
              <span>{relatedItem.title}</span>
            </a>
          ))}
      </nav>
    </main>
  )
}
