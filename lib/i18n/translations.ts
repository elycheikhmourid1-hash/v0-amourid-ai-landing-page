import type { Locale } from "./config"

export type TranslationKey = keyof typeof en

const en = {
  // Brand
  "brand.name": "AICORE DIGITAL",
  "brand.tagline": "Next-Gen Robotics & AI Automation",
  "brand.foundedBy": "Founded by Ely Cheikh Mourid",
  "brand.founderCeo": "Ely Cheikh Mourid, Founder & CEO",
  
  // Navigation
  "nav.founder": "Founder",
  "nav.simulator": "Simulator",
  "nav.playground": "Playground",
  "nav.industries": "Industries",
  "nav.services": "Services",
  "nav.contact": "Contact",
  "nav.dashboard": "Operations Dashboard",
  
  // Hero
  "hero.badge": "Next-Gen Robotics & AI Automation",
  "hero.title1": "AICore",
  "hero.title2": "Digital",
  "hero.mainHeading": "See an autonomous AI agent think and act",
  "hero.subtitle": "Trigger a live demo and watch the agent reason, call tools, query data, and complete a real automation — exactly how our production agents operate.",
  "hero.cta.primary": "Free Consultation",
  "hero.cta.secondary": "Explore Solutions",
  
  // CTA
  "cta.freeConsultation": "Free Consultation",
  "cta.getStarted": "Get Started",
  "cta.learnMore": "Learn More",
  "cta.submit": "Submit",
  "cta.send": "Send Message",
  
  // Founder Section
  "founder.title": "Driving the",
  "founder.titleHighlight": "Vision",
  "founder.name": "Ely Cheikh Mourid",
  "founder.role": "Founder & CEO",
  "founder.description": "Pioneering the future of intelligent automation, bringing enterprise-grade AI solutions to businesses of all sizes.",
  "founder.playVideo": "Play Video",
  "founder.pauseVideo": "Pause Video",
  "founder.unmute": "Unmute",
  "founder.mute": "Mute",
  
  // Simulator
  "simulator.title": "AI Automation",
  "simulator.titleHighlight": "Simulator",
  "simulator.subtitle": "Describe any repetitive business task in plain language. Our AI instantly generates an optimized, enterprise-grade workflow—no coding required.",
  "simulator.placeholder": "e.g., Sync my CRM with Slack and update Google Sheets weekly...",
  "simulator.generate": "Generate Workflow",
  "simulator.generating": "Designing...",
  "simulator.tryExample": "Try an example:",
  "simulator.hoursSaved": "hrs saved / week",
  "simulator.monthlyRuns": "monthly task runs",
  "simulator.complexity": "complexity",
  
  // Industries
  "industries.title": "Tailored",
  "industries.titleHighlight": "Industry Playbooks",
  "industries.subtitle": "Watch real automation scenarios unfold. Select an industry to see how we orchestrate AI + integrations for maximum ROI.",
  "industries.result": "The result:",
  
  // Services
  "services.title": "What We",
  "services.titleHighlight": "Deliver",
  "services.subtitle": "End-to-end AI solutions designed for scale.",
  
  // Contact
  "contact.title": "Start Your",
  "contact.titleHighlight": "AI Journey",
  "contact.subtitle": "Tell us about your business challenges. We'll design a custom AI automation roadmap—free of charge.",
  "contact.form.firstName": "First Name",
  "contact.form.lastName": "Last Name",
  "contact.form.email": "Email",
  "contact.form.company": "Company",
  "contact.form.phone": "Phone",
  "contact.form.message": "How can we help?",
  "contact.form.success": "Thank you! We'll be in touch within 24 hours.",
  "contact.form.error": "Something went wrong. Please try again.",
  
  // Footer
  "footer.rights": "© 2026 AICORE DIGITAL. All rights reserved.",
  "footer.services": "Services",
  "footer.howWeWork": "How We Work",
  "footer.testimonials": "Testimonials",
  
  // Dashboard
  "dashboard.title": "Operations Dashboard",
  "dashboard.subtitle": "AICORE DIGITAL Control Center",
  "dashboard.backToSite": "Back to Site",
  "dashboard.status": "All Systems Operational",
  "dashboard.opsCenter": "Operations Control Center",
  
  // Dashboard Tabs
  "dashboard.tabs.pipeline": "Pipeline Flow",
  "dashboard.tabs.data": "Data & State",
  "dashboard.tabs.qa": "QA & Governance",
  "dashboard.tabs.clients": "Client Onboarding",
  
  // Pipeline Tab
  "dashboard.pipeline.title": "Live Ingestion Stream",
  "dashboard.pipeline.eventId": "Event ID",
  "dashboard.pipeline.source": "Source",
  "dashboard.pipeline.status": "Status",
  "dashboard.pipeline.latency": "Latency",
  "dashboard.pipeline.resilience": "3-Layer Resilience Matrix",
  "dashboard.pipeline.edgeCache": "Edge Cache",
  "dashboard.pipeline.loadBalancer": "Load Balancer",
  "dashboard.pipeline.failover": "Failover Cluster",
  "dashboard.pipeline.filters": "Active Filters",
  "dashboard.pipeline.webhooks": "Webhooks",
  "dashboard.pipeline.api": "API Calls",
  "dashboard.pipeline.scheduled": "Scheduled",
  
  // Data Tab
  "dashboard.data.tokenWindow": "Token Window Optimization",
  "dashboard.data.tokensUsed": "tokens used",
  "dashboard.data.sessionRecovery": "Session Recovery Matrix",
  "dashboard.data.sessionId": "Session ID",
  "dashboard.data.checkpoint": "Checkpoint",
  "dashboard.data.recovery": "Recovery",
  "dashboard.data.inspect": "Inspect",
  "dashboard.data.ssot": "SSOT Sync Status",
  "dashboard.data.database": "Database",
  "dashboard.data.cache": "Cache",
  "dashboard.data.search": "Search",
  "dashboard.data.analytics": "Analytics",
  
  // QA Tab
  "dashboard.qa.llmJudge": "LLM Judge Monitoring",
  "dashboard.qa.qualityScore": "Quality Score",
  "dashboard.qa.avgLatency": "Avg Latency",
  "dashboard.qa.passRate": "Pass Rate",
  "dashboard.qa.drift": "Drift Metrics",
  "dashboard.qa.semantic": "Semantic Drift",
  "dashboard.qa.responseLen": "Response Length",
  "dashboard.qa.toneShift": "Tone Shift",
  "dashboard.qa.hitl": "Human-in-the-Loop Intercept Gate",
  "dashboard.qa.flaggedFor": "Flagged for",
  "dashboard.qa.approve": "Approve",
  "dashboard.qa.reject": "Reject",
  
  // Clients Tab
  "dashboard.clients.profiling": "Client Profiling",
  "dashboard.clients.client": "Client",
  "dashboard.clients.tier": "Tier",
  "dashboard.clients.workflows": "Workflows",
  "dashboard.clients.compute": "Compute Resource Estimator",
  "dashboard.clients.vcpus": "vCPUs",
  "dashboard.clients.memory": "Memory",
  "dashboard.clients.storage": "Storage",
  "dashboard.clients.apiProvisioning": "Auto API Provisioning",
  "dashboard.clients.generateKeys": "Generate Keys",
  "dashboard.clients.keyGenerated": "Key Generated",
  
  // Status
  "status.active": "Active",
  "status.processing": "Processing",
  "status.queued": "Queued",
  "status.healthy": "Healthy",
  "status.synced": "Synced",
  "status.online": "Online",
  "status.stable": "Stable",
  "status.normal": "Normal",
  "status.review": "Manual Review",
  
  // Common
  "common.loading": "Loading...",
  "common.error": "Error",
  "common.success": "Success",
  "common.close": "Close",
  "common.open": "Open",
  "common.menu": "Menu",
} as const

const ar: Record<TranslationKey, string> = {
  // Brand
  "brand.name": "إيه آي كور ديجيتال",
  "brand.tagline": "الجيل القادم من الروبوتات وأتمتة الذكاء الاصطناعي",
  "brand.foundedBy": "تأسست بواسطة إيلي الشيخ مريد",
  "brand.founderCeo": "إيلي الشيخ مريد، المؤسس والرئيس التنفيذي",
  
  // Navigation
  "nav.founder": "المؤسس",
  "nav.simulator": "المحاكي",
  "nav.playground": "منطقة التجربة",
  "nav.industries": "القطاعات",
  "nav.services": "الخدمات",
  "nav.contact": "تواصل معنا",
  "nav.dashboard": "لوحة التحكم العملياتية",
  
  // Hero
  "hero.badge": "الجيل القادم من أتمتة الذكاء الاصطناعي والروبوتات",
  "hero.title1": "إيه آي كور",
  "hero.title2": "ديجيتال",
  "hero.mainHeading": "شاهد عميل الذكاء الاصطناعي المستقل يفكر ويتصرف لحظياً",
  "hero.subtitle": "قم بتشغيل العرض التجريبي الحي وشاهد العميل يحلل، ويستدعي الأدوات، ويستعلم عن البيانات، وينفذ أتمتة حقيقية — تماماً كما تعمل عملاؤنا في الإنتاج الحقيقي.",
  "hero.cta.primary": "استشارة مجانية",
  "hero.cta.secondary": "استكشف الحلول",
  
  // CTA
  "cta.freeConsultation": "استشارة مجانية",
  "cta.getStarted": "ابدأ الآن",
  "cta.learnMore": "اعرف المزيد",
  "cta.submit": "إرسال",
  "cta.send": "إرسال الرسالة",
  
  // Founder Section
  "founder.title": "قيادة",
  "founder.titleHighlight": "الرؤية",
  "founder.name": "إيلي الشيخ مريد",
  "founder.role": "المؤسس والرئيس التنفيذي",
  "founder.description": "رائد في مستقبل الأتمتة الذكية، يقدم حلول ذكاء اصطناعي بمستوى المؤسسات لجميع أحجام الأعمال.",
  "founder.playVideo": "تشغيل الفيديو",
  "founder.pauseVideo": "إيقاف الفيديو",
  "founder.unmute": "تشغيل الصوت",
  "founder.mute": "كتم الصوت",
  
  // Simulator
  "simulator.title": "محاكي",
  "simulator.titleHighlight": "أتمتة الذكاء الاصطناعي",
  "simulator.subtitle": "صف أي مهمة تجارية متكررة بلغة بسيطة. يقوم الذكاء الاصطناعي لدينا بإنشاء سير عمل محسّن فوراً—بدون برمجة.",
  "simulator.placeholder": "مثال: مزامنة CRM مع Slack وتحديث جداول Google أسبوعياً...",
  "simulator.generate": "إنشاء سير العمل",
  "simulator.generating": "جارٍ التصميم...",
  "simulator.tryExample": "جرب مثالاً:",
  "simulator.hoursSaved": "ساعة توفير / أسبوع",
  "simulator.monthlyRuns": "تشغيل شهري",
  "simulator.complexity": "التعقيد",
  
  // Industries
  "industries.title": "دليل",
  "industries.titleHighlight": "القطاعات المخصص",
  "industries.subtitle": "شاهد سيناريوهات الأتمتة الحقيقية. اختر قطاعاً لترى كيف ننظم الذكاء الاصطناعي + التكاملات لأقصى عائد.",
  "industries.result": "النتيجة:",
  
  // Services
  "services.title": "ما",
  "services.titleHighlight": "نقدمه",
  "services.subtitle": "حلول ذكاء اصطناعي شاملة مصممة للتوسع.",
  
  // Contact
  "contact.title": "ابدأ رحلتك",
  "contact.titleHighlight": "مع الذكاء الاصطناعي",
  "contact.subtitle": "أخبرنا عن تحديات عملك. سنصمم خارطة طريق مخصصة لأتمتة الذكاء الاصطناعي—مجاناً.",
  "contact.form.firstName": "الاسم الأول",
  "contact.form.lastName": "اسم العائلة",
  "contact.form.email": "البريد الإلكتروني",
  "contact.form.company": "الشركة",
  "contact.form.phone": "الهاتف",
  "contact.form.message": "كيف يمكننا مساعدتك؟",
  "contact.form.success": "شكراً لك! سنتواصل معك خلال 24 ساعة.",
  "contact.form.error": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  
  // Footer
  "footer.rights": "© 2026 إيه آي كور ديجيتال. جميع الحقوق محفوظة.",
  "footer.services": "الخدمات",
  "footer.howWeWork": "كيف نعمل",
  "footer.testimonials": "آراء العملاء",
  
  // Dashboard
  "dashboard.title": "لوحة التحكم العملياتية",
  "dashboard.subtitle": "مركز تحكم إيه آي كور ديجيتال",
  "dashboard.backToSite": "العودة للموقع",
  "dashboard.status": "جميع ال��نظمة تعمل",
  "dashboard.opsCenter": "مركز التحكم العملياتي",
  
  // Dashboard Tabs
  "dashboard.tabs.pipeline": "تدفق البيانات",
  "dashboard.tabs.data": "البيانات والحالة",
  "dashboard.tabs.qa": "الجودة والحوكمة",
  "dashboard.tabs.clients": "تسجيل العملاء",
  
  // Pipeline Tab
  "dashboard.pipeline.title": "تدفق البيانات اللحظي",
  "dashboard.pipeline.eventId": "معرف الحدث",
  "dashboard.pipeline.source": "المصدر",
  "dashboard.pipeline.status": "الحالة",
  "dashboard.pipeline.latency": "زمن الاستجابة",
  "dashboard.pipeline.resilience": "مصفوفة المرونة ثلاثية الطبقات",
  "dashboard.pipeline.edgeCache": "ذاكرة الحافة",
  "dashboard.pipeline.loadBalancer": "موازن الحمل",
  "dashboard.pipeline.failover": "مجموعة الاحتياط",
  "dashboard.pipeline.filters": "الفلاتر النشطة",
  "dashboard.pipeline.webhooks": "الويب هوكس",
  "dashboard.pipeline.api": "استدعاءات API",
  "dashboard.pipeline.scheduled": "المجدولة",
  
  // Data Tab
  "dashboard.data.tokenWindow": "تحسين نافذة التوكنات",
  "dashboard.data.tokensUsed": "توكن مستخدم",
  "dashboard.data.sessionRecovery": "مصفوفة استعادة الجلسات",
  "dashboard.data.sessionId": "معرف الجلسة",
  "dashboard.data.checkpoint": "نقطة الفحص",
  "dashboard.data.recovery": "الاستعادة",
  "dashboard.data.inspect": "فحص",
  "dashboard.data.ssot": "حالة مزامنة SSOT",
  "dashboard.data.database": "قاعدة البيانات",
  "dashboard.data.cache": "الذاكرة المؤقتة",
  "dashboard.data.search": "البحث",
  "dashboard.data.analytics": "التحليلات",
  
  // QA Tab
  "dashboard.qa.llmJudge": "مراقبة حكم LLM",
  "dashboard.qa.qualityScore": "درجة الجودة",
  "dashboard.qa.avgLatency": "متوسط زمن الاستجابة",
  "dashboard.qa.passRate": "معدل النجاح",
  "dashboard.qa.drift": "مقاييس الانحراف",
  "dashboard.qa.semantic": "الانحراف الدلالي",
  "dashboard.qa.responseLen": "طول الاستجابة",
  "dashboard.qa.toneShift": "تغير النبرة",
  "dashboard.qa.hitl": "بوابة التدخل البشري",
  "dashboard.qa.flaggedFor": "مُعلَّم لـ",
  "dashboard.qa.approve": "موافقة",
  "dashboard.qa.reject": "رفض",
  
  // Clients Tab
  "dashboard.clients.profiling": "ملفات العملاء",
  "dashboard.clients.client": "العميل",
  "dashboard.clients.tier": "المستوى",
  "dashboard.clients.workflows": "سير العمل",
  "dashboard.clients.compute": "مقدر موارد الحوسبة",
  "dashboard.clients.vcpus": "وحدات المعالجة",
  "dashboard.clients.memory": "الذاكرة",
  "dashboard.clients.storage": "التخزين",
  "dashboard.clients.apiProvisioning": "توفير API التلقائي",
  "dashboard.clients.generateKeys": "إنشاء المفاتيح",
  "dashboard.clients.keyGenerated": "تم إنشاء المفتاح",
  
  // Status
  "status.active": "نشط",
  "status.processing": "قيد المعالجة",
  "status.queued": "في الانتظار",
  "status.healthy": "سليم",
  "status.synced": "متزامن",
  "status.online": "متصل",
  "status.stable": "مستقر",
  "status.normal": "طبيعي",
  "status.review": "مراجعة يدوية",
  
  // Common
  "common.loading": "جارٍ التحميل...",
  "common.error": "خطأ",
  "common.success": "نجاح",
  "common.close": "إغلاق",
  "common.open": "فتح",
  "common.menu": "القائمة",
}

const fr: Record<TranslationKey, string> = {
  // Brand
  "brand.name": "AICORE DIGITAL",
  "brand.tagline": "Robotique et Automatisation IA de Nouvelle Génération",
  "brand.foundedBy": "Fondé par Ely Cheikh Mourid",
  "brand.founderCeo": "Ely Cheikh Mourid, Fondateur & PDG",
  
  // Navigation
  "nav.founder": "Fondateur",
  "nav.simulator": "Simulateur",
  "nav.playground": "Espace Test",
  "nav.industries": "Industries",
  "nav.services": "Services",
  "nav.contact": "Contact",
  "nav.dashboard": "Tableau de Bord Opérationnel",
  
  // Hero
  "hero.badge": "Robotique de nouvelle génération & automatisation IA",
  "hero.title1": "AICore",
  "hero.title2": "Digital",
  "hero.mainHeading": "Découvrez un agent IA autonome penser et agir",
  "hero.subtitle": "Déclenchez une démo en direct et regardez l'agent raisonner, appeler des outils, interroger des données et finaliser une automatisation réelle — exactement comme fonctionnent nos agents de production.",
  "hero.cta.primary": "Consultation Gratuite",
  "hero.cta.secondary": "Explorer les Solutions",
  
  // CTA
  "cta.freeConsultation": "Consultation Gratuite",
  "cta.getStarted": "Commencer",
  "cta.learnMore": "En Savoir Plus",
  "cta.submit": "Soumettre",
  "cta.send": "Envoyer le Message",
  
  // Founder Section
  "founder.title": "Porteur de",
  "founder.titleHighlight": "Vision",
  "founder.name": "Ely Cheikh Mourid",
  "founder.role": "Fondateur & PDG",
  "founder.description": "Pionnier de l'avenir de l'automatisation intelligente, apportant des solutions IA de niveau entreprise aux entreprises de toutes tailles.",
  "founder.playVideo": "Lire la Vidéo",
  "founder.pauseVideo": "Pause Vidéo",
  "founder.unmute": "Activer le Son",
  "founder.mute": "Couper le Son",
  
  // Simulator
  "simulator.title": "Simulateur",
  "simulator.titleHighlight": "d'Automatisation IA",
  "simulator.subtitle": "Décrivez toute tâche commerciale répétitive en langage simple. Notre IA génère instantanément un workflow optimisé—sans code requis.",
  "simulator.placeholder": "ex: Synchroniser mon CRM avec Slack et mettre à jour Google Sheets chaque semaine...",
  "simulator.generate": "Générer le Workflow",
  "simulator.generating": "Conception...",
  "simulator.tryExample": "Essayer un exemple:",
  "simulator.hoursSaved": "heures économisées / semaine",
  "simulator.monthlyRuns": "exécutions mensuelles",
  "simulator.complexity": "complexité",
  
  // Industries
  "industries.title": "Playbooks",
  "industries.titleHighlight": "Sectoriels Sur Mesure",
  "industries.subtitle": "Regardez des scénarios d'automatisation réels se dérouler. Sélectionnez une industrie pour voir comment nous orchestrons l'IA + les intégrations pour un ROI maximum.",
  "industries.result": "Le résultat:",
  
  // Services
  "services.title": "Ce Que Nous",
  "services.titleHighlight": "Offrons",
  "services.subtitle": "Solutions IA complètes conçues pour l'échelle.",
  
  // Contact
  "contact.title": "Commencez Votre",
  "contact.titleHighlight": "Parcours IA",
  "contact.subtitle": "Parlez-nous de vos défis commerciaux. Nous concevrons une feuille de route personnalisée d'automatisation IA—gratuitement.",
  "contact.form.firstName": "Prénom",
  "contact.form.lastName": "Nom",
  "contact.form.email": "Email",
  "contact.form.company": "Entreprise",
  "contact.form.phone": "Téléphone",
  "contact.form.message": "Comment pouvons-nous vous aider?",
  "contact.form.success": "Merci! Nous vous contacterons dans les 24 heures.",
  "contact.form.error": "Une erreur s'est produite. Veuillez réessayer.",
  
  // Footer
  "footer.rights": "© 2026 AICORE DIGITAL. Tous droits réservés.",
  "footer.services": "Services",
  "footer.howWeWork": "Notre Méthode",
  "footer.testimonials": "Témoignages",
  
  // Dashboard
  "dashboard.title": "Tableau de Bord Opérationnel",
  "dashboard.subtitle": "Centre de Contrôle AICORE DIGITAL",
  "dashboard.backToSite": "Retour au Site",
  "dashboard.status": "Tous les Systèmes Opérationnels",
  "dashboard.opsCenter": "Centre de Contrôle Opérationnel",
  
  // Dashboard Tabs
  "dashboard.tabs.pipeline": "Flux Pipeline",
  "dashboard.tabs.data": "Données & État",
  "dashboard.tabs.qa": "QA & Gouvernance",
  "dashboard.tabs.clients": "Intégration Clients",
  
  // Pipeline Tab
  "dashboard.pipeline.title": "Flux d'Ingestion en Direct",
  "dashboard.pipeline.eventId": "ID Événement",
  "dashboard.pipeline.source": "Source",
  "dashboard.pipeline.status": "Statut",
  "dashboard.pipeline.latency": "Latence",
  "dashboard.pipeline.resilience": "Matrice de Résilience 3 Couches",
  "dashboard.pipeline.edgeCache": "Cache Edge",
  "dashboard.pipeline.loadBalancer": "Équilibreur de Charge",
  "dashboard.pipeline.failover": "Cluster de Basculement",
  "dashboard.pipeline.filters": "Filtres Actifs",
  "dashboard.pipeline.webhooks": "Webhooks",
  "dashboard.pipeline.api": "Appels API",
  "dashboard.pipeline.scheduled": "Planifiés",
  
  // Data Tab
  "dashboard.data.tokenWindow": "Optimisation Fenêtre de Tokens",
  "dashboard.data.tokensUsed": "tokens utilisés",
  "dashboard.data.sessionRecovery": "Matrice de Récupération de Session",
  "dashboard.data.sessionId": "ID Session",
  "dashboard.data.checkpoint": "Point de Contrôle",
  "dashboard.data.recovery": "Récupération",
  "dashboard.data.inspect": "Inspecter",
  "dashboard.data.ssot": "Statut Sync SSOT",
  "dashboard.data.database": "Base de Données",
  "dashboard.data.cache": "Cache",
  "dashboard.data.search": "Recherche",
  "dashboard.data.analytics": "Analytique",
  
  // QA Tab
  "dashboard.qa.llmJudge": "Surveillance Juge LLM",
  "dashboard.qa.qualityScore": "Score Qualité",
  "dashboard.qa.avgLatency": "Latence Moy.",
  "dashboard.qa.passRate": "Taux de Réussite",
  "dashboard.qa.drift": "Métriques de Dérive",
  "dashboard.qa.semantic": "Dérive Sémantique",
  "dashboard.qa.responseLen": "Longueur Réponse",
  "dashboard.qa.toneShift": "Changement de Ton",
  "dashboard.qa.hitl": "Porte d'Interception Humaine",
  "dashboard.qa.flaggedFor": "Signalé pour",
  "dashboard.qa.approve": "Approuver",
  "dashboard.qa.reject": "Rejeter",
  
  // Clients Tab
  "dashboard.clients.profiling": "Profilage Clients",
  "dashboard.clients.client": "Client",
  "dashboard.clients.tier": "Niveau",
  "dashboard.clients.workflows": "Workflows",
  "dashboard.clients.compute": "Estimateur Ressources Calcul",
  "dashboard.clients.vcpus": "vCPUs",
  "dashboard.clients.memory": "Mémoire",
  "dashboard.clients.storage": "Stockage",
  "dashboard.clients.apiProvisioning": "Provisionnement API Auto",
  "dashboard.clients.generateKeys": "Générer les Clés",
  "dashboard.clients.keyGenerated": "Clé Générée",
  
  // Status
  "status.active": "Actif",
  "status.processing": "En Cours",
  "status.queued": "En File",
  "status.healthy": "Sain",
  "status.synced": "Synchronisé",
  "status.online": "En Ligne",
  "status.stable": "Stable",
  "status.normal": "Normal",
  "status.review": "Révision Manuelle",
  
  // Common
  "common.loading": "Chargement...",
  "common.error": "Erreur",
  "common.success": "Succès",
  "common.close": "Fermer",
  "common.open": "Ouvrir",
  "common.menu": "Menu",
}

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  ar,
  fr,
}

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] ?? translations.en[key] ?? key
}
