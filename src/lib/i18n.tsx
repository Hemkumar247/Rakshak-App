
"use client";

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'ml';

export const translations = {
  en: {
    // General
    appName: 'Rakshak',
    loading: 'Loading...',
    submit: 'Submit',
    noInfo: 'No information provided.',
    errorTitle: 'Error',
    errorDescription: 'Something went wrong. Please try again.',
    learnMore: 'Learn More',
    eligibility: 'Eligibility',
    name: 'Name',
    email: 'Email',
    saveChanges: 'Save Changes',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    subjectPlaceholder: 'How can we help?',
    messagePlaceholder: 'Describe your issue or question here.',
    newAnalysis: 'New Analysis',
    analysisResult: 'Analysis Result',
    resultsAppearHere: 'Your results will appear here.',


    // Sidebar
    dashboard: 'Dashboard',
    cropSuggestions: 'Crop Suggestions',
    plantDiagnosis: 'Plant Diagnosis',
    marketAnalysis: 'Market Analysis',
    governmentSchemes: 'Govt. Schemes',
    weather: 'Weather Forecast',
    profile: 'Profile',
    settings: 'Settings',
    support: 'Support',
    satelliteAnalysis: 'Satellite Analysis',

    // Dashboard
    welcome: 'Welcome, Farmer!',
    dashboardDescription: 'Here is an overview of your farm\'s current status.',
    marketFactors: 'Market Factors',
    geographicalConditions: 'Geographical Conditions',
    currentTemp: 'Current: 22°C, Sunny',
    soilPh: 'Soil pH',
    elevation: 'Elevation',
    schemesDescription: 'Benefits & subsidies for you',
    wheat: 'Wheat',
    potato: 'Potato',
    onion: 'Onion',
    tomato: 'Tomato',
    soybean: 'Soybean',
    cotton: 'Cotton',

    // Crop Suggestions
    cropSuggestionsTitle: 'Smart Crop Suggestions',
    cropSuggestionsDescription: 'The AI will analyze the location and current season for the best recommendations.',
    farmLocation: 'Farm Location',
    farmLocationPlaceholder: 'e.g., Latitude, Longitude, or Address',
    getSuggestions: 'Get Suggestions',
    recommendations: 'Our Recommendations',
    
    // Plant Diagnosis
    plantDiagnosisTitle: 'Rakshak AI',
    plantDiagnosisDescription: 'Upload a photo of your plant to get an AI-powered diagnosis and treatment plan.',
    plantPhoto: 'Plant Photo',
    uploadInstruction: 'Click to upload or drag and drop',
    uploadSubtext: 'PNG, JPG, or WEBP',
    optionalNotes: 'Optional Notes',
    optionalNotesPlaceholder: 'e.g., "Leaves are yellowing", "I see white spots"...',
    getDiagnosis: 'Get Diagnosis',
    aiAnalyzing: 'Rakshak AI is analyzing...',
    notAPlantTitle: 'Not a Plant',
    notAPlantDescription: "The AI couldn't detect a plant in the image. Please try another photo.",
    healthy: 'Healthy',
    diagnosis: 'Diagnosis',
    treatment: 'Treatment Plan',
    prevention: 'Prevention Tips',
    uploadToStart: 'Upload a plant photo to get started.',

    // Market Analysis
    marketAnalysisTitle: 'Market Price Analysis',
    marketAnalysisDescription: 'Fetch live market prices for your crops to see the latest trends.',
    cropName: 'Crop Name',
    cropNamePlaceholder: 'e.g., Wheat, Tomato, Soybean',
    harvestTime: 'Harvest Time',
    harvestTimeJustNow: 'Just now harvested',
    harvestTime2Days: 'Harvested 2 days ago',
    harvestTime4Days: 'Harvested 4 days ago',
    cropCondition: 'Crop Condition',
    conditionPerfect: 'Perfectly alright',
    conditionGood: 'Good',
    conditionAverage: 'Average',
    conditionPoor: 'At risk of spoiling soon',
    getAnalysis: 'Get Analysis',
    analysisResults: 'Analysis Results',
    priceTrend: 'Price Trend (Next 2 Days)',
    recommendation: 'Recommendation',
    reasoning: 'Reasoning',
    sellNow: 'Sell Now',
    wait: 'Wait',
    aiAnalyzingPrices: 'AI is analyzing market prices...',
    resultsFor: 'Results for',
    enterDetails: 'Enter your crop details to get an analysis.',
    pricePerQuintal: 'Price/Quintal',

    // Satellite Analysis
    satelliteAnalysisTitle: 'Satellite Field Analysis',
    satelliteAnalysisDescription: 'Get an AI-generated satellite view of your farm to analyze crop health.',
    farmCoordinates: 'Farm Coordinates',
    analyzeField: 'Analyze Field',
    fetchingSatellite: 'AI is generating your satellite analysis...',
    satelliteImage: 'AI Satellite View',
    vegetationHealth: 'Vegetation Health',
    enterCoordinatesToStart: 'Enter coordinates to see your field analysis.',
    soilAnalysis: 'Soil Analysis',


    // Data Visualization (Old)
    dataVisualizationTitle: 'Historical Data Insights',
    dataVisualizationDescription: 'Track weather, soil, and market trends over time.',
    weatherHistory: 'Weather History',
    soilComposition: 'Soil Composition',
    marketTrendsChart: 'Market Trends (Price/Quintal)',

    // Schemes
    schemesPageDescription: 'Explore government schemes and subsidies available for farmers.',
    
    // Weather Page
    weatherForecastTitle: 'Farming Forecast',
    weatherForecastDescription: 'Detailed weather information to help you plan your week.',
    currentConditions: 'Current Conditions',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    visibility: 'Visibility',
    sevenDayForecast: 'Farming Forecast',
    rainChance: 'Rain Chance',

    // Profile Page
    profileDescription: 'View and edit your personal information.',
    profileDetails: 'Profile Details',
    profileDetailsDescription: 'This information will be used to personalize your experience.',

    // Settings Page
    settingsDescription: 'Manage your application preferences.',
    languageSettings: 'Language',
    languageSettingsDescription: 'Choose the language for the application interface.',
    selectLanguage: 'Select Language',
    notificationSettings: 'Notifications',
    notificationSettingsDescription: 'Control how you receive alerts and updates.',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    earlyWarningSystem: 'Early Warning System',
    earlyWarningSystemDescription: 'Receive critical alerts for government warnings and natural disasters.',

    // Support Page
    supportDescription: 'Need help? Contact us.',
    contactSupport: 'Contact Support',
    contactSupportDescription: "Fill out the form below and we'll get back to you as soon as possible.",

  },
  hi: {
    // General
    appName: 'रक्षक',
    loading: 'लोड हो रहा है...',
    submit: 'प्रस्तुत करें',
    noInfo: 'कोई जानकारी नहीं दी गई।',
    errorTitle: 'त्रुटि',
    errorDescription: 'कुछ गलत हो गया। कृपया पुन प्रयास करें।',
    learnMore: 'और जानें',
    eligibility: 'पात्रता',
    name: 'नाम',
    email: 'ईमेल',
    saveChanges: 'बदलाव सहेजें',
    subject: 'विषय',
    message: 'संदेश',
    sendMessage: 'संदेश भेजें',
    subjectPlaceholder: 'हम आपकी मदद कैसे कर सकते हैं?',
    messagePlaceholder: 'अपनी समस्या या प्रश्न का यहाँ वर्णन करें।',
    newAnalysis: 'नया विश्लेषण',
    analysisResult: 'विश्लेषण परिणाम',
    resultsAppearHere: 'आपके परिणाम यहाँ दिखाई देंगे।',

    // Sidebar
    dashboard: 'डैशबोर्ड',
    cropSuggestions: 'फसल सुझाव',
    plantDiagnosis: 'पौधों का निदान',
    marketAnalysis: 'बाजार विश्लेषण',
    governmentSchemes: 'सरकारी योजनाएं',
    weather: 'मौसम पूर्वानुमान',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    support: 'सहायता',
    satelliteAnalysis: 'सैटेलाइट विश्लेषण',


    // Dashboard
    welcome: 'किसान, आपका स्वागत है!',
    dashboardDescription: 'यहां आपके खेत की वर्तमान स्थिति का अवलोकन है।',
    marketFactors: 'बाजार कारक',
    geographicalConditions: 'भौगोलिक स्थितियाँ',
    currentTemp: 'वर्तमान: 22°C, धूप',
    soilPh: 'मिट्टी का पीएच',
    elevation: 'ऊंचाई',
    schemesDescription: 'आपके लिए लाभ और सब्सिडी',
    wheat: 'गेहूँ',
    potato: 'आलू',
    onion: 'प्याज',
    tomato: 'टमाटर',
    soybean: 'सोयाबीन',
    cotton: 'कपास',
    
    // Crop Suggestions
    cropSuggestionsTitle: 'स्मार्ट फसल सुझाव',
    cropSuggestionsDescription: 'एआई सर्वोत्तम सिफारिशों के लिए स्थान और वर्तमान मौसम का विश्लेषण करेगा।',
    farmLocation: 'खेत का स्थान',
    farmLocationPlaceholder: 'उदा., अक्षांश, देशांतर, या पता',
    getSuggestions: 'सुझाव प्राप्त करें',
    recommendations: 'हमारी सिफारिशें',

    // Plant Diagnosis
    plantDiagnosisTitle: 'रक्षक AI',
    plantDiagnosisDescription: 'AI-संचालित निदान और उपचार योजना प्राप्त करने के लिए अपने पौधे की एक तस्वीर अपलोड करें।',
    plantPhoto: 'पौधे की तस्वीर',
    uploadInstruction: 'अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें',
    uploadSubtext: 'PNG, JPG, या WEBP',
    optionalNotes: 'वैकल्पिक नोट्स',
    optionalNotesPlaceholder: 'उदा., "पत्तियां पीली हो रही हैं", "मुझे सफेद धब्बे दिखाई दे रहे हैं"...',
    getDiagnosis: 'निदान प्राप्त करें',
    diagnosisResult: 'निदान परिणाम',
    aiAnalyzing: 'रक्षक AI विश्लेषण कर रहा है...',
    notAPlantTitle: 'पौधा नहीं है',
    notAPlantDescription: 'AI तस्वीर में पौधे का पता नहीं लगा सका। कृपया दूसरी तस्वीर का प्रयास करें।',
    healthy: 'स्वस्थ',
    diagnosis: 'निदान',
    treatment: 'उपचार योजना',
    prevention: 'रोकथाम के उपाय',
    uploadToStart: 'शुरू करने के लिए पौधे की तस्वीर अपलोड करें।',

    // Market Analysis
    marketAnalysisTitle: 'बाजार मूल्य विश्लेषण',
    marketAnalysisDescription: 'नवीनतम रुझानों को देखने के लिए अपनी फसलों के लिए लाइव बाजार मूल्य प्राप्त करें।',
    cropName: 'फसल का नाम',
    cropNamePlaceholder: 'जैसे, गेहूं, टमाटर, सोयाबीन',
    harvestTime: 'कटाई का समय',
    harvestTimeJustNow: 'अभी-अभी काटा गया',
    harvestTime2Days: '2 दिन पहले काटा गया',
    harvestTime4Days: '4 दिन पहले काटा गया',
    cropCondition: 'फसल की स्थिति',
    conditionPerfect: 'पूरी तरह से ठीक',
    conditionGood: 'अच्छा',
    conditionAverage: 'औसत',
    conditionPoor: 'जल्द खराब होने का खतरा',
    getAnalysis: 'विश्लेषण प्राप्त करें',
    analysisResults: 'विश्लेषण परिणाम',
    priceTrend: 'मूल्य की प्रवृत्ति (अगले 2 दिन)',
    recommendation: 'सिफारिश',
    reasoning: 'तर्क',
    sellNow: 'अभी बेचें',
    wait: 'प्रतीक्षा करें',
    aiAnalyzingPrices: 'AI बाजार की कीमतों का विश्लेषण कर रहा है...',
    resultsFor: 'के लिए परिणाम',
    enterDetails: 'विश्लेषण प्राप्त करने के लिए अपनी फसल का विवरण दर्ज करें।',
    pricePerQuintal: 'मूल्य/क्विंटल',

    // Satellite Analysis
    satelliteAnalysisTitle: 'सैटेलाइट खेत विश्लेषण',
    satelliteAnalysisDescription: 'फसल स्वास्थ्य का विश्लेषण करने के लिए अपने खेत का AI-जनित सैटेलाइट दृश्य प्राप्त करें।',
    farmCoordinates: 'खेत के निर्देशांक',
    analyzeField: 'खेत का विश्लेषण करें',
    fetchingSatellite: 'AI आपका सैटेलाइट विश्लेषण तैयार कर रहा है...',
    satelliteImage: 'AI सैटेलाइट दृश्य',
    vegetationHealth: 'वनस्पति स्वास्थ्य',
    enterCoordinatesToStart: 'अपना खेत विश्लेषण देखने के लिए निर्देशांक दर्ज करें।',
    soilAnalysis: 'मिट्टी का विश्लेषण',


    // Data Visualization (Old)
    dataVisualizationTitle: 'ऐतिहासिक डेटा अंतर्दृष्टि',
    dataVisualizationDescription: 'समय के साथ मौसम, मिट्टी और बाजार के रुझानों को ट्रैक करें।',
    weatherHistory: 'मौसम का इतिहास',
    soilComposition: 'मिट्टी की संरचना',
    marketTrendsChart: 'बाजार के रुझान (मूल्य/क्विंटल)',
    
    // Schemes
    schemesPageDescription: 'किसानों के लिए उपलब्ध सरकारी योजनाओं और सब्सिडी का अन्वेषण करें।',

    // Weather Page
    weatherForecastTitle: 'कृषि पूर्वानुमान',
    weatherForecastDescription: 'आपके सप्ताह की योजना बनाने में मदद करने के लिए विस्तृत मौसम जानकारी।',
    currentConditions: 'वर्तमान स्थितियाँ',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'हवा की गति',
    visibility: 'दृश्यता',
    sevenDayForecast: 'कृषि पूर्वानुमान',
    rainChance: 'बारिश की संभावना',

    // Profile Page
    profileDescription: 'अपनी व्यक्तिगत जानकारी देखें और संपादित करें।',
    profileDetails: 'प्रोफ़ाइल विवरण',
    profileDetailsDescription: 'यह जानकारी आपके अनुभव को वैयक्तिकृत करने के लिए उपयोग की जाएगी।',

    // Settings Page
    settingsDescription: 'अपनी एप्लिकेशन प्राथमिकताएं प्रबंधित करें।',
    languageSettings: 'भाषा',
    languageSettingsDescription: 'एप्लिकेशन इंटरफ़ेस के लिए भाषा चुनें।',
    selectLanguage: 'भाषा चुनें',
    notificationSettings: 'सूचनाएं',
    notificationSettingsDescription: 'आप अलर्ट और अपडेट कैसे प्राप्त करते हैं इसे नियंत्रित करें।',
    emailNotifications: 'ईमेल सूचनाएं',
    pushNotifications: 'पुश सूचनाएं',
    earlyWarningSystem: 'प्रारंभिक चेतावनी प्रणाली',
    earlyWarningSystemDescription: 'सरकारी चेतावनियों और प्राकृतिक आपदाओं के लिए महत्वपूर्ण अलर्ट प्राप्त करें।',

    // Support Page
    supportDescription: 'मदद चाहिए? हमसे संपर्क करें।',
    contactSupport: 'सहायता से संपर्क करें',
    contactSupportDescription: 'नीचे दिया गया फ़ॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।',

  },
  ta: {
    // General
    appName: 'ரக்ஷக்',
    loading: 'ஏற்றுகிறது...',
    submit: 'சமர்ப்பிக்கவும்',
    noInfo: 'தகவல் எதுவும் வழங்கப்படவில்லை.',
    errorTitle: 'பிழை',
    errorDescription: 'ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.',
    learnMore: 'மேலும் அறிக',
    eligibility: 'தகுதி',
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    saveChanges: 'மாற்றங்களைச் சேமி',
    subject: 'பொருள்',
    message: 'செய்தி',
    sendMessage: 'செய்தி அனுப்பு',
    subjectPlaceholder: 'நாங்கள் எப்படி உதவ முடியும்?',
    messagePlaceholder: 'உங்கள் சிக்கல் அல்லது கேள்வியை இங்கே விவரிக்கவும்.',
    newAnalysis: 'புதிய பகுப்பாய்வு',
    analysisResult: 'பகுப்பாய்வு முடிவு',
    resultsAppearHere: 'உங்கள் முடிவுகள் இங்கே தோன்றும்.',

    // Sidebar
    dashboard: 'டாஷ்போர்டு',
    cropSuggestions: 'பயிர் பரிந்துரைகள்',
    plantDiagnosis: 'தாவர நோய் கண்டறிதல்',
    marketAnalysis: 'சந்தை பகுப்பாய்வு',
    governmentSchemes: 'அரசு திட்டங்கள்',
    weather: 'வானிலை முன்னறிவிப்பு',
    profile: 'சுயவிவரம்',
    settings: 'அமைப்புகள்',
    support: 'ஆதரவு',
    satelliteAnalysis: 'செயற்கைக்கோள் பகுப்பாய்வு',

    // Dashboard
    welcome: 'விவசாயி, வருக!',
    dashboardDescription: 'உங்கள் பண்ணையின் தற்போதைய நிலையின் கண்ணோட்டம் இங்கே.',
    marketFactors: 'சந்தை காரணிகள்',
    geographicalConditions: 'புவியியல் நிலைமைகள்',
    currentTemp: 'தற்போதைய: 22°C, வெயில்',
    soilPh: 'மண் pH',
    elevation: 'உயரம்',
    schemesDescription: 'உங்களுக்கான நன்மைகள் மற்றும் மானியங்கள்',
    wheat: 'கோதுமை',
    potato: 'உருளைக்கிழங்கு',
    onion: 'வெங்காயம்',
    tomato: 'தக்காளி',
    soybean: 'சோயாபீன்',
    cotton: 'பருத்தி',
    
    // Crop Suggestions
    cropSuggestionsTitle: 'ஸ்மார்ட் பயிர் பரிந்துரைகள்',
    cropSuggestionsDescription: 'சிறந்த பரிந்துரைகளுக்கு AI இருப்பிடம் மற்றும் தற்போதைய பருவத்தை பகுப்பாய்வு செய்யும்.',
    farmLocation: 'பண்ணை இருப்பிடம்',
    farmLocationPlaceholder: 'எ.கா., அட்சரேகை, தீர்க்கரேகை, அல்லது முகவரி',
    getSuggestions: 'பரிந்துரைகளைப் பெறுக',
    recommendations: 'எங்கள் பரிந்துரைகள்',

    // Plant Diagnosis
    plantDiagnosisTitle: 'ரக்ஷக் AI',
    plantDiagnosisDescription: 'AI-இயங்கும் நோய் கண்டறிதல் மற்றும் சிகிச்சை திட்டத்தைப் பெற உங்கள் தாவரத்தின் புகைப்படத்தைப் பதிவேற்றவும்.',
    plantPhoto: 'தாவரத்தின் புகைப்படம்',
    uploadInstruction: 'பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்',
    uploadSubtext: 'PNG, JPG, அல்லது WEBP',
    optionalNotes: 'விருப்பக் குறிப்புகள்',
    optionalNotesPlaceholder: 'எ.கா., "இலைகள் மஞ்சள் நிறமாகின்றன", "நான் வெள்ளைப் புள்ளிகளைக் காண்கிறேன்"...',
    getDiagnosis: 'நோய் கண்டறிதல் பெறுக',
    diagnosisResult: 'நோய் கண்டறிதல் முடிவு',
    aiAnalyzing: 'ரக்ஷக் AI பகுப்பாய்வு செய்கிறது...',
    notAPlantTitle: 'தாவரம் அல்ல',
    notAPlantDescription: 'AI ஆல் படத்தில் ஒரு தாவரத்தைக் கண்டறிய முடியவில்லை. தயவுசெய்து மற்றொரு புகைப்படத்தை முயற்சிக்கவும்.',
    healthy: 'ஆரோக்கியமான',
    diagnosis: 'நோய் கண்டறிதல்',
    treatment: 'சிகிச்சை திட்டம்',
    prevention: 'தடுப்பு குறிப்புகள்',
    uploadToStart: 'தொடங்குவதற்கு ஒரு தாவர புகைப்படத்தை பதிவேற்றவும்.',

    // Market Analysis
    marketAnalysisTitle: 'சந்தை விலை பகுப்பாய்வு',
    marketAnalysisDescription: 'சமீபத்திய போக்குகளைப் பார்க்க உங்கள் பயிர்களுக்கான நேரடி சந்தை விலைகளைப் பெறுங்கள்.',
    cropName: 'பயிர் பெயர்',
    cropNamePlaceholder: 'எ.கா., கோதுமை, தக்காளி, சோயாபீன்',
    harvestTime: 'அறுவடை நேரம்',
    harvestTimeJustNow: 'இப்போதுதான் அறுவடை செய்யப்பட்டது',
    harvestTime2Days: '2 நாட்களுக்கு முன்பு அறுவடை செய்யப்பட்டது',
    harvestTime4Days: '4 நாட்களுக்கு முன்பு அறுவடை செய்யப்பட்டது',
    cropCondition: 'பயிர் நிலை',
    conditionPerfect: 'முற்றிலும் சரி',
    conditionGood: 'நல்லது',
    conditionAverage: 'சராசரி',
    conditionPoor: 'விரைவில் கெட்டுப்போகும் அபாயம்',
    getAnalysis: 'பகுப்பாய்வைப் பெறுங்கள்',
    analysisResults: 'பகுப்பாய்வு முடிவுகள்',
    priceTrend: 'விலைப் போக்கு (அடுத்த 2 நாட்கள்)',
    recommendation: 'பரிந்துரை',
    reasoning: 'காரணம்',
    sellNow: 'இப்போதே விற்கவும்',
    wait: 'காத்திருக்கவும்',
    aiAnalyzingPrices: 'AI சந்தை விலைகளை பகுப்பாய்வு செய்கிறது...',
    resultsFor: 'க்கான முடிவுகள்',
    enterDetails: 'ஒரு பகுப்பாய்வைப் பெற உங்கள் பயிர் விவரங்களை உள்ளிடவும்.',
    pricePerQuintal: 'விலை/குவிண்டால்',

    // Satellite Analysis
    satelliteAnalysisTitle: 'செயற்கைக்கோள் புலம் பகுப்பாய்வு',
    satelliteAnalysisDescription: 'பயிர் ஆரோக்கியத்தை பகுப்பாய்வு செய்ய உங்கள் பண்ணையின் AI-உருவாக்கிய செயற்கைக்கோள் பார்வையைப் பெறுங்கள்.',
    farmCoordinates: 'பண்ணை ஆயத்தொலைவுகள்',
    analyzeField: 'புலத்தை பகுப்பாய்வு செய்',
    fetchingSatellite: 'AI உங்கள் செயற்கைக்கோள் பகுப்பாய்வை உருவாக்குகிறது...',
    satelliteImage: 'AI செயற்கைக்கோள் பார்வை',
    vegetationHealth: 'தாவர ஆரோக்கியம்',
    enterCoordinatesToStart: 'உங்கள் புலம் பகுப்பாய்வைக் காண ஆயத்தொலைவுகளை உள்ளிடவும்.',
    soilAnalysis: 'மண் பகுப்பாய்வு',


    // Data Visualization (Old)
    dataVisualizationTitle: 'வரலாற்று தரவு நுண்ணறிவு',
    dataVisualizationDescription: 'காலப்போக்கில் வானிலை, மண் மற்றும் சந்தை போக்குகளைக் கண்காணிக்கவும்.',
    weatherHistory: 'வானிலை வரலாறு',
    soilComposition: 'மண் கலவை',
    marketTrendsChart: 'சந்தை போக்குகள் (விலை/குவிண்டால்)',
    
    // Schemes
    schemesPageDescription: 'விவசாயிகளுக்கு கிடைக்கும் அரசாங்க திட்டங்கள் மற்றும் மானியங்களை ஆராயுங்கள்.',

    // Weather Page
    weatherForecastTitle: 'விவசாய முன்னறிவிப்பு',
    weatherForecastDescription: 'உங்கள் வாரத்தைத் திட்டமிட உதவும் விரிவான வானிலை தகவல்.',
    currentConditions: 'தற்போதைய நிலைமைகள்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    windSpeed: 'காற்றின் வேகம்',
    visibility: 'பார்வைநிலை',
    sevenDayForecast: 'விவசாய முன்னறிவிப்பு',
    rainChance: 'மழை வாய்ப்பு',

    // Profile Page
    profileDescription: 'உங்கள் தனிப்பட்ட தகவல்களைக் கண்டு திருத்தவும்.',
    profileDetails: 'சுயவிவர விவரங்கள்',
    profileDetailsDescription: 'உங்கள் அனுபவத்தைத் தனிப்பயனாக்க இந்தத் தகவல் பயன்படுத்தப்படும்.',

    // Settings Page
    settingsDescription: 'உங்கள் பயன்பாட்டு விருப்பத்தேர்வுகளை நிர்வகிக்கவும்.',
    languageSettings: 'மொழி',
    languageSettingsDescription: 'பயன்பாட்டு இடைமுகத்திற்கான மொழியைத் தேர்ந்தெடுக்கவும்.',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    notificationSettings: 'அறிவிப்புகள்',
    notificationSettingsDescription: 'விழிப்பூட்டல்களையும் புதுப்பிப்புகளையும் எவ்வாறு பெறுகிறீர்கள் என்பதைக் கட்டுப்படுத்தவும்.',
    emailNotifications: 'மின்னஞ்சல் அறிவிப்புகள்',
    pushNotifications: 'புஷ் அறிவிப்புகள்',
    earlyWarningSystem: 'ஆரம்ப எச்சரிக்கை அமைப்பு',
    earlyWarningSystemDescription: 'அரசாங்க எச்சரிக்கைகள் மற்றும் இயற்கை பேரழிவுகளுக்கான முக்கியமான விழிப்பூட்டல்களைப் பெறுங்கள்.',

    // Support Page
    supportDescription: 'உதவி வேண்டுமா? எங்களைத் தொடர்பு கொள்ளவும்.',
    contactSupport: 'ஆதரவைத் தொடர்பு கொள்ளவும்',
    contactSupportDescription: 'கீழேயுள்ள படிவத்தை நிரப்பவும், நாங்கள் விரைவில் உங்களைத் தொடர்புகொள்வோம்.',

  },
  ml: {
    // General
    appName: 'രക്ഷക്',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    submit: 'സമർപ്പിക്കുക',
    noInfo: 'വിവരങ്ങൾ ലഭ്യമല്ല.',
    errorTitle: 'പിശക്',
    errorDescription: 'എന്തോ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    learnMore: 'കൂടുതലറിയുക',
    eligibility: 'യോഗ്യത',
    name: 'പേര്',
    email: 'ഇമെയിൽ',
    saveChanges: 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക',
    subject: 'വിഷയം',
    message: 'സന്ദേശം',
    sendMessage: 'സന്ദേശം അയക്കുക',
    subjectPlaceholder: 'ഞങ്ങൾ എങ്ങനെ സഹായിക്കും?',
    messagePlaceholder: 'നിങ്ങളുടെ പ്രശ്നം ഇവിടെ വിവരിക്കുക.',
    newAnalysis: 'പുതിയ വിശകലനം',
    analysisResult: 'വിശകലന ഫലം',
    resultsAppearHere: 'നിങ്ങളുടെ ഫലങ്ങൾ ഇവിടെ ദൃശ്യമാകും.',

    // Sidebar
    dashboard: 'ഡാഷ്ബോർഡ്',
    cropSuggestions: 'വിള നിർദ്ദേശങ്ങൾ',
    plantDiagnosis: 'സസ്യ രോഗനിർണയം',
    marketAnalysis: 'വിപണി വിശകലനം',
    governmentSchemes: 'സർക്കാർ പദ്ധതികൾ',
    weather: 'കാലാവസ്ഥാ പ്രവചനം',
    profile: 'പ്രൊഫൈൽ',
    settings: 'ക്രമീകരണങ്ങൾ',
    support: 'പിന്തുണ',
    satelliteAnalysis: 'ഉപഗ്രഹ വിശകലനം',

    // Dashboard
    welcome: 'കർഷകാ, സ്വാഗതം!',
    dashboardDescription: 'നിങ്ങളുടെ ഫാമിന്റെ നിലവിലെ അവസ്ഥയുടെ ഒരു അവലോകനം.',
    marketFactors: 'വിപണി ഘടകങ്ങൾ',
    geographicalConditions: 'ഭൂമിശാസ്ത്രപരമായ അവസ്ഥകൾ',
    currentTemp: 'നിലവിൽ: 22°C, വെയിൽ',
    soilPh: 'മണ്ണിന്റെ പി.എച്ച്',
    elevation: 'ഉയരം',
    schemesDescription: 'നിങ്ങൾക്കുള്ള ആനുകൂല്യങ്ങളും സബ്സിഡികളും',
    wheat: 'ഗോതമ്പ്',
    potato: 'ഉരുളക്കിഴങ്ങ്',
    onion: 'ഉള്ളി',
    tomato: 'തക്കാളി',
    soybean: 'സോയാബീൻ',
    cotton: 'പരുത്തി',

    // Crop Suggestions
    cropSuggestionsTitle: 'മികച്ച വിള നിർദ്ദേശങ്ങൾ',
    cropSuggestionsDescription: 'മികച്ച ശുപാർശകൾക്കായി AI നിങ്ങളുടെ സ്ഥാനവും നിലവിലെ കാലാവസ്ഥയും വിശകലനം ചെയ്യും.',
    farmLocation: 'ഫാമിന്റെ സ്ഥാനം',
    farmLocationPlaceholder: 'ഉദാ: അക്ഷാംശം, രേഖാംശം, അല്ലെങ്കിൽ വിലാസം',
    getSuggestions: 'നിർദ്ദേശങ്ങൾ നേടുക',
    recommendations: 'ഞങ്ങളുടെ ശുപാർശകൾ',
    
    // Plant Diagnosis
    plantDiagnosisTitle: 'രക്ഷക് AI',
    plantDiagnosisDescription: 'AI-യുടെ സഹായത്തോടെ രോഗനിർണയവും ചികിത്സാ പദ്ധതിയും ലഭിക്കാൻ നിങ്ങളുടെ സസ്യത്തിന്റെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.',
    plantPhoto: 'സസ്യത്തിന്റെ ഫോട്ടോ',
    uploadInstruction: 'അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ വലിച്ചിടുക',
    uploadSubtext: 'PNG, JPG, അല്ലെങ്കിൽ WEBP',
    optionalNotes: 'ഓപ്ഷണൽ കുറിപ്പുകൾ',
    optionalNotesPlaceholder: 'ഉദാ: "ഇലകൾ മഞ്ഞളിക്കുന്നു", "വെളുത്ത പാടുകൾ കാണുന്നു"...',
    getDiagnosis: 'രോഗനിർണയം നേടുക',
    aiAnalyzing: 'രക്ഷക് AI വിശകലനം ചെയ്യുന്നു...',
    notAPlantTitle: 'ഇതൊരു സസ്യമല്ല',
    notAPlantDescription: 'ചിത്രത്തിൽ ഒരു സസ്യത്തെ കണ്ടെത്താൻ AI-ക്ക് കഴിഞ്ഞില്ല. ദയവായി മറ്റൊരു ഫോട്ടോ ശ്രമിക്കുക.',
    healthy: 'ആരോഗ്യമുള്ള',
    diagnosis: 'രോഗനിർണയം',
    treatment: 'ചികിത്സാ പദ്ധതി',
    prevention: 'പ്രതിരോധ മാർഗ്ഗങ്ങൾ',
    uploadToStart: 'ആരംഭിക്കുന്നതിന് ഒരു സസ്യത്തിന്റെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.',

    // Market Analysis
    marketAnalysisTitle: 'വിപണി വില വിശകലനം',
    marketAnalysisDescription: 'നിങ്ങളുടെ വിളകളുടെ ഏറ്റവും പുതിയ വിപണി വിലകൾ നേടുക.',
    cropName: 'വിളയുടെ പേര്',
    cropNamePlaceholder: 'ഉദാ: ഗോതമ്പ്, തക്കാളി, സോയാബീൻ',
    harvestTime: 'വിളവെടുപ്പ് സമയം',
    harvestTimeJustNow: 'ഇപ്പോൾ വിളവെടുത്തത്',
    harvestTime2Days: '2 ദിവസം മുൻപ് വിളവെടുത്തത്',
    harvestTime4Days: '4 ദിവസം മുൻപ് വിളവെടുത്തത്',
    cropCondition: 'വിളയുടെ അവസ്ഥ',
    conditionPerfect: 'വളരെ നല്ലത്',
    conditionGood: 'നല്ലത്',
    conditionAverage: 'ശരാശരി',
    conditionPoor: 'விரைவில் கெட்டுப்போகும் அபாயம்',
    getAnalysis: 'വിശകലനം നേടുക',
    analysisResults: 'വിശകലന ഫലങ്ങൾ',
    priceTrend: 'വില പ്രവണത (അടുത്ത 2 ദിവസം)',
    recommendation: 'ശുപാർശ',
    reasoning: 'കാരണം',
    sellNow: 'ഇപ്പോൾ വിൽക്കുക',
    wait: 'കാത്തിരിക്കുക',
    aiAnalyzingPrices: 'AI വിപണി വിലകൾ വിശകലനം ചെയ്യുന്നു...',
    resultsFor: 'ഫലങ്ങൾ',
    enterDetails: 'വിശകലനം ലഭിക്കാൻ നിങ്ങളുടെ വിളയുടെ വിവരങ്ങൾ നൽകുക.',
    pricePerQuintal: 'ക്വിന്റലിന് വില',

    // Satellite Analysis
    satelliteAnalysisTitle: 'ഉപഗ്രഹ ഫീൽഡ് വിശകലനം',
    satelliteAnalysisDescription: 'വിളയുടെ ആരോഗ്യം വിശകലനം ചെയ്യാൻ നിങ്ങളുടെ ഫാമിന്റെ AI-നിർമ്മിത ഉപഗ്രഹ ദൃശ്യം നേടുക.',
    farmCoordinates: 'ഫാമിന്റെ കോർഡിനേറ്റുകൾ',
    analyzeField: 'ഫീൽഡ് വിശകലനം ചെയ്യുക',
    fetchingSatellite: 'AI നിങ്ങളുടെ ഉപഗ്രഹ വിശകലനം തയ്യാറാക്കുന്നു...',
    satelliteImage: 'AI ഉപഗ്രഹ ദൃശ്യം',
    vegetationHealth: 'സസ്യങ്ങളുടെ ആരോഗ്യം',
    enterCoordinatesToStart: 'നിങ്ങളുടെ ഫീൽഡ് വിശകലനം കാണാൻ കോർഡിനേറ്റുകൾ നൽകുക.',
    soilAnalysis: 'മണ്ണ് വിശകലനം',

    // Data Visualization (Old)
    dataVisualizationTitle: 'ചരിത്രപരമായ ഡാറ്റ ഉൾക്കാഴ്ചകൾ',
    dataVisualizationDescription: 'കാലാവസ്ഥ, മണ്ണ്, വിപണി പ്രവണതകൾ എന്നിവ ട്രാക്ക് ചെയ്യുക.',
    weatherHistory: 'കാലാവസ്ഥാ ചരിത്രം',
    soilComposition: 'മണ്ണിന്റെ ഘടന',
    marketTrendsChart: 'വിപണി പ്രവണതകൾ (വില/ക്വിന്റൽ)',
    
    // Schemes
    schemesPageDescription: 'കർഷകർക്കായി ലഭ്യമായ സർക്കാർ പദ്ധതികളും സബ്സിഡികളും കണ്ടെത്തുക.',
    
    // Weather Page
    weatherForecastTitle: 'കാർഷിക പ്രവചനം',
    weatherForecastDescription: 'നിങ്ങളുടെ ആഴ്ച ആസൂത്രണം ചെയ്യാൻ സഹായിക്കുന്ന വിശദമായ കാലാവസ്ഥാ വിവരങ്ങൾ.',
    currentConditions: 'നിലവിലെ അവസ്ഥ',
    temperature: 'താപനില',
    humidity: 'ഈർപ്പം',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    visibility: 'കാഴ്ച',
    sevenDayForecast: 'കാർഷിക പ്രവചനം',
    rainChance: 'മഴ സാധ്യത',

    // Profile Page
    profileDescription: 'നിങ്ങളുടെ സ്വകാര്യ വിവരങ്ങൾ കാണുക, എഡിറ്റ് ചെയ്യുക.',
    profileDetails: 'പ്രൊഫൈൽ വിവരങ്ങൾ',
    profileDetailsDescription: 'ഈ വിവരങ്ങൾ നിങ്ങളുടെ അനുഭവം വ്യക്തിഗതമാക്കാൻ ഉപയോഗിക്കും.',

    // Settings Page
    settingsDescription: 'നിങ്ങളുടെ ആപ്ലിക്കേഷൻ മുൻഗണനകൾ നിയന്ത്രിക്കുക.',
    languageSettings: 'ഭാഷ',
    languageSettingsDescription: 'ആപ്ലിക്കേഷന്റെ ഭാഷ തിരഞ്ഞെടുക്കുക.',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    notificationSettings: 'അറിയിപ്പുകൾ',
    notificationSettingsDescription: 'നിങ്ങൾക്ക് അലേർട്ടുകളും അപ്‌ഡേറ്റുകളും എങ്ങനെ ലഭിക്കണമെന്ന് നിയന്ത്രിക്കുക.',
    emailNotifications: 'ഇമെയിൽ അറിയിപ്പുകൾ',
    pushNotifications: 'പുഷ് അറിയിപ്പുകൾ',
    earlyWarningSystem: 'മുൻകൂർ മുന്നറിയിപ്പ് സംവിധാനം',
    earlyWarningSystemDescription: 'സർക്കാർ മുന്നറിയിപ്പുകൾക്കും പ്രകൃതി ദുരന്തങ്ങൾക്കും നിർണ്ണായകമായ അലേർട്ടുകൾ സ്വീകരിക്കുക.',

    // Support Page
    supportDescription: 'സഹായം വേണോ? ഞങ്ങളെ ബന്ധപ്പെടുക.',
    contactSupport: 'പിന്തുണയുമായി ബന്ധപ്പെടുക',
    contactSupportDescription: "താഴെയുള്ള ഫോം പൂരിപ്പിക്കുക, ഞങ്ങൾ ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടുന്നതാണ്.",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  isMounted: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You can add logic here to persist language preference, e.g., in localStorage
  }, []);

  const t = useMemo(() => (key: keyof typeof translations.en) => {
    if (!isMounted) return translations.en[key]; // Fallback for SSR
    return translations[language]?.[key] || translations.en[key];
  }, [language, isMounted]);

  const value = { language, setLanguage, t, isMounted };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
