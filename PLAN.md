# Рахат Глэмпинг — План разработки полноценного сайта

## Контекст

Разработка премиального full-stack сайта для глэмпинга «Рахат» — отдых у воды в Актобе, Казахстан. Задача: нестандартный дизайн (не дефолтная AI-эстетика), система онлайн-бронирования с календарём доступности, и административная панель для управления заявками. Источник всего контента: `rakhat_glamping_info.md`.

---

## Технический стек

| Слой | Выбор | Причина |
|---|---|---|
| Фронтенд | React 18 + Vite 5 + TypeScript | Требование заказчика |
| Стили | Tailwind CSS v3 + CSS custom properties | Требование заказчика |
| Анимации | GSAP + ScrollTrigger | Индустриальный стандарт для премиальных скролл-анимаций |
| Бэкенд | Node.js + Express 5 + TypeScript | Требование заказчика |
| База данных | PostgreSQL + Prisma ORM | Реляционная целостность для логики бронирования |
| Авторизация админа | JWT (access + refresh) в httpOnly cookies | Просто и безопасно, без сторонних OAuth-провайдеров |
| Состояние | TanStack Query v5 (серверное) + Zustand (UI) | Стандартная пара |
| Валидация | Zod (общий — фронт + бэк) | Одна схема для обеих сторон |
| Email | Nodemailer + Gmail SMTP | Подтверждения бронирований |
| Работа с датами | date-fns + date-fns-tz | Часовой пояс UTC+5 (Актобе) |

---

## Дизайн-система

### Цветовая палитра (Предрассветный свет казахстанской степи над водой)
```css
--color-abyss:      #0D1117  /* почти чёрный — герой/тёмные секции */
--color-deep-water: #1A2744  /* тёмно-синий, глубина воды */
--color-dusk:       #2C3E6B  /* средне-синий сумерки */
--color-horizon:    #4A6FA5  /* светлее — горизонт */
--color-mist:       #8FAECF  /* утренний туман над водой */
--color-dawn:       #E8B86D  /* тёплый янтарь рассвета — основной акцент */
--color-sunrise:    #F2C94C  /* золотой свет на воде */
--color-fog:        #D4C5A9  /* тёплый бежевый */
--color-bark:       #8B7355  /* берёза/дерево */
--color-moss:       #4A7C59  /* живой зелёный мох */
--color-cream:      #F9F5EE  /* тёплый белый — светлые секции */
--color-text-dark:  #1C1917  /* почти чёрный для текста на светлом фоне */
```
Тёмные секции (`abyss/deep-water`) чередуются со светлыми (`cream/fog`) — визуальный ритм «ночь → день» при прокрутке.

### Типографика
- **Заголовки / Герой:** `Cormorant Garamond` — высококонтрастный editorial-сериф, стиль люкс-тревел журнала; размер: `clamp(3.5rem, 10vw, 9rem)` в герое
- **Текст / UI:** `Inter` — чистый геометрический гротеск для форм, цен, навигации
- **Акцент:** `Cormorant SC` (капители) — для слогана, подписей к иконкам удобств, разделителей секций

### Фирменные анимации
1. **Смена цвета на рассвет** — GSAP при загрузке: фон героя анимируется от `abyss` → `dusk` → янтарного
2. **Горизонтальный скролл** — GSAP ScrollTrigger фиксирует секцию; пользователь прокручивает 3 кадра экстерьер → интерьер → территория
3. **Рябь на воде (SVG)** — CSS keyframe концентрические эллипсы как фон секций/разделители
4. **Магнитный курсор** — кнопки CTA слегка притягивают курсор при наведении
5. **Счётчики цифр** — 16 000 / 4.4 / 275 — анимированный счёт при попадании в viewport (GSAP)
6. **Плавающие элементы природы** — SVG камыш/капли плавают на разных скоростях

### Философия лейаута
- Асимметричные сетки (3:7, 4:8) — редакционный стиль, не банальная симметрия
- Полноэкранные фото/видео без отступов, текстовый контент с ограниченной шириной
- Отступы между секциями 120–200px — воздух = роскошь
- Навбар: прозрачный над героем → матовое стекло при прокрутке

---

## Архитектура сайта

### Публичный сайт: одностраничный + отдельный роут `/book`

**Секции (навигация по якорям):**
1. `#hero` — Полноэкранный, видеофон, заголовок Cormorant, GSAP-рассвет, CTA
2. `#about` — Манифест бренда, «без алкоголя» — как сила, а не ограничение, тёмный фон
3. `#experience` — GSAP горизонтальный скролл: экстерьер → интерьер → территория (3 кадра)
4. `#cabins` — Две карточки домиков: 1-этажный (40 000₸, семья) / 2-этажный (50 000₸, пара)
5. `#amenities` — Сетка из 12 SVG-иконок (завтрак, BBQ, велосипед, гамак, рыбалка и др.), блок платных услуг
6. `#water` — Полноэкранное параллакс-фото пляжа, SVG-волны сверху и снизу
7. `#reviews` — Рейтинг 2ГИС 4.4/5, счётчик 16К подписчиков, 3–4 отзыва
8. `#book-cta` — Мини-виджет: выбор дат + тип домика → переход на `/book`
9. `#location` — Карта 2ГИС, адрес, callout о трансфере на Zeekr
10. Футер — логотип, контакты, соцсети, бейдж «без алкоголя»

### Процесс бронирования (`/book`, 4 шага)
1. **Даты + Домик** — Кастомный 2-месячный календарь с занятыми датами из API, карточки домиков с индикатором доступности, боковой итог стоимости
2. **Данные гостя** — ФИО, телефон (+7), email, кол-во взрослых/детей (дети — только для 1-этажного), особые пожелания, согласие с политикой «без алкоголя»
3. **Подтверждение** — Просмотр брони, кнопки «Изменить», кнопка «Забронировать»
4. **Успех** — Номер брони, ссылка WhatsApp (`https://wa.me/77075042088`), «Перезвоним в течение 2 часов»

### Административная панель (`/admin/*`)
- `/admin/login` — Форма входа с JWT
- `/admin/dashboard` — Карточки статистики, ближайшие заезды, список ожидающих подтверждения
- `/admin/bookings` — Таблица с фильтрами по статусу, поиск, пагинация
- `/admin/bookings/:id` — Детали брони, смена статуса, заметки администратора, отправка email
- `/admin/calendar` — Месячный календарь с двумя дорожками домиков, блокировка дат
- `/admin/settings` — Цены домиков, активность, смена пароля

---

## Схема базы данных

### `cabin_types` (типы домиков)
`id, slug (floor-1/floor-2), name_ru, price_per_night (KZT), max_adults, max_children, is_active`

### `bookings` (бронирования)
`id, booking_ref (RG-YYYY-XXXX), cabin_type_id, guest_name, guest_phone, guest_email, num_adults, num_children, special_requests, check_in (DATE), check_out (DATE), price_per_night, total_nights, total_price, status (pending/confirmed/cancelled), admin_notes, confirmed_at, cancelled_at, created_at`

### `blocked_dates` (заблокированные даты)
`id, cabin_type_id, date (DATE), reason, created_by, UNIQUE(cabin_type_id, date)`

### `admins` (администраторы)
`id, email, password (bcrypt), name`

### `refresh_tokens`
`id, admin_id, token, expires_at`

**Ключевой запрос доступности:** `check_in < :newCheckOut AND check_out > :newCheckIn AND status IN ('confirmed','pending')` — бронь на 5–7 июня блокирует 5-е и 6-е, но 7-е доступно для нового заезда.

---

## Структура проекта

```
rakhat-glamping/
├── package.json                   # npm workspaces root
├── frontend/
│   ├── vite.config.ts
│   ├── tailwind.config.ts         # расширяет токены цветов
│   └── src/
│       ├── design-system/         # tokens.css, globals.css, animations.css
│       ├── components/
│       │   ├── ui/                # Button, Badge, Card, Modal, Toast
│       │   ├── layout/            # Navbar, Footer, SectionDivider
│       │   ├── animations/        # WaterRipple, FloatingLeaves, CounterAnimation, MagneticButton
│       │   └── booking/           # AvailabilityCalendar, CabinSelector, PriceSummary
│       ├── sections/              # HeroSection … LocationSection (10 секций)
│       ├── pages/                 # LandingPage, BookingPage, admin/* pages
│       ├── hooks/                 # useAvailability, useBookings, useAuth, useGSAP, useScrollPosition
│       ├── stores/                # bookingStore.ts (состояние визарда), uiStore.ts
│       ├── api/                   # client.ts (Axios), bookings.ts, admin.ts
│       └── utils/                 # dateUtils, formatters (40 000 ₸), validators (Zod)
└── backend/
    ├── prisma/
    │   ├── schema.prisma          # все 5 таблиц
    │   └── seed.ts                # cabin_types + дефолтный admin
    └── src/
        ├── config/                # env.ts (Zod-валидация), database.ts, email.ts
        ├── middleware/            # auth.ts, errorHandler.ts, rateLimiter.ts, validate.ts
        ├── routes/                # public.ts, admin.ts
        ├── controllers/           # availability, booking, admin/*
        ├── services/              # availability.service.ts, booking.service.ts, email.service.ts, auth.service.ts
        └── utils/                 # bookingRef.ts (RG-YYYY-XXXX), dateUtils.ts
```

**Критически важные файлы:**
- `frontend/src/design-system/tokens.css` — единый источник всех токенов; все остальное наследуется отсюда
- `backend/prisma/schema.prisma` — управляет всеми данными; должен быть готов до любой другой бэкенд-работы
- `backend/src/services/availability.service.ts` — ядро логики бронирования, обрабатывает конкурентные заявки
- `frontend/src/sections/ExperienceSection.tsx` — фирменный горизонтальный GSAP-скролл, самый сложный фронтенд-компонент
- `frontend/src/stores/bookingStore.ts` — Zustand-стор, связывающий состояние всех 4 шагов визарда

---

## Фазы реализации (карта параллелизма)

```
Фаза 1: Настройка (фундамент)
    ↓
Фаза 2: Лендинг (визуал)  ←параллельно→  Фаза 4: Бэкенд API
    ↓                                           ↓
Фаза 3: UI бронирования   ←параллельно→  Фаза 5: Админка
    ↓                                           ↓
                  Фаза 6: Интеграция + полировка
```

### Фаза 1 — Настройка проекта + дизайн-система
- Инициализация npm workspace (`frontend/` + `backend/`)
- Vite + React + Tailwind + все зависимости
- `tokens.css` с полной палитрой
- `globals.css` с подключением шрифтов Cormorant + Inter
- `animations.css` со всеми keyframe-анимациями (рябь, парение, fadeUp)
- Prisma schema + миграция + seed (2 типа домиков + 1 admin)
- Express health check эндпоинт
- **Результат:** оба сервера запущены; корректные шрифты и цвета; схема БД создана

### Фаза 2 — Секции лендинга
Субагенты могут работать параллельно по группам секций:
- **A:** Navbar (прозрачный → матовое стекло), HeroSection (GSAP рассвет), Footer, MagneticButton
- **B:** ManifestoSection, ExperienceSection (GSAP горизонтальный скролл), WaterSection, WaterRipple, SectionDivider
- **C:** CabinsSection (две карточки, раскрываемый список удобств), AmenitiesSection (12 SVG иконок)
- **D:** ReviewsSection (анимация счётчиков, отзывы), BookingCTASection, LocationSection (карта 2ГИС)

### Фаза 3 — Фронтенд бронирования
- `bookingStore.ts` Zustand (состояние всех 4 шагов)
- `AvailabilityCalendar.tsx` — кастомный 2-месячный календарь, выбор диапазона, занятые даты
- `CabinSelector.tsx` с индикаторами доступности
- `PriceSummary.tsx` прилипающий сайдбар
- Форма гостя шаг 2 (Zod-валидация, условное поле детей)
- Шаг 3 — итоговое подтверждение
- `BookingSuccess.tsx` со ссылкой WhatsApp
- Mock-адаптер для `useAvailability`

### Фаза 4 — Бэкенд API
- `GET /api/availability?cabinTypeId&year&month` — возвращает массив занятых дат
- `POST /api/bookings` — повторная проверка доступности, создание брони, генерация ref, email (лимит: 5 запросов/IP/15 мин)
- `GET /api/bookings/:ref` — публичный поиск брони по номеру
- Авторизация admin: login/refresh/logout (httpOnly cookie JWT)
- CRUD бронирований для admin: список (пагинация + фильтры), просмотр, смена статуса, заметки
- Календарь admin: месячный вид, CRUD заблокированных дат
- Настройки admin: цены домиков, активность, смена пароля
- Email-сервис: 3 шаблона (ожидание → гостю, новая заявка → admin, подтверждение → гостю)

### Фаза 5 — Фронтенд административной панели
- `AdminLayout.tsx` боковое меню + топбар
- `LoginPage.tsx` + `useAuth.ts` защита роутов
- `DashboardPage.tsx` — карточки статистики, ближайшие заезды, список ожидающих
- `BookingsPage.tsx` — таблица с вкладками статусов, поиск, пагинация
- `BookingDetailPage.tsx` — смена статуса, автосохранение заметок, отправка email
- `CalendarPage.tsx` — месячный вид с двумя дорожками, модал блокировки дат
- `SettingsPage.tsx` — редакторы цен, переключатели, смена пароля

### Фаза 6 — Интеграция + полировка
- Замена всех mock API вызовов на реальные эндпоинты
- Сквозной тест: выбор дат → бронь → подтверждение → письмо гостю
- Скелетные загрузчики (calendar, таблица броней, статистика)
- Система Toast-уведомлений
- Обработка 409 Conflict (даты заняты при конкурентном бронировании)
- React.lazy + Suspense для секций ниже первого экрана
- Оптимизация изображений в WebP
- SEO: `<title>`, Open Graph мета-теги, JSON-LD LocalBusiness schema
- Безопасность: CORS whitelist, Helmet, санитизация ввода, JWT secret ≥32 символа
- Деплой: Dockerfile (бэкенд), nginx.conf с fallback для SPA (фронтенд)

---

## Как проверить результат
1. `npm run dev` в обоих workspace — оба сервера запущены, health check возвращает 200
2. Открыть фронтенд — корректный шрифт Cormorant, фон `--color-abyss`, GSAP-анимация рассвета работает
3. Прокрутить лендинг — все 10 секций, GSAP горизонтальный скролл фиксируется корректно, счётчики анимируются
4. Перейти на `/book` — календарь загружается, занятые даты серые, выбор диапазона работает, цена считается автоматически
5. Отправить бронь — страница успеха с номером брони, в админке появляется запись со статусом «ожидает»
6. Admin подтверждает бронь — гостю приходит письмо, статус обновляется в UI
7. Календарь admin — заблокировать дату, убедиться что она отображается занятой в публичном календаре
8. Настройки admin — изменить цену, убедиться что новая цена отображается на лендинге
9. Тест конкурентного бронирования — два запроса на одни даты одновременно, только один успешен, второй получает 409
