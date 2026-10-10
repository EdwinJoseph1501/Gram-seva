const form = document.querySelector("#complaint-form");
const locationForm = document.querySelector("#location-form");
const message = document.querySelector("#message");
const complaintList = document.querySelector("#complaint-list");
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeToggleIcon = document.querySelector("#theme-toggle-icon");
const themeToggleText = document.querySelector("#theme-toggle-text");
const languageSelect = document.querySelector("#language-select");

const stateSelect = document.querySelector("#state");
const districtSelect = document.querySelector("#district");
const blockInput = document.querySelector("#block");
const panchayatInput = document.querySelector("#panchayat");
const wardInput = document.querySelector("#ward");
const detectLocationBtn = document.querySelector("#detect-location-btn");
const locationStatus = document.querySelector("#location-status");
const langRecBadge = document.querySelector("#lang-rec-badge");

const photoInput = document.querySelector("#photo");
const photoPreviewContainer = document.querySelector("#photo-preview-container");
const photoPreviewImg = document.querySelector("#photo-preview-img");
const removePhotoBtn = document.querySelector("#remove-photo-btn");
let attachedPhotoData = null;

// Search, Filter & Backup Controls
const searchInput = document.querySelector("#search-input");
const filterStatus = document.querySelector("#filter-status");
const filterCategory = document.querySelector("#filter-category");
const clearFiltersBtn = document.querySelector("#clear-filters-btn");

const exportBackupBtn = document.querySelector("#export-backup-btn");
const importBackupTriggerBtn = document.querySelector("#import-backup-trigger-btn");
const importBackupInput = document.querySelector("#import-backup-input");
const backupStatus = document.querySelector("#backup-status");

// Modal Elements
const detailModal = document.querySelector("#complaint-detail-modal");
const closeDetailXBtn = document.querySelector("#close-detail-x-btn");
const closeDetailModalBtn = document.querySelector("#close-detail-modal-btn");
const modalDetailBody = document.querySelector("#modal-detail-body");

const confirmDeleteModal = document.querySelector("#confirm-delete-modal");
const closeDeleteXBtn = document.querySelector("#close-delete-x-btn");
const cancelDeleteBtn = document.querySelector("#cancel-delete-btn");
const executeDeleteBtn = document.querySelector("#execute-delete-btn");
const deleteModalTargetId = document.querySelector("#delete-modal-target-id");

let pendingDeleteId = null;
let deferredInstallPrompt = null;

const SUN_ICON = `<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>`;
const MOON_ICON = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"></path>`;

const STATE_LANGUAGE_MAP = {
  "Karnataka": "kn",
  "Uttar Pradesh": "hi",
  "Maharashtra": "mr",
  "Tamil Nadu": "ta",
  "Bihar": "hi",
  "Rajasthan": "hi",
  "West Bengal": "bn",
  "Telangana": "te",
  "Andhra Pradesh": "te",
  "Gujarat": "gu",
  "Madhya Pradesh": "hi",
  "Odisha": "hi",
  "Kerala": "ml",
  "Punjab": "pa"
};

const LANGUAGE_NAMES = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  kn: "ಕನ್ನಡ (Kannada)",
  te: "తెలుగు (Telugu)",
  ta: "தமிழ் (Tamil)",
  mr: "मराठी (Marathi)",
  bn: "বাংলা (Bengali)",
  gu: "ગુજરાતી (Gujarati)",
  ml: "മലയാളം (Malayalam)",
  pa: "ਪੰਜਾਬੀ (Punjabi)"
};

// Multilingual i18n Dictionary for Rural & Underprivileged Communities
const TRANSLATIONS = {
  en: {
    eyebrow: "COMMUNITY SERVICES",
    title: "Gram Seva",
    subtitle: "Report a local problem. Help improve your village.",
    locationTitle: "Village & Region Details",
    locationSub: "Set your state, district, block, and village ward.",
    formTitle: "Submit a complaint",
    formSub: "Your complaint will be saved on this device.",
    stateLabel: "State / UT",
    selectState: "Select State",
    districtLabel: "District",
    selectDistrict: "Select District",
    blockLabel: "Block / Taluk",
    panchayatLabel: "Gram Panchayat / Village",
    wardLabel: "Ward / Habitation number",
    langLabel: "Preferred Language",
    btnDetect: "Detect my location",
    nameLabel: "Your name",
    categoryLabel: "Complaint category",
    chooseCategory: "Choose a category",
    catWater: "Water supply & Tanker",
    catElectricity: "Street lights / Electricity",
    catRoad: "Road & Pathway damage",
    catWaste: "Sanitation & Waste management",
    catHealth: "Health center / Anganwadi",
    catAgriculture: "Irrigation & Canals",
    catOther: "Other village issue",
    descLabel: "Describe the problem",
    descPlaceholder: "Provide details (e.g. Broken handpump near primary school...)",
    photoLabel: "Attach Photo (Optional)",
    btnSubmit: "Submit complaint",
    listTitle: "Complaints on this device",
    noComplaints: "No complaints submitted yet.",
    footerText: "Gram Seva · Empowering Rural Communities",
    statusPending: "Pending",
    statusInProgress: "In Progress",
    statusResolved: "Resolved",
    savedMsg: "Complaint saved on this device. Waiting to sync.",
    errorMsg: "Could not save. Storage quota full or unavailable.",
    locDetecting: "Detecting location...",
    locSuccess: "Location detected via GPS!",
    locError: "Could not fetch GPS location. Please select manually.",
    recommendedFor: "Recommended language for",
    searchPlaceholder: "Search by ID, name, description, category, location...",
    filterStatus: "All Statuses",
    filterCategory: "All Categories",
    btnClearFilters: "Clear filters",
    viewDetails: "View Details",
    deleteComplaint: "Delete",
    detailTitle: "Complaint Details",
    submittedOn: "Submitted on",
    byComplainant: "By",
    gpsCoords: "GPS Coordinates",
    noGps: "GPS not attached",
    localStatusNotice: "Status managed locally on this device (Offline-first)",
    updateStatusLabel: "Status:",
    confirmDeleteTitle: "Delete Complaint",
    confirmDeleteMsg: "Are you sure you want to delete this complaint? This action cannot be undone.",
    btnConfirmDelete: "Yes, Delete",
    btnCancel: "Cancel",
    btnClose: "Close",
    backupTitle: "Backup & Restore Data",
    btnExportBackup: "Export Backup",
    btnImportBackup: "Import Backup",
    importSuccess: "Backup imported successfully!",
    importInvalid: "Invalid backup file structure or corrupted data.",
    importDuplicates: "Imported new records. Duplicate reference IDs skipped.",
    noSearchResults: "No complaints match your search or filter criteria.",
    statusOnline: "Online",
    statusOffline: "Offline Mode",
    btnInstallApp: "Install App",
    analyticsTitle: "Panchayat Analytics Dashboard",
    analyticsSub: "Grievance statistics calculated from local records on this device.",
    metricTotal: "Total Grievances",
    chartStatusTitle: "Status Breakdown",
    chartCategoryTitle: "Category Breakdown",
    analyticsDisclaimer: "Statistics for complaints stored on this device (Offline-first)",
    noAnalyticsData: "No complaints recorded yet."
  },
  hi: {
    eyebrow: "सामुदायिक सेवाएं",
    title: "ग्राम सेवा",
    subtitle: "स्थानीय समस्या दर्ज करें। अपने गांव को बेहतर बनाने में मदद करें।",
    locationTitle: "गांव व क्षेत्र विवरण",
    locationSub: "अपना राज्य, जिला, ब्लॉक और ग्राम पंचायत चुनें।",
    formTitle: "शिकायत दर्ज करें",
    formSub: "आपकी शिकायत इस डिवाइस पर सुरक्षित रहेगी।",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    selectState: "राज्य चुनें",
    districtLabel: "जिला",
    selectDistrict: "जिला चुनें",
    blockLabel: "ब्लॉक / तहसील",
    panchayatLabel: "ग्राम पंचायत / गांव",
    wardLabel: "वार्ड / माजरा संख्या",
    langLabel: "पसंदीदा भाषा",
    btnDetect: "मेरी लोकेशन पता करें",
    nameLabel: "आपका नाम",
    categoryLabel: "शिकायत की श्रेणी",
    chooseCategory: "श्रेणी चुनें",
    catWater: "पेयजल एवं टैंकर आपूर्ति",
    catElectricity: "स्ट्रीट लाइट / बिजली",
    catRoad: "सड़क व रास्ते की मरम्मत",
    catWaste: "सफाई व कचरा प्रबंधन",
    catHealth: "स्वास्थ्य केंद्र / आंगनवाड़ी",
    catAgriculture: "सिंचाई व नहर समस्या",
    catOther: "अन्य ग्रामीण समस्या",
    descLabel: "समस्या का विवरण दें",
    descPlaceholder: "विवरण लिखें (उदा. प्राथमिक विद्यालय के पास हैंडपंप खराब है...)",
    photoLabel: "फोटो संलग्न करें (वैकल्पिक)",
    btnSubmit: "शिकायत जमा करें",
    listTitle: "इस डिवाइस पर दर्ज शिकायतें",
    noComplaints: "अभी तक कोई शिकायत दर्ज नहीं की गई है।",
    footerText: "ग्राम सेवा · ग्रामीण सशक्तिकरण पहल",
    statusPending: "लंबित",
    statusInProgress: "प्रगति पर",
    statusResolved: "हल हो गया",
    savedMsg: "शिकायत इस डिवाइस पर सहेजी गई। सिंक की प्रतीक्षा में।",
    errorMsg: "सहेजा नहीं जा सका। कृपया स्टोरेज जांचें।",
    locDetecting: "लोकेशन खोजी जा रही है...",
    locSuccess: "GPS से लोकेशन प्राप्त हुई!",
    locError: "GPS लोकेशन नहीं मिली। मैन्युअल चुनें।",
    recommendedFor: "के लिए सुझाई गई भाषा",
    searchPlaceholder: "आईडी, नाम, विवरण, श्रेणी या स्थान से खोजें...",
    filterStatus: "सभी स्थितियां",
    filterCategory: "सभी श्रेणियां",
    btnClearFilters: "फ़िल्टर हटाएं",
    viewDetails: "विवरण देखें",
    deleteComplaint: "हटाएं",
    detailTitle: "शिकायत का विवरण",
    submittedOn: "दर्ज करने की तिथि",
    byComplainant: "शिकायतकर्ता",
    gpsCoords: "GPS निर्देशांक",
    noGps: "GPS उपलब्ध नहीं",
    localStatusNotice: "स्थिति इस डिवाइस पर स्थानीय रूप से प्रबंधित है",
    updateStatusLabel: "स्थिति:",
    confirmDeleteTitle: "शिकायत हटाएं",
    confirmDeleteMsg: "क्या आप वाकई इस शिकायत को हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।",
    btnConfirmDelete: "हाँ, हटाएं",
    btnCancel: "रद्द करें",
    btnClose: "बंद करें",
    backupTitle: "बैकअप और रीस्टोर",
    btnExportBackup: "बैकअप डाउनलोड करें",
    btnImportBackup: "बैकअप लोड करें",
    importSuccess: "बैकअप सफलतापूर्वक रीस्टोर हो गया!",
    importInvalid: "अमान्य बैकअप फ़ाइल प्रारूप।",
    importDuplicates: "नए रिकॉर्ड लोड हुए। दोहराई गई शिकायतें छोड़ दी गईं।",
    noSearchResults: "आपकी खोज या फ़िल्टर से कोई शिकायत नहीं मिली।",
    statusOnline: "ऑनलाइन",
    statusOffline: "ऑफलाइन मोड",
    btnInstallApp: "ऐप इंस्टॉल करें",
    analyticsTitle: "पंचायत विश्लेषण डैशबोर्ड",
    analyticsSub: "इस डिवाइस पर सहेजे गए आंकड़ों का विश्लेषण।",
    metricTotal: "कुल शिकायतें",
    chartStatusTitle: "स्थिति विभाजन",
    chartCategoryTitle: "श्रेणी विभाजन",
    analyticsDisclaimer: "आंकड़े इस डिवाइस पर सुरक्षित शिकायतों पर आधारित हैं",
    noAnalyticsData: "अभी कोई शिकायत दर्ज नहीं है।"
  },
  kn: {
    eyebrow: "ಸಮುದಾಯ ಸೇವೆಗಳು",
    title: "ಗ್ರಾಮ ಸೇವಾ",
    subtitle: "ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ. ನಿಮ್ಮ ಗ್ರಾಮದ ಅಭಿವೃದ್ಧಿಗೆ ನೆರವಾಗಿ.",
    locationTitle: "ಗ್ರಾಮ ಮತ್ತು ಪ್ರದೇಶದ ವಿವರಗಳು",
    locationSub: "ನಿಮ್ಮ ರಾಜ್ಯ, ಜಿಲ್ಲೆ, ತಾಲ್ಲೂಕು ಮತ್ತು ಗ್ರಾಮ ಪಂಚಾಯತಿ ಆಯ್ಕೆಮಾಡಿ.",
    formTitle: "ದೂರು ಸಲ್ಲಿಸಿ",
    formSub: "ನಿಮ್ಮ ದೂರನ್ನು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ.",
    stateLabel: "ರಾಜ್ಯ",
    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    districtLabel: "ಜಿಲ್ಲೆ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    blockLabel: "ತಾಲ್ಲೂಕು / ಬ್ಲಾಕ್",
    panchayatLabel: "ಗ್ರಾಮ ಪಂಚಾಯತಿ / ಗ್ರಾಮ",
    wardLabel: "ವಾರ್ಡ್ / ಮಜರೆ ಸಂಖ್ಯೆ",
    langLabel: "ಆದ್ಯತೆಯ ಭಾಷೆ",
    btnDetect: "ನನ್ನ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಿ",
    nameLabel: "ನಿಮ್ಮ ಹೆಸರು",
    categoryLabel: "ದೂರಿನ ವರ್ಗ",
    chooseCategory: "ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    catWater: "ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಟ್ಯಾಂಕರ್",
    catElectricity: "ಬೀದಿ ದೀಪ / ವಿದ್ಯುತ್",
    catRoad: "ರಸ್ತೆ ದುರಸ್ತಿ",
    catWaste: "ಸ್ವಚ್ಛತೆ ಮತ್ತು ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
    catHealth: "ಆರೋಗ್ಯ ಕೇಂದ್ರ / ಅಂಗನವಾಡಿ",
    catAgriculture: "ನೀರಾವರಿ ಮತ್ತು ಕಾಲುವೆ",
    catOther: "ಇತರ ಗ್ರಾಮ ಸಮಸ್ಯೆ",
    descLabel: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ಬರೆಯಿರಿ",
    descPlaceholder: "ವಿವರ ನೀಡಿ (ಉದಾ: ಶಾಲೆಯ ಬಳಿ ಹ್ಯಾಂಡ್‌ಪಂಪ್ ಕೆಟ್ಟಿದೆ...)",
    photoLabel: "ಫೋಟೋ ಲಗತ್ತಿಸಿ (ಐಚ್ಛಿಕ)",
    btnSubmit: "ದೂರು ಸಲ್ಲಿಸಿ",
    listTitle: "ಈ ಸಾಧನದಲ್ಲಿರುವ ದೂರುಗಳು",
    noComplaints: "ಇನ್ನೂ ಯಾವುದೇ ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸಿಲ್ಲ.",
    footerText: "ಗ್ರಾಮ ಸೇವಾ · ಗ್ರಾಮೀಣ ಸಬಲೀಕರಣ ಯೋಜನೆ",
    statusPending: "ಬಾಕಿ ಇದೆ",
    statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    statusResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
    savedMsg: "ದೂರು ಉಳಿಸಲಾಗಿದೆ. ಸಿಂಕ್ ಮಾಡಲು ಕಾಯಲಾಗುತ್ತಿದೆ.",
    errorMsg: "ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಸಂಗ್ರಹಣೆ ಪರೀಕ್ಷಿಸಿ.",
    locDetecting: "ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    locSuccess: "GPS ಸ್ಥಳ ಯಶಸ್ವಿಯಾಗಿ ಲಭಿಸಿದೆ!",
    locError: "GPS ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಆಯ್ಕೆಮಾಡಿ.",
    recommendedFor: "ಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ಭಾಷೆ",
    searchPlaceholder: "ಐಡಿ, ಹೆಸರು, ವಿವರ ಅಥವಾ ಸ್ಥಳದ ಮೂಲಕ ಹುಡುಕಿ...",
    filterStatus: "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು",
    filterCategory: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    btnClearFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    viewDetails: "ವಿವರ ವೀಕ್ಷಿಸಿ",
    deleteComplaint: "ಅಳಿಸಿ",
    detailTitle: "ದೂರಿನ ವಿವರಗಳು",
    submittedOn: "ಸಲ್ಲಿಸಿದ ದಿನಾಂಕ",
    byComplainant: "ದೂರುದಾರ",
    gpsCoords: "GPS ನಿರ್ದೇಶಾಂಕಗಳು",
    noGps: "GPS ಲಭ್ಯವಿಲ್ಲ",
    localStatusNotice: "ಈ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ನಿರ್ವಹಿಸಲಾದ ಸ್ಥಿತಿ",
    updateStatusLabel: "ಸ್ಥಿತಿ:",
    confirmDeleteTitle: "ದೂರು ಅಳಿಸಿ",
    confirmDeleteMsg: "ನೀವು ಖಂಡಿತವಾಗಿ ಈ ದೂರನ್ನು ಅಳಿಸಲು ಬಯಸುತ್ತೀರಾ? ಇದನ್ನು ಹಿಂತಿರುಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    btnConfirmDelete: "ಹೌದು, ಅಳಿಸಿ",
    btnCancel: "ರದ್ದುಮಾಡಿ",
    btnClose: "ಮುಚ್ಚಿ",
    backupTitle: "ಬ್ಯಾಕಪ್ ಮತ್ತು ಮರುಸ್ಥಾಪನೆ",
    btnExportBackup: "ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    btnImportBackup: "ಬ್ಯಾಕಪ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    importSuccess: "ಬ್ಯಾಕಪ್ ಯಶಸ್ವಿಯಾಗಿ ಆಮದು ಮಾಡಿಕೊಳ್ಳಲಾಗಿದೆ!",
    importInvalid: "ಅಸಿಂಧು ಬ್ಯಾಕಪ್ ಫೈಲ್ ಸ್ವರೂಪ.",
    importDuplicates: "ಪುನರಾವರ್ತಿತ ದೂರುಗಳನ್ನು ಬಿಟ್ಟುಬಿಡಲಾಗಿದೆ.",
    noSearchResults: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ದೂರುಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    statusOnline: "ಆನ್‌ಲೈನ್",
    statusOffline: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    btnInstallApp: "ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ",
    analyticsTitle: "ಪಂಚಾಯತ್ ವಿಶ್ಲೇಷಣೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    analyticsSub: "ಈ ಸಾಧನದಲ್ಲಿ ಸಂಗ್ರಹವಾಗಿರುವ ದೂರುಗಳ ವಿವರ",
    metricTotal: "ಒಟ್ಟು ದೂರುಗಳು",
    chartStatusTitle: "ಸ್ಥಿತಿಯ ಹಂಚಿಕೆ",
    chartCategoryTitle: "ವರ್ಗವಾರು ಹಂಚಿಕೆ",
    analyticsDisclaimer: "ಈ ಸಾಧನದಲ್ಲಿರುವ ದೂರುಗಳ ಆಧಾರಿತ ಮಾಹಿತಿ",
    noAnalyticsData: "ಯಾವುದೇ ದೂರುಗಳು ಇಲ್ಲ."
  },
  te: {
    eyebrow: "సముదాయ సేవలు",
    title: "గ్రామ సేవ",
    subtitle: "స్థానిక సమస్యను నివేదించండి. మీ గ్రామాభివృద్ధికి తోడ్పడండి.",
    locationTitle: "గ్రామ మరియు ప్రాంత వివరాలు",
    locationSub: "మీ రాష్ట్రం, జిల్లా, మండలం మరియు గ్రామాన్ని ఎంచుకోండి.",
    formTitle: "ఫిర్యాదు చేయండి",
    formSub: "మీ ఫిర్యాదు ఈ పరికరంలో భద్రపరచబడుతుంది.",
    stateLabel: "రాష్ట్రం",
    selectState: "రాష్ట్రం ఎంచుకోండి",
    districtLabel: "జిల్లా",
    selectDistrict: "జిల్లా ఎంచుకోండి",
    blockLabel: "మండలం / బ్లాక్",
    panchayatLabel: "గ్రామ పంచాయితీ / గ్రామం",
    wardLabel: "వార్డు సంఖ్య",
    langLabel: "అభిమత భాష",
    btnDetect: "నా స్థానాన్ని గుర్తించు",
    nameLabel: "మీ పేరు",
    categoryLabel: "ఫిర్యాదు విభాగం",
    chooseCategory: "విభాగం ఎంచుకోండి",
    catWater: "మంచినీటి సరఫరా",
    catElectricity: "వీధి దీపాలు / విద్యుత్",
    catRoad: "రహదారి సమస్యలు",
    catWaste: "పరిశుభ్రత & చెత్త నిర్వహణ",
    catHealth: "ఆరోగ్య కేంద్రం / అంగన్వాడీ",
    catAgriculture: "సాగునీరు & కాలువలు",
    catOther: "ఇతర గ్రామ సమస్యలు",
    descLabel: "సమస్య వివరాలు నమోదు చేయండి",
    descPlaceholder: "వివరాలు రాయండి...",
    photoLabel: "ఫోటో జత చేయండి (ఐచ్ఛికం)",
    btnSubmit: "ఫిర్యాదు సమర్పించండి",
    listTitle: "ఈ పరికరంలోని ఫిర్యాదులు",
    noComplaints: "ఇంకా ఫిర్యాదులేవీ నమోదు కాలేదు.",
    footerText: "గ్రామ సేవ · గ్రామీణ వికాస పథకం",
    statusPending: "పెండింగ్",
    statusInProgress: "ప్రగతిలో ఉంది",
    statusResolved: "పరిష్కరించబడింది",
    savedMsg: "ఫిర్యాదు భద్రపరచబడింది.",
    errorMsg: "సేవ్ చేయడం కుదరలేదు.",
    locDetecting: "స్థానం గుర్తిస్తున్నాము...",
    locSuccess: "GPS స్థానం గుర్తించబడింది!",
    locError: "GPS గుర్తించలేకపోయాము.",
    recommendedFor: "కొరకు సిఫార్సు చేసిన భాష",
    searchPlaceholder: "ఐడీ, పేరు, వివరాలు లేదా ప్రాంతం ద్వారా వెతకండి...",
    filterStatus: "అన్ని స్థితులు",
    filterCategory: "అన్ని విభాగాలు",
    btnClearFilters: "ఫిల్టర్లు తొలగించు",
    viewDetails: "వివరాలు చూడండి",
    deleteComplaint: "తొలగించు",
    detailTitle: "ఫిర్యాదు వివరాలు",
    submittedOn: "సమర్పించిన తేదీ",
    byComplainant: "ఫిర్యాదుదారు",
    gpsCoords: "GPS కోఆర్డినేట్లు",
    noGps: "GPS అందుబాటులో లేదు",
    localStatusNotice: "ఈ పరికరంలో స్థానికంగా నిర్వహించబడుతున్న స్థితి",
    updateStatusLabel: "స్థితి:",
    confirmDeleteTitle: "ఫిర్యాదు తొలగించు",
    confirmDeleteMsg: "మీరు ఖచ్చితంగా ఈ ఫిర్యాదును తొలగించాలనుకుంటున్నారా? దీనిని పునరుద్ధరించలేము.",
    btnConfirmDelete: "అవును, తొలగించు",
    btnCancel: "రద్దు చేయి",
    btnClose: "మూసివేయి",
    backupTitle: "బ్యాకప్ & పునరుద్ధరణ",
    btnExportBackup: "బ్యాకప్ ఎగుమతి",
    btnImportBackup: "బ్యాకప్ దిగుమతి",
    importSuccess: "బ్యాకప్ విజయవంతంగా దిగుమతి చేయబడింది!",
    importInvalid: "చెల్లని బ్యాకప్ ఫైల్ ఫార్మాట్.",
    importDuplicates: "పునరావృత ఫిర్యాదులు దాటవేయబడ్డాయి.",
    noSearchResults: "మీ శోధనకు తగిన ఫిర్యాదులు లభించలేదు.",
    statusOnline: "ఆన్‌లైన్",
    statusOffline: "ఆఫ్‌లైన్ మోడ్",
    btnInstallApp: "యాప్ ఇన్‌స్టాల్ చేయండి",
    analyticsTitle: "పంచాయతీ విశ్లేషణల డాష్‌బోర్డ్",
    analyticsSub: "ఈ పరికరంలోని ఫిర్యాదుల గణాంకాలు",
    metricTotal: "మొత్తం ఫిర్యాదులు",
    chartStatusTitle: "స్థితి విభజన",
    chartCategoryTitle: "విభాగాల వారీగా",
    analyticsDisclaimer: "ఈ పరికరంలోని ఫిర్యాదుల ఆధారిత సమాచారం",
    noAnalyticsData: "ఫిర్యాదులు ఏవీ లేవు."
  },
  ta: {
    eyebrow: "சமூக சேவைகள்",
    title: "கிராம சேவா",
    subtitle: "உள்ளூர் பிரச்சனையை பதிவு செய்யுங்கள். உங்கள் கிராமத்தை மேம்படுத்த உதவுங்கள்.",
    locationTitle: "கிராமம் மற்றும் பகுதி விவரங்கள்",
    locationSub: "உங்கள் மாநிலம், மாவட்டம், வட்டாரம் மற்றும் கிராமத்தை தேர்ந்தெடுக்கவும்.",
    formTitle: "புகார் அளிக்கவும்",
    formSub: "உங்கள் புகார் இந்த சாதனத்தில் சேமிக்கப்படும்.",
    stateLabel: "மாநிலம்",
    selectState: "மாநிலத்தை தேர்ந்தெடுக்கவும்",
    districtLabel: "மாவட்டம்",
    selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்",
    blockLabel: "வட்டாரம் / தாலுகா",
    panchayatLabel: "கிராம பஞ்சாயத்து / கிராமம்",
    wardLabel: "வார்டு எண்",
    langLabel: "விருப்பமான மொழி",
    btnDetect: "என் இருப்பிடத்தை கண்டறி",
    nameLabel: "உங்கள் பெயர்",
    categoryLabel: "புகார் பிரிவு",
    chooseCategory: "பிரிவை தேர்ந்தெடுக்கவும்",
    catWater: "குடிநீர் விநியோகம்",
    catElectricity: "தெரு விளக்கு / மின்சாரம்",
    catRoad: "சாலை பழுது",
    catWaste: "சுகாதாரம் & கழிவு மேலாண்மை",
    catHealth: "சுகாதார மையம் / அங்கன்வாடி",
    catAgriculture: "பாசனம் & கால்வாய்",
    catOther: "இதர கிராம பிரச்சனை",
    descLabel: "பிரச்சனையை விளக்கவும்",
    descPlaceholder: "விவரங்களை அளிக்கவும்...",
    photoLabel: "புகைப்படம் இணைக்கவும் (விருப்பமானது)",
    btnSubmit: "புகாரை சமர்ப்பிக்கவும்",
    listTitle: "இந்த சாதனத்தில் உள்ள புகார்கள்",
    noComplaints: "இன்னும் புகார்கள் எதுவும் சமர்ப்பிக்கப்படவில்லை.",
    footerText: "கிராம சேவா · கிராமப்புற மேம்பாட்டு திட்டம்",
    statusPending: "நிலுவையில் உள்ளது",
    statusInProgress: "செயல்பாட்டில் உள்ளது",
    statusResolved: "தீர்க்கப்பட்டது",
    savedMsg: "புகார் சேமிக்கப்பட்டது.",
    errorMsg: "சேமிக்க முடியவில்லை.",
    locDetecting: "இருப்பிடம் கண்டறியப்படுகிறது...",
    locSuccess: "GPS இருப்பிடம் கண்டறியப்பட்டது!",
    locError: "GPS இருப்பிடத்தைப் பெற முடியவில்லை.",
    recommendedFor: "பரிந்துரைக்கப்பட்ட மொழி",
    searchPlaceholder: "ஐடி, பெயர், விவரம் அல்லது இடம் மூலம் தேடுங்கள்...",
    filterStatus: "அனைத்து நிலைகளும்",
    filterCategory: "அனைத்து பிரிவுகளும்",
    btnClearFilters: "வடிகட்டிகளை நீக்கு",
    viewDetails: "விவரங்களை காண்க",
    deleteComplaint: "நீக்கு",
    detailTitle: "புகார் விவரங்கள்",
    submittedOn: "சமர்ப்பிக்கப்பட்ட தேதி",
    byComplainant: "புகார்தாரர்",
    gpsCoords: "GPS ஆயத்தொலைவுகள்",
    noGps: "GPS இணைக்கப்படவில்லை",
    localStatusNotice: "இந்த சாதனத்தில் உள்ளூர் ரீதியாக நிர்வகிக்கப்படும் நிலை",
    updateStatusLabel: "நிலை:",
    confirmDeleteTitle: "புகாரை நீக்கு",
    confirmDeleteMsg: "இந்த புகாரை நிச்சயமாக நீக்க விரும்புகிறீர்களா? இதை மீட்டெடுக்க முடியாது.",
    btnConfirmDelete: "ஆம், நீக்கு",
    btnCancel: "ரத்து செய்",
    btnClose: "மூடு",
    backupTitle: "காப்புப்பிரதி மற்றும் மீட்டமைப்பு",
    btnExportBackup: "காப்புப்பிரதி எடுக்கவும்",
    btnImportBackup: "காப்புப்பிரதி ஏற்றவும்",
    importSuccess: "காப்புப்பிரதி வெற்றிகரமாக இறக்குமதி செய்யப்பட்டது!",
    importInvalid: "செல்லாத காப்புப்பிரதி கோப்பு வடிவம்.",
    importDuplicates: "நகல் புகார்கள் தவிர்க்கப்பட்டன.",
    noSearchResults: "உங்கள் தேடலுக்கு ஏற்ற புகார்கள் எதுவும் இல்லை.",
    statusOnline: "ஆன்லைன்",
    statusOffline: "ஆஃப்லைன் முறை",
    btnInstallApp: "செயலியை நிறுவு",
    analyticsTitle: "பஞ்சாயத்து பகுப்பாய்வு டாஷ்போர்டு",
    analyticsSub: "இந்த சாதனத்தில் உள்ள புகார்களின் புள்ளிவிவரங்கள்",
    metricTotal: "மொத்த புகார்கள்",
    chartStatusTitle: "நிலை பகுப்பாய்வு",
    chartCategoryTitle: "பிரிவு பகுப்பாய்வு",
    analyticsDisclaimer: "இந்த சாதனத்தில் உள்ள புகார்களின் அடிப்படையிலான தகவல்",
    noAnalyticsData: "புகார்கள் எதுவும் இல்லை."
  },
  mr: {
    eyebrow: "समुदाय सेवा",
    title: "ग्राम सेवा",
    subtitle: "स्थानिक समस्येची नोंद करा. आपल्या गावाच्या विकासात मदत करा.",
    locationTitle: "गाव व क्षेत्राचा तपशील",
    locationSub: "आपले राज्य, जिल्हा, तालुका व ग्रामपंचायत निवडा.",
    formTitle: "तक्रार नोंदवा",
    formSub: "तुमची तक्रार या डिव्हाइसवर जतन केली जाईल.",
    stateLabel: "राज्य",
    selectState: "राज्य निवडा",
    districtLabel: "जिल्हा",
    selectDistrict: "जिल्हा निवडा",
    blockLabel: "तालुका / ब्लॉक",
    panchayatLabel: "ग्रामपंचायत / गाव",
    wardLabel: "वॉर्ड / वस्ती क्रमांक",
    langLabel: "पसंतीची भाषा",
    btnDetect: "माझे स्थान शोधा",
    nameLabel: "आपले नाव",
    categoryLabel: "तक्रारीचा प्रकार",
    chooseCategory: "प्रकार निवडा",
    catWater: "पिण्याचे पाणी व टँकर",
    catElectricity: "पथदिवे / वीज",
    catRoad: "रस्ता दुरुस्ती",
    catWaste: "स्वच्छता व कचरा व्यवस्थापन",
    catHealth: "आरोग्य केंद्र / अंगणवाडी",
    catAgriculture: "सिंचन व कालवा",
    catOther: "इतर ग्रामीण समस्या",
    descLabel: "समस्येचे वर्णन करा",
    descPlaceholder: "सविस्तर माहिती द्या...",
    photoLabel: "फोटो जोडा (पर्यायी)",
    btnSubmit: "तक्रार सबमिट करा",
    listTitle: "या डिव्हाइसवरील तक्रारी",
    noComplaints: "अद्याप कोणतीही तक्रार नोंदवली नाही.",
    footerText: "ग्राम सेवा · ग्रामीण सक्षमीकरण उपक्रम",
    statusPending: "प्रलंबित",
    statusInProgress: "प्रगतीपथावर",
    statusResolved: "सोडवले",
    savedMsg: "तक्रार जतन झाली.",
    errorMsg: "जतन करता आले नाही.",
    locDetecting: "स्थान शोधत आहे...",
    locSuccess: "GPS स्थान मिळाले!",
    locError: "GPS स्थान मिळू शकले नाही.",
    recommendedFor: "साठी सुचवलेली भाषा",
    searchPlaceholder: "आयडी, नाव, वर्णन किंवा स्थानानुसार शोधा...",
    filterStatus: "सर्व स्थिती",
    filterCategory: "सर्व प्रकार",
    btnClearFilters: "फिल्टर हटवा",
    viewDetails: "तपशील पहा",
    deleteComplaint: "हटवा",
    detailTitle: "तक्रारीचा तपशील",
    submittedOn: "सादर केल्याची तारीख",
    byComplainant: "तक्रारदार",
    gpsCoords: "GPS निर्देशांक",
    noGps: "GPS उपलब्ध नाही",
    localStatusNotice: "या डिव्हाइसवर स्थानिकरित्या व्यवस्थापित केलेली स्थिती",
    updateStatusLabel: "स्थिती:",
    confirmDeleteTitle: "तक्रार हटवा",
    confirmDeleteMsg: "तुम्हाला खरोखर ही तक्रार हटवायची आहे का? ही कारवाई पूर्ववत करता येणार नाही.",
    btnConfirmDelete: "होय, हटवा",
    btnCancel: "रद्द करा",
    btnClose: "बंद करा",
    backupTitle: "बॅकअप आणि पुनर्संचयित करा",
    btnExportBackup: "बॅकअप डाऊनलोड करा",
    btnImportBackup: "बॅकअप लोड करा",
    importSuccess: "बॅकअप यशस्वीरित्या आयात केला!",
    importInvalid: "अवैध बॅकअप फाइल फॉरमॅट.",
    importDuplicates: "दुप्पट तक्रारी वगळल्या.",
    noSearchResults: "तुमच्या शोधाशी जुळणाऱ्या तक्रारी सापडल्या नाहीत.",
    statusOnline: "ऑनलाइन",
    statusOffline: "ऑफलाइन मोड",
    btnInstallApp: "ॲप इंस्टॉल करा",
    analyticsTitle: "पंचायत विश्लेषण डॅशबोर्ड",
    analyticsSub: "या डिव्हाइसवरील तक्रारींची सांख्यिकी",
    metricTotal: "एकूण तक्रारी",
    chartStatusTitle: "स्थितीनुसार वर्गीकरण",
    chartCategoryTitle: "प्रकारानुसार वर्गीकरण",
    analyticsDisclaimer: "डिव्हाइसवरील तक्रारींवर आधारित आकडेवारी",
    noAnalyticsData: "कोणतीही तक्रार उपलब्ध नाही."
  },
  bn: {
    eyebrow: "কম্যুনিটি পরিষেবা",
    title: "গ্রাম সেবা",
    subtitle: "স্থানীয় সমস্যা জানান। আপনার গ্রামের উন্নয়নে সাহায্য করুন।",
    locationTitle: "গ্রাম ও অঞ্চলের তথ্য",
    locationSub: "আপনার রাজ্য, জেলা, ব্লক এবং গ্রাম পঞ্চায়েত নির্বাচন করুন।",
    formTitle: "অভিযোগ জমা দিন",
    formSub: "আপনার অভিযোগ এই ডিভাইসে সংরক্ষিত থাকবে।",
    stateLabel: "রাজ্য",
    selectState: "রাজ্য নির্বাচন করুন",
    districtLabel: "জেলা",
    selectDistrict: "জেলা নির্বাচন করুন",
    blockLabel: "ব্লক / পঞ্চায়েত সমিতি",
    panchayatLabel: "গ্রাম পঞ্চায়েত / গ্রাম",
    wardLabel: "ওয়ার্ড নম্বর",
    langLabel: "পছন্দের ভাষা",
    btnDetect: "আমার অবস্থান চিহ্নিত করুন",
    nameLabel: "আপনার নাম",
    categoryLabel: "অভিযোগের বিভাগ",
    chooseCategory: "বিভাগ বেছে নিন",
    catWater: "পানীয় জল সরবরাহ",
    catElectricity: "পথবাতি / বিদ্যুৎ",
    catRoad: "রাস্তা মেরামত",
    catWaste: "পরিচ্ছন্নতা ও বর্জ্য ব্যবস্থাপনা",
    catHealth: "স্বাস্থ্য কেন্দ্র / অঙ্গনওয়াড়ি",
    catAgriculture: "সেচ ও খাল সমস্যা",
    catOther: "অন্যান্য গ্রামীণ সমস্যা",
    descLabel: "সমস্যার বিবরণ দিন",
    descPlaceholder: "বিস্তারিত লিখুন...",
    photoLabel: "ছবি যুক্ত করুন (ঐচ্ছিক)",
    btnSubmit: "অভিযোগ জমা দিন",
    listTitle: "এই ডিভাইসে সংরক্ষিত অভিযোগ",
    noComplaints: "এখনও কোনও অভিযোগ জমা পড়েনি।",
    footerText: "গ্রাম সেবা · গ্রামীণ উন্নয়ন উদ্যোগ",
    statusPending: "পেন্ডিং",
    statusInProgress: "প্রক্রিয়াধীন",
    statusResolved: "মীমাংসিত",
    savedMsg: "অভিযোগ সংরক্ষিত হয়েছে।",
    errorMsg: "সংরক্ষণ করা যায়নি।",
    locDetecting: "অবস্থান খোঁজা হচ্ছে...",
    locSuccess: "GPS অবস্থান পাওয়া গেছে!",
    locError: "GPS অবস্থান পাওয়া যায়নি।",
    recommendedFor: "এর জন্য প্রস্তাবিত ভাষা",
    searchPlaceholder: "আইডি, নাম, বিবরণ বা অবস্থান দিয়ে খুঁজুন...",
    filterStatus: "সমস্ত অবস্থা",
    filterCategory: "সমস্ত বিভাগ",
    btnClearFilters: "ফিল্টার সরান",
    viewDetails: "বিস্তারিত দেখুন",
    deleteComplaint: "মুছে ফেলুন",
    detailTitle: "অভিযোগের বিস্তারিত",
    submittedOn: "জমা দেওয়ার তারিখ",
    byComplainant: "অভিযোগকারী",
    gpsCoords: "GPS স্থানাঙ্ক",
    noGps: "GPS যুক্ত করা হয়নি",
    localStatusNotice: "এই ডিভাইসে স্থানীয়ভাবে পরিচালিত স্ট্যাটাস",
    updateStatusLabel: "স্ট্যাটাস:",
    confirmDeleteTitle: "অভিযোগ মুছুন",
    confirmDeleteMsg: "আপনি কি নিশ্চিত যে আপনি এই অভিযোগটি মুছে ফেলতে চান? এটি পুনরুদ্ধার করা যাবে না।",
    btnConfirmDelete: "হ্যাঁ, মুছুন",
    btnCancel: "বাতিল করুন",
    btnClose: "বন্ধ করুন",
    backupTitle: "ব্যাকআপ এবং রিস্টোর",
    btnExportBackup: "ব্যাকআপ ডাউনলোড করুন",
    btnImportBackup: "ব্যাকআপ লোড করুন",
    importSuccess: "ব্যাকআপ সফলভাবে আমদানি করা হয়েছে!",
    importInvalid: "অকার্যকর ব্যাকআপ ফাইল বিন্যাস।",
    importDuplicates: "অনুরূপ অভিযোগগুলি বাদ দেওয়া হয়েছে।",
    noSearchResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো অভিযোগ পাওয়া যায়নি।",
    statusOnline: "অনলাইন",
    statusOffline: "অফলাইন মোড",
    btnInstallApp: "অ্যাপ ইনস্টল করুন",
    analyticsTitle: "পঞ্চায়েত বিশ্লেষণ ড্যাশবোর্ড",
    analyticsSub: "এই ডিভাইসে সংরক্ষিত অভিযোগের পরিসংখ্যান",
    metricTotal: "মোট অভিযোগ",
    chartStatusTitle: "অবস্থার বিন্যাস",
    chartCategoryTitle: "বিভাগীয় বিন্যাস",
    analyticsDisclaimer: "এই ডিভাইসের অভিযোগের উপর ভিত্তি করে তথ্য",
    noAnalyticsData: "কোনো অভিযোগ সংরক্ষিত নেই।"
  },
  gu: {
    eyebrow: "સમુદાય સેવાઓ",
    title: "ગ્રામ સેવા",
    subtitle: "સ્થાનિક સમસ્યાની નોંધણી કરો. તમારા ગામના વિકાસમાં મદદ કરો.",
    locationTitle: "ગામ અને વિસ્તારની વિગતો",
    locationSub: "તમારું રાજ્ય, જિલ્લો, તાલુકો અને ગ્રામ પંચાયત પસંદ કરો.",
    formTitle: "ફરિયાદ નોંધાવો",
    formSub: "તમારી ફરિયાદ આ ડિવાઇસ પર સાચવવામાં આવશે.",
    stateLabel: "રાજ્ય",
    selectState: "રાજ્ય પસંદ કરો",
    districtLabel: "જિલ્લો",
    selectDistrict: "જિલ્લો પસંદ કરો",
    blockLabel: "તાલુકો / બ્લોક",
    panchayatLabel: "ગ્રામ પંચાયત / ગામ",
    wardLabel: "વોર્ડ / પરાં નંબર",
    langLabel: "પસંદગીની ભાષા",
    btnDetect: "મારું સ્થાન શોધો",
    nameLabel: "તમારું નામ",
    categoryLabel: "ફરિયાદનો પ્રકાર",
    chooseCategory: "પ્રકાર પસંદ કરો",
    catWater: "પીવાનું પાણી અને ટેન્કર",
    catElectricity: "સ્ટ્રીટ લાઈટ / વીજળી",
    catRoad: "રસ્તા સમારકામ",
    catWaste: "સફાઈ અને કચરા વ્યવસ્થાપન",
    catHealth: "આરોગ્ય કેન્દ્ર / આંગણવાડી",
    catAgriculture: "સિંચાઈ અને કેનાલ",
    catOther: "અન્ય ગ્રામીણ સમસ્યા",
    descLabel: "સમસ્યાનું વર્ણન કરો",
    descPlaceholder: "વિગતો આપો...",
    photoLabel: "ફોટો સામેલ કરો (વૈકલ્પિક)",
    btnSubmit: "ફરિયાદ સબમિટ કરો",
    listTitle: "આ ડિવાઇસ પરની ફરિયાદો",
    noComplaints: "હજુ સુધી કોઈ ફરિયાદ નોંધાઈ નથી.",
    footerText: "ગ્રામ સેવા · ગ્રામીણ સશક્તિકરણ પહેલ",
    statusPending: "પેન્ડિંગ",
    statusInProgress: "પ્રગતિ હેઠળ",
    statusResolved: "ઉકેલાયેલ",
    savedMsg: "ફરિયાદ સાચવવામાં આવી.",
    errorMsg: "સાચવી શકાયું નથી.",
    locDetecting: "સ્થાન શોધી રહ્યું છે...",
    locSuccess: "GPS સ્થાન મળી ગયું!",
    locError: "GPS સ્થાન મળ્યું નથી.",
    recommendedFor: "માટે ભલામણ કરેલ ભાષા",
    searchPlaceholder: "આઈડી, નામ, વર્ણન અથવા સ્થાન દ્વારા શોધો...",
    filterStatus: "બધી સ્થિતિ",
    filterCategory: "બધા પ્રકારો",
    btnClearFilters: "ફિલ્ટર્સ દૂર કરો",
    viewDetails: "વિગતો જુઓ",
    deleteComplaint: "ડિલીટ કરો",
    detailTitle: "ફરિયાદની વિગતો",
    submittedOn: "સબમિટ કર્યાની તારીખ",
    byComplainant: "ફરિયાદી",
    gpsCoords: "GPS નિર્દેશાંક",
    noGps: "GPS ઉમેરેલ નથી",
    localStatusNotice: "આ ડિવાઇસ પર સ્થાનિક રીતે સંચાલિત સ્થિતિ",
    updateStatusLabel: "સ્થિતિ:",
    confirmDeleteTitle: "ફરિયાદ ડિલીટ કરો",
    confirmDeleteMsg: "શું તમે ખરેખર આ ફરિયાદ ડિલીટ કરવા માંગો છો? આ પાછું ખેંચી શકાશે નહીં.",
    btnConfirmDelete: "હા, ડિલીટ કરો",
    btnCancel: "રદ કરો",
    btnClose: "બંધ કરો",
    backupTitle: "બેકઅપ અને રીસ્ટોર",
    btnExportBackup: "બેકઅપ ડાઉનલોડ કરો",
    btnImportBackup: "બેકઅપ અપલોડ કરો",
    importSuccess: "બેકઅપ સફળતાપૂર્વક ઈમ્પોર્ટ થયું!",
    importInvalid: "અમાન્ય બેકઅપ ફાઇલો ફોર્મેટ.",
    importDuplicates: "ડુપ્લિકેટ ફરિયાદો છોડી દેવામાં આવી.",
    noSearchResults: "તમારી શોધ સાથે મેળ ખાતી કોઈ ફરિયાદ મળી નથી.",
    statusOnline: "ઓનલાઈન",
    statusOffline: "ઓફલાઈન મોડ",
    btnInstallApp: "એપ ઈન્સ્ટોલ કરો",
    analyticsTitle: "પંચાયત વિશ્લેષણ ડેશબોર્ડ",
    analyticsSub: "આ ડિવાઇસ પરની ફરિયાદોના આંકડા",
    metricTotal: "કુલ ફરિયાદો",
    chartStatusTitle: "સ્થિતિ મુજબ વર્ગીકરણ",
    chartCategoryTitle: "પ્રકાર મુજબ વર્ગીકરણ",
    analyticsDisclaimer: "ડિવાઇસ પર સાચવેલ ફરિયાદો આધારિત માહિતી",
    noAnalyticsData: "કોઈ ફરિયાદ સાચવેલ નથી."
  },
  ml: {
    eyebrow: "സാമൂഹിക സേവനങ്ങൾ",
    title: "ഗ്രാമ സേവ",
    subtitle: "പ്രാദേശിക പരാതികൾ സമർപ്പിക്കൂ. ഗ്രാമവികസനത്തിൽ പങ്കാളിയാകൂ.",
    locationTitle: "ഗ്രാമ വിവരങ്ങൾ",
    locationSub: "നിങ്ങളുടെ സംസ്ഥാനം, ജില്ല, ബ്ലോക്ക്, ഗ്രാമം എന്നിവ തിരഞ്ഞെടുക്കുക.",
    formTitle: "പരാതി നൽകുക",
    formSub: "നിങ്ങളുടെ പരാതി ഈ ഉപകരണത്തിൽ സൂക്ഷിക്കും.",
    stateLabel: "സംസ്ഥാനം",
    selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    districtLabel: "ജില്ല",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
    blockLabel: "ബ്ലോക്ക് / താലൂക്ക്",
    panchayatLabel: "ഗ്രാമപഞ്ചായത്ത് / ഗ്രാമം",
    wardLabel: "വാർഡ് നമ്പർ",
    langLabel: "ഇഷ്ടമുള്ള ഭാഷ",
    btnDetect: "എന്റെ സ്ഥാനം കണ്ടെത്തുക",
    nameLabel: "നിങ്ങളുടെ പേര്",
    categoryLabel: "പരാതി വിഭാഗം",
    chooseCategory: "വിഭാഗം തിരഞ്ഞെടുക്കുക",
    catWater: "കുടിവെള്ള വിതരണം",
    catElectricity: "തെരുവ് വിളക്ക് / വൈദ്യുതി",
    catRoad: "റോഡ് അറ്റകുറ്റപ്പണി",
    catWaste: "ശുചിത്വവും മാലിന്യ സംസ്കരണവും",
    catHealth: "ആരോഗ്യ കേന്ദ്രം / അങ്കണവാടി",
    catAgriculture: "ജലസേചനവും കനാലും",
    catOther: "മറ്റ് ഗ്രാമീണ വിഷയങ്ങൾ",
    descLabel: "പ്രശ്നം വിശദീകരിക്കുക",
    descPlaceholder: "വിശദാംശങ്ങൾ നൽകുക...",
    photoLabel: "ഫോട്ടോ ചേർക്കുക (ഓപ്ഷണൽ)",
    btnSubmit: "പരാതി സമർപ്പിക്കുക",
    listTitle: "ലഭിച്ച പരാതികൾ",
    noComplaints: "പരാതികളൊന്നും ലഭിച്ചിട്ടില്ല.",
    footerText: "ഗ്രാമ സേവ · ഗ്രാമീണ വികസന സംരംഭം",
    statusPending: "പെൻഡിങ്",
    statusInProgress: "നടപപടിയിൽ",
    statusResolved: "പരിഹരിച്ചു",
    savedMsg: "പരാതി രേഖപ്പെടുത്തി.",
    errorMsg: "സേവ് ചെയ്യാനായില്ല.",
    locDetecting: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",
    locSuccess: "GPS ലൊക്കേഷൻ ലഭിച്ചു!",
    locError: "GPS കണ്ടെത്താനായില്ല.",
    recommendedFor: "നിർദ്ദേശിച്ച ഭാഷ",
    searchPlaceholder: "ഐഡി, പേര്, വിവരങ്ങൾ, ലൊക്കേഷൻ എന്നിവ വഴി തിരയുക...",
    filterStatus: "എല്ലാ അവസ്ഥകളും",
    filterCategory: "എല്ലാ വിഭാഗങ്ങളും",
    btnClearFilters: "ഫിൽട്ടറുകൾ നീക്കുക",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    deleteComplaint: "നീക്കം ചെയ്യുക",
    detailTitle: "പരാതിയുടെ വിശദാംശങ്ങൾ",
    submittedOn: "സമർപ്പിച്ച തീയതി",
    byComplainant: "പരാതിക്കാരൻ",
    gpsCoords: "GPS വിവരങ്ങൾ",
    noGps: "GPS ലഭ്യമല്ല",
    localStatusNotice: "ഈ ഉപകരണത്തിൽ ലോക്കലായി കൈകാര്യം ചെയ്യുന്ന അവസ്ഥ",
    updateStatusLabel: "അവസ്ഥ:",
    confirmDeleteTitle: "പരാതി നീക്കം ചെയ്യുക",
    confirmDeleteMsg: "ഈ പരാതി നീക്കം ചെയ്യണമെന്ന് ഉറപ്പാണോ? ഇത് വീണ്ടെടുക്കാൻ കഴിയില്ല.",
    btnConfirmDelete: "അതെ, നീക്കം ചെയ്യുക",
    btnCancel: "റദ്ദാക്കുക",
    btnClose: "അടയ്ക്കുക",
    backupTitle: "ബാക്കപ്പും റീസ്റ്റോറും",
    btnExportBackup: "ബാക്കപ്പ് ഡൗൺലോഡ്",
    btnImportBackup: "ബാക്കപ്പ് അപ്‌ലോഡ്",
    importSuccess: "ബാക്കപ്പ് വിജയകരമായി ലഭിച്ചു!",
    importInvalid: "തെറ്റായ ബാക്കപ്പ് ഫയൽ രൂപം.",
    importDuplicates: "വീണ്ടും വന്ന പരാതികൾ ഒഴിവാക്കി.",
    noSearchResults: "തിരച്ചിലിന് അനുയോജ്യമായ പരാതികൾ ലഭ്യമല്ല.",
    statusOnline: "ഓൺലൈൻ",
    statusOffline: "ഓഫ്‌ലൈൻ മോഡ്",
    btnInstallApp: "ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക",
    analyticsTitle: "പഞ്ചായത്ത് വിശകലന ഡാഷ്‌ബോർഡ്",
    analyticsSub: "ഈ ഉപകരണത്തിലെ പരാതികളുടെ വിവരങ്ങൾ",
    metricTotal: "ആകെ പരാതികൾ",
    chartStatusTitle: "അവസ്ഥ അടിസ്ഥാനത്തിൽ",
    chartCategoryTitle: "വിഭാഗം അടിസ്ഥാനത്തിൽ",
    analyticsDisclaimer: "ഈ ഉപകരണത്തിലെ പരാതികളെ ആസ്പദമാക്കിയ വിവരങ്ങൾ",
    noAnalyticsData: "പരാതികളൊന്നും ലഭ്യമല്ല."
  },
  pa: {
    eyebrow: "ਸਮੁਦਾਇਕ ਸੇਵਾਵਾਂ",
    title: "ਗ੍ਰਾਮ ਸੇਵਾ",
    subtitle: "ਸਥਾਨਕ ਸਮੱਸਿਆ ਦਰਜ ਕਰੋ। ਆਪਣੇ ਪਿੰਡ ਦੇ ਵਿਕਾਸ ਵਿੱਚ ਮਦਦ ਕਰੋ।",
    locationTitle: "ਪਿੰਡ ਤੇ ਖੇਤਰ ਦਾ ਵੇਰਵਾ",
    locationSub: "ਆਪਣਾ ਰਾਜ, ਜ਼ਿਲ੍ਹਾ, ਬਲਾਕ ਅਤੇ ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਚੁਣੋ।",
    formTitle: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ",
    formSub: "ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਸੁਰੱਖਿਅਤ ਰਹੇਗੀ।",
    stateLabel: "ਰਾਜ / ਸੂਬਾ",
    selectState: "ਰਾਜ ਚੁਣੋ",
    districtLabel: "ਜ਼ਿਲ੍ਹਾ",
    selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    blockLabel: "ਬਲਾਕ / ਤਹਿਸੀਲ",
    panchayatLabel: "ਗ੍ਰਾਮ ਪੰਚਾਇਤ / ਪਿੰਡ",
    wardLabel: "ਵਾਰਡ / ਪਿੰਡ ਨੰਬਰ",
    langLabel: "ਤਰਜੀਹੀ ਭਾਸ਼ਾ",
    btnDetect: "ਮੇਰੀ ਲੋਕੇਸ਼ਨ ਲੱਭੋ",
    nameLabel: "ਤੁਹਾਡਾ ਨਾਮ",
    categoryLabel: "ਸ਼ਿਕਾਇਤ ਦੀ ਸ਼੍ਰੇਣੀ",
    chooseCategory: "ਸ਼੍ਰੇਣੀ ਚੁਣੋ",
    catWater: "ਪੀਣ ਵਾਲਾ ਪਾਣੀ ਤੇ ਟੈਂਕਰ",
    catElectricity: "ਸਟ੍ਰੀਟ ਲਾਈਟ / ਬਿਜਲੀ",
    catRoad: "ਸੜਕ ਦੀ ਮੁਰੰਮਤ",
    catWaste: "ਸਫ਼ਾਈ ਤੇ ਕੂੜਾ ਪ੍ਰਬੰਧਨ",
    catHealth: "ਸਿਹਤ ਕੇਂਦਰ / ਆਂਗਣਵਾੜੀ",
    catAgriculture: "ਸਿੰਚਾਈ ਤੇ ਨਹਿਰ ਸਮੱਸਿਆ",
    catOther: "ਹੋਰ ਪੇਂਡੂ ਸਮੱਸਿਆ",
    descLabel: "ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ ਦਿਓ",
    descPlaceholder: "ਵੇਰਵਾ ਲਿਖੋ...",
    photoLabel: "ਫੋਟੋ ਨੱਥੀ ਕਰੋ (ਵਿਕਲਪਿਕ)",
    btnSubmit: "ਸ਼ਿਕਾਇਤ ਜਮ੍ਹਾਂ ਕਰੋ",
    listTitle: "ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਦਰਜ ਸ਼ਿਕਾਇਤਾਂ",
    noComplaints: "ਅਜੇ ਤੱਕ ਕੋਈ ਸ਼ਿਕਾਇਤ ਦਰਜ ਨਹੀਂ ਹੋਈ।",
    footerText: "ਗ੍ਰਾਮ ਸੇਵਾ · ਪੇਂਡੂ ਵਿਕਾਸ ਪਹਿਲ",
    statusPending: "ਪੈਂਡਿੰਗ",
    statusInProgress: "ਕਾਰਵਾਈ ਅਧੀਨ",
    statusResolved: "ਹੱਲ ਹੋ ਗਿਆ",
    savedMsg: "ਸ਼ਿਕਾਇਤ ਸੁਰੱਖਿਅਤ ਹੋ ਗਈ।",
    errorMsg: "ਸੁਰੱਖਿਅਤ ਨਹੀਂ ਹੋ ਸਕੀ।",
    locDetecting: "ਲੋਕੇਸ਼ਨ ਲੱਭੀ ਜਾ ਰਹੀ ਹੈ...",
    locSuccess: "GPS ਲੋਕੇਸ਼ਨ ਮਿਲੀ!",
    locError: "GPS ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਮਿਲੀ।",
    recommendedFor: "ਲਈ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਭਾਸ਼ਾ",
    searchPlaceholder: "ਆਈਡੀ, ਨਾਮ, ਵੇਰਵਾ ਜਾਂ ਸਥਾਨ ਰਾਹੀਂ ਲੱਭੋ...",
    filterStatus: "ਸਾਰੀਆਂ ਸਥਿਤੀਆਂ",
    filterCategory: "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ",
    btnClearFilters: "ਫਿਲਟਰ ਹਟਾਓ",
    viewDetails: "ਵੇਰਵਾ ਦੇਖੋ",
    deleteComplaint: "ਹਟਾਓ",
    detailTitle: "ਸ਼ਿਕਾਇਤ ਦਾ ਵੇਰਵਾ",
    submittedOn: "ਦਰਜ ਕਰਨ ਦੀ ਮਿਤੀ",
    byComplainant: "ਸ਼ਿਕਾਇਤਕਰਤਾ",
    gpsCoords: "GPS ਨਿਰਦੇਸ਼ਾਂਕ",
    noGps: "GPS ਉਪਲਬਧ ਨਹੀਂ",
    localStatusNotice: "ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਪ੍ਰਬੰਧਿਤ ਸਥਿਤੀ",
    updateStatusLabel: "ਸਥਿਤੀ:",
    confirmDeleteTitle: "ਸ਼ਿਕਾਇਤ ਹਟਾਓ",
    confirmDeleteMsg: "ਕੀ ਤੁਸੀਂ ਯਕੀਨਨ ਇਸ ਸ਼ਿਕਾਇਤ ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਇਹ ਕਾਰਵਾਈ ਵਾਪਸ ਨਹੀਂ ਹੋ ਸਕਦੀ।",
    btnConfirmDelete: "ਹਾਂ, ਹਟਾਓ",
    btnCancel: "ਰੱਦ ਕਰੋ",
    btnClose: "ਬੰਦ ਕਰੋ",
    backupTitle: "ਬੈਕਅੱਪ ਅਤੇ ਰੀਸਟੋਰ",
    btnExportBackup: "ਬੈਕਅੱਪ ਡਾਊਨਲੋਡ ਕਰੋ",
    btnImportBackup: "ਬੈਕਅੱਪ ਲੋਡ ਕਰੋ",
    importSuccess: "ਬੈਕਅੱਪ ਸਫਲਤਾਪੂਰਵਕ ਇੰਪੋਰਟ ਹੋ ਗਿਆ!",
    importInvalid: "ਅਵੈਧ ਬੈਕਅੱਪ ਫਾਈਲ ਫਾਰਮੈਟ।",
    importDuplicates: "ਦੁਹਰਾਈਆਂ ਸ਼ਿਕਾਇਤਾਂ ਛੱਡ ਦਿੱਤੀਆਂ ਗਈਆਂ।",
    noSearchResults: "ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਕੋਈ ਸ਼ਿਕਾਇਤ ਨਹੀਂ ਮਿਲੀ।",
    statusOnline: "ਆਨਲਾਈਨ",
    statusOffline: "ਆਫਲਾਈਨ ਮੋਡ",
    btnInstallApp: "ਐਪ ਇੰਸਟਾਲ ਕਰੋ",
    analyticsTitle: "ਪੰਚਾਇਤ ਅੰਕੜੇ ਡੈਸ਼ਬੋਰਡ",
    analyticsSub: "ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਦਰਜ ਸ਼ਿਕਾਇਤਾਂ ਦੇ ਅੰਕੜੇ",
    metricTotal: "ਕੁੱਲ ਸ਼ਿਕਾਇਤਾਂ",
    chartStatusTitle: "ਸਥਿਤੀ ਮੁਤਾਬਕ",
    chartCategoryTitle: "ਸ਼੍ਰੇਣੀ ਮੁਤਾਬਕ",
    analyticsDisclaimer: "ਇਸ ਡਿਵਾਈਸ ਦੇ ਅੰਕੜੇ",
    noAnalyticsData: "ਕੋਈ ਸ਼ਿਕਾਇਤ ਦਰਜ ਨਹੀਂ।"
  }
};

// Regional Location Database (States & Districts for Rural Coverage)
const LOCATION_DATA = {
  "Karnataka": ["Mysuru", "Mandya", "Hassan", "Tumakuru", "Belagavi", "Kalaburagi", "Ballari", "Shivamogga", "Dakshina Kannada", "Dharwad", "Chitradurga", "Kolar"],
  "Uttar Pradesh": ["Varanasi", "Gorakhpur", "Prayagraj", "Ayodhya", "Jhansi", "Lucknow", "Bareilly", "Azamgarh", "Mirzapur", "Ambedkar Nagar"],
  "Maharashtra": ["Pune", "Nashik", "Nagpur", "Chhatrapati Sambhajinagar", "Satara", "Kolhapur", "Solapur", "Nanded", "Ahmednagar"],
  "Tamil Nadu": ["Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Thanjavur", "Tirunelveli", "Vellore", "Dharmapuri", "Erode"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Rohtas", "Samastipur", "Begusarai"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Nagaur", "Barmer", "Sikar"],
  "West Bengal": ["Purulia", "Bankura", "Birbhum", "Nadia", "Murshidabad", "Malda", "Hooghly", "Paschim Medinipur"],
  "Telangana": ["Warangal", "Karimnagar", "Khammam", "Nalgonda", "Nizamabad", "Mahabubnagar", "Medak"],
  "Andhra Pradesh": ["Guntur", "Vijayawada", "Kurnool", "Anantapur", "Kakinada", "Tirupati", "Kadapa", "Eluru"],
  "Gujarat": ["Rajkot", "Bhavnagar", "Junagadh", "Kheda", "Anand", "Mehsana", "Sabarkantha", "Banaskantha", "Dahod"],
  "Madhya Pradesh": ["Ujjain", "Rewa", "Chhindwara", "Sagar", "Vidisha", "Satna", "Dhar", "Khargone"],
  "Odisha": ["Cuttack", "Ganjam", "Puri", "Sambalpur", "Balasore", "Mayurbhanj", "Koraput", "Kalahandi"],
  "Kerala": ["Wayanad", "Palakkad", "Malappuram", "Idukki", "Kannur", "Kottayam", "Thrissur", "Kollam"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Bathinda", "Gurdaspur", "Hoshiarpur", "Sangrur", "Patiala"]
};

let currentLang = localStorage.getItem("gram-seva-lang") || "en";
let detectedGpsCoords = null;

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Silently catch registration error in unsupported origins
    });
  });
}

// Online / Offline Status Badge Indicator
function updateOnlineStatus() {
  const badge = document.querySelector("#online-status-badge");
  const text = document.querySelector("#online-status-text");
  if (!badge || !text) return;
  const isOnline = navigator.onLine;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  if (isOnline) {
    badge.className = "online-status-badge online";
    text.textContent = dict.statusOnline || "Online";
  } else {
    badge.className = "online-status-badge offline";
    text.textContent = dict.statusOffline || "Offline Mode";
  }
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

// PWA Install Button Handler
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const installBtn = document.querySelector("#pwa-install-btn");
  if (installBtn) {
    installBtn.style.display = "inline-flex";
  }
});

const installBtn = document.querySelector("#pwa-install-btn");
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === "accepted") {
      installBtn.style.display = "none";
    }
    deferredInstallPrompt = null;
  });
}

window.addEventListener("appinstalled", () => {
  const installBtn = document.querySelector("#pwa-install-btn");
  if (installBtn) installBtn.style.display = "none";
  deferredInstallPrompt = null;
});

// Image compression helper
function processAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

if (photoInput) {
  photoInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        attachedPhotoData = await processAndCompressImage(file);
        if (photoPreviewImg && photoPreviewContainer) {
          photoPreviewImg.src = attachedPhotoData;
          photoPreviewContainer.style.display = "inline-block";
        }
      } catch {
        attachedPhotoData = null;
      }
    }
  });
}

if (removePhotoBtn) {
  removePhotoBtn.addEventListener("click", () => {
    attachedPhotoData = null;
    if (photoInput) photoInput.value = "";
    if (photoPreviewContainer) photoPreviewContainer.style.display = "none";
    if (photoPreviewImg) photoPreviewImg.src = "";
  });
}

function saveLocationPreference() {
  if (!stateSelect) return;
  try {
    localStorage.setItem(
      "gram-seva-location",
      JSON.stringify({
        state: stateSelect.value || "",
        district: districtSelect ? districtSelect.value : "",
        block: blockInput ? blockInput.value.trim() : "",
        panchayat: panchayatInput ? panchayatInput.value.trim() : "",
        ward: wardInput ? wardInput.value.trim() : ""
      })
    );
  } catch {
    // Ignore storage issues
  }
}

function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "en";
  localStorage.setItem("gram-seva-lang", currentLang);
  document.documentElement.setAttribute("lang", currentLang);

  if (languageSelect) {
    languageSelect.value = currentLang;
  }

  const dict = TRANSLATIONS[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  if (stateSelect && stateSelect.value) {
    recommendLanguageForState(stateSelect.value);
  }

  updateOnlineStatus();
  renderComplaints();
}

function recommendLanguageForState(selectedState) {
  const recLangKey = STATE_LANGUAGE_MAP[selectedState];
  if (!recLangKey || recLangKey === currentLang) {
    if (langRecBadge) langRecBadge.style.display = "none";
    return;
  }

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const langName = LANGUAGE_NAMES[recLangKey] || recLangKey;

  if (langRecBadge) {
    langRecBadge.style.display = "flex";
    langRecBadge.innerHTML = `
      <span>💡 ${dict.recommendedFor || "Recommended language for"} <strong>${selectedState}</strong>: <strong>${langName}</strong></span>
      <button type="button" id="apply-rec-lang-btn" class="rec-apply-btn">Switch to ${langName}</button>
    `;

    const applyBtn = document.querySelector("#apply-rec-lang-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        applyLanguage(recLangKey);
        langRecBadge.style.display = "none";
      });
    }
  }
}

function initLocationPicker() {
  if (!stateSelect || !districtSelect) return;

  stateSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLang].selectState}</option>`;
  Object.keys(LOCATION_DATA).sort().forEach((stateName) => {
    const opt = document.createElement("option");
    opt.value = stateName;
    opt.textContent = stateName;
    stateSelect.appendChild(opt);
  });

  stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    districtSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLang].selectDistrict}</option>`;

    if (selectedState && LOCATION_DATA[selectedState]) {
      districtSelect.disabled = false;
      LOCATION_DATA[selectedState].forEach((distName) => {
        const opt = document.createElement("option");
        opt.value = distName;
        opt.textContent = distName;
        districtSelect.appendChild(opt);
      });
      const otherOpt = document.createElement("option");
      otherOpt.value = "Other";
      otherOpt.textContent = "Other District / Other";
      districtSelect.appendChild(otherOpt);

      recommendLanguageForState(selectedState);
    } else {
      districtSelect.disabled = true;
      if (langRecBadge) langRecBadge.style.display = "none";
    }
    saveLocationPreference();
  });

  if (districtSelect) districtSelect.addEventListener("change", saveLocationPreference);
  if (blockInput) blockInput.addEventListener("input", saveLocationPreference);
  if (panchayatInput) panchayatInput.addEventListener("input", saveLocationPreference);
  if (wardInput) wardInput.addEventListener("input", saveLocationPreference);

  try {
    const savedLoc = JSON.parse(localStorage.getItem("gram-seva-location") || "{}");
    if (savedLoc.state) {
      stateSelect.value = savedLoc.state;
      stateSelect.dispatchEvent(new Event("change"));
      if (savedLoc.district) districtSelect.value = savedLoc.district;
      if (savedLoc.block && blockInput) blockInput.value = savedLoc.block;
      if (savedLoc.panchayat && panchayatInput) panchayatInput.value = savedLoc.panchayat;
      if (savedLoc.ward && wardInput) wardInput.value = savedLoc.ward;
    }
  } catch {
    // Ignore invalid saved location
  }
}

function initGeolocation() {
  if (!detectLocationBtn || !locationStatus) return;

  detectLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      locationStatus.textContent = TRANSLATIONS[currentLang].locError;
      return;
    }

    locationStatus.textContent = TRANSLATIONS[currentLang].locDetecting;
    detectLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        detectLocationBtn.disabled = false;
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        detectedGpsCoords = { lat, lng };

        locationStatus.textContent = `${TRANSLATIONS[currentLang].locSuccess} (${lat}, ${lng})`;
      },
      () => {
        detectLocationBtn.disabled = false;
        locationStatus.textContent = TRANSLATIONS[currentLang].locError;
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

function updateThemeUI(theme) {
  if (!themeToggleBtn || !themeToggleIcon || !themeToggleText) return;

  if (theme === "dark") {
    themeToggleIcon.innerHTML = SUN_ICON;
    themeToggleText.textContent = "Light Mode";
    themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeToggleIcon.innerHTML = MOON_ICON;
    themeToggleText.textContent = "Dark Mode";
    themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
  }
}

function applyThemeChange(nextTheme) {
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("gram-seva-theme", nextTheme);
  updateThemeUI(nextTheme);
  updateAnalyticsDashboard();
}

function toggleTheme(event) {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    applyThemeChange(nextTheme);
    return;
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (event && typeof event.clientX === "number") {
    x = event.clientX;
    y = event.clientY;
  } else if (themeToggleBtn) {
    const rect = themeToggleBtn.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      applyThemeChange(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        { clipPath: clipPath },
        {
          duration: 550,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
    return;
  }

  const ripple = document.createElement("div");
  ripple.className = "theme-ripple-overlay";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  const nextBgColor = nextTheme === "dark" ? "#0a120d" : "#f6f7f2";
  ripple.style.background = nextBgColor;

  document.body.appendChild(ripple);
  ripple.getBoundingClientRect();

  const maxDiameter = endRadius * 2;
  ripple.style.width = `${maxDiameter}px`;
  ripple.style.height = `${maxDiameter}px`;
  ripple.style.transform = `translate(-50%, -50%) scale(1)`;

  setTimeout(() => {
    applyThemeChange(nextTheme);
    ripple.style.opacity = "0";
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }, 350);
}

function initTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("gram-seva-theme")) {
        const newTheme = e.matches ? "dark" : "light";
        applyThemeChange(newTheme);
      }
    });
}

let complaints = [];

try {
  complaints = JSON.parse(
    localStorage.getItem("gram-seva-complaints") || "[]"
  );
} catch {
  complaints = [];
}

function saveComplaints() {
  localStorage.setItem(
    "gram-seva-complaints",
    JSON.stringify(complaints)
  );
}

function getCategoryLabel(categoryKey) {
  const dict = TRANSLATIONS[currentLang];
  const map = {
    Water: dict.catWater,
    Electricity: dict.catElectricity,
    Road: dict.catRoad,
    Waste: dict.catWaste,
    Health: dict.catHealth,
    Agriculture: dict.catAgriculture,
    Other: dict.catOther
  };
  return map[categoryKey] || categoryKey;
}

function getStatusLabel(statusKey) {
  const dict = TRANSLATIONS[currentLang];
  if (statusKey === "In Progress") return dict.statusInProgress || "In Progress";
  if (statusKey === "Resolved") return dict.statusResolved || "Resolved";
  return dict.statusPending || "Pending";
}

function getStatusClass(statusKey) {
  if (statusKey === "In Progress") return "in-progress";
  if (statusKey === "Resolved") return "resolved";
  return "pending";
}

// Panchayat Analytics Dashboard Generator (Dependency-free Pure SVG Charts)
function updateAnalyticsDashboard() {
  const metricTotal = document.querySelector("#metric-total");
  const metricPending = document.querySelector("#metric-pending");
  const metricInProgress = document.querySelector("#metric-in-progress");
  const metricResolved = document.querySelector("#metric-resolved");
  const donutContainer = document.querySelector("#status-donut-container");
  const categoryBarsContainer = document.querySelector("#category-bars-container");

  if (!metricTotal) return;

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending" || !c.status).length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  metricTotal.textContent = total;
  metricPending.textContent = pending;
  metricInProgress.textContent = inProgress;
  metricResolved.textContent = resolved;

  // Render Pure SVG Donut Chart for Status Breakdown
  if (donutContainer) {
    if (total === 0) {
      donutContainer.innerHTML = `<p class="muted" style="font-size: 13px;">${dict.noAnalyticsData || "No complaints recorded yet."}</p>`;
    } else {
      const radius = 60;
      const strokeWidth = 18;
      const circumference = 2 * Math.PI * radius;

      const pPct = pending / total;
      const ipPct = inProgress / total;
      const rPct = resolved / total;

      const pOffset = 0;
      const ipOffset = pPct * circumference;
      const rOffset = (pPct + ipPct) * circumference;

      donutContainer.innerHTML = `
        <div class="donut-wrapper">
          <svg width="160" height="160" viewBox="0 0 160 160" aria-label="Status Distribution Chart">
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="var(--border)" stroke-width="${strokeWidth}" />
            <!-- Pending Segment -->
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="#f59e0b" stroke-width="${strokeWidth}"
                    stroke-dasharray="${pPct * circumference} ${circumference}"
                    stroke-dashoffset="0" transform="rotate(-90 80 80)" />
            <!-- In Progress Segment -->
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="#3b82f6" stroke-width="${strokeWidth}"
                    stroke-dasharray="${ipPct * circumference} ${circumference}"
                    stroke-dashoffset="-${ipOffset}" transform="rotate(-90 80 80)" />
            <!-- Resolved Segment -->
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="#22c55e" stroke-width="${strokeWidth}"
                    stroke-dasharray="${rPct * circumference} ${circumference}"
                    stroke-dashoffset="-${rOffset}" transform="rotate(-90 80 80)" />
            <text x="80" y="75" text-anchor="middle" fill="var(--ink)" font-size="22" font-weight="800">${total}</text>
            <text x="80" y="95" text-anchor="middle" fill="var(--muted)" font-size="10" font-weight="700">TOTAL</text>
          </svg>
          <div class="donut-legend">
            <span class="legend-item"><span class="legend-swatch pending"></span> ${dict.statusPending}: ${pending}</span>
            <span class="legend-item"><span class="legend-swatch in-progress"></span> ${dict.statusInProgress}: ${inProgress}</span>
            <span class="legend-item"><span class="legend-swatch resolved"></span> ${dict.statusResolved}: ${resolved}</span>
          </div>
        </div>
      `;
    }
  }

  // Render Category Breakdown Horizontal Bar Chart
  if (categoryBarsContainer) {
    if (total === 0) {
      categoryBarsContainer.innerHTML = `<p class="muted" style="font-size: 13px;">${dict.noAnalyticsData || "No complaints recorded yet."}</p>`;
    } else {
      const categories = ["Water", "Electricity", "Road", "Waste", "Health", "Agriculture", "Other"];
      const counts = {};
      categories.forEach(cat => {
        counts[cat] = complaints.filter(c => c.category === cat).length;
      });

      const maxCount = Math.max(...Object.values(counts), 1);

      let barHtml = '<div class="bar-chart-list">';
      categories.forEach(cat => {
        const count = counts[cat];
        if (count > 0) {
          const pct = Math.round((count / maxCount) * 100);
          barHtml += `
            <div class="bar-row">
              <div class="bar-header">
                <span>${getCategoryLabel(cat)}</span>
                <span class="bar-count">${count} (${Math.round((count/total)*100)}%)</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
        }
      });
      barHtml += '</div>';

      categoryBarsContainer.innerHTML = barHtml;
    }
  }
}

// Search and Filter Logic
function getFilteredComplaints() {
  const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const s = filterStatus ? filterStatus.value : "";
  const c = filterCategory ? filterCategory.value : "";

  return complaints.filter((item) => {
    if (s && item.status !== s) return false;
    if (c && item.category !== c) return false;

    if (q) {
      const catLabel = getCategoryLabel(item.category).toLowerCase();
      const locStr = [item.panchayat, item.block, item.district, item.state, item.ward]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesId = item.id.toLowerCase().includes(q);
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesDesc = item.description.toLowerCase().includes(q);
      const matchesCat = catLabel.includes(q) || item.category.toLowerCase().includes(q);
      const matchesLoc = locStr.includes(q);

      if (!matchesId && !matchesName && !matchesDesc && !matchesCat && !matchesLoc) {
        return false;
      }
    }

    return true;
  });
}

function updateComplaintStatus(id, newStatus) {
  const idx = complaints.findIndex((c) => c.id === id);
  if (idx !== -1) {
    complaints[idx].status = newStatus;
    saveComplaints();
    renderComplaints();
  }
}

function confirmDeleteComplaint(id) {
  const target = complaints.find((c) => c.id === id);
  if (!target) return;

  pendingDeleteId = id;

  if (deleteModalTargetId) {
    deleteModalTargetId.textContent = `ID: ${target.id.slice(0, 13)}... (${getCategoryLabel(target.category)} - ${target.name})`;
  }

  if (confirmDeleteModal) {
    confirmDeleteModal.style.display = "flex";
  }
}

function closeDeleteModal() {
  pendingDeleteId = null;
  if (confirmDeleteModal) {
    confirmDeleteModal.style.display = "none";
  }
}

function executeDeleteComplaint() {
  if (!pendingDeleteId) return;

  complaints = complaints.filter((c) => c.id !== pendingDeleteId);
  saveComplaints();
  closeDeleteModal();
  renderComplaints();

  if (backupStatus) {
    backupStatus.textContent = "Complaint deleted.";
    setTimeout(() => { if (backupStatus) backupStatus.textContent = ""; }, 3000);
  }
}

function openDetailModal(id) {
  const target = complaints.find((c) => c.id === id);
  if (!target || !modalDetailBody || !detailModal) return;

  const dict = TRANSLATIONS[currentLang];
  const dateStr = new Date(target.createdAt).toLocaleString(currentLang, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const locText = [
    target.panchayat,
    target.block,
    target.district,
    target.state
  ]
    .filter(Boolean)
    .join(", ");

  modalDetailBody.replaceChildren();

  const grid = document.createElement("div");
  grid.className = "detail-grid";

  // Item 1: Reference ID
  const item1 = document.createElement("div");
  item1.className = "detail-item";
  item1.innerHTML = `<label>Reference ID</label><p>${target.id}</p>`;

  // Item 2: Date
  const item2 = document.createElement("div");
  item2.className = "detail-item";
  item2.innerHTML = `<label>${dict.submittedOn}</label><p>${dateStr}</p>`;

  // Item 3: Name
  const item3 = document.createElement("div");
  item3.className = "detail-item";
  item3.innerHTML = `<label>${dict.byComplainant}</label><p>${target.name}</p>`;

  // Item 4: Category
  const item4 = document.createElement("div");
  item4.className = "detail-item";
  item4.innerHTML = `<label>${dict.categoryLabel}</label><p>${getCategoryLabel(target.category)}</p>`;

  grid.append(item1, item2, item3, item4);

  // Description box
  const descItem = document.createElement("div");
  descItem.className = "detail-item";
  descItem.style.marginBottom = "14px";
  const descLbl = document.createElement("label");
  descLbl.textContent = dict.descLabel;
  const descText = document.createElement("p");
  descText.style.fontWeight = "normal";
  descText.style.marginTop = "4px";
  descText.textContent = target.description;
  descItem.append(descLbl, descText);

  // Location box
  const locItem = document.createElement("div");
  locItem.className = "detail-item";
  locItem.style.marginBottom = "14px";
  const locLbl = document.createElement("label");
  locLbl.textContent = dict.locationTitle;
  const locP = document.createElement("p");
  locP.textContent = locText ? `${locText} (Ward: ${target.ward})` : `Ward: ${target.ward}`;
  locItem.append(locLbl, locP);

  if (target.gps) {
    const gpsP = document.createElement("p");
    gpsP.style.fontSize = "12px";
    gpsP.style.color = "var(--muted)";
    gpsP.style.marginTop = "4px";
    gpsP.textContent = `📍 ${dict.gpsCoords}: ${target.gps.lat}, ${target.gps.lng}`;
    locItem.append(gpsP);
  }

  // Status Box & Selector
  const statusItem = document.createElement("div");
  statusItem.className = "detail-item";
  statusItem.style.marginBottom = "14px";
  const statusLbl = document.createElement("label");
  statusLbl.textContent = dict.updateStatusLabel;

  const statusWrap = document.createElement("div");
  statusWrap.style.display = "flex";
  statusWrap.style.alignItems = "center";
  statusWrap.style.gap = "12px";
  statusWrap.style.marginTop = "6px";

  const statusBadge = document.createElement("span");
  statusBadge.className = `complaint-badge ${getStatusClass(target.status)}`;
  statusBadge.textContent = getStatusLabel(target.status);

  const statusSel = document.createElement("select");
  statusSel.className = "status-select-inline";
  statusSel.innerHTML = `
    <option value="Pending" ${target.status === 'Pending' ? 'selected' : ''}>${dict.statusPending}</option>
    <option value="In Progress" ${target.status === 'In Progress' ? 'selected' : ''}>${dict.statusInProgress}</option>
    <option value="Resolved" ${target.status === 'Resolved' ? 'selected' : ''}>${dict.statusResolved}</option>
  `;

  statusSel.addEventListener("change", (e) => {
    updateComplaintStatus(target.id, e.target.value);
    openDetailModal(target.id);
  });

  statusWrap.append(statusBadge, statusSel);
  statusItem.append(statusLbl, statusWrap);

  modalDetailBody.append(grid, descItem, locItem, statusItem);

  // Photo Evidence in Modal
  if (target.photo) {
    const photoDiv = document.createElement("div");
    photoDiv.className = "complaint-photo";
    photoDiv.style.maxHeight = "320px";
    const imgEl = document.createElement("img");
    imgEl.src = target.photo;
    imgEl.style.maxHeight = "320px";
    imgEl.alt = "Grievance Evidence";
    photoDiv.appendChild(imgEl);
    modalDetailBody.appendChild(photoDiv);
  }

  // Local status disclaimer
  const disc = document.createElement("div");
  disc.className = "local-status-disclaimer";
  disc.textContent = `ℹ️ ${dict.localStatusNotice}`;
  modalDetailBody.appendChild(disc);

  detailModal.style.display = "flex";
}

function closeDetailModal() {
  if (detailModal) {
    detailModal.style.display = "none";
  }
}

function renderComplaints() {
  updateAnalyticsDashboard();

  if (!complaintList) return;
  complaintList.replaceChildren();

  const dict = TRANSLATIONS[currentLang];
  const filtered = getFilteredComplaints();

  if (complaints.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = dict.noComplaints;
    complaintList.append(empty);
    return;
  }

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = dict.noSearchResults;
    complaintList.append(empty);
    return;
  }

  for (const complaint of filtered) {
    const card = document.createElement("article");
    card.className = "complaint";

    const headerDiv = document.createElement("div");
    headerDiv.className = "complaint-header";

    const title = document.createElement("h3");
    title.textContent = getCategoryLabel(complaint.category);

    const statusBadge = document.createElement("span");
    statusBadge.className = `complaint-badge ${getStatusClass(complaint.status)}`;
    statusBadge.textContent = getStatusLabel(complaint.status);

    headerDiv.append(title, statusBadge);

    const details = document.createElement("p");
    details.textContent = complaint.description;

    const metaDiv = document.createElement("div");
    metaDiv.className = "complaint-meta";

    const locationBadge = document.createElement("span");
    locationBadge.className = "complaint-badge location";
    const locText = [
      complaint.panchayat,
      complaint.block,
      complaint.district,
      complaint.state
    ]
      .filter(Boolean)
      .join(", ");
    locationBadge.textContent = locText
      ? `📍 ${locText} (Ward: ${complaint.ward})`
      : `Ward: ${complaint.ward}`;

    const refBadge = document.createElement("span");
    refBadge.className = "muted";
    refBadge.style.fontSize = "11px";
    refBadge.textContent = `ID: ${complaint.id.slice(0, 8)}... · By ${complaint.name}`;

    metaDiv.append(locationBadge, refBadge);

    if (complaint.gps) {
      const gpsSpan = document.createElement("span");
      gpsSpan.className = "muted";
      gpsSpan.style.fontSize = "11px";
      gpsSpan.textContent = `GPS: ${complaint.gps.lat}, ${complaint.gps.lng}`;
      metaDiv.append(gpsSpan);
    }

    card.append(headerDiv, details, metaDiv);

    if (complaint.photo) {
      const photoDiv = document.createElement("div");
      photoDiv.className = "complaint-photo";
      const imgEl = document.createElement("img");
      imgEl.src = complaint.photo;
      imgEl.alt = "Attached grievance evidence";
      photoDiv.appendChild(imgEl);
      card.append(photoDiv);
    }

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "complaint-actions";

    const viewDetailBtn = document.createElement("button");
    viewDetailBtn.type = "button";
    viewDetailBtn.className = "secondary-btn btn-icon-text";
    viewDetailBtn.innerHTML = `🔍 ${dict.viewDetails}`;
    viewDetailBtn.addEventListener("click", () => openDetailModal(complaint.id));

    const statusWrapper = document.createElement("div");
    statusWrapper.className = "status-select-wrapper";
    
    const statusSel = document.createElement("select");
    statusSel.className = "status-select-inline";
    statusSel.setAttribute("aria-label", "Update status");
    statusSel.innerHTML = `
      <option value="Pending" ${complaint.status === 'Pending' ? 'selected' : ''}>${dict.statusPending}</option>
      <option value="In Progress" ${complaint.status === 'In Progress' ? 'selected' : ''}>${dict.statusInProgress}</option>
      <option value="Resolved" ${complaint.status === 'Resolved' ? 'selected' : ''}>${dict.statusResolved}</option>
    `;

    statusSel.addEventListener("change", (e) => {
      updateComplaintStatus(complaint.id, e.target.value);
    });

    statusWrapper.appendChild(statusSel);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary-btn btn-icon-text";
    deleteBtn.style.color = "#e11d48";
    deleteBtn.style.borderColor = "rgba(225, 29, 72, 0.3)";
    deleteBtn.innerHTML = `🗑️ ${dict.deleteComplaint}`;
    deleteBtn.addEventListener("click", () => confirmDeleteComplaint(complaint.id));

    const actionBtnsGroup = document.createElement("div");
    actionBtnsGroup.className = "action-buttons-group";
    actionBtnsGroup.append(viewDetailBtn, deleteBtn);

    actionsDiv.append(statusWrapper, actionBtnsGroup);
    card.append(actionsDiv);

    complaintList.append(card);
  }
}

// Backup Export Logic
function exportBackup() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(complaints, null, 2));
  const dlAnchor = document.createElement("a");
  const today = new Date().toISOString().split("T")[0];
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `gram-seva-backup-${today}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  if (backupStatus) {
    backupStatus.textContent = "Backup JSON exported successfully!";
    setTimeout(() => { if (backupStatus) backupStatus.textContent = ""; }, 3000);
  }
}

// Backup Import Logic with Validation & Safe De-duplication
function importBackup(file) {
  const dict = TRANSLATIONS[currentLang];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      const importedList = Array.isArray(imported) ? imported : (imported.complaints || []);

      if (!Array.isArray(importedList)) {
        throw new Error("Invalid format");
      }

      let addedCount = 0;
      let dupCount = 0;

      for (const item of importedList) {
        if (!item.id || !item.name || !item.category || !item.description) {
          continue;
        }

        const exists = complaints.some((c) => c.id === item.id);
        if (!exists) {
          complaints.push({
            id: item.id || crypto.randomUUID(),
            name: String(item.name).trim(),
            state: item.state || "",
            district: item.district || "",
            block: item.block || "",
            panchayat: item.panchayat || "",
            ward: item.ward || "",
            category: item.category || "Other",
            description: String(item.description).trim(),
            createdAt: item.createdAt || new Date().toISOString(),
            status: ["Pending", "In Progress", "Resolved"].includes(item.status) ? item.status : "Pending",
            synced: Boolean(item.synced),
            gps: item.gps || null,
            photo: item.photo || null
          });
          addedCount++;
        } else {
          dupCount++;
        }
      }

      saveComplaints();
      renderComplaints();

      if (backupStatus) {
        backupStatus.textContent = `✅ ${dict.importSuccess} (${addedCount} added, ${dupCount} duplicates skipped)`;
      }
    } catch {
      if (backupStatus) {
        backupStatus.textContent = `❌ ${dict.importInvalid}`;
      }
    }
  };
  reader.readAsText(file);
}

// Form Submission Event
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const stateVal = stateSelect ? stateSelect.value : "";
  const districtVal = districtSelect ? districtSelect.value : "";
  const blockVal = blockInput ? blockInput.value.trim() : "";
  const panchayatVal = panchayatInput ? panchayatInput.value.trim() : "";
  const wardVal = wardInput ? wardInput.value.trim() : "";

  saveLocationPreference();

  const complaint = {
    id: crypto.randomUUID(),
    name: form.elements.name.value.trim(),
    state: stateVal,
    district: districtVal,
    block: blockVal,
    panchayat: panchayatVal,
    ward: wardVal,
    category: form.elements.category.value,
    description: form.elements.description.value.trim(),
    createdAt: new Date().toISOString(),
    status: "Pending",
    synced: false,
    gps: detectedGpsCoords,
    photo: attachedPhotoData
  };

  complaints.unshift(complaint);

  try {
    saveComplaints();
  } catch {
    complaints.shift();
    message.textContent = TRANSLATIONS[currentLang].errorMsg;
    return;
  }

  renderComplaints();
  form.reset();

  // Reset photo preview
  attachedPhotoData = null;
  if (photoInput) photoInput.value = "";
  if (photoPreviewContainer) photoPreviewContainer.style.display = "none";
  if (photoPreviewImg) photoPreviewImg.src = "";

  message.textContent = TRANSLATIONS[currentLang].savedMsg;
});

// Search & Filter Event Listeners
if (searchInput) {
  searchInput.addEventListener("input", renderComplaints);
}

if (filterStatus) {
  filterStatus.addEventListener("change", renderComplaints);
}

if (filterCategory) {
  filterCategory.addEventListener("change", renderComplaints);
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (filterStatus) filterStatus.value = "";
    if (filterCategory) filterCategory.value = "";
    renderComplaints();
  });
}

// Backup Event Listeners
if (exportBackupBtn) {
  exportBackupBtn.addEventListener("click", exportBackup);
}

if (importBackupTriggerBtn && importBackupInput) {
  importBackupTriggerBtn.addEventListener("click", () => importBackupInput.click());
  importBackupInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importBackup(e.target.files[0]);
    }
  });
}

// Modal Event Listeners
if (closeDetailXBtn) closeDetailXBtn.addEventListener("click", closeDetailModal);
if (closeDetailModalBtn) closeDetailModalBtn.addEventListener("click", closeDetailModal);
if (closeDeleteXBtn) closeDeleteXBtn.addEventListener("click", closeDeleteModal);
if (cancelDeleteBtn) cancelDeleteBtn.addEventListener("click", closeDeleteModal);
if (executeDeleteBtn) executeDeleteBtn.addEventListener("click", executeDeleteComplaint);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDetailModal();
    closeDeleteModal();
  }
});

if (detailModal) {
  detailModal.addEventListener("click", (e) => {
    if (e.target === detailModal) closeDetailModal();
  });
}

if (confirmDeleteModal) {
  confirmDeleteModal.addEventListener("click", (e) => {
    if (e.target === confirmDeleteModal) closeDeleteModal();
  });
}

if (languageSelect) {
  languageSelect.addEventListener("change", (e) => {
    applyLanguage(e.target.value);
  });
}

initTheme();
initLocationPicker();
initGeolocation();
applyLanguage(currentLang);
renderComplaints();
