"use client";

import { useLanguage } from "@/lib/i18n";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

// Mock data for government schemes
const schemes: Record<string, any[]> = {
  en: [
    {
      title: "PM Kisan Samman Nidhi",
      description: "A government scheme with the objective to provide financial support to all the landholding farmer's families in the country.",
      eligibility: "All landholding farmer families.",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "This scheme provides comprehensive insurance coverage against crop failure, helping to stabilize the income of farmers.",
      eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.",
      link: "https://pmfby.gov.in/"
    },
    {
      title: "Kisan Credit Card (KCC) Scheme",
      description: "The KCC scheme was introduced to ensure that farmers have access to timely and adequate credit. The scheme provides farmers with a credit card to purchase agriculture inputs like seeds, fertilizers, pesticides etc.",
      eligibility: "All farmers, individuals/joint borrowers who are owner cultivators.",
      link: "#"
    }
  ],
  hi: [
    {
      title: "पीएम किसान सम्मान निधि",
      description: "देश के सभी भूमिधारक किसान परिवारों को वित्तीय सहायता प्रदान करने के उद्देश्य से एक सरकारी योजना।",
      eligibility: "सभी भूमिधारक किसान परिवार।",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)",
      description: "यह योजना फसल की विफलता के खिलाफ व्यापक बीमा कवरेज प्रदान करती है, जिससे किसानों की आय को स्थिर करने में मदद मिलती है।",
      eligibility: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान, जिनमें बटाईदार और किरायेदार किसान शामिल हैं, कवरेज के लिए पात्र हैं।",
      link: "https://pmfby.gov.in/"
    },
    {
      title: "किसान क्रेडिट कार्ड (केसीसी) योजना",
      description: "केसीसी योजना यह सुनिश्चित करने के लिए शुरू की गई थी कि किसानों को समय पर और पर्याप्त ऋण उपलब्ध हो। यह योजना किसानों को बीज, उर्वरक, कीटनाशक आदि जैसे कृषि इनपुट खरीदने के लिए क्रेडिट कार्ड प्रदान करती है।",
      eligibility: "सभी किसान, व्यक्ति/संयुक्त उधारकर्ता जो मालिक कृषक हैं।",
      link: "#"
    }
  ],
  ta: [
    {
      title: "பிஎம் கிசான் சம்மன் நிதி",
      description: "நாட்டில் உள்ள அனைத்து நில உரிமையாளர் விவசாயிகளின் குடும்பங்களுக்கும் நிதி உதவி வழங்கும் நோக்கத்துடன் கூடிய ஒரு அரசாங்கத் திட்டம்.",
      eligibility: "அனைத்து நில உரிமையாளர் விவசாயி குடும்பங்கள்.",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "பிரதான் மந்திரி ஃபசல் பீமா யோஜனா (PMFBY)",
      description: "இந்தத் திட்டம் பயிர் தோல்விக்கு எதிராக விரிவான காப்பீட்டுத் திட்டத்தை வழங்குகிறது, விவசாயிகளின் வருமானத்தை உறுதிப்படுத்த உதவுகிறது.",
      eligibility: "அறிவிக்கப்பட்ட பகுதிகளில் அறிவிக்கப்பட்ட பயிர்களை வளர்க்கும் குத்தகைதாரர்கள் மற்றும் பங்குதாரர்கள் உட்பட அனைத்து விவசாயிகளும் காப்பீட்டிற்கு தகுதியுடையவர்கள்.",
      link: "https://pmfby.gov.in/"
    },
    {
      title: "கிசான் கிரெடிட் கார்டு (KCC) திட்டம்",
      description: "விவசாயிகளுக்கு சரியான நேரத்தில் மற்றும் போதுமான கடன் கிடைப்பதை உறுதி செய்வதற்காக KCC திட்டம் அறிமுகப்படுத்தப்பட்டது. விதைகள், உரங்கள், பூச்சிக்கொல்லிகள் போன்ற விவசாய உள்ளீடுகளை வாங்க விவசாயிகளுக்கு கிரெடிட் கார்டு வழங்குகிறது.",
      eligibility: "அனைத்து விவசாயிகள், தனிப்பட்ட/கூட்டு கடன் வாங்குபவர்கள் உரிமையாளர் விவசாயிகள்.",
      link: "#"
    }
  ]
};

export default function SchemesPage() {
  const { t, language } = useLanguage();

  const currentSchemes = schemes[language] || schemes.en;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('governmentSchemes')}</h1>
        <p className="text-muted-foreground">{t('schemesPageDescription')}</p>
      </div>
      <div className="space-y-6">
        {currentSchemes.map((scheme: any) => (
          <Card key={scheme.title} className="shadow-lg border-white/40">
            <CardHeader>
              <CardTitle className="font-headline text-primary">{scheme.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90">{scheme.description}</p>
              <div>
                <h4 className="font-semibold">{t('eligibility')}</h4>
                <p className="text-muted-foreground">{scheme.eligibility}</p>
              </div>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-primary hover:underline"
              >
                {t('learnMore')}...
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
