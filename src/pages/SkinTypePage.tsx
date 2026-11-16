import { useMemo, useRef, useState, type PointerEvent } from "react"

type SkinTypeKey = "soothing" | "pore" | "moisture"

type SkinProduct = {
  image: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: string
  line?: string
  review?: string
}

type SkinTypeData = {
  label: string
  path: string
  banner: string
  bannerTitle: string
  bannerDescription: string
  total: number
  best: SkinProduct[]
  products: SkinProduct[]
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")
const S = `${import.meta.env.BASE_URL}skin-type`

const product = (
  image: string,
  name: string,
  description: string,
  price: number,
  options: Omit<SkinProduct, "image" | "name" | "description" | "price"> = {},
): SkinProduct => ({ image, name, description, price, ...options })

const data: Record<SkinTypeKey, SkinTypeData> = {
  soothing: {
    label: "진정",
    path: "/sub2_02_01",
    banner: `${S}/soothing/45044.png`,
    bannerTitle: "돌고 돌아도 결국\n#당근패드로 정착",
    bannerDescription: "무너진 피부 컨디션도 순하게 진정시켜 드릴게요!",
    total: 47,
    best: [
      product(
        `${BASE}/ingredients/carrot-products/9211e.png`,
        "[수분진정] 캐롯 카로틴 카밍 워터 패드 60매",
        "1200만 누적 판매 달성 패드",
        16900,
        {
          originalPrice: 26000,
          discount: "35%",
          line: "당근 라인",
          review: "5점 (21,955)",
        },
      ),
      product(
        `${S}/soothing/37938.png`,
        "[트러블] 판토테닉 워터 파슬리 사일러스 에센스 (70ml)",
        "유수분 밸붕 피부엔 피지잡는 #미나리에센스",
        17600,
        {
          originalPrice: 32000,
          discount: "45%",
          line: "미나리 라인",
          review: "4.9점 (1,222)",
        },
      ),
      product(
        `${S}/soothing/b443d.png`,
        "캐롯 카로틴 모이스트 이펙터 (55ml)",
        "#당근수분부스팅 #당근진정",
        27000,
        { line: "당근 라인", review: "4.9점 (1,162)" },
      ),
    ],
    products: [
      product(
        `${S}/soothing/90073.png`,
        "캐롯 카로틴 카밍 워터 패드 세트",
        "진정한 당근의 힘으로 수분듬뿍, 당근진정!",
        8000,
      ),
      product(
        `${S}/soothing/ba3c6.png`,
        "캐롯 카로틴 릴리프 마스크",
        "홍당무 피부를 위한 수분듬뿍, 당근진정!",
        13000,
      ),
      product(
        `${S}/soothing/38e78.png`,
        "판토테닉 워터 파슬리 스매싱 파우더",
        "트러블 스팟을 위한 집중 진정",
        8000,
      ),
      product(
        `${S}/soothing/1f9d6.png`,
        "캐롯 카로틴 릴리프 푸드 마스크",
        "민감해진 피부를 편안하게",
        13000,
      ),
      product(
        `${S}/soothing/6f427.png`,
        "[탱글수분] 라벤더 푸드 마스크 (120g)",
        "라벤더로 수분가득 피부진정!",
        7000,
        { originalPrice: 15000, discount: "53%" },
      ),
      product(
        `${S}/soothing/d00d6.png`,
        "[BEST 단독] 캐롯 카로틴 수딩토너 & 미스트 세트",
        "수분진정 당근 토너를 미스트로!",
        16900,
        { originalPrice: 26000, discount: "35%" },
      ),
      product(
        `${S}/soothing/7f49b.png`,
        "에이콘 포어 펩타이드 패드",
        "도토리로 모공탱탱, 탄력올림!",
        13000,
      ),
      product(
        `${S}/soothing/af890.png`,
        "살구 푸드 마스크",
        "살구로 화난 피부 뽀송진정!",
        7000,
        { originalPrice: 15000, discount: "53%" },
      ),
      product(
        `${S}/soothing/2aa73.png`,
        "판토테닉 워터 파슬리 앰플",
        "#피지컨트롤 앰플 #예민한 피부 급속진정",
        14850,
        { originalPrice: 27000, discount: "45%" },
      ),
      product(
        `${S}/soothing/c634d.png`,
        "[10+2매] 캐롯 카로틴 마스크",
        "수분듬뿍 순면 마스크",
        30000,
      ),
      product(
        `${S}/soothing/076d0.png`,
        "포테이토 마데카소사이드 수딩 패드",
        "흔적 진정과 편안한 수분 케어",
        13000,
      ),
      product(
        `${S}/soothing/ec63e.png`,
        "[10+2매] 판토테닉 워터 파슬리 마스크",
        "프로민감러를 위한 저자극 쿨링 수분케어",
        16500,
        { originalPrice: 30000, discount: "45%" },
      ),
    ],
  },
  moisture: {
    label: "수분",
    path: "/sub2_02_03",
    banner: `${S}/moisture/a6f5e.png`,
    bannerTitle: "감자 마데카소사이드 론칭\n~50%OFF + 추가 증정",
    bannerDescription:
      "촉촉한 흔적 진정 케어를 공식몰 단독 혜택으로 만나보세요.",
    total: 80,
    best: [
      product(
        `${S}/moisture/4280e.png`,
        "[10+2매] 블루 캐모마일 히알루로닉 마스크",
        "마르지 않는 촘촘 수분 케어 #수분밀착",
        16500,
        {
          originalPrice: 30000,
          discount: "45%",
          line: "블루 라인",
          review: "4.9점 (746)",
        },
      ),
      product(
        `${S}/moisture/5bf8c.png`,
        "블루 캐모마일 히알루로닉 크림 70ml",
        "사계절 피부 수분관리템 #물착쫀득 히알크림",
        13750,
        {
          originalPrice: 25000,
          discount: "45%",
          line: "블루 라인",
          review: "4.9점 (189)",
        },
      ),
      product(
        `${S}/moisture/d00d6.png`,
        "[BEST 단독] 캐롯 카로틴 수딩토너 & 미스트 세트",
        "수분진정 당근 토너를 미스트로!",
        15400,
        {
          originalPrice: 28000,
          discount: "45%",
          line: "당근 라인",
          review: "4.9점 (1,097)",
        },
      ),
    ],
    products: [
      product(
        `${S}/moisture/332df.png`,
        "레몬그라스 나이아신아마이드 5% 패드 리필",
        "맑고 촉촉한 피부 밸런싱",
        13000,
      ),
      product(
        `${S}/moisture/076d0.png`,
        "[밀착탄력/4매] 당근 PDRN 속탄력 겔 마스크",
        "탄탄하게 밀착되는 수분 겔",
        16800,
      ),
      product(
        `${S}/moisture/2143c.png`,
        "[촘촘탄력] 당근 PDRN 속수분 캡슐 세럼 30ml",
        "듀얼 캡슐로 채우는 속수분",
        28000,
      ),
      product(
        `${S}/moisture/ba3c6.png`,
        "캐롯 카로틴 릴리프 마스크",
        "편안한 수분 진정 마스크",
        13000,
      ),
      product(
        `${S}/moisture/1701d.png`,
        "감자 마데카소사이드 흔적 진정 패드",
        "흔적진정 보습장벽 시너지 케어",
        15600,
        { originalPrice: 26000, discount: "40%" },
      ),
      product(
        `${S}/moisture/99a88.png`,
        "[NEW/2개] 감자 마데카소사이드 흔적 진정 세럼",
        "산뜻한 수분감과 트러블 흔적부터 진정",
        27000,
        { originalPrice: 54000, discount: "50%" },
      ),
      product(
        `${S}/moisture/a106e.png`,
        "감자 마데카소사이드 흔적 진정 세럼",
        "산뜻한 수분감과 트러블 흔적부터 진정",
        29150,
        { originalPrice: 53000, discount: "45%" },
      ),
      product(
        `${S}/moisture/19ded.png`,
        "[밀착탄력] 당근 PDRN 속수분 패드 100매",
        "탄탄한 수분과 탄력케어 집중 패드",
        16900,
        { originalPrice: 26000, discount: "35%" },
      ),
      product(
        `${S}/moisture/aa3b7.png`,
        "블루 캐모마일 히알루로닉 앰플",
        "민감피부 유수분 밸런스 케어",
        18900,
        { originalPrice: 27000, discount: "30%" },
      ),
      product(
        `${S}/moisture/faae5.png`,
        "블루 캐모마일 수분 토너",
        "민감피부 유수분 밸런스 케어",
        16800,
        { originalPrice: 24000, discount: "30%" },
      ),
      product(
        `${S}/moisture/0a88f.png`,
        "라이스 데일리 브라이트닝 마스크",
        "쌀의 영양으로 채우는 촉촉함",
        15000,
      ),
      product(
        `${S}/moisture/1f9d6.png`,
        "라이스 모이스처 에멀전",
        "매일 편안한 보습 케어",
        20000,
      ),
    ],
  },
  pore: {
    label: "모공",
    path: "/sub2_02_02",
    banner: `${S}/pore/dc066.png`,
    total: 20,
    best: [
      product(
        `${S}/pore/1cc70.png`,
        "에그 화이트 퍼펙트 포어 클렌징 폼 (150ml)",
        "모공 속 피지 및 노폐물을 말끔히",
        11000,
        { line: "에그화이트 라인", review: "5점 (357)" },
      ),
      product(
        `${S}/pore/5aa15.png`,
        "[모공탱탱] 에이콘 포어 펩타이드 패드 (60매)",
        "늘어진 피부를 위한 모공탱탱, 탄력올림!",
        14300,
        {
          originalPrice: 26000,
          discount: "45%",
          line: "에이콘 라인",
          review: "4.9점 (387)",
        },
      ),
      product(
        `${S}/pore/62a9c.png`,
        "피치 뽀송 멀티 피니시 파우더 (대용량) 15g",
        "멀티 피니시 파우더 대용량",
        8250,
        {
          originalPrice: 15000,
          discount: "45%",
          line: "피치뽀송 라인",
          review: "4.9점 (247)",
        },
      ),
    ],
    products: [
      product(
        `${S}/pore/ac26a.png`,
        "레드빈 트라넥사믹애씨드 세럼 50ml",
        "매끈하고 맑은 모공결 케어",
        13500,
        { originalPrice: 27000, discount: "50%" },
      ),
      product(
        `${S}/pore/aa3b7.png`,
        "에이콘 포어 펩타이드 크림",
        "도토리로 채우는 탄탄한 모공 케어",
        15000,
      ),
      product(
        `${S}/pore/faae5.png`,
        "피치 뽀송 멀티 피니시 파우더",
        "보송한 피부결 완성",
        7000,
        { originalPrice: 15000, discount: "53%" },
      ),
      product(
        `${S}/pore/0a88f.png`,
        "레드빈 포어 클리어 마스크",
        "#팥양갱세럼 #투명모공결",
        14850,
        { originalPrice: 27000, discount: "45%" },
      ),
      product(
        `${S}/pore/3ebb5.png`,
        "레드빈 트라넥사믹애씨드 토너",
        "맑은 모공결을 위한 첫 단계",
        14850,
        { originalPrice: 27000, discount: "45%" },
      ),
      product(
        `${S}/pore/673a8.png`,
        "에그 화이트 퍼펙트 포어 클렌징 오일",
        "맑은 모공결로 케어하자",
        11000,
        { originalPrice: 20000, discount: "45%" },
      ),
      product(
        `${S}/pore/966d8.png`,
        "에이콘 포어 펩타이드 앰플",
        "늘어진 피부를 위한 탄력 케어",
        27000,
      ),
      product(
        `${S}/pore/7f49b.png`,
        "에이콘 포어 펩타이드 패드",
        "도토리로 모공탱탱, 탄력올림!",
        16500,
        { originalPrice: 30000, discount: "45%" },
      ),
      product(
        `${S}/pore/d324d.png`,
        "에그 화이트 퍼펙트 포어 클렌징 폼",
        "모공 속 피지 및 노폐물을 말끔히",
        11000,
      ),
      product(
        `${S}/pore/1cc70.png`,
        "에그 화이트 포어 폼 기획세트",
        "산뜻하고 깨끗한 모공 세안",
        20000,
      ),
      product(
        `${S}/pore/5aa15.png`,
        "에이콘 포어 펩타이드 패드 리필",
        "탄탄한 피부결 케어",
        13000,
      ),
      product(
        `${S}/pore/62a9c.png`,
        "피치 뽀송 파우더 팩트",
        "번들거림 없이 보송하게",
        15000,
      ),
    ],
  },
}

interface SkinTab {
  key: SkinTypeKey
  label: string
  path: string
}

const skinTabs: SkinTab[] = [
  { key: "soothing", label: "진정", path: "/sub2_02_01" },
  { key: "pore", label: "모공", path: "/sub2_02_02" },
  { key: "moisture", label: "수분", path: "/sub2_02_03" },
]

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

function ProductCard({
  item,
  best = false,
  onAddToCart,
}: {
  item: SkinProduct
  best?: boolean
  onAddToCart: (item: SkinProduct) => void
}) {
  const [liked, setLiked] = useState(false)

  return (
    <article className={`skin-product-card ${best ? "is-best" : ""}`}>
      <div className="skin-product-image">
        <img src={item.image} alt={item.name} />
        {best && item.line && <span>{item.line}</span>}
        <div className="product-card-web-actions">
          <button
            className="product-web-cart"
            type="button"
            onClick={() => onAddToCart(item)}
            aria-label={`${item.name} 장바구니 담기`}
          >
            <img src={`${BASE}/assets/cart-hover.png`} alt="" />
          </button>
        </div>
        {!best && (
          <button
            className={liked ? "liked" : ""}
            type="button"
            onClick={() => setLiked(!liked)}
            aria-pressed={liked}
            aria-label={`${item.name} ${liked ? "찜 취소" : "찜하기"}`}
          >
            {liked ? "♥" : "♡"}
          </button>
        )}
      </div>
      <button
        className="product-cart-tab"
        type="button"
        onClick={() => onAddToCart(item)}
        aria-label={`${item.name} 장바구니 담기`}
      >
        <img src={`${BASE}/assets/3d6b0.svg`} alt="" />
        <span>담기</span>
      </button>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="skin-product-price">
        {item.discount && <b>{item.discount}</b>}
        <strong>{formatPrice(item.price)}</strong>
        {item.originalPrice && <del>{formatPrice(item.originalPrice)}</del>}
      </div>
      {best && item.review && <small>★ {item.review}</small>}
    </article>
  )
}

export default function SkinTypePage({ type }: { type: SkinTypeKey }) {
  const item = data[type]
  const [sort, setSort] = useState("recommended")
  const [page, setPage] = useState(1)
  const [cartMessage, setCartMessage] = useState("")
  const bestDrag = useRef<{
    pointerId: number
    startX: number
    scrollLeft: number
    moved: boolean
  } | null>(null)
  const suppressBestClick = useRef(false)

  const addToCart = (product: SkinProduct) => {
    setCartMessage(`장바구니에 담았습니다: ${product.name}`)
  }

  const products = useMemo(() => {
    const result = [...item.products]
    if (sort === "low") result.sort((a, b) => a.price - b.price)
    if (sort === "high") result.sort((a, b) => b.price - a.price)
    if (sort === "name")
      result.sort((a, b) => a.name.localeCompare(b.name, "ko"))
    if (page === 2) result.reverse()
    return result
  }, [item.products, page, sort])

  return (
    <main className={`skin-type-page skin-type-${type}`}>
      <section className="skin-promo">
        <img src={item.banner} alt="" />
        <div>
          <h1>{item.bannerTitle}</h1>
          <p>{item.bannerDescription}</p>
        </div>
      </section>

      <section className="skin-selector">
        <h2>피부 고민에 맞춰 찾는 나만의 스킨케어</h2>
        <p>오늘의 피부에 필요한 푸드, 스킨푸드에서 찾아보세요.</p>
        <nav aria-label="피부 고민별 제품">
          {skinTabs.map((tab) => (
            <a
              className={tab.key === type ? "active" : ""}
              href={`${BASE}${tab.path}`}
              aria-current={tab.key === type ? "page" : undefined}
              key={tab.key}
            >
              {tab.label}
            </a>
          ))}
          {["각질", "안티에이징", "브라이트닝"].map((label) => (
            <a href={`${BASE}/#products`} key={label}>
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section className="skin-best">
        <div className="skin-section-inner">
          <h2>Best</h2>
          <div
            className="skin-best-grid"
            onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
              suppressBestClick.current = false
              if (
                event.pointerType !== "mouse" ||
                event.button !== 0 ||
                event.currentTarget.scrollWidth <=
                  event.currentTarget.clientWidth ||
                (event.target instanceof Element &&
                  event.target.closest("button, a"))
              ) {
                return
              }

              bestDrag.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                scrollLeft: event.currentTarget.scrollLeft,
                moved: false,
              }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
              const drag = bestDrag.current
              if (!drag || drag.pointerId !== event.pointerId) return

              const distance = event.clientX - drag.startX
              if (!drag.moved && Math.abs(distance) > 5) {
                drag.moved = true
                event.currentTarget.classList.add("is-dragging")
              }
              if (drag.moved)
                event.currentTarget.scrollLeft = drag.scrollLeft - distance
            }}
            onPointerUp={(event: PointerEvent<HTMLDivElement>) => {
              const drag = bestDrag.current
              if (!drag || drag.pointerId !== event.pointerId) return

              suppressBestClick.current = drag.moved
              event.currentTarget.classList.remove("is-dragging")
              bestDrag.current = null
            }}
            onPointerCancel={(event: PointerEvent<HTMLDivElement>) => {
              if (bestDrag.current?.pointerId !== event.pointerId) return
              event.currentTarget.classList.remove("is-dragging")
              bestDrag.current = null
            }}
            onClickCapture={(event) => {
              if (!suppressBestClick.current) return
              event.preventDefault()
              event.stopPropagation()
              suppressBestClick.current = false
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            {item.best.map((bestProduct) => (
              <ProductCard
                item={bestProduct}
                best
                onAddToCart={addToCart}
                key={bestProduct.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="skin-catalog">
        <div className="skin-catalog-head">
          <p>
            총 <strong>{item.total}</strong>개의 상품
          </p>
          <label>
            <span className="sr-only">상품 정렬</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value)
                setPage(1)
              }}
            >
              <option value="recommended">Filter</option>
              <option value="low">낮은 가격순</option>
              <option value="high">높은 가격순</option>
              <option value="name">상품명순</option>
            </select>
          </label>
        </div>
        <div className="skin-catalog-grid">
          {products.map((catalogProduct, index) => (
            <ProductCard
              item={catalogProduct}
              onAddToCart={addToCart}
              key={`${catalogProduct.name}-${index}`}
            />
          ))}
        </div>
        <nav className="skin-pagination" aria-label="상품 페이지">
          {[1, 2].map((number) => (
            <button
              className={page === number ? "active" : ""}
              onClick={() => setPage(number)}
              aria-current={page === number ? "page" : undefined}
              key={number}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page === 1 ? 2 : 1)}
            aria-label="다음 페이지"
          >
            <span aria-hidden="true">›</span>
          </button>
        </nav>
      </section>
      {cartMessage && (
        <p
          className="product-cart-message"
          role="status"
          aria-live="polite"
        >
          {cartMessage}
        </p>
      )}
    </main>
  )
}
