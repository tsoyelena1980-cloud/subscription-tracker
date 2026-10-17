(() => {
  "use strict";

  const STORAGE_KEY = "subtracker.items.v1";
  const THEME_KEY = "subtracker.theme.v1";
  const LANG_KEY = "subtracker.lang.v1";
  const CHARTS_COLLAPSED_KEY = "subtracker.charts.collapsed.v1";

  const MONTHS = {
    ru: [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ],
    en: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
  };

  const I18N = {
    ru: {
      pageTitle: "SubPulse — Трекер подписок",
      eyebrow: "Финансовый контроль · CRUD",
      quickAdd: "Новая подписка",
      themeDark: "Тёмная",
      themeLight: "Светлая",
      analyticsTitle: "Аналитика расходов и статусов",
      analyticsSub: "Наглядное распределение ваших подписок по статусам, стоимости и календарю списаний",
      hideCharts: "Скрыть графики",
      showCharts: "Показать графики",
      chartStatusTitle: "Статусы подписок",
      chartStatusTag: "Кольцевая",
      chartTopTitle: "Топ расходов по сервисам ($)",
      chartTopTag: "Рейтинг",
      chartTimelineTitle: "График окончания и продления в текущем месяце",
      searchPlaceholder: "Поиск по названию, стоимости ($), периоду или статусу...",
      filterAll: "Все",
      statusActive: "Активна",
      statusExpiring: "Скоро продление",
      statusPaused: "Приостановлена",
      statusExpired: "Истекла",
      statusCancelled: "Отменена",
      statusAuto: "Автоматически (по датам периода)",
      sortEndDate: "По дате окончания (сначала ближайшие)",
      sortPriceDesc: "По стоимости (по убыванию)",
      sortPriceAsc: "По стоимости (по возрастанию)",
      sortNameAsc: "По названию (А–Я / A–Z)",
      sortStatus: "По статусу",
      formTitleAdd: "Добавить подписку",
      formSubAdd: "Заполните параметры сервиса и период оплаты",
      formTitleEdit: "Изменить подписку",
      formSubEdit: name => `Редактирование «${name}»`,
      labelName: "Наименование подписки",
      namePlaceholder: "Например: Netflix, Spotify, ChatGPT Plus...",
      labelIcon: "Значок подписки",
      iconAuto: label => `Авто: ${label}`,
      iconManual: label => `Выбран: ${label}`,
      labelPrice: "Стоимость",
      labelCurrency: "Валюта",
      labelPeriod: "Период оплаты (начало и конец)",
      preset1m: "+1 мес",
      preset3m: "+3 мес",
      preset6m: "+6 мес",
      preset1y: "+1 год",
      labelStartDate: "Начало периода",
      labelEndDate: "Конец периода",
      labelStatus: "Статус подписки",
      btnSubmitAdd: "Добавить подписку",
      btnSubmitEdit: "Сохранить изменения",
      btnCancel: "Отмена",
      mySubscriptions: "Мои подписки",
      errNoName: "Укажите наименование подписки",
      errInvalidPrice: "Укажите корректную стоимость подписки",
      errNoDates: "Укажите даты начала и окончания периода",
      errEndBeforeStart: "Дата окончания не может быть раньше даты начала",
      startPrefix: "Начало:",
      endPrefix: "Конец:",
      subCancelledText: "Подписка отменена",
      subPausedText: "На паузе",
      dueTodayText: "Оплата сегодня",
      btnRenew: "Продлить",
      btnEdit: "Изменить",
      btnDelete: "Удалить",
      confirmDeleteAsk: name => `Удалить подписку «${name}»?`,
      confirmDeleteYes: "Да, удалить",
      confirmDeleteNo: "Отмена",
      emptyNotFoundTitle: "Ничего не найдено",
      emptyNotFoundHint: "Попробуйте изменить поисковый запрос или переключить фильтр статуса.",
      emptyListTitle: "Список подписок пуст",
      emptyListHint: "Добавьте свою первую подписку через форму слева.",
      statActiveLabel: "Активные подписки",
      statActiveSub: total => `Всего в списке: ${total}`,
      statMonthlyLabel: "Расходы в месяц",
      statMonthlySub: yearly => `≈ ${yearly} в год`,
      statExpiringLabel: "Скоро продление",
      statExpiringSub: "В ближайшие 7 дней",
      statInactiveLabel: "Истекли / Отменены",
      statInactiveSub: "Не требуют оплаты",
      noActiveExpenses: "Нет активных подписок для расчёта расходов",
      period1Year: "за 1 год",
      period6Months: "за 6 мес.",
      period3Months: "за 3 мес.",
      period1Month: "в месяц"
    },
    en: {
      pageTitle: "SubPulse — Subscription Tracker",
      eyebrow: "Financial Control · CRUD",
      quickAdd: "New Subscription",
      themeDark: "Dark",
      themeLight: "Light",
      analyticsTitle: "Expenses & Status Analytics",
      analyticsSub: "Visual breakdown of your subscriptions by status, cost, and billing calendar",
      hideCharts: "Hide Charts",
      showCharts: "Show Charts",
      chartStatusTitle: "Subscription Statuses",
      chartStatusTag: "Donut",
      chartTopTitle: "Top Expenses by Service ($)",
      chartTopTag: "Ranking",
      chartTimelineTitle: "Expiration & Renewal Schedule This Month",
      searchPlaceholder: "Search by name, price ($), period, or status...",
      filterAll: "All",
      statusActive: "Active",
      statusExpiring: "Renewing Soon",
      statusPaused: "Paused",
      statusExpired: "Expired",
      statusCancelled: "Cancelled",
      statusAuto: "Automatic (based on period dates)",
      sortEndDate: "By end date (nearest first)",
      sortPriceDesc: "By price (high to low)",
      sortPriceAsc: "By price (low to high)",
      sortNameAsc: "By name (A–Z)",
      sortStatus: "By status",
      formTitleAdd: "Add Subscription",
      formSubAdd: "Fill in service details and billing period",
      formTitleEdit: "Edit Subscription",
      formSubEdit: name => `Editing "${name}"`,
      labelName: "Subscription Name",
      namePlaceholder: "e.g., Netflix, Spotify, ChatGPT Plus...",
      labelIcon: "Service Icon",
      iconAuto: label => `Auto: ${label}`,
      iconManual: label => `Selected: ${label}`,
      labelPrice: "Price",
      labelCurrency: "Currency",
      labelPeriod: "Billing Period (start & end)",
      preset1m: "+1 mo",
      preset3m: "+3 mo",
      preset6m: "+6 mo",
      preset1y: "+1 yr",
      labelStartDate: "Start Date",
      labelEndDate: "End Date",
      labelStatus: "Subscription Status",
      btnSubmitAdd: "Add Subscription",
      btnSubmitEdit: "Save Changes",
      btnCancel: "Cancel",
      mySubscriptions: "My Subscriptions",
      errNoName: "Please enter a subscription name",
      errInvalidPrice: "Please enter a valid subscription price",
      errNoDates: "Please specify both start and end dates",
      errEndBeforeStart: "End date cannot be earlier than start date",
      startPrefix: "Start:",
      endPrefix: "End:",
      subCancelledText: "Subscription cancelled",
      subPausedText: "Paused",
      dueTodayText: "Due today",
      btnRenew: "Renew",
      btnEdit: "Edit",
      btnDelete: "Delete",
      confirmDeleteAsk: name => `Delete subscription "${name}"?`,
      confirmDeleteYes: "Yes, delete",
      confirmDeleteNo: "Cancel",
      emptyNotFoundTitle: "No matches found",
      emptyNotFoundHint: "Try adjusting your search query or switching the status filter.",
      emptyListTitle: "Subscription list is empty",
      emptyListHint: "Add your first subscription using the form on the left.",
      statActiveLabel: "Active Subscriptions",
      statActiveSub: total => `Total in list: ${total}`,
      statMonthlyLabel: "Monthly Spend",
      statMonthlySub: yearly => `≈ ${yearly} per year`,
      statExpiringLabel: "Renewing Soon",
      statExpiringSub: "Within next 7 days",
      statInactiveLabel: "Expired / Cancelled",
      statInactiveSub: "No payment required",
      noActiveExpenses: "No active subscriptions to calculate expenses",
      period1Year: "per year",
      period6Months: "per 6 mos",
      period3Months: "per 3 mos",
      period1Month: "per month"
    }
  };

  const CURRENCIES = {
    USD: { symbol: "$", code: "USD", rateToUSD: 1, position: "prefix" },
    EUR: { symbol: "€", code: "EUR", rateToUSD: 1.09, position: "prefix" },
    UZS: { symbol: "сум", symbolEn: "UZS", code: "UZS", rateToUSD: 0.000078, position: "suffix" }
  };

  const STATUS_META = {
    active: { key: "active", i18nKey: "statusActive", rank: 1 },
    expiring: { key: "expiring", i18nKey: "statusExpiring", rank: 0 },
    paused: { key: "paused", i18nKey: "statusPaused", rank: 2 },
    expired: { key: "expired", i18nKey: "statusExpired", rank: 3 },
    cancelled: { key: "cancelled", i18nKey: "statusCancelled", rank: 4 }
  };

  const ICONS = [
    {
      key: "netflix",
      label: { ru: "Netflix", en: "Netflix" },
      category: { ru: "Кино и сериалы", en: "Movies & TV" },
      keywords: ["netflix", "нетфликс"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#E50914" fill-opacity="0.18"/><path d="M9 6h3.2l3.8 10.2V6H19v16h-3.2L12 11.6V22H9V6z" fill="#E50914"/></svg>`
    },
    {
      key: "spotify",
      label: { ru: "Spotify", en: "Spotify" },
      category: { ru: "Музыка и аудио", en: "Music & Audio" },
      keywords: ["spotify", "спотифай"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#1DB954" fill-opacity="0.18"/><circle cx="14" cy="14" r="8.5" stroke="#1DB954" stroke-width="2"/><path d="M10 11.8c2.8-.9 5.8-.7 8.4.7M10.6 14.6c2.2-.7 4.7-.5 6.8.6M11.3 17.3c1.7-.5 3.6-.3 5.2.5" stroke="#1DB954" stroke-width="1.9" stroke-linecap="round"/></svg>`
    },
    {
      key: "youtube",
      label: { ru: "YouTube", en: "YouTube" },
      category: { ru: "Видео и стриминг", en: "Video & Streaming" },
      keywords: ["youtube", "ютуб", "ютьюб", "yt"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#FF0033" fill-opacity="0.18"/><rect x="5.5" y="8" width="17" height="12" rx="3.5" fill="#FF0033"/><path d="M12.5 11.3v5.4L17.2 14l-4.7-2.7z" fill="#fff"/></svg>`
    },
    {
      key: "chatgpt",
      label: { ru: "ChatGPT", en: "ChatGPT" },
      category: { ru: "Искусственный интеллект", en: "Artificial Intelligence" },
      keywords: ["chatgpt", "chat gpt", "gpt", "openai", "чатгпт", "чат гпт", "ai", "ии", "нейро"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#10A37F" fill-opacity="0.22"/><g transform="translate(14,14)"><g stroke="#10B981" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3"/><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3" transform="rotate(60)"/><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3" transform="rotate(120)"/><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3" transform="rotate(180)"/><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3" transform="rotate(240)"/><path d="M-1.9 -3.3 L-1.9 -5.5 A 3.4 3.4 0 0 1 4.6 -4.1 L6.2 -1.3" transform="rotate(300)"/></g><polygon points="0,-3.5 3,-1.75 3,1.75 0,3.5 -3,1.75 -3,-1.75" stroke="#34D399" stroke-width="1.35" fill="#10A37F" fill-opacity="0.18"/></g></svg>`
    },
    {
      key: "gemini",
      label: { ru: "Google Gemini", en: "Google Gemini" },
      category: { ru: "Искусственный интеллект", en: "Artificial Intelligence" },
      keywords: ["gemini", "google gemini", "google ai", "bard", "джемини", "гемини"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><defs><linearGradient id="gemini-bg" x1="3" y1="3" x2="25" y2="25" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#3186FF"/><stop offset="50%" stop-color="#969DFF"/><stop offset="100%" stop-color="#FA4340"/></linearGradient><linearGradient id="gemini-spark" x1="5" y1="6" x2="23" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#3186FF"/><stop offset="38%" stop-color="#749BFF"/><stop offset="68%" stop-color="#FA4340"/><stop offset="100%" stop-color="#F6C013"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#gemini-bg)" fill-opacity="0.2"/><path d="M14 4.8C14 9.88 18.12 14 23.2 14C18.12 14 14 18.12 14 23.2C14 18.12 9.88 14 4.8 14C9.88 14 14 9.88 14 4.8Z" fill="url(#gemini-spark)"/><circle cx="20.4" cy="7.6" r="1.3" fill="#14BB69" opacity="0.9"/></svg>`
    },
    {
      key: "deepseek",
      label: { ru: "DeepSeek", en: "DeepSeek" },
      category: { ru: "Искусственный интеллект", en: "Artificial Intelligence" },
      keywords: ["deepseek", "deep seek", "дипсик", "дип сик", "r1"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><defs><linearGradient id="ds-grad" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#5D78FE"/><stop offset="100%" stop-color="#3E5FFE"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="#4D6BFE" fill-opacity="0.2"/><path d="M19.8 13.8c.3-3.1-2.1-5.8-5.7-5.8-3.8 0-6.7 2.8-6.7 6.4 0 3.7 3 6.4 6.9 6.4 2.8 0 5.1-1.3 6.2-3.4.5-.9 1.6-1.5 2.7-1.7-.7-1.2-2-1.6-3.4-.3-.5.4-1.1.7-1.8.7-1.9 0-3.5-1.1-4.1-2.8 1.5.5 3.6.3 5.9.5z" fill="url(#ds-grad)"/><path d="M20.2 11.4c.7-.9 1.8-1.4 3-1.2-.3 1.1-1 2-2.1 2.4-.5.2-.9-.6-.9-1.2z" fill="#5D78FE"/><circle cx="11.6" cy="12.6" r="1.15" fill="#EFF6FF"/><path d="M9.6 15.8c1.3 1.2 3.2 1.6 5.1 1.1" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/></svg>`
    },
    {
      key: "telegram",
      label: { ru: "Telegram", en: "Telegram" },
      category: { ru: "Мессенджер", en: "Messenger" },
      keywords: ["telegram", "телеграм", "тг", "tg"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#38BDF8" fill-opacity="0.18"/><path d="M21.2 8.2 6.8 13.8c-.8.3-.8 1.4.1 1.7l3.6 1.1 1.4 4.3c.2.7 1.1.8 1.5.3l2-2.1 3.7 2.7c.7.5 1.6.1 1.8-.7l2.1-11.6c.2-.9-.7-1.6-1.8-1.3z" fill="#38BDF8"/></svg>`
    },
    {
      key: "apple",
      label: { ru: "Apple / iCloud", en: "Apple / iCloud" },
      category: { ru: "Экосистема и облако", en: "Ecosystem & Cloud" },
      keywords: ["apple", "icloud", "эпл", "айклауд", "app store", "apple music", "apple tv"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#A78BFA" fill-opacity="0.18"/><path d="M17.8 14.7c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.5.7-3.1.7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.2.7 1 1.5 2.1 2.6 2 .9 0 1.4-.6 2.6-.6 1.2 0 1.6.6 2.6.6 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2-.8-2-3.3zM15.8 8.3c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" fill="#C4B5FD"/></svg>`
    },
    {
      key: "code",
      label: { ru: "Cursor / GitHub", en: "Cursor / GitHub" },
      category: { ru: "Разработка и код", en: "Dev & Code" },
      keywords: ["cursor", "github", "gitlab", "jetbrains", "vercel", "netlify", "aws", "digitalocean", "код", "хостинг"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#8B5CF6" fill-opacity="0.2"/><path d="M10.5 10 6.5 14l4 4M17.5 10l4 4-4 4M15 8.5l-2 11" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      key: "wps",
      label: { ru: "WPS Office", en: "WPS Office" },
      category: { ru: "Офис и документы", en: "Office & Docs" },
      keywords: ["wps", "wps office", "kingsoft", "впс", "офис", "office", "word", "excel", "pdf", "документы"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><defs><linearGradient id="wps-g1" x1="5" y1="6" x2="23" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FF5E2B"/><stop offset="55%" stop-color="#FF2E4C"/><stop offset="100%" stop-color="#E11D48"/></linearGradient><linearGradient id="wps-g2" x1="10" y1="11" x2="18" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFF1F2"/><stop offset="100%" stop-color="#FFE4E6"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#wps-g1)" fill-opacity="0.2"/><rect x="3.5" y="3.5" width="21" height="21" rx="6.5" stroke="url(#wps-g1)" stroke-width="1.4" stroke-opacity="0.45"/><path d="M6.8 9.2 10.3 19.2c.25.7 1.22.72 1.5.03L14 13.8l2.2 5.43c.28.69 1.25.67 1.5-.03L21.2 9.2" stroke="url(#wps-g1)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6 15.2 14 10.6l2.4 4.6" stroke="url(#wps-g2)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/></svg>`
    },
    {
      key: "adobe",
      label: { ru: "Adobe / Figma", en: "Adobe / Figma" },
      category: { ru: "Дизайн и графика", en: "Design & Graphics" },
      keywords: ["adobe", "photoshop", "figma", "canva", "адоб", "фигма", "дизайн"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#F43F5E" fill-opacity="0.18"/><path d="M12.2 7H7v14l5.2-14zm3.6 0H21v14l-5.2-14zM14 12.4 17.3 21h-2.4l-1-2.7h-2.3L14 12.4z" fill="#FB7185"/></svg>`
    },
    {
      key: "playstation",
      label: { ru: "PlayStation / Xbox", en: "PlayStation / Xbox" },
      category: { ru: "Игры и консоли", en: "Gaming & Consoles" },
      keywords: ["playstation", "ps plus", "psn", "xbox", "game pass", "nintendo", "плойка", "игры"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#6366F1" fill-opacity="0.2"/><rect x="5.5" y="9.5" width="17" height="9.5" rx="4.7" stroke="#818CF8" stroke-width="2"/><path d="M10.5 12.5v3.5M8.8 14.2h3.5" stroke="#818CF8" stroke-width="1.8" stroke-linecap="round"/><circle cx="17.2" cy="13.2" r="1" fill="#818CF8"/><circle cx="19.2" cy="15.2" r="1" fill="#818CF8"/></svg>`
    },
    {
      key: "steam",
      label: { ru: "Steam", en: "Steam" },
      category: { ru: "Игровой сервис", en: "Gaming Platform" },
      keywords: ["steam", "стим", "dota", "cs"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#3B82F6" fill-opacity="0.2"/><circle cx="17.5" cy="11.5" r="3.2" stroke="#60A5FA" stroke-width="2"/><circle cx="11" cy="17.5" r="2.5" stroke="#60A5FA" stroke-width="2"/><path d="M6.5 15.5 11 17.5l4.8-3.5" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/></svg>`
    },
    {
      key: "discord",
      label: { ru: "Discord Nitro", en: "Discord Nitro" },
      category: { ru: "Сообщества и связь", en: "Communities & Voice" },
      keywords: ["discord", "nitro", "дискорд", "нитро"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#8B5CF6" fill-opacity="0.2"/><path d="M8.5 9.5c2.2-1 4.5-1.2 5.5-1.2s3.3.2 5.5 1.2c1.2 2.4 1.6 5.2 1.4 8-1.4 1.1-2.9 1.7-4.3 2l-.8-1.5c1.5-.5 2.2-1.1 2.2-1.1-1.3.8-2.7 1.1-4 1.1s-2.7-.3-4-1.1c0 0 .7.6 2.2 1.1L11.4 19.5c-1.4-.3-2.9-.9-4.3-2-.2-2.8.2-5.6 1.4-8z" stroke="#A78BFA" stroke-width="1.7" stroke-linejoin="round"/><circle cx="11.8" cy="14" r="1.2" fill="#A78BFA"/><circle cx="16.2" cy="14" r="1.2" fill="#A78BFA"/></svg>`
    },
    {
      key: "yandex",
      label: { ru: "Яндекс Плюс", en: "Yandex Plus" },
      category: { ru: "Экосистема", en: "Ecosystem" },
      keywords: ["яндекс", "yandex", "плюс", "plus", "алиса"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#F59E0B" fill-opacity="0.2"/><circle cx="14" cy="14" r="8" stroke="#FBBF24" stroke-width="2"/><path d="M14 9.5v9M9.5 14h9" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round"/></svg>`
    },
    {
      key: "kinopoisk",
      label: { ru: "Кино / ТВ", en: "Cinema / TV" },
      category: { ru: "Онлайн-кинотеатр", en: "Online Cinema" },
      keywords: ["кинопоиск", "иви", "ivi", "okko", "окко", "wink", "kion", "premier", "hbo", "disney", "кино"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#F97316" fill-opacity="0.2"/><rect x="6" y="7.5" width="16" height="13" rx="2.5" stroke="#FB923C" stroke-width="2"/><path d="M10 7.5v13M18 7.5v13M6 11.5h4M18 11.5h4M6 16.5h4M18 16.5h4" stroke="#FB923C" stroke-width="1.6"/></svg>`
    },
    {
      key: "cloud",
      label: { ru: "Google / Облако", en: "Google / Cloud" },
      category: { ru: "Облачное хранилище", en: "Cloud Storage" },
      keywords: ["google", "drive", "dropbox", "onedrive", "облако", "диск", "cloud", "vpn", "впн"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#06B6D4" fill-opacity="0.2"/><path d="M9.5 19.5h9.2a3.8 3.8 0 0 0 .6-7.5A5.2 5.2 0 0 0 9.2 10.6 4.2 4.2 0 0 0 9.5 19.5z" stroke="#22D3EE" stroke-width="2" stroke-linejoin="round"/></svg>`
    },
    {
      key: "music",
      label: { ru: "Музыка", en: "Music" },
      category: { ru: "Аудиосервис", en: "Audio Service" },
      keywords: ["музыка", "music", "vk", "вк", "звук", "deezer", "tidal"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#EC4899" fill-opacity="0.2"/><path d="M11 18.5V9.8l8-1.8v8.7" stroke="#F472B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.2" cy="18.8" r="2.2" stroke="#F472B6" stroke-width="2"/><circle cx="17.2" cy="17" r="2.2" stroke="#F472B6" stroke-width="2"/></svg>`
    },
    {
      key: "fitness",
      label: { ru: "Фитнес / Спорт", en: "Fitness / Sport" },
      category: { ru: "Здоровье и спорт", en: "Health & Fitness" },
      keywords: ["фитнес", "спорт", "зал", "strava", "gym", "йога", "здоровье", "whoop"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#10B981" fill-opacity="0.18"/><path d="M6.5 11.5v5M9 9.5v9M19 9.5v9M21.5 11.5v5M9 14h10" stroke="#34D399" stroke-width="2.2" stroke-linecap="round"/></svg>`
    },
    {
      key: "telecom",
      label: { ru: "Связь / Интернет", en: "Mobile / Internet" },
      category: { ru: "Связь и коммуникации", en: "Telecom & ISP" },
      keywords: ["связь", "интернет", "мтс", "билайн", "мегафон", "теле2", "ростелеком", "sim", "wi-fi"],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#6366F1" fill-opacity="0.18"/><path d="M6.5 12.5a11 11 0 0 1 15 0M9.3 15.5a7 7 0 0 1 9.4 0M12.2 18.5a3 3 0 0 1 3.6 0" stroke="#818CF8" stroke-width="2" stroke-linecap="round"/><circle cx="14" cy="21" r="1.3" fill="#818CF8"/></svg>`
    },
    {
      key: "default",
      label: { ru: "Сервис", en: "Service" },
      category: { ru: "Цифровая подписка", en: "Digital Subscription" },
      keywords: [],
      svg: `<svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="#8B5CF6" fill-opacity="0.18"/><rect x="6" y="8" width="16" height="12" rx="3" stroke="#A78BFA" stroke-width="2"/><path d="M6 12h16M10 16h4" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>`
    }
  ];

  const svgNS = "http://www.w3.org/2000/svg";

  // Application State
  let currentLang = "ru";
  try {
    const savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang === "ru" || savedLang === "en") {
      currentLang = savedLang;
    }
  } catch {
    currentLang = "ru";
  }

  function t(key) {
    return I18N[currentLang]?.[key] ?? I18N.ru[key] ?? key;
  }

  function iconLabel(icon) {
    return icon.label[currentLang] || icon.label.ru;
  }

  function iconCategory(icon) {
    return icon.category[currentLang] || icon.category.ru;
  }

  function statusLabel(statusKey) {
    const meta = STATUS_META[statusKey] || STATUS_META.active;
    return t(meta.i18nKey);
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function parseISO(isoStr) {
    if (!isoStr || typeof isoStr !== "string") return startOfDay(new Date());
    const [year, month, day] = isoStr.split("-").map(Number);
    return new Date(year, (month || 1) - 1, day || 1);
  }

  function toISO(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function addDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  function addMonths(date, months) {
    const targetMonth = date.getMonth() + months;
    const anchor = new Date(date.getFullYear(), targetMonth, 1);
    const maxDay = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
    return new Date(anchor.getFullYear(), anchor.getMonth(), Math.min(date.getDate(), maxDay));
  }

  function createSeedData() {
    const today = startOfDay(new Date());
    return [
      {
        id: "seed-chatgpt",
        name: "ChatGPT Plus",
        iconKey: "chatgpt",
        price: 20.00,
        currency: "USD",
        startDate: toISO(addDays(today, -18)),
        endDate: toISO(addDays(today, 12)),
        status: "auto"
      },
      {
        id: "seed-netflix",
        name: "Netflix Standard",
        iconKey: "netflix",
        price: 15.49,
        currency: "USD",
        startDate: toISO(addDays(today, -26)),
        endDate: toISO(addDays(today, 4)),
        status: "auto"
      },
      {
        id: "seed-spotify",
        name: "Spotify Duo",
        iconKey: "spotify",
        price: 14.99,
        currency: "USD",
        startDate: toISO(addDays(today, -10)),
        endDate: toISO(addDays(today, 20)),
        status: "auto"
      },
      {
        id: "seed-cursor",
        name: "Cursor Pro",
        iconKey: "code",
        price: 20.00,
        currency: "USD",
        startDate: toISO(addDays(today, -5)),
        endDate: toISO(addDays(today, 25)),
        status: "auto"
      },
      {
        id: "seed-youtube",
        name: "YouTube Premium",
        iconKey: "youtube",
        price: 13.99,
        currency: "USD",
        startDate: toISO(addDays(today, -28)),
        endDate: toISO(addDays(today, 2)),
        status: "auto"
      },
      {
        id: "seed-icloud",
        name: "Apple iCloud+ 2TB",
        iconKey: "apple",
        price: 9.99,
        currency: "USD",
        startDate: toISO(addDays(today, -14)),
        endDate: toISO(addDays(today, 16)),
        status: "auto"
      },
      {
        id: "seed-telegram",
        name: "Telegram Premium",
        iconKey: "telegram",
        price: 4.99,
        currency: "USD",
        startDate: toISO(addDays(today, -35)),
        endDate: toISO(addDays(today, -5)),
        status: "auto"
      },
      {
        id: "seed-psplus",
        name: "PlayStation Plus",
        iconKey: "playstation",
        price: 17.99,
        currency: "USD",
        startDate: toISO(addDays(today, -40)),
        endDate: toISO(addDays(today, 20)),
        status: "paused"
      },
      {
        id: "seed-adobe",
        name: "Adobe Creative Cloud",
        iconKey: "adobe",
        price: 22.99,
        currency: "USD",
        startDate: toISO(addDays(today, -60)),
        endDate: toISO(addDays(today, -30)),
        status: "cancelled"
      }
    ];
  }

  function getIcon(key) {
    return ICONS.find(item => item.key === key) || ICONS[ICONS.length - 1];
  }

  function detectIconByName(name) {
    const normalized = String(name || "").toLowerCase().trim();
    if (!normalized) return "default";
    for (const item of ICONS) {
      if (item.keywords.some(kw => normalized.includes(kw))) {
        return item.key;
      }
    }
    return "default";
  }

  function resolveStatus(sub) {
    if (sub.status && sub.status !== "auto" && STATUS_META[sub.status]) {
      return sub.status;
    }
    const today = startOfDay(new Date());
    const end = parseISO(sub.endDate);
    const diffDays = Math.round((end - today) / 86400000);
    if (diffDays < 0) return "expired";
    if (diffDays <= 7) return "expiring";
    return "active";
  }

  function daysBetween(startIso, endIso) {
    const s = parseISO(startIso);
    const e = parseISO(endIso);
    return Math.max(1, Math.round((e - s) / 86400000));
  }

  function daysUntil(endIso) {
    const today = startOfDay(new Date());
    const end = parseISO(endIso);
    return Math.round((end - today) / 86400000);
  }

  function periodProgress(sub) {
    const total = daysBetween(sub.startDate, sub.endDate);
    const today = startOfDay(new Date());
    const start = parseISO(sub.startDate);
    const elapsed = Math.round((today - start) / 86400000);
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  }

  function pluralRu(count, one, few, many) {
    const abs = Math.abs(count);
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function formatDaysWord(count) {
    if (currentLang === "en") {
      return Math.abs(count) === 1 ? "day" : "days";
    }
    return pluralRu(count, "день", "дня", "дней");
  }

  function formatSubsCount(count) {
    if (currentLang === "en") {
      return `${count} ${Math.abs(count) === 1 ? "subscription" : "subscriptions"}`;
    }
    return `${count} ${pluralRu(count, "подписка", "подписки", "подписок")}`;
  }

  function formatCenterChartNoun(count) {
    if (currentLang === "en") {
      return Math.abs(count) === 1 ? "SUBSCRIPTION" : "SUBSCRIPTIONS";
    }
    return pluralRu(count, "ПОДПИСКА", "ПОДПИСКИ", "ПОДПИСОК");
  }

  function formatDate(isoStr) {
    const d = parseISO(isoStr);
    const monthList = MONTHS[currentLang] || MONTHS.ru;
    const text = currentLang === "en"
      ? `${monthList[d.getMonth()]} ${d.getDate()}`
      : `${d.getDate()} ${monthList[d.getMonth()]}`;
    return d.getFullYear() === new Date().getFullYear() ? text : `${text}, ${d.getFullYear()}`;
  }

  function formatMoney(amount, currencyCode = "USD") {
    const normalizedCode = currencyCode === "RUB" ? "UZS" : currencyCode;
    const meta = CURRENCIES[normalizedCode] || CURRENCIES.USD;
    const num = Number(amount) || 0;
    const isInt = num % 1 === 0;
    const formatted = normalizedCode === "UZS"
      ? Math.round(num).toLocaleString(currentLang === "en" ? "en-US" : "ru-RU")
      : (isInt ? num.toFixed(0) : num.toFixed(2));
    const sym = currentLang === "en" && meta.symbolEn ? meta.symbolEn : meta.symbol;
    return meta.position === "prefix" ? `${sym}${formatted}` : `${formatted} ${sym}`;
  }

  function toMonthlyUSD(sub) {
    const normalizedCode = sub.currency === "RUB" ? "UZS" : sub.currency;
    const meta = CURRENCIES[normalizedCode] || CURRENCIES.USD;
    const totalDays = daysBetween(sub.startDate, sub.endDate);
    const usdAmount = (Number(sub.price) || 0) * meta.rateToUSD;
    if (totalDays >= 330) return usdAmount / 12;
    if (totalDays >= 80 && totalDays <= 100) return usdAmount / 3;
    if (totalDays >= 170 && totalDays <= 195) return usdAmount / 6;
    return usdAmount * (30 / Math.max(28, totalDays));
  }

  function periodLabel(sub) {
    const days = daysBetween(sub.startDate, sub.endDate);
    if (days >= 350 && days <= 370) return t("period1Year");
    if (days >= 175 && days <= 190) return t("period6Months");
    if (days >= 85 && days <= 95) return t("period3Months");
    if (days >= 27 && days <= 32) return t("period1Month");
    return currentLang === "en"
      ? `for ${days} ${formatDaysWord(days)}`
      : `за ${days} ${formatDaysWord(days)}`;
  }

  function isValidSub(item) {
    return Boolean(item)
      && typeof item.id === "string"
      && typeof item.name === "string"
      && typeof item.price === "number"
      && typeof item.startDate === "string"
      && typeof item.endDate === "string";
  }

  function loadSubscriptions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createSeedData();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) return createSeedData();
      const valid = parsed.filter(isValidSub);
      return valid.length ? valid : createSeedData();
    } catch {
      return createSeedData();
    }
  }

  function saveSubscriptions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
    } catch {
      /* Хранилище может быть ограничено в приватном режиме */
    }
  }

  function uid() {
    if (window.crypto?.randomUUID) return crypto.randomUUID();
    return `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  let subscriptions = loadSubscriptions();
  saveSubscriptions();

  let currentFilter = "all";
  let searchQuery = "";
  let currentSort = "endDate-asc";
  let selectedIconKey = "default";
  let isManualIcon = false;
  let editingId = null;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function updateTodayLabel() {
    const locale = currentLang === "en" ? "en-US" : "ru-RU";
    const todayFormatted = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date());
    const label = document.getElementById("today-label");
    if (label) {
      label.textContent = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);
    }
  }

  function applyStaticTranslations() {
    document.title = t("pageTitle");
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(node => {
      const key = node.dataset.i18n;
      const val = t(key);
      if (typeof val === "string") {
        node.textContent = val;
      }
    });

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.placeholder = t("searchPlaceholder");
    }

    const nameInput = document.getElementById("sub-name");
    if (nameInput) {
      nameInput.placeholder = t("namePlaceholder");
    }

    const chartsContainer = document.getElementById("charts-container");
    const toggleChartsText = document.getElementById("toggle-charts-text");
    if (chartsContainer && toggleChartsText) {
      const collapsed = chartsContainer.classList.contains("is-collapsed");
      toggleChartsText.textContent = collapsed ? t("showCharts") : t("hideCharts");
    }

    if (editingId) {
      const target = subscriptions.find(item => item.id === editingId);
      document.getElementById("form-title").textContent = t("formTitleEdit");
      document.getElementById("form-subtitle").textContent = t("formSubEdit")(target ? target.name : "");
      document.getElementById("submit-btn-text").textContent = t("btnSubmitEdit");
    } else {
      document.getElementById("form-title").textContent = t("formTitleAdd");
      document.getElementById("form-subtitle").textContent = t("formSubAdd");
      document.getElementById("submit-btn-text").textContent = t("btnSubmitAdd");
    }

    updateTodayLabel();
  }

  // Icon Picker & Preview
  function renderIconPicker() {
    const picker = document.getElementById("icon-picker");
    picker.replaceChildren();
    ICONS.forEach(icon => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `icon-option${icon.key === selectedIconKey ? " is-selected" : ""}`;
      btn.dataset.iconKey = icon.key;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", String(icon.key === selectedIconKey));
      btn.title = `${iconLabel(icon)} (${iconCategory(icon)})`;
      btn.innerHTML = `${icon.svg}<span>${iconLabel(icon)}</span>`;
      btn.addEventListener("click", () => {
        selectedIconKey = icon.key;
        isManualIcon = true;
        updateIconSelectionUI();
      });
      picker.append(btn);
    });
    updateIconSelectionUI();
  }

  function updateIconSelectionUI() {
    const icon = getIcon(selectedIconKey);
    const preview = document.getElementById("form-icon-preview");
    if (preview) {
      preview.innerHTML = icon.svg;
    }
    const badge = document.getElementById("icon-mode-badge");
    if (badge) {
      const lbl = iconLabel(icon);
      badge.textContent = isManualIcon ? t("iconManual")(lbl) : t("iconAuto")(lbl);
      badge.classList.toggle("is-manual", isManualIcon);
    }
    document.querySelectorAll(".icon-option").forEach(btn => {
      const active = btn.dataset.iconKey === selectedIconKey;
      btn.classList.toggle("is-selected", active);
      btn.setAttribute("aria-checked", String(active));
    });
  }

  function initDefaultFormDates() {
    const today = startOfDay(new Date());
    const startInput = document.getElementById("sub-start");
    const endInput = document.getElementById("sub-end");
    if (startInput && !startInput.value) {
      startInput.value = toISO(today);
    }
    if (endInput && !endInput.value) {
      endInput.value = toISO(addMonths(today, 1));
    }
  }

  function applyPeriodPreset(months) {
    const startInput = document.getElementById("sub-start");
    const endInput = document.getElementById("sub-end");
    const baseDate = startInput.value ? parseISO(startInput.value) : startOfDay(new Date());
    startInput.value = toISO(baseDate);
    endInput.value = toISO(addMonths(baseDate, months));
  }

  // CRUD Operations
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const errorNode = document.getElementById("form-error");

    const name = form.name.value.trim();
    if (!name) {
      errorNode.textContent = t("errNoName");
      form.name.focus();
      return;
    }

    const priceVal = parseFloat(form.price.value);
    if (Number.isNaN(priceVal) || priceVal < 0) {
      errorNode.textContent = t("errInvalidPrice");
      form.price.focus();
      return;
    }

    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    if (!startDate || !endDate) {
      errorNode.textContent = t("errNoDates");
      return;
    }

    if (parseISO(endDate) < parseISO(startDate)) {
      errorNode.textContent = t("errEndBeforeStart");
      form.endDate.focus();
      return;
    }

    errorNode.textContent = "";
    const currency = form.currency.value || "USD";
    const status = form.status.value || "auto";

    if (editingId) {
      const target = subscriptions.find(item => item.id === editingId);
      if (target) {
        target.name = name;
        target.iconKey = selectedIconKey;
        target.price = Math.round(priceVal * 100) / 100;
        target.currency = currency;
        target.startDate = startDate;
        target.endDate = endDate;
        target.status = status;
      }
    } else {
      subscriptions.unshift({
        id: uid(),
        name,
        iconKey: selectedIconKey,
        price: Math.round(priceVal * 100) / 100,
        currency,
        startDate,
        endDate,
        status
      });
    }

    resetForm();
    saveSubscriptions();
    renderAll();
  }

  function resetForm() {
    const form = document.getElementById("subscription-form");
    editingId = null;
    isManualIcon = false;
    selectedIconKey = "default";
    form.reset();
    form.currency.value = "USD";
    form.status.value = "auto";

    const today = startOfDay(new Date());
    form.startDate.value = toISO(today);
    form.endDate.value = toISO(addMonths(today, 1));

    document.getElementById("form-error").textContent = "";
    document.getElementById("form-title").textContent = t("formTitleAdd");
    document.getElementById("form-subtitle").textContent = t("formSubAdd");
    document.getElementById("submit-btn-text").textContent = t("btnSubmitAdd");
    document.getElementById("cancel-edit-btn").hidden = true;
    form.classList.remove("is-editing");

    updateIconSelectionUI();
    renderSubscriptionList();
  }

  function startEditSubscription(sub) {
    const form = document.getElementById("subscription-form");
    editingId = sub.id;
    selectedIconKey = sub.iconKey || detectIconByName(sub.name);
    isManualIcon = true;

    form.name.value = sub.name;
    form.price.value = String(sub.price);
    form.currency.value = sub.currency === "RUB" ? "UZS" : (sub.currency || "USD");
    form.startDate.value = sub.startDate;
    form.endDate.value = sub.endDate;
    form.status.value = sub.status || "auto";

    document.getElementById("form-error").textContent = "";
    document.getElementById("form-title").textContent = t("formTitleEdit");
    document.getElementById("form-subtitle").textContent = t("formSubEdit")(sub.name);
    document.getElementById("submit-btn-text").textContent = t("btnSubmitEdit");
    document.getElementById("cancel-edit-btn").hidden = false;
    form.classList.add("is-editing");

    updateIconSelectionUI();
    renderSubscriptionList();
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    form.name.focus();
  }

  function renewSubscription(id) {
    const sub = subscriptions.find(item => item.id === id);
    if (!sub) return;
    const durationDays = daysBetween(sub.startDate, sub.endDate);
    const currentEnd = parseISO(sub.endDate);
    const today = startOfDay(new Date());
    const newStart = currentEnd < today ? today : currentEnd;
    const newEnd = durationDays >= 27 && durationDays <= 32
      ? addMonths(newStart, 1)
      : addDays(newStart, durationDays);

    sub.startDate = toISO(newStart);
    sub.endDate = toISO(newEnd);
    if (sub.status === "expired" || sub.status === "cancelled" || sub.status === "paused") {
      sub.status = "auto";
    }
    saveSubscriptions();
    renderAll();
  }

  function deleteSubscription(id) {
    subscriptions = subscriptions.filter(item => item.id !== id);
    if (editingId === id) {
      resetForm();
    }
    saveSubscriptions();
    renderAll();
  }

  function askDeleteConfirmation(sub, cardNode) {
    document.querySelectorAll(".confirm").forEach(node => node.remove());
    const box = el("div", "confirm");
    const msg = el("p", "", t("confirmDeleteAsk")(sub.name));
    const yesBtn = el("button", "danger", t("confirmDeleteYes"));
    yesBtn.type = "button";
    yesBtn.addEventListener("click", () => deleteSubscription(sub.id));

    const noBtn = el("button", "ghost", t("confirmDeleteNo"));
    noBtn.type = "button";
    noBtn.addEventListener("click", () => box.remove());

    box.append(msg, yesBtn, noBtn);
    cardNode.append(box);
  }

  // Filtering and Sorting
  function matchesSearch(sub, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    const icon = getIcon(sub.iconKey);
    const effectiveStatus = resolveStatus(sub);
    const statusTextRu = I18N.ru[STATUS_META[effectiveStatus]?.i18nKey]?.toLowerCase() || "";
    const statusTextEn = I18N.en[STATUS_META[effectiveStatus]?.i18nKey]?.toLowerCase() || "";
    const priceStr = formatMoney(sub.price, sub.currency).toLowerCase();

    return sub.name.toLowerCase().includes(q)
      || icon.label.ru.toLowerCase().includes(q)
      || icon.label.en.toLowerCase().includes(q)
      || icon.category.ru.toLowerCase().includes(q)
      || icon.category.en.toLowerCase().includes(q)
      || statusTextRu.includes(q)
      || statusTextEn.includes(q)
      || priceStr.includes(q)
      || sub.startDate.includes(q)
      || sub.endDate.includes(q);
  }

  function sortSubscriptions(list) {
    const copy = [...list];
    const locale = currentLang === "en" ? "en" : "ru";
    copy.sort((a, b) => {
      if (currentSort === "price-desc") {
        return toMonthlyUSD(b) - toMonthlyUSD(a);
      }
      if (currentSort === "price-asc") {
        return toMonthlyUSD(a) - toMonthlyUSD(b);
      }
      if (currentSort === "name-asc") {
        return a.name.localeCompare(b.name, locale);
      }
      if (currentSort === "status") {
        const rankA = STATUS_META[resolveStatus(a)]?.rank ?? 9;
        const rankB = STATUS_META[resolveStatus(b)]?.rank ?? 9;
        if (rankA !== rankB) return rankA - rankB;
      }
      if (a.endDate !== b.endDate) {
        return a.endDate < b.endDate ? -1 : 1;
      }
      return a.name.localeCompare(b.name, locale);
    });
    return copy;
  }

  // Rendering Cards
  function createSubscriptionCard(sub) {
    const effectiveStatus = resolveStatus(sub);
    const icon = getIcon(sub.iconKey);
    const daysLeft = daysUntil(sub.endDate);
    const progress = periodProgress(sub);

    const card = el("article", `sub-card status-${effectiveStatus}${editingId === sub.id ? " is-editing-card" : ""}`);

    // Top row: icon + title + price
    const top = el("div", "sub-card-top");
    const identity = el("div", "sub-identity");
    const iconWrap = el("div", "sub-icon");
    iconWrap.innerHTML = icon.svg;

    const titleBlock = el("div", "sub-title-block");
    const nameHeading = el("h3", "sub-name", sub.name);
    const categoryHint = el("p", "sub-category-hint", iconCategory(icon));
    titleBlock.append(nameHeading, categoryHint);
    identity.append(iconWrap, titleBlock);

    const priceBlock = el("div", "sub-price-block");
    const priceValue = el("strong", "sub-price", formatMoney(sub.price, sub.currency));
    const periodSpan = el("span", "sub-period-length", periodLabel(sub));
    priceBlock.append(priceValue, periodSpan);
    top.append(identity, priceBlock);

    // Middle row: payment period & progress bar
    const periodBox = el("div", "sub-period-box");
    const datesRow = el("div", "sub-dates-row");

    const startItem = el("span", "sub-date-item");
    startItem.innerHTML = `${t("startPrefix")} <strong>${formatDate(sub.startDate)}</strong>`;

    const endItem = el("span", "sub-date-item");
    endItem.innerHTML = `${t("endPrefix")} <strong>${formatDate(sub.endDate)}</strong>`;

    let daysLabelText = "";
    let daysClass = "";
    if (effectiveStatus === "cancelled") {
      daysLabelText = t("subCancelledText");
      daysClass = "is-muted";
    } else if (effectiveStatus === "paused") {
      daysLabelText = t("subPausedText");
      daysClass = "is-muted";
    } else if (daysLeft < 0) {
      const overdue = Math.abs(daysLeft);
      daysLabelText = currentLang === "en"
        ? `Expired ${overdue} ${formatDaysWord(overdue)} ago`
        : `Истекла ${overdue} ${formatDaysWord(overdue)} назад`;
      daysClass = "is-danger";
    } else if (daysLeft === 0) {
      daysLabelText = t("dueTodayText");
      daysClass = "is-warn";
    } else if (daysLeft <= 7) {
      daysLabelText = currentLang === "en"
        ? `${daysLeft} ${formatDaysWord(daysLeft)} left`
        : `Осталось ${daysLeft} ${formatDaysWord(daysLeft)}`;
      daysClass = "is-warn";
    } else {
      daysLabelText = currentLang === "en"
        ? `${daysLeft} ${formatDaysWord(daysLeft)} left`
        : `Осталось ${daysLeft} ${formatDaysWord(daysLeft)}`;
    }

    const daysLeftNode = el("span", `sub-days-left ${daysClass}`.trim(), daysLabelText);
    datesRow.append(startItem, endItem, daysLeftNode);

    const track = el("div", "progress-track");
    const bar = el("div", `progress-bar${effectiveStatus === "expiring" ? " is-warn" : effectiveStatus === "expired" ? " is-danger" : ""}`);
    bar.style.width = `${progress}%`;
    track.append(bar);
    periodBox.append(datesRow, track);

    // Footer row: status badge + CRUD actions
    const footer = el("div", "sub-card-footer");
    const badge = el("span", `status-badge ${effectiveStatus}`);
    const dot = el("span", `dot dot-${effectiveStatus}`);
    badge.append(dot, document.createTextNode(statusLabel(effectiveStatus)));

    const actions = el("div", "sub-actions");

    const renewBtn = el("button", "btn-renew");
    renewBtn.type = "button";
    renewBtn.innerHTML = `<svg viewBox="0 0 18 18" width="14" height="14" aria-hidden="true"><path d="M14.5 9a5.5 5.5 0 1 1-1.6-3.9M14.5 3.5v3h-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${t("btnRenew")}</span>`;
    renewBtn.addEventListener("click", () => renewSubscription(sub.id));

    const editBtn = el("button", "ghost", t("btnEdit"));
    editBtn.type = "button";
    editBtn.addEventListener("click", () => startEditSubscription(sub));

    const deleteBtn = el("button", "danger", t("btnDelete"));
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => askDeleteConfirmation(sub, card));

    actions.append(renewBtn, editBtn, deleteBtn);
    footer.append(badge, actions);

    card.append(top, periodBox, footer);
    return card;
  }

  function renderSubscriptionList() {
    const listHost = document.getElementById("subscription-list");
    const counts = {
      all: subscriptions.length,
      active: 0,
      expiring: 0,
      paused: 0,
      expired: 0,
      cancelled: 0
    };

    subscriptions.forEach(sub => {
      const st = resolveStatus(sub);
      if (counts[st] !== undefined) counts[st] += 1;
    });

    Object.entries(counts).forEach(([key, val]) => {
      const node = document.querySelector(`[data-count="${key}"]`);
      if (node) node.textContent = String(val);
    });

    const filtered = subscriptions.filter(sub => {
      const st = resolveStatus(sub);
      const statusOk = currentFilter === "all" || st === currentFilter;
      return statusOk && matchesSearch(sub, searchQuery);
    });

    const sorted = sortSubscriptions(filtered);
    const resultsBadge = document.getElementById("results-count");
    if (resultsBadge) {
      resultsBadge.textContent = formatSubsCount(sorted.length);
    }

    listHost.replaceChildren();
    if (!sorted.length) {
      const emptyBox = el("div", "empty");
      const isFiltered = Boolean(searchQuery || currentFilter !== "all");
      const title = el("strong", "", isFiltered ? t("emptyNotFoundTitle") : t("emptyListTitle"));
      const hint = el("p", "", isFiltered ? t("emptyNotFoundHint") : t("emptyListHint"));
      emptyBox.append(title, hint);
      listHost.append(emptyBox);
      return;
    }

    sorted.forEach(sub => {
      listHost.append(createSubscriptionCard(sub));
    });
  }

  // Stats & SVG Charts
  function renderStats() {
    const statsHost = document.getElementById("stats");
    const activeSubs = subscriptions.filter(sub => {
      const st = resolveStatus(sub);
      return st === "active" || st === "expiring";
    });
    const monthlyTotalUSD = activeSubs.reduce((sum, sub) => sum + toMonthlyUSD(sub), 0);
    const expiringSoon = subscriptions.filter(sub => resolveStatus(sub) === "expiring").length;
    const inactiveCount = subscriptions.filter(sub => {
      const st = resolveStatus(sub);
      return st === "expired" || st === "cancelled" || st === "paused";
    }).length;

    const cards = [
      {
        label: t("statActiveLabel"),
        value: String(activeSubs.length),
        sub: t("statActiveSub")(subscriptions.length),
        icon: `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      },
      {
        label: t("statMonthlyLabel"),
        value: formatMoney(monthlyTotalUSD, "USD"),
        sub: t("statMonthlySub")(formatMoney(monthlyTotalUSD * 12, "USD")),
        icon: `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 3v14M13.5 6.5c0-1.4-1.6-2.2-3.5-2.2s-3.5.8-3.5 2.2c0 2.8 7 1.8 7 4.8 0 1.5-1.6 2.4-3.5 2.4s-3.5-.9-3.5-2.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
      },
      {
        label: t("statExpiringLabel"),
        value: String(expiringSoon),
        sub: t("statExpiringSub"),
        icon: `<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 6.5v4l2.5 1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
      },
      {
        label: t("statInactiveLabel"),
        value: String(inactiveCount),
        sub: t("statInactiveSub"),
        icon: `<svg viewBox="0 0 20 20" width="18" height="18"><path d="M6 6l8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
      }
    ];

    statsHost.replaceChildren();
    cards.forEach(item => {
      const box = el("article", "stat");
      const top = el("div", "stat-top");
      const lbl = el("span", "stat-label", item.label);
      const icn = el("span", "stat-icon");
      icn.innerHTML = item.icon;
      top.append(lbl, icn);
      box.append(top, el("strong", "", item.value), el("span", "stat-sub", item.sub));
      statsHost.append(box);
    });
  }

  function chartPalette() {
    const isDark = document.documentElement.dataset.theme !== "light";
    return isDark
      ? {
          active: "#10b981",
          activeEnd: "#34d399",
          expiring: "#8b5cf6",
          expiringEnd: "#a78bfa",
          paused: "#475569",
          pausedEnd: "#64748b",
          expired: "#e11d48",
          expiredEnd: "#fb7185",
          cancelled: "#312e81",
          cancelledEnd: "#6366f1",
          rankGradients: [
            "linear-gradient(90deg, #059669 0%, #10b981 100%)",
            "linear-gradient(90deg, #6d28d9 0%, #8b5cf6 100%)",
            "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
            "linear-gradient(90deg, #4338ca 0%, #6366f1 100%)"
          ],
          rankGlows: [
            "rgba(16, 185, 129, 0.22)",
            "rgba(139, 92, 246, 0.22)",
            "rgba(20, 184, 166, 0.2)",
            "rgba(99, 102, 241, 0.2)"
          ]
        }
      : {
          active: "#059669",
          activeEnd: "#10b981",
          expiring: "#7c3aed",
          expiringEnd: "#8b5cf6",
          paused: "#64748b",
          pausedEnd: "#94a3b8",
          expired: "#be123c",
          expiredEnd: "#f43f5e",
          cancelled: "#4338ca",
          cancelledEnd: "#6366f1",
          rankGradients: [
            "linear-gradient(90deg, #047857 0%, #10b981 100%)",
            "linear-gradient(90deg, #6d28d9 0%, #8b5cf6 100%)",
            "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
            "linear-gradient(90deg, #3730a3 0%, #6366f1 100%)"
          ],
          rankGlows: [
            "rgba(5, 150, 105, 0.16)",
            "rgba(109, 40, 217, 0.16)",
            "rgba(15, 118, 110, 0.15)",
            "rgba(67, 56, 202, 0.15)"
          ]
        };
  }

  function svg(tag, attrs = {}) {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
    return node;
  }

  function gradient(defs, id, from, to, x1 = "0", y1 = "0", x2 = "1", y2 = "1") {
    const node = svg("linearGradient", { id, x1, y1, x2, y2 });
    node.append(svg("stop", { offset: "0%", "stop-color": from }));
    node.append(svg("stop", { offset: "100%", "stop-color": to }));
    defs.append(node);
  }

  function point(cx, cy, radius, angle) {
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  }

  function describeArc(cx, cy, radius, startAngle, endAngle) {
    const [x0, y0] = point(cx, cy, radius, startAngle);
    const [x1, y1] = point(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`;
  }

  function renderStatusChart() {
    const host = document.getElementById("chart-status");
    const colors = chartPalette();
    const statusOrder = ["active", "expiring", "paused", "expired", "cancelled"];
    const counts = statusOrder.map(key => ({
      key,
      label: statusLabel(key),
      color: colors[key],
      colorEnd: colors[`${key}End`],
      value: subscriptions.filter(sub => resolveStatus(sub) === key).length
    }));

    const total = counts.reduce((sum, item) => sum + item.value, 0);
    const picture = svg("svg", { viewBox: "0 0 240 240", role: "img" });
    picture.setAttribute("aria-label", counts.map(item => `${item.label}: ${item.value}`).join(", "));
    const defs = svg("defs");
    picture.append(defs);

    const cx = 120;
    const cy = 120;
    const outerRadius = 92;
    const innerRingRadius = 72;

    // Minimalist recessed track ring matching background
    picture.append(svg("circle", {
      cx,
      cy,
      r: outerRadius,
      fill: "none",
      stroke: "var(--field)",
      "stroke-width": 18
    }));
    picture.append(svg("circle", {
      cx,
      cy,
      r: outerRadius,
      fill: "none",
      stroke: "var(--line)",
      "stroke-width": 18,
      opacity: "0.45"
    }));

    // Subtle inner architectural hairline ring
    picture.append(svg("circle", {
      cx,
      cy,
      r: innerRingRadius,
      fill: "none",
      stroke: "var(--line)",
      "stroke-width": 1,
      opacity: "0.75"
    }));

    const segmentNodes = new Map();
    const legendNodes = new Map();

    // Center badge text elements (updated on hover)
    const centerVal = svg("text", {
      x: cx,
      y: cy - 2,
      "text-anchor": "middle",
      "font-size": 36,
      "font-weight": "700",
      "letter-spacing": "-0.03em",
      fill: "var(--ink)"
    });
    centerVal.textContent = String(total);

    const centerSub = svg("text", {
      x: cx,
      y: cy + 19,
      "text-anchor": "middle",
      "font-size": 10.5,
      "font-weight": "600",
      "letter-spacing": "0.1em",
      fill: "var(--muted)"
    });
    centerSub.textContent = formatCenterChartNoun(total);

    function highlightKey(activeKey) {
      if (!activeKey) {
        centerVal.textContent = String(total);
        centerSub.textContent = formatCenterChartNoun(total);
        segmentNodes.forEach(node => {
          node.style.opacity = "1";
        });
        legendNodes.forEach(node => {
          node.classList.remove("is-highlighted");
        });
        return;
      }

      const target = counts.find(item => item.key === activeKey);
      if (target) {
        const pct = total ? Math.round((target.value / total) * 100) : 0;
        centerVal.textContent = `${pct}%`;
        centerSub.textContent = target.label.toUpperCase();
      }
      segmentNodes.forEach((node, key) => {
        node.style.opacity = key === activeKey ? "1" : "0.28";
      });
      legendNodes.forEach((node, key) => {
        node.classList.toggle("is-highlighted", key === activeKey);
      });
    }

    const activeSlices = counts.filter(item => item.value > 0);
    if (activeSlices.length) {
      let currentAngle = -Math.PI / 2;
      const gap = activeSlices.length > 1 ? 0.045 : 0;

      activeSlices.forEach(item => {
        const rawSpan = (item.value / total) * Math.PI * 2;
        const span = Math.max(0.06, rawSpan - gap);
        const start = currentAngle + gap / 2;
        const end = start + span;
        currentAngle += rawSpan;

        const gradId = `donut-grad-${item.key}`;
        gradient(defs, gradId, item.color, item.colorEnd);

        const arcPath = activeSlices.length === 1
          ? describeArc(cx, cy, outerRadius, -Math.PI / 2, Math.PI * 1.499)
          : describeArc(cx, cy, outerRadius, start, end);

        const seg = svg("path", {
          d: arcPath,
          class: "donut-segment",
          fill: "none",
          stroke: `url(#${gradId})`,
          "stroke-width": 18,
          "stroke-linecap": "butt"
        });
        const tip = svg("title");
        tip.textContent = `${item.label}: ${item.value} (${Math.round((item.value / total) * 100)}%)`;
        seg.append(tip);

        seg.addEventListener("mouseenter", () => highlightKey(item.key));
        seg.addEventListener("mouseleave", () => highlightKey(null));

        segmentNodes.set(item.key, seg);
        picture.append(seg);
      });
    }

    picture.append(centerVal, centerSub);

    const legend = el("div", "legend");
    counts.forEach(item => {
      const row = el("div", `legend-item${item.value === 0 ? " is-empty" : ""}`);
      const swatch = el("span", "swatch");
      swatch.style.background = `linear-gradient(135deg, ${item.color}, ${item.colorEnd})`;
      const labelNode = el("span", "legend-label", item.label);
      const pct = total ? Math.round((item.value / total) * 100) : 0;
      const pctNode = el("span", "legend-pct", `${pct}%`);
      row.append(swatch, labelNode, pctNode, el("b", "", String(item.value)));

      row.addEventListener("mouseenter", () => highlightKey(item.key));
      row.addEventListener("mouseleave", () => highlightKey(null));

      legendNodes.set(item.key, row);
      legend.append(row);
    });

    const layout = el("div", "chart-layout");
    layout.append(picture, legend);
    host.replaceChildren(layout);
  }

  function renderCategoriesChart() {
    const host = document.getElementById("chart-categories");
    const colors = chartPalette();
    const activeSubs = subscriptions
      .filter(sub => {
        const st = resolveStatus(sub);
        return st === "active" || st === "expiring";
      })
      .map(sub => ({
        name: sub.name,
        iconKey: sub.iconKey,
        monthlyUSD: toMonthlyUSD(sub)
      }))
      .sort((a, b) => b.monthlyUSD - a.monthlyUSD);

    if (!activeSubs.length) {
      host.replaceChildren(el("p", "muted", t("noActiveExpenses")));
      return;
    }

    const totalMonthly = activeSubs.reduce((sum, s) => sum + s.monthlyUSD, 0) || 1;
    const topSubs = activeSubs.slice(0, 4);
    const max = Math.max(...topSubs.map(item => item.monthlyUSD), 1);

    const list = el("div", "rank-list");
    topSubs.forEach((item, idx) => {
      const row = el("div", "rank-row");
      const head = el("div", "rank-head");

      const service = el("div", "rank-service");
      const iconNode = el("span", "rank-icon");
      iconNode.innerHTML = getIcon(item.iconKey).svg;
      const nameNode = el("span", "rank-name", item.name);
      service.append(iconNode, nameNode);

      const sharePct = Math.round((item.monthlyUSD / totalMonthly) * 100);
      const meta = el("div", "rank-meta");
      meta.append(
        el("span", "rank-share", `${sharePct}%`),
        el("span", "rank-price", formatMoney(item.monthlyUSD, "USD"))
      );
      head.append(service, meta);

      const track = el("div", "rank-track");
      const fill = el("div", "rank-fill");
      const widthPct = Math.max(8, Math.round((item.monthlyUSD / max) * 100));
      fill.style.width = `${widthPct}%`;
      fill.style.background = colors.rankGradients[idx % colors.rankGradients.length];
      fill.style.boxShadow = `0 0 12px ${colors.rankGlows[idx % colors.rankGlows.length]}`;
      track.append(fill);

      row.append(head, track);
      list.append(row);
    });

    host.replaceChildren(list);
  }

  function renderTimelineChart() {
    const host = document.getElementById("chart-timeline");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyTotals = Array(daysInMonth).fill(0);
    const dailyNames = Array.from({ length: daysInMonth }, () => []);

    subscriptions.forEach(sub => {
      const st = resolveStatus(sub);
      if (st === "cancelled") return;
      const end = parseISO(sub.endDate);
      if (end.getFullYear() === year && end.getMonth() === month) {
        const dIdx = end.getDate() - 1;
        dailyTotals[dIdx] += toMonthlyUSD(sub);
        dailyNames[dIdx].push(sub.name);
      }
    });

    const locale = currentLang === "en" ? "en-US" : "ru-RU";
    const monthName = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(now);
    const monthTag = document.getElementById("month-chart-tag");
    if (monthTag) {
      monthTag.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    }

    const max = Math.max(...dailyTotals, 1);
    const slot = 24;
    const barWidth = 14;
    const baseline = 158;
    const chartHeight = 115;
    const width = 24 + daysInMonth * slot;

    const picture = svg("svg", { viewBox: `0 0 ${width} 196`, role: "img" });
    const defs = svg("defs");

    gradient(defs, "tl-neon-bar", "#10b981", "#059669", "0", "0", "0", "1");
    gradient(defs, "tl-neon-today", "#a78bfa", "#7c3aed", "0", "0", "0", "1");
    gradient(defs, "tl-area-fill", "rgba(16, 185, 129, 0.16)", "rgba(139, 92, 246, 0.0)", "0", "0", "0", "1");
    gradient(defs, "tl-line-stroke", "#10b981", "#8b5cf6", "0", "0", "1", "0");
    picture.append(defs);

    // Subtle horizontal grid lines
    [0.25, 0.5, 0.75, 1].forEach(level => {
      const y = baseline - level * chartHeight;
      picture.append(svg("line", {
        x1: 10,
        y1: y,
        x2: width - 10,
        y2: y,
        stroke: "var(--line)",
        "stroke-dasharray": "3 5",
        "stroke-width": 1,
        opacity: "0.55"
      }));
    });

    // Baseline
    picture.append(svg("line", {
      x1: 8,
      y1: baseline,
      x2: width - 8,
      y2: baseline,
      stroke: "var(--line-strong)",
      "stroke-width": 1.5
    }));

    // Build smooth wave curve through payment points
    const pts = dailyTotals.map((amount, idx) => {
      const x = 14 + idx * slot + barWidth / 2;
      const h = amount > 0 ? Math.max(24, (amount / max) * chartHeight) : 0;
      return { x, y: baseline - h, amount, idx };
    });

    if (pts.some(p => p.amount > 0)) {
      const dParts = [`M ${pts[0].x} ${pts[0].y}`];
      for (let i = 0; i < pts.length - 1; i += 1) {
        const curr = pts[i];
        const next = pts[i + 1];
        const midX = (curr.x + next.x) / 2;
        dParts.push(`C ${midX} ${curr.y}, ${midX} ${next.y}, ${next.x} ${next.y}`);
      }
      const linePath = dParts.join(" ");
      const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${baseline} L ${pts[0].x} ${baseline} Z`;

      picture.append(svg("path", { d: areaPath, fill: "url(#tl-area-fill)" }));
      picture.append(svg("path", {
        d: linePath,
        fill: "none",
        stroke: "url(#tl-line-stroke)",
        "stroke-width": 2.4,
        opacity: "0.8"
      }));
    }

    const monthList = MONTHS[currentLang] || MONTHS.ru;

    dailyTotals.forEach((amount, idx) => {
      const hasPayment = amount > 0;
      const height = hasPayment ? Math.max(24, (amount / max) * chartHeight) : 7;
      const x = 14 + idx * slot;
      const y = baseline - height;
      const isToday = idx + 1 === now.getDate();

      const fillUrl = isToday
        ? "url(#tl-neon-today)"
        : hasPayment
          ? "url(#tl-neon-bar)"
          : "var(--empty-bar)";

      const pill = svg("rect", {
        x,
        y,
        width: barWidth,
        height,
        rx: 7,
        fill: fillUrl,
        opacity: hasPayment || isToday ? "1" : "0.45"
      });

      if (hasPayment) {
        const tip = svg("title");
        const dayStr = currentLang === "en" ? `${monthList[month]} ${idx + 1}` : `${idx + 1} ${monthList[month]}`;
        tip.textContent = `${dayStr}: ${formatMoney(amount, "USD")} (${dailyNames[idx].join(", ")})`;
        pill.append(tip);
      }
      picture.append(pill);

      if (hasPayment) {
        picture.append(svg("circle", {
          cx: x + barWidth / 2,
          cy: y,
          r: 4,
          fill: isToday ? "#a78bfa" : "#10b981",
          stroke: "var(--paper)",
          "stroke-width": 1.8
        }));

        const topLabel = svg("text", {
          x: x + barWidth / 2,
          y: y - 10,
          "text-anchor": "middle",
          "font-size": 10.5,
          "font-weight": "700",
          fill: isToday ? "var(--violet-light)" : "var(--emerald-light)"
        });
        topLabel.textContent = `$${Math.round(amount)}`;
        picture.append(topLabel);
      }

      if (hasPayment || isToday || (idx + 1) % 4 === 0 || idx === 0) {
        const dayText = svg("text", {
          x: x + barWidth / 2,
          y: baseline + 22,
          "text-anchor": "middle",
          "font-size": 11,
          "font-weight": isToday || hasPayment ? "700" : "500",
          fill: isToday ? "var(--violet-light)" : hasPayment ? "var(--ink)" : "var(--muted)"
        });
        dayText.textContent = String(idx + 1);
        picture.append(dayText);
      }
    });

    host.replaceChildren(picture);
  }

  function renderAll() {
    applyStaticTranslations();
    renderIconPicker();
    renderStats();
    renderStatusChart();
    renderCategoriesChart();
    renderTimelineChart();
    renderSubscriptionList();
  }

  // Theme & Language Switchers
  function applyTheme(theme, redraw = true) {
    const validTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = validTheme;
    try {
      localStorage.setItem(THEME_KEY, validTheme);
    } catch {
      /* ignore */
    }
    document.querySelectorAll("[data-theme-choice]").forEach(btn => {
      const active = btn.dataset.themeChoice === validTheme;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    if (redraw) renderAll();
  }

  function applyLanguage(lang, redraw = true) {
    currentLang = lang === "en" ? "en" : "ru";
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch {
      /* ignore */
    }
    document.querySelectorAll("[data-lang-choice]").forEach(btn => {
      const active = btn.dataset.langChoice === currentLang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    if (redraw) renderAll();
  }

  function bindEvents() {
    // Theme switch
    const initialTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    applyTheme(initialTheme, false);
    document.querySelectorAll("[data-theme-choice]").forEach(btn => {
      btn.addEventListener("click", () => applyTheme(btn.dataset.themeChoice, true));
    });

    // Language switch (Russian default)
    applyLanguage(currentLang, false);
    document.querySelectorAll("[data-lang-choice]").forEach(btn => {
      btn.addEventListener("click", () => applyLanguage(btn.dataset.langChoice, true));
    });

    // Quick add button
    document.getElementById("quick-add-btn").addEventListener("click", () => {
      resetForm();
      const form = document.getElementById("subscription-form");
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("sub-name").focus();
    });

    // Toggle charts visibility
    const toggleChartsBtn = document.getElementById("toggle-charts-btn");
    const chartsContainer = document.getElementById("charts-container");
    try {
      if (localStorage.getItem(CHARTS_COLLAPSED_KEY) === "true") {
        chartsContainer.classList.add("is-collapsed");
        toggleChartsBtn.setAttribute("aria-expanded", "false");
      }
    } catch {
      /* ignore */
    }

    toggleChartsBtn.addEventListener("click", () => {
      const collapsed = chartsContainer.classList.toggle("is-collapsed");
      toggleChartsBtn.setAttribute("aria-expanded", String(!collapsed));
      document.getElementById("toggle-charts-text").textContent = collapsed ? t("showCharts") : t("hideCharts");
      try {
        localStorage.setItem(CHARTS_COLLAPSED_KEY, String(collapsed));
      } catch {
        /* ignore */
      }
    });

    // Name input -> auto detect icon
    const nameInput = document.getElementById("sub-name");
    nameInput.addEventListener("input", () => {
      if (!isManualIcon) {
        selectedIconKey = detectIconByName(nameInput.value);
        updateIconSelectionUI();
      }
    });

    // Period presets
    document.querySelectorAll("[data-preset-months]").forEach(btn => {
      btn.addEventListener("click", () => {
        const months = Number(btn.dataset.presetMonths) || 1;
        applyPeriodPreset(months);
      });
    });

    // Form submit & cancel
    document.getElementById("subscription-form").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancel-edit-btn").addEventListener("click", resetForm);

    // Search input
    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear");
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.trim();
      searchClear.hidden = !searchQuery;
      renderSubscriptionList();
    });
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      searchClear.hidden = true;
      searchInput.focus();
      renderSubscriptionList();
    });

    // Status filter chips
    document.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach(chip => {
          chip.classList.toggle("is-active", chip.dataset.filter === currentFilter);
        });
        renderSubscriptionList();
      });
    });

    // Sort select
    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value;
      renderSubscriptionList();
    });
  }

  initDefaultFormDates();
  bindEvents();
  renderAll();
})();
