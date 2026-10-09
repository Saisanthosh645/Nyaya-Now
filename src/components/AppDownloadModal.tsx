import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Smartphone, 
  WifiOff, 
  ShieldCheck, 
  Share2, 
  X, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Zap, 
  Lock, 
  Phone, 
  Volume2, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  Shield, 
  Layers, 
  Info, 
  Sliders, 
  Compass, 
  ArrowDown,
  QrCode,
  Plane,
  Play,
  Square,
  Radio,
  Car,
  AlertTriangle,
  Flame,
  Search,
  RefreshCw,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Language } from '../types';
import { AshokaChakra } from './AshokaChakra';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast?: (msg: string) => void;
}

type ModalTab = 'suite' | 'simulator' | 'wallet-card';
type PhonePreviewMode = 'app' | 'lockscreen';
type WallpaperPreset = 'general' | 'traffic' | 'women';
type WallpaperLang = 'en' | 'hi' | 'te';

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('suite');
  const [phonePreviewMode, setPhonePreviewMode] = useState<PhonePreviewMode>('app');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadedOffline, setDownloadedOffline] = useState(false);
  const [downloadedWallpaper, setDownloadedWallpaper] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Customizer state
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [wallpaperLang, setWallpaperLang] = useState<WallpaperLang>(
    language === 'hi' ? 'hi' : language === 'te' ? 'te' : 'en'
  );
  const [wallpaperPreset, setWallpaperPreset] = useState<WallpaperPreset>('general');
  const [isGeneratingWallpaper, setIsGeneratingWallpaper] = useState(false);

  // Platform detection
  const [devicePlatform, setDevicePlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  // Interactive Offline Simulator State
  const [simulatedOffline, setSimulatedOffline] = useState(true);
  const [simulatorQuery, setSimulatorQuery] = useState('');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setDevicePlatform('ios');
    } else if (/android/i.test(userAgent)) {
      setDevicePlatform('android');
    } else {
      setDevicePlatform('desktop');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Direct 1-Click Install or Instant Offline App Save (ZERO "press 3 dots")
  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          if (onShowToast) onShowToast('🎉 NyayaNow installed to your device home screen!');
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Install prompt error:', err);
      }
    } else {
      // Immediate direct download of the standalone offline pocket app bundle
      handleDownloadOfflineCard();
      setDownloadedOffline(true);
      if (onShowToast) {
        onShowToast('✓ Offline Mobile App downloaded! Opens anytime without internet in Airplane mode.');
      }
    }
  };

  // Helper function to draw rounded rectangle in Canvas
  const roundRect = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    r: number
  ) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // Preset rights definitions for Wallpaper, Mockup and Simulator
  const getRightsForPreset = (preset: WallpaperPreset, lang: WallpaperLang) => {
    if (preset === 'traffic') {
      if (lang === 'hi') {
        return [
          { sec: 'MV Act धारा 130', title: 'वाहन की चाबी छीनना गैर-कानूनी', desc: 'बिना सीज़र मेमो के चाबी नहीं ले सकते। यदि अधिकारी चाबी निकालता है तो विरोध दर्ज करें।' },
          { sec: 'MV Act धारा 207', title: '₹100+ चालान केवल SI (1+ स्टार) काट सकता है', desc: 'कॉन्स्टेबल या हेड कॉन्स्टेबल केवल दस्तावेज चेक कर सकते हैं, भारी चालान नहीं काट सकते।' },
          { sec: 'CMVR नियम 139', title: 'DigiLocker / mParivahan 100% मान्य है', desc: 'डिजिटल आरसी और ड्राइविंग लाइसेंस कानूनी रूप से भौतिक प्रति के समान वैध हैं।' },
          { sec: 'Towing Directives', title: 'गाड़ी में बैठे व्यक्ति के साथ टो नहीं कर सकते', desc: 'यदि नागरिक वाहन में बैठा है तो ट्रैफिक पुलिस वाहन टो नहीं कर सकती, केवल चालान दे सकती है।' },
          { sec: 'Sec 185 MV Act', title: 'ब्रेथलाइज़र टेस्ट: स्टेराइल ट्यूब की माँग करें', desc: 'शराब जाँच में सीलबंद नई ट्यूब की माँग करें और अस्पताल में मेडिकल टेस्ट का अधिकार रखें।' }
        ];
      }
      if (lang === 'te') {
        return [
          { sec: 'MV Act సెక్షన్ 130', title: 'వాహనం కీలను లాక్కోవడం చట్టవిరుద్ధం', desc: 'సీజర్ మెమో లేకుండా పోలీసులు కీలను తీసుకోలేరు. కీలను లాగడం నేరం.' },
          { sec: 'MV Act సెక్షన్ 207', title: '₹100 కంటే ఎక్కువ చలానా SI మాత్రమే వేయగలరు', desc: 'కానిస్టేబుల్ కేవలం తనిఖీ చేయగలరు. పెద్ద చలానాలు వేయడానికి అధికారం లేదు.' },
          { sec: 'CMVR రూల్ 139', title: 'డిజిలాకర్ / mParivahan 100% చట్టబద్ధం', desc: 'డిజిటల్ లైసెన్స్ & ఆర్సీలను తప్పనిసరిగా అంగీకరించాలి.' },
          { sec: 'టోయింగ్ రూల్స్', title: 'వాహనంలో మనుషులుంటే టో చేయడం నిషేధం', desc: 'వాహనంలో కూర్చుని ఉన్నప్పుడు టో చేయరాదు, చలానా మాత్రమే ఇవ్వాలి.' },
          { sec: 'Sec 185 MV Act', title: 'బ్రీత్‌లైజర్ టెస్ట్: తాజా ట్యూబ్ అడిగే హక్కు', desc: 'కొత్త ట్యూబ్‌ను డిమాండ్ చేయవచ్చు మరియు ఆసుపత్రి రక్త పరీక్షను కోరవచ్చు.' }
        ];
      }
      return [
        { sec: 'MV Act Sec 130', title: 'Snatching Vehicle Keys is Strictly Illegal', desc: 'Police cannot snatch vehicle keys without formal seizure memo. Key extraction is an offense.' },
        { sec: 'MV Act Sec 207', title: 'Challan >₹100 Requires Sub-Inspector (1+ Star)', desc: 'Constables and Head Constables can only inspect; they cannot levy compounding heavy fines.' },
        { sec: 'CMVR Rule 139', title: 'DigiLocker & mParivahan are 100% Valid by Law', desc: 'Electronic DL and RC on government apps carry full legal parity with physical documents.' },
        { sec: 'Towing Directives', title: 'Cannot Tow Vehicle with Citizen Seated Inside', desc: 'Traffic police are legally barred from towing if any occupant is sitting in the car or bike.' },
        { sec: 'MV Act Sec 185', title: 'Breathalyzer: Right to Fresh Sterile Straw', desc: 'Demand a sealed, unused mouthpiece for testing. You may also demand hospital medical test.' }
      ];
    }

    if (preset === 'women') {
      if (lang === 'hi') {
        return [
          { sec: 'धारा 43(5) BNSS', title: 'सूर्यास्त के बाद व सूर्योदय से पहले गिरफ्तारी वर्जित', desc: 'शाम 6 से सुबह 6 के बीच महिला की गिरफ्तारी प्रथम श्रेणी मजिस्ट्रेट के पूर्व आदेश बिना अवैध है।' },
          { sec: 'धारा 43(1) BNSS', title: 'गिरफ्तारी केवल महिला पुलिस अधिकारी द्वारा', desc: 'किसी भी महिला को पुरुष पुलिस छू नहीं सकता। शारीरिक तलाशी केवल शालीनता से महिला अधिकारी करेगी।' },
          { sec: 'धारा 173 BNSS', title: 'ज़ीरो एफआईआर (Zero FIR) का मौलिक अधिकार', desc: 'अपराध किसी भी क्षेत्र में हुआ हो, किसी भी नजदीकी थाने में तुरंत प्राथमिकी दर्ज कराना कानूनी अधिकार है।' },
          { sec: 'धारा 51 BNSS', title: 'मेडिकल परीक्षण केवल महिला डॉक्टर द्वारा', desc: 'हिरासत में ली गई महिला का स्वास्थ्य परीक्षण केवल अधिकृत महिला चिकित्सा अधिकारी ही कर सकती है।' },
          { sec: 'NALSA / Art 39A', title: 'मुफ्त कानूनी सहायता एवं वकील का अधिकार (15100)', desc: 'थाने में हिरासत में आते ही राज्य द्वारा निःशुल्क सरकारी वकील उपलब्ध कराना बाध्यकारी है।' }
        ];
      }
      if (lang === 'te') {
        return [
          { sec: 'సెక్షన్ 43(5) BNSS', title: 'సూర్యాస్తమయం తర్వాత మహిళల అరెస్ట్ నిషేధం', desc: 'సాయంత్రం 6 నుండి ఉదయం 6 మధ్య మేజిస్ట్రేట్ ముందస్తు అనుమతి లేకుండా అరెస్ట్ చేయరాదు.' },
          { sec: 'సెక్షన్ 43(1) BNSS', title: 'కేవలం మహిళా పోలీసులు మాత్రమే అరెస్ట్ చేయాలి', desc: 'పురుష పోలీసులు మహిళలను తాకరాదు. సోదాలు మహిళా సిబ్బంది మాత్రమే చేయాలి.' },
          { sec: 'సెక్షన్ 173 BNSS', title: 'జీరో ఎఫ్ఐఆర్ (Zero FIR) నమోదు హక్కు', desc: 'ఏ పోలీస్ స్టేషన్‌లోనైనా పరిధి సంబంధం లేకుండా వెంటనే ఎఫ్ఐఆర్ నమోదు చేయవచ్చు.' },
          { sec: 'సెక్షన్ 51 BNSS', title: 'మహిళా డాక్టర్ ద్వారానే మెడికల్ పరీక్ష', desc: 'మహిళలకు వైద్య పరీక్షలు మహిళా మెడికల్ ఆఫీసర్ సమక్షంలోనే జరగాలి.' },
          { sec: 'ఉచిత న్యాయం', title: 'ఉచిత లీగల్ ఎయిడ్ లాయర్ హక్కు (15100)', desc: 'ప్రభుత్వ ఖర్చుతో ఉచిత న్యాయవాదిని పొందే రాజ్యాంగ హక్కు ఉంది.' }
        ];
      }
      return [
        { sec: 'Sec 43(5) BNSS', title: 'No Arrest Between Sunset (6PM) and Sunrise (6AM)', desc: 'Arrest of a woman at night requires prior written permission of Judicial Magistrate 1st Class.' },
        { sec: 'Sec 43(1) BNSS', title: 'Arrest Only by Female Police Officers', desc: 'Male officers cannot touch a woman during arrest. Search must be done strictly by a female officer.' },
        { sec: 'Sec 173 BNSS', title: 'Right to File Zero FIR Anywhere in India', desc: 'Police cannot refuse an FIR stating lack of territorial jurisdiction; it must be registered immediately.' },
        { sec: 'Sec 51 BNSS', title: 'Medical Examination by Female Doctor Only', desc: 'Female detainees can only be physically examined by or under the supervision of a female medical officer.' },
        { sec: 'Art 39A / NALSA', title: 'Immediate Free Legal Aid Advocate (Helpline 15100)', desc: 'Right to free legal representation at government cost from the very moment of detention.' }
      ];
    }

    // General citizen preset (Default)
    if (lang === 'hi') {
      return [
        { sec: 'धारा 47 BNSS', title: 'गिरफ्तारी का लिखित कारण व ज़मानत की स्थिति', desc: 'अधिकारी को लिखित में अपराध और ज़मानती/गैर-ज़मानती बताना अनिवार्य है।' },
        { sec: 'धारा 48 BNSS', title: 'परिवार या वकील को तुरंत सूचना देने का अधिकार', desc: 'हिरासत में लिए जाने के तुरंत बाद नामित व्यक्ति को सूचित करना पुलिस की कानूनी ड्यूटी है।' },
        { sec: 'धारा 43(5) BNSS', title: 'महिलाओं की गिरफ्तारी केवल महिला पुलिस द्वारा', desc: 'सूर्यास्त के बाद व सूर्योदय से पहले (शाम 6 से सुबह 6) महिला की गिरफ्तारी वर्जित है।' },
        { sec: 'MV Act 130 / 207', title: 'ट्रैफिक चेकिंग: वाहन की चाबी छीनना गैर-कानूनी', desc: 'बिना सीज़र मेमो के चाबी नहीं ले सकते। ₹100 से ऊपर चालान केवल SI (1+ स्टार) काट सकता है।' },
        { sec: 'अनुच्छेद 20(3) व SC', title: 'बिना वारंट फोन अनलॉक या सर्च नहीं करवा सकते', desc: 'पुलिस आपका फोन या व्हाट्सएप पासवर्ड जबरन खोलने के लिए बाध्य नहीं कर सकती।' }
      ];
    }
    if (lang === 'te') {
      return [
        { sec: 'సెక్షన్ 47 BNSS', title: 'అరెస్ట్ లిఖితపూర్వక కారణాలు & బెయిల్ సమాచారం', desc: 'అధికారి లిఖితపూర్వకంగా నేరం మరియు బెయిల్ వివరాలు తెలియజేయడం తప్పనిసరి.' },
        { sec: 'సెక్షన్ 48 BNSS', title: 'కుటుంబానికి లేదా లాయర్‌కు వెంటనే సమాచారం ఇచ్చే హక్కు', desc: 'అదుపులోకి తీసుకున్న వెంటనే బంధువులకు సమాచారం అందించడం పోలీసుల విధి.' },
        { sec: 'సెక్షన్ 43(5) BNSS', title: 'మహిళల అరెస్ట్ కేవలం మహిళా పోలీసుల ద్వారానే', desc: 'సూర్యాస్తమయం తర్వాత & సూర్యోదయానికి ముందు మహిళల అరెస్ట్ నిషేధం.' },
        { sec: 'MV Act 130 / 207', title: 'ట్రాఫిక్ చెకింగ్: కీలను లాక్కోవడం చట్టవిరుద్ధం', desc: 'సీజర్ మెమో లేకుండా కీలను తీసుకోరాదు. ₹100 పైన చలానా SI మాత్రమే వేయగలరు.' },
        { sec: 'ఆర్టికల్ 20(3)', title: 'వారెంట్ లేకుండా ఫోన్ అన్‌లాక్ చేయమని బలవంతం చేయరాదు', desc: 'కోర్టు ఆదేశం లేకుండా ఫోన్ లేదా వాట్సాప్ పాస్‌వర్డ్ ఇవ్వమని ఒత్తిడి చేయకూడదు.' }
      ];
    }
    return [
      { sec: 'Sec 47 BNSS', title: 'Right to Written Grounds of Arrest & Bail Status', desc: 'Police MUST state exact reasons in writing and whether the offense is bailable.' },
      { sec: 'Sec 48 BNSS', title: 'Right to Inform Family or Advocate Within 24h', desc: 'Police are legally mandated to notify your nominated relative or lawyer immediately.' },
      { sec: 'Sec 43(5) BNSS', title: 'Women Arrest: Only by Female Officers (6 AM - 6 PM)', desc: 'No woman can be arrested after sunset or before sunrise without Magistrate prior order.' },
      { sec: 'MV Act 130 / 207', title: 'Traffic Stop: Officers Cannot Confiscate Car Keys', desc: 'Seizing keys without formal memo is illegal. Only Sub-Inspector (1+ star) can fine >₹100.' },
      { sec: 'Art 20(3) / SC Precedent', title: 'No Forced Phone Search or Passcode Disclosure', desc: 'Police have no power to forcibly unlock your phone or browse chats without court warrant.' }
    ];
  };

  // Generate 1080x1920 HD Lockscreen Wallpaper using HTML5 Canvas
  const handleGenerateAndDownloadWallpaper = () => {
    setIsGeneratingWallpaper(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isHi = wallpaperLang === 'hi';
      const isTe = wallpaperLang === 'te';

      // 1. Deep Midnight Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#060B14');
      bgGrad.addColorStop(0.25, '#0B132B');
      bgGrad.addColorStop(0.7, '#081024');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Subtle Background Grid Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1080; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1920);
        ctx.stroke();
      }
      for (let y = 0; y < 1920; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1080, y);
        ctx.stroke();
      }

      // Top Indian Tricolor glowing bar
      const flagHeight = 14;
      ctx.fillStyle = '#F59E0B'; // Saffron
      ctx.fillRect(0, 0, 360, flagHeight);
      ctx.fillStyle = '#FFFFFF'; // White
      ctx.fillRect(360, 0, 360, flagHeight);
      ctx.fillStyle = '#10B981'; // Emerald
      ctx.fillRect(720, 0, 360, flagHeight);

      // Top Clock Headroom Marker
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isHi 
          ? '• भारत का संविधान • नागरिकों के मौलिक अधिकार •' 
          : isTe 
          ? '• భారత రాజ్యాంగం • పౌర హక్కులు •' 
          : '• CONSTITUTION OF INDIA • CITIZEN RIGHTS •', 
        540, 
        460
      );

      // Header Banner (Y: 510)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('⚖️ NYAYANOW', 540, 520);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '700 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
      
      const subtitleText = wallpaperPreset === 'traffic'
        ? (isHi ? 'ट्रैफिक पुलिस चेकिंग अधिकार (मोटर वाहन अधिनियम 2019)' : isTe ? 'ట్రాఫిక్ పోలీస్ తనిఖీ హక్కులు (MV Act)' : 'TRAFFIC STOP & VEHICLE INSPECTION RIGHTS')
        : wallpaperPreset === 'women'
        ? (isHi ? 'महिला सुरक्षा एवं रात्रि गिरफ्तारी सुरक्षा (BNSS 2023)' : isTe ? 'మహిళా రక్షణ & రాత్రి అరెస్ట్ రక్షణ (BNSS 2023)' : 'WOMEN SAFETY & NIGHT ARREST PROTECTIONS')
        : (isHi ? 'पुलिस पूछताछ एवं गिरफ्तारी में आपके अधिकार (BNSS 2023)' : isTe ? 'పోలీస్ విచారణ & అరెస్ట్ హక్కులు (BNSS 2023)' : 'POLICE ENCOUNTER & ARREST RIGHTS (BNSS 2023)');

      ctx.fillText(subtitleText, 540, 565);

      // Urgent Action Card (Y: 610 - 770)
      const alertGrad = ctx.createLinearGradient(60, 610, 1020, 770);
      alertGrad.addColorStop(0, '#DC2626');
      alertGrad.addColorStop(1, '#991B1B');
      ctx.fillStyle = alertGrad;
      roundRect(ctx, 60, 610, 960, 160, 24);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        isHi ? '🚨 पहला कदम: पुलिस अधिकारी से पूछें:' : isTe ? '🚨 మొదటి ప్రశ్న: అధికారిని అడగండి:' : '🚨 STEP 1: ASK THE OFFICER IMMEDIATELY:', 
        95, 
        665
      );

      ctx.font = '700 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
      ctx.fillStyle = '#FEF3C7';
      ctx.fillText(
        isHi ? '"क्या मैं जाने के लिए स्वतंत्र हूँ या मुझे हिरासत में लिया गया है?"' : isTe ? '"నన్ను అదుపులోకి తీసుకున్నారా లేక నేను వెళ్లవచ్చా?"' : '"Am I being detained, or am I free to go?"', 
        95, 
        710
      );
      ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
      ctx.fillStyle = '#FEE2E2';
      ctx.fillText(
        isHi ? 'हिरासत में हैं तो गिरफ्तारी का लिखित कारण (BNSS धारा 47) माँगें।' : isTe ? 'అదుపులో ఉంటే అరెస్ట్ లిఖితపూర్వక కారణాలు (BNSS సెక్షన్ 47) అడగండి.' : 'If detained, demand written grounds of arrest under BNSS Sec 47.', 
        95, 
        745
      );

      // 5 Core Citizen Protections (Y: 790 - 1460)
      const rightsList = getRightsForPreset(wallpaperPreset, wallpaperLang);

      let cardY = 790;
      rightsList.forEach((r, idx) => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        roundRect(ctx, 60, cardY, 960, 115, 18);
        ctx.fill();
        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 1.5;
        roundRect(ctx, 60, cardY, 960, 115, 18);
        ctx.stroke();

        const colors = ['#38BDF8', '#F59E0B', '#EC4899', '#10B981', '#A855F7'];
        ctx.fillStyle = colors[idx % colors.length];
        roundRect(ctx, 60, cardY, 10, 115, 6);
        ctx.fill();

        ctx.fillStyle = colors[idx % colors.length];
        ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(r.sec, 990, cardY + 38);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(r.title, 95, cardY + 40);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '500 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
        ctx.fillText(r.desc, 95, cardY + 80);

        cardY += 135;
      });

      // Emergency Helpline & Custom Lawyer Box (Y: 1490 - 1730)
      const sosBoxGrad = ctx.createLinearGradient(60, 1490, 1020, 1730);
      sosBoxGrad.addColorStop(0, '#0F172A');
      sosBoxGrad.addColorStop(1, '#0B1120');
      ctx.fillStyle = sosBoxGrad;
      roundRect(ctx, 60, 1490, 960, 240, 24);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      roundRect(ctx, 60, 1490, 960, 240, 24);
      ctx.stroke();

      ctx.fillStyle = '#F59E0B';
      ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isHi ? '📞 24×7 राष्ट्रीय आपातकालीन कानूनी हेल्पलाइन' : isTe ? '📞 24×7 జాతీయ అత్యవసర చట్టపరమైన హెల్ప్‌లైన్లు' : '📞 24×7 NATIONAL EMERGENCY & LEGAL HELPLINES', 
        540, 
        1535
      );

      const helplines = [
        { num: '112', label: isHi ? 'राष्ट्रीय आपातकाल' : isTe ? 'జాతీయ ఎమర్జెన్సీ' : 'All Emergencies' },
        { num: '15100', label: isHi ? 'मुफ्त कानूनी सहायता' : isTe ? 'ఉచిత లీగల్ ఎయిడ్' : 'Free Legal Aid' },
        { num: '1091', label: isHi ? 'महिला हेल्पलाइन' : isTe ? 'మహిళా హెల్ప్‌లైన్' : 'Women Safety' },
        { num: '1064', label: isHi ? 'एंटी करप्शन' : isTe ? 'యాంటీ కరప్షన్' : 'Anti-Corruption' }
      ];

      const itemW = 210;
      const startX = 85;
      helplines.forEach((hl, i) => {
        const hx = startX + i * 230;
        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        roundRect(ctx, hx, 1560, itemW, 75, 12);
        ctx.fill();

        ctx.fillStyle = '#10B981';
        ctx.font = '900 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hl.num, hx + itemW / 2, 1598);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Telugu", sans-serif';
        ctx.fillText(hl.label, hx + itemW / 2, 1624);
      });

      if (emergencyPhone.trim()) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        roundRect(ctx, 85, 1650, 890, 60, 12);
        ctx.fill();
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1;
        roundRect(ctx, 85, 1650, 890, 60, 12);
        ctx.stroke();

        ctx.fillStyle = '#FCA5A5';
        ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `🚨 ADVOCATE / FAMILY SOS: ${emergencyPhone.trim()} (RIGHT TO 1 PHONE CALL UNDER SEC 48)`, 
          540, 
          1688
        );
      } else {
        ctx.fillStyle = '#64748B';
        ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OFFICER: SEC 48 BNSS MANDATES NOTIFYING FAMILY/LAWYER OF DETAINEE IMMEDIATELY', 540, 1685);
      }

      ctx.fillStyle = '#64748B';
      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'REPUBLIC OF INDIA • SOVEREIGN CITIZEN PROTECTION SUITE • NYAYANOW.IN', 
        540, 
        1810
      );

      ctx.fillStyle = '#475569';
      ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(
        'LEGAL DIRECTIVE: THIS LOCKSCREEN IMAGE CONSTITUTES AN ASSERTION OF RIGHTS UNDER ART 20(3) & ART 21', 
        540, 
        1840
      );

      // Download Canvas as PNG
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NyayaNow-Lockscreen-Rights-${wallpaperPreset.toUpperCase()}-${wallpaperLang.toUpperCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsGeneratingWallpaper(false);
        setDownloadedWallpaper(true);
        if (onShowToast) {
          onShowToast('✓ 1080×1920 HD Lockscreen Wallpaper downloaded! Set it as your phone lock screen.');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Wallpaper generation failed:', err);
      setIsGeneratingWallpaper(false);
    }
  };

  // Generate self-contained, interactive offline HTML Pocket App bundle
  const handleDownloadOfflineCard = () => {
    const offlineContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>NyayaNow • Offline Emergency Citizen Rights Suite (BNSS 2023)</title>
  <style>
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #0B1120;
      color: #F8FAFC;
      line-height: 1.5;
      padding-bottom: 40px;
    }
    .header {
      background: #0F172A;
      border-bottom: 2px solid #334155;
      padding: 16px 20px;
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header h1 {
      margin: 0;
      font-size: 19px;
      font-weight: 900;
      color: #F59E0B;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge {
      background: rgba(16, 185, 129, 0.2);
      color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .container {
      max-width: 680px;
      margin: 0 auto;
      padding: 16px;
    }
    .urgent-banner {
      background: linear-gradient(135deg, #DC2626, #991B1B);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 16px;
      box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4);
    }
    .urgent-title {
      font-size: 15px;
      font-weight: 800;
      color: #FFF;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .urgent-question {
      font-size: 18px;
      font-weight: 900;
      color: #FEF08A;
      margin: 8px 0;
    }
    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: 14px;
      flex-wrap: wrap;
    }
    .btn-sos {
      flex: 1;
      min-width: 140px;
      background: #FFFFFF;
      color: #DC2626;
      font-weight: 900;
      padding: 12px;
      border-radius: 12px;
      text-decoration: none;
      text-align: center;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .btn-flashcard {
      background: #1E293B;
      color: #38BDF8;
      border: 1px solid #38BDF8;
      padding: 12px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
      flex: 1;
      min-width: 140px;
      text-align: center;
    }
    .flashcard-display {
      display: none;
      background: #020617;
      border: 2px solid #38BDF8;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      text-align: center;
    }
    .flashcard-text {
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.4;
      margin-bottom: 12px;
    }
    .card {
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    .card-title {
      font-size: 15px;
      font-weight: 800;
      color: #F8FAFC;
    }
    .card-sec {
      font-size: 11px;
      font-weight: 800;
      color: #F59E0B;
      background: rgba(245, 158, 11, 0.15);
      padding: 2px 8px;
      border-radius: 6px;
    }
    .card-desc {
      font-size: 13px;
      color: #CBD5E1;
      margin: 0;
    }
    .helpline-box {
      background: #0F172A;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin-top: 20px;
    }
    .helpline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 10px;
    }
    .helpline-item {
      background: #1E293B;
      padding: 12px;
      border-radius: 10px;
      text-decoration: none;
      color: #FFF;
      display: flex;
      flex-direction: column;
    }
    .helpline-num {
      font-size: 20px;
      font-weight: 900;
      color: #34D399;
    }
    .helpline-label {
      font-size: 11px;
      color: #94A3B8;
    }
    .footer {
      text-align: center;
      padding: 24px 20px;
      color: #64748B;
      font-size: 12px;
    }
    .speech-btn {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.4);
      color: #38BDF8;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>⚖️ NyayaNow</h1>
    <span class="badge">100% OFFLINE</span>
  </div>

  <div class="container">
    <div class="urgent-banner">
      <div class="urgent-title">🚨 IMMEDIATE POLICE CHECKPOINT RULE:</div>
      <div class="urgent-question">"Am I being detained, or am I free to go?"</div>
      <p style="font-size: 13px; color: #FEE2E2;">
        If detained, demand the written arrest memo and grounds of arrest under BNSS Section 47.
      </p>
      <div class="btn-row">
        <a href="tel:112" class="btn-sos">📞 Dial 112 SOS</a>
        <button class="btn-flashcard" onclick="toggleFlashcard()">📱 Show Flashcard to Police</button>
      </div>
    </div>

    <div id="flashcard" class="flashcard-display">
      <div class="flashcard-text">
        "OFFICER: UNDER SECTION 47 BNSS 2023, I AM RESPECTFULLY REQUESTING THE WRITTEN GROUNDS OF ARREST AND MEMO."
      </div>
      <p style="font-size: 12px; color: #94A3B8;">Hold this phone screen up to the police officer or vehicle camera.</p>
    </div>

    <!-- Rights List -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">1. Written Arrest Memo & Bail Status</span>
        <span class="card-sec">Sec 47 BNSS</span>
      </div>
      <p class="card-desc">Police MUST state exact reasons in writing, record the time and date, and inform you whether the offense is bailable.</p>
      <button class="speech-btn" onclick="speakText('Officer, under Section 47 of BNSS 2023, you must furnish the grounds of arrest in writing. Is this bailable?')">
        🔊 Speak this to officer
      </button>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">2. Mandatory Notification of Family/Lawyer</span>
        <span class="card-sec">Sec 48 BNSS</span>
      </div>
      <p class="card-desc">Police have a strict legal duty to notify your nominated friend, relative, or lawyer within 24 hours of detention.</p>
      <button class="speech-btn" onclick="speakText('Under Section 48 BNSS, please notify my family and advocate immediately.')">
        🔊 Speak this to officer
      </button>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">3. Women Night Arrest Prohibition</span>
        <span class="card-sec">Sec 43(5) BNSS</span>
      </div>
      <p class="card-desc">No woman can be arrested after sunset or before sunrise (6 PM to 6 AM) without prior written permission of Judicial Magistrate.</p>
      <button class="speech-btn" onclick="speakText('Under Section 43 subsection 5 of BNSS, female arrest between sunset and sunrise is barred without prior Judicial Magistrate warrant.')">
        🔊 Speak this to officer
      </button>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">4. Vehicle Key Snatching Prohibited</span>
        <span class="card-sec">MV Act 130</span>
      </div>
      <p class="card-desc">Traffic police have zero authority to snatch keys from ignition. Fines above ₹100 require Sub-Inspector (1+ star) rank.</p>
      <button class="speech-btn" onclick="speakText('Under Motor Vehicles Act, key confiscation is not authorized without seizure memo. Please produce your name badge.')">
        🔊 Speak this to officer
      </button>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">5. Phone & Digital Privacy</span>
        <span class="card-sec">Art 20(3)</span>
      </div>
      <p class="card-desc">Police cannot forcibly compel you to unlock your phone, disclose passcodes, or scroll your WhatsApp chats without a court warrant.</p>
      <button class="speech-btn" onclick="speakText('Under Article 20 clause 3 of the Constitution, I decline to disclose my phone passcode without a judicial warrant.')">
        🔊 Speak this to officer
      </button>
    </div>

    <div class="helpline-box">
      <div style="font-weight: 800; font-size: 14px; color: #F59E0B;">📞 Emergency Direct Dialers (Zero Internet Required):</div>
      <div class="helpline-grid">
        <a href="tel:112" class="helpline-item">
          <span class="helpline-num">112</span>
          <span class="helpline-label">National Emergency</span>
        </a>
        <a href="tel:15100" class="helpline-item">
          <span class="helpline-num">15100</span>
          <span class="helpline-label">Free Legal Aid (NALSA)</span>
        </a>
        <a href="tel:1091" class="helpline-item">
          <span class="helpline-num">1091</span>
          <span class="helpline-label">Women Safety Helpline</span>
        </a>
        <a href="tel:1064" class="helpline-item">
          <span class="helpline-num">1064</span>
          <span class="helpline-label">Anti-Corruption Bureau</span>
        </a>
      </div>
    </div>

    <div class="footer">
      NyayaNow • Sovereign Citizen Rights Suite (BNSS 2023)<br>
      Saved on your device storage • Works 100% in Airplane Mode
    </div>
  </div>

  <script>
    function toggleFlashcard() {
      var el = document.getElementById('flashcard');
      el.style.display = (el.style.display === 'block') ? 'none' : 'block';
      if (el.style.display === 'block') {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function speakText(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        u.pitch = 1.0;
        window.speechSynthesis.speak(u);
      } else {
        alert(text);
      }
    }
  </script>
</body>
</html>`;

    const blob = new Blob([offlineContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NyayaNow-Offline-Pocket-App-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedOffline(true);
  };

  // Open Printable Wallet Card
  const handlePrintWalletCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>NyayaNow Pocket Emergency Rights Card</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fff; color: #000; padding: 20px; }
          .instructions { margin-bottom: 25px; font-size: 13px; color: #555; }
          .wallet-grid { display: flex; gap: 20px; flex-wrap: wrap; }
          .wallet-card {
            width: 85.6mm;
            height: 53.98mm;
            border: 2px dashed #000;
            border-radius: 4mm;
            padding: 3.5mm;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #fff;
            page-break-inside: avoid;
          }
          .title { font-size: 11pt; font-weight: 900; display: flex; justify-content: space-between; border-bottom: 1.5px solid #000; padding-bottom: 1.5mm; }
          .rule { font-size: 7.2pt; line-height: 1.25; margin: 0.8mm 0; }
          .helpline { font-size: 7.5pt; font-weight: 800; border-top: 1px solid #000; padding-top: 1.5mm; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="instructions">
          <h3>✂️ NyayaNow Printable Pocket Wallet Card (BNSS 2023)</h3>
          <p>Cut along the dashed borders. Fits perfectly inside credit card slots, purse, or vehicle glove compartment.</p>
        </div>

        <div class="wallet-grid">
          <!-- FRONT: ARREST & DETENTION -->
          <div class="wallet-card">
            <div class="title">
              <span>⚖️ NYAYANOW CITIZEN RIGHTS</span>
              <span>BNSS 2023 (FRONT)</span>
            </div>
            <div class="rule"><strong>1. Ask:</strong> "Am I free to go?" If detained, demand written grounds (Sec 47).</div>
            <div class="rule"><strong>2. Inform Family:</strong> Right to notify relative/lawyer immediately (Sec 48).</div>
            <div class="rule"><strong>3. Women Arrest:</strong> 6 AM - 6 PM only, by female officer (Sec 43(5)).</div>
            <div class="rule"><strong>4. Search Memo:</strong> Any search must be recorded in writing with witnesses.</div>
            <div class="rule"><strong>5. 24h Magistrate:</strong> Mandatory presentation before judge within 24 hours (Sec 57).</div>
            <div class="helpline">
              <span>Emergency: 112</span>
              <span>Legal Aid: 15100</span>
              <span>Women: 1091</span>
            </div>
          </div>

          <!-- BACK: TRAFFIC & DIGITAL PRIVACY -->
          <div class="wallet-card">
            <div class="title">
              <span>⚖️ TRAFFIC & PRIVACY RIGHTS</span>
              <span>(BACK)</span>
            </div>
            <div class="rule"><strong>1. Key Snatching:</strong> Police cannot snatch keys without seizure memo (MV 130).</div>
            <div class="rule"><strong>2. Challan Authority:</strong> Fine &gt;₹100 requires Sub-Inspector 1+ star rank (MV 207).</div>
            <div class="rule"><strong>3. DigiLocker:</strong> Digital RC and Driving License 100% legal (CMVR 139).</div>
            <div class="rule"><strong>4. Phone Privacy:</strong> No forced unlock without court warrant (Art 20(3)).</div>
            <div class="rule"><strong>5. Towing:</strong> Cannot tow vehicle if any citizen is sitting inside.</div>
            <div class="helpline">
              <span>Anti-Corruption: 1064</span>
              <span>Cyber Crime: 1930</span>
              <span>Child: 1098</span>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Test Speech Audio in Offline Simulator or Live Mockup
  const handleTestSpeech = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) {
      if (onShowToast) onShowToast('Audio speech is supported in mobile browsers.');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      return;
    }

    setIsPlayingSpeech(true);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingSpeech(false);
    utterance.onerror = () => setIsPlayingSpeech(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NyayaNow - India Police Rights & Citizen Protection',
          text: 'Verified 30-second Indian citizen rights under BNSS 2023. Works 100% offline with instant emergency lockscreen guide.',
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      if (onShowToast) onShowToast('Link copied! Share with family and friends.');
    }
  };

  const activeRights = getRightsForPreset(wallpaperPreset, wallpaperLang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-700/80 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor top glowing strip */}
        <div className="h-1.5 w-full flex shrink-0">
          <div className="flex-1 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
          <div className="flex-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
          <div className="flex-1 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
        </div>

        {/* Modal Header */}
        <div className="relative px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="absolute right-8 top-1 opacity-10 pointer-events-none">
            <AshokaChakra size={110} speed="slow" color="#38bdf8" strokeWidth={1.5} />
          </div>

          <div className="flex items-center space-x-3 relative z-10">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/25 shrink-0">
              <Shield className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-sm xs:text-base sm:text-lg font-black text-white tracking-tight">
                  NyayaNow Mobile & Offline Rights Suite
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                  100% OFFLINE
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                Instant Emergency Protection • Zero Data Sent • BNSS 2023 Verified
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative z-10 cursor-pointer"
            aria-label="Close download modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Diagnostics Status Strip */}
        <div className="bg-slate-950/70 px-3 sm:px-4 py-2 border-b border-slate-800/80 flex items-center justify-around text-[10px] sm:text-[11px] text-slate-300 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Device Storage Ready</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5 font-medium text-amber-300">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Works in Airplane Mode</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5 font-medium text-sky-300">
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>0 Bytes Network Needed</span>
          </div>
        </div>

        {/* Clean 3-Pillar Tab Navigation */}
        <div className="px-2 sm:px-6 pt-2.5 pb-1 border-b border-slate-800 bg-slate-900/60 shrink-0">
          <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 bg-slate-950/90 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('suite')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                activeTab === 'suite'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate hidden xs:inline">Mobile App & Lockscreen</span>
              <span className="truncate xs:hidden">App Suite</span>
              <span className="hidden md:inline text-[9px] px-1.5 py-0.2 rounded-full bg-slate-950/80 text-amber-300 font-extrabold ml-1">
                COMBINED
              </span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Plane className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate hidden xs:inline">Offline Simulator</span>
              <span className="truncate xs:hidden">Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('wallet-card')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                activeTab === 'wallet-card'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate hidden xs:inline">Print Card</span>
              <span className="truncate xs:hidden">Card</span>
            </button>
          </div>
        </div>

        {/* Tab Body Contents */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: COMBINED FEATURE 1 & FEATURE 2 (MOBILE APP + LOCKSCREEN SUITE) */}
          {activeTab === 'suite' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* LEFT COLUMN: LIVE INTERACTIVE SMARTPHONE MOCKUP (DUAL APP & LOCKSCREEN VIEWS) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  
                  {/* Mockup Display Mode Switcher */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs mb-3 w-full max-w-[270px]">
                    <button
                      onClick={() => setPhonePreviewMode('app')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        phonePreviewMode === 'app'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile App</span>
                    </button>
                    <button
                      onClick={() => setPhonePreviewMode('lockscreen')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        phonePreviewMode === 'lockscreen'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Lockscreen</span>
                    </button>
                  </div>

                  {/* Smartphone Chassis */}
                  <div className="w-64 sm:w-72 rounded-[2.4rem] bg-slate-950 border-4 border-slate-700 shadow-2xl overflow-hidden p-2.5 relative flex flex-col select-none">
                    {/* Dynamic Island / Bezel */}
                    <div className="h-4 w-20 bg-slate-850 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-slate-950"></span>
                    </div>

                    {/* PHONE SCREEN CONTENT */}
                    <div className="rounded-[1.6rem] bg-gradient-to-b from-[#060B14] via-[#0B132B] to-[#020617] p-3 text-white flex flex-col space-y-2 border border-slate-800 min-h-[380px]">
                      
                      {/* Tricolor Glowing Bar */}
                      <div className="h-1 w-full flex rounded-full overflow-hidden shrink-0">
                        <div className="flex-1 bg-amber-500"></div>
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-emerald-500"></div>
                      </div>

                      {/* Status Time */}
                      <div className="flex items-center justify-between text-[9px] text-slate-400 px-1 shrink-0">
                        <span className="font-bold text-white">09:41</span>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span>5G</span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* VIEW 1: LIVE MOBILE APP MODE */}
                      {phonePreviewMode === 'app' ? (
                        <div className="space-y-2 animate-in fade-in duration-150">
                          {/* App Topbar */}
                          <div className="flex items-center justify-between bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-[10px] font-black text-white">NyayaNow</span>
                            </div>
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold">
                              100% OFFLINE
                            </span>
                          </div>

                          {/* Emergency Step 1 Card */}
                          <div className="bg-red-950/80 border border-red-800/80 rounded-xl p-2 text-left">
                            <div className="text-[8px] font-black text-red-300">🚨 STEP 1: POLICE STOP</div>
                            <div className="text-[9px] font-black text-yellow-300 mt-0.5">
                              {wallpaperLang === 'hi' 
                                ? '"क्या मैं जाने को स्वतंत्र हूँ या हिरासत में?"' 
                                : wallpaperLang === 'te' 
                                ? '"నన్ను అదుపులోకి తీసుకున్నారా?"' 
                                : '"Am I free to go or detained?"'}
                            </div>
                            <div className="text-[7.5px] text-red-200 mt-0.5">
                              {wallpaperLang === 'hi' 
                                ? 'हिरासत में लिखित कारण (धारा 47) माँगें।' 
                                : 'If detained, demand Sec 47 memo.'}
                            </div>
                          </div>

                          {/* Quick Actions in App */}
                          <div className="grid grid-cols-2 gap-1.5">
                            <a 
                              href="tel:112"
                              className="p-1.5 rounded-lg bg-red-600 text-white text-[9px] font-black flex items-center justify-center gap-1 shadow-sm"
                            >
                              <Phone className="w-3 h-3" />
                              <span>112 SOS</span>
                            </a>
                            <button
                              onClick={() => handleTestSpeech(
                                "Officer, under Section 47 of BNSS 2023, you must furnish grounds of arrest in writing."
                              )}
                              className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[8.5px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Speak Right</span>
                            </button>
                          </div>

                          {/* Rights List Preview */}
                          <div className="space-y-1 text-left">
                            {activeRights.slice(0, 3).map((r, i) => (
                              <div key={i} className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[8px]">
                                <div className="flex justify-between font-bold text-amber-400">
                                  <span>{r.sec}</span>
                                  <span className="text-[7px] text-emerald-400 font-normal">Active</span>
                                </div>
                                <div className="text-slate-200 truncate">{r.title}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* VIEW 2: LOCKSCREEN WALLPAPER MODE */
                        <div className="space-y-2 text-center animate-in fade-in duration-150">
                          {/* Big Lockscreen Clock */}
                          <div className="pt-1">
                            <div className="text-3xl font-black text-white tracking-tight">09:41</div>
                            <div className="text-[9px] text-slate-400 font-medium">Sunday, October 11</div>
                          </div>

                          {/* Lockscreen Header */}
                          <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                            <div className="text-[10px] font-black text-amber-400">⚖️ NYAYANOW RIGHTS</div>
                            <div className="text-[7.5px] text-sky-300">
                              {wallpaperPreset === 'traffic' 
                                ? 'MV ACT TRAFFIC CHECK' 
                                : wallpaperPreset === 'women' 
                                ? 'WOMEN PROTECTION (BNSS)' 
                                : 'POLICE ENCOUNTER (BNSS 2023)'}
                            </div>
                          </div>

                          {/* Question */}
                          <div className="bg-red-950/70 border border-red-800/80 rounded-lg p-1.5 text-left">
                            <div className="text-[7.5px] font-bold text-red-300">🚨 STEP 1: ASK IMMEDIATELY:</div>
                            <div className="text-[8.5px] font-black text-yellow-300">
                              {wallpaperLang === 'hi' ? '"क्या मैं जाने को स्वतंत्र हूँ?"' : wallpaperLang === 'te' ? '"నన్ను అదుపులోకి తీసుకున్నారా?"' : '"Am I free to go or detained?"'}
                            </div>
                          </div>

                          {/* Rights Teaser */}
                          <div className="space-y-1 text-left text-[7.5px]">
                            {activeRights.slice(0, 3).map((r, i) => (
                              <div key={i} className="p-1 rounded bg-slate-900/90 border border-slate-800">
                                <span className="font-bold text-amber-400">{r.sec}: </span>
                                <span className="text-slate-200">{r.title}</span>
                              </div>
                            ))}
                          </div>

                          {/* SOS Contact Box */}
                          <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800 text-[7.5px]">
                            <div className="text-emerald-400 font-extrabold">SOS: 112 • NALSA: 15100</div>
                            {emergencyPhone.trim() && (
                              <div className="text-red-400 font-bold truncate mt-0.5">
                                📞 {emergencyPhone.trim()}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 mt-2">
                    Live Phone Mockup • Toggle modes above
                  </span>
                </div>

                {/* RIGHT COLUMN: UNIFIED CUSTOMIZER & DUAL 1-TAP ACTION CENTER */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Top Combined Customizer Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-850 via-slate-850 to-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          Personalize Your Offline Protection
                        </h4>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        Instant Live Update
                      </span>
                    </div>

                    {/* Language & Preset Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Language */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Language:
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-700">
                          <button
                            onClick={() => setWallpaperLang('en')}
                            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              wallpaperLang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            English
                          </button>
                          <button
                            onClick={() => setWallpaperLang('hi')}
                            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              wallpaperLang === 'hi' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            हिंदी
                          </button>
                          <button
                            onClick={() => setWallpaperLang('te')}
                            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              wallpaperLang === 'te' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            తెలుగు
                          </button>
                        </div>
                      </div>

                      {/* Preset */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Situation Focus:
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-700 text-xs">
                          <button
                            onClick={() => setWallpaperPreset('general')}
                            className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              wallpaperPreset === 'general' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            🛡️ All
                          </button>
                          <button
                            onClick={() => setWallpaperPreset('traffic')}
                            className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              wallpaperPreset === 'traffic' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            🚗 Traffic
                          </button>
                          <button
                            onClick={() => setWallpaperPreset('women')}
                            className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              wallpaperPreset === 'women' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            👩 Women
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact Input */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Emergency SOS Contact (Lawyer / Family Phone):
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="e.g. Advocate / Relative: +91 98765 43210"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 text-xs text-white placeholder-slate-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DUAL 1-TAP ACTION POWER CARDS (COMBINED FEATURE 1 & FEATURE 2) */}
                  <div className="space-y-3">
                    
                    {/* ACTION 1: INSTANT MOBILE APP */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-850 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                            ⚡
                          </span>
                          <div>
                            <div className="text-xs font-black text-white">Feature 01: Instant Mobile App</div>
                            <div className="text-[10px] text-emerald-400 font-semibold">100% Offline • Zero Store Login • Launches in 50ms</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                          1-TAP
                        </span>
                      </div>

                      <button
                        id="combined-install-app-btn"
                        onClick={handleInstallPWA}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>
                          {downloadedOffline 
                            ? 'Offline Mobile App Saved ✓ (Click to Re-Download)' 
                            : 'Download & Install Mobile App (100% Offline)'}
                        </span>
                      </button>
                    </div>

                    {/* ACTION 2: EMERGENCY RIGHTS LOCKSCREEN PASS */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-500/15 via-slate-800 to-slate-850 border border-red-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-7 h-7 rounded-xl bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-xs">
                            🔒
                          </span>
                          <div>
                            <div className="text-xs font-black text-white">Feature 02: Emergency Lockscreen Pass</div>
                            <div className="text-[10px] text-red-300 font-semibold">Protects even if police order phone locked or seized</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold">
                          1080×1920 HD
                        </span>
                      </div>

                      <button
                        id="combined-download-wallpaper-btn"
                        onClick={handleGenerateAndDownloadWallpaper}
                        disabled={isGeneratingWallpaper}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:brightness-110 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {downloadedWallpaper ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
                        <span>
                          {isGeneratingWallpaper
                            ? 'Generating HD Wallpaper...'
                            : downloadedWallpaper
                            ? 'Wallpaper Downloaded ✓ (Click to Re-Download)'
                            : 'Download HD Lockscreen Wallpaper (.PNG)'}
                        </span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: OFFLINE MODE SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 border border-slate-700/80 space-y-3.5">
                
                {/* Airplane Mode Toggle Switch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      simulatedOffline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Plane className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Airplane Mode Simulator</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold">
                          ZERO NETWORK
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Test offline searching & voice readout with 0 internet calls
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSimulatedOffline(!simulatedOffline)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      simulatedOffline 
                        ? 'bg-emerald-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {simulatedOffline ? 'Simulating ON' : 'Turn ON'}
                  </button>
                </div>

                {/* Instant Zero-Latency Offline Search */}
                <div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Type e.g. 'Traffic', 'Arrest', 'Phone', 'Women', 'FIR'..."
                      value={simulatorQuery}
                      onChange={(e) => setSimulatorQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['Arrest', 'Traffic', 'Women', 'Phone', 'FIR'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSimulatorQuery(term)}
                        className={`text-[10px] px-2 py-1 rounded-lg border font-semibold cursor-pointer ${
                          simulatorQuery.toLowerCase() === term.toLowerCase()
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results / Rights Display */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {activeRights
                    .filter(r => 
                      !simulatorQuery.trim() || 
                      r.title.toLowerCase().includes(simulatorQuery.toLowerCase()) ||
                      r.sec.toLowerCase().includes(simulatorQuery.toLowerCase()) ||
                      r.desc.toLowerCase().includes(simulatorQuery.toLowerCase())
                    )
                    .map((r, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{r.title}</span>
                          <span className="text-[10px] text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded">
                            {r.sec}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{r.desc}</p>
                      </div>
                    ))}
                </div>

                {/* Speech Synthesizer Test */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-semibold">
                      Spoken Audio Readout:
                    </span>
                  </div>

                  <button
                    onClick={() => handleTestSpeech(
                      "Officer, under Section 47 of BNSS 2023, you must furnish the grounds of arrest in writing. Am I being detained, or am I free to go?"
                    )}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPlayingSpeech ? <Square className="w-3.5 h-3.5 text-red-400" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingSpeech ? 'Stop Speaking' : '🔊 Hear Audio Rights'}</span>
                  </button>
                </div>

                <button
                  id="modal-download-pocket-html-btn"
                  onClick={handleDownloadOfflineCard}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Standalone Pocket App (.HTML File)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRINTABLE WALLET CARD */}
          {activeTab === 'wallet-card' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 text-xs font-black flex items-center justify-center border border-sky-500/30">
                      🖨️
                    </span>
                    <h4 className="text-sm font-bold text-white">Printable 2-Sided Pocket Wallet Card</h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    Physical Card
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Keep a physical, credit-card sized emergency cheat sheet inside your wallet, vehicle glove compartment, or ID card lanyard. Ready for police encounters where phones are powered off or confiscated.
                </p>

                {/* Miniature Preview Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2.5 bg-slate-950 border border-dashed border-slate-700 rounded-xl space-y-1 text-slate-300">
                    <div className="flex items-center justify-between font-bold text-amber-400 border-b border-slate-800 pb-1">
                      <span>⚖️ CITIZEN RIGHTS</span>
                      <span>FRONT</span>
                    </div>
                    <div>• Sec 47 BNSS: Written grounds of arrest</div>
                    <div>• Sec 48 BNSS: Inform family/lawyer</div>
                    <div>• Sec 43(5) BNSS: Women 6AM-6PM only</div>
                    <div>• Sec 57 BNSS: 24h Magistrate mandate</div>
                    <div className="text-emerald-400 font-bold pt-0.5">SOS: 112 • Legal Aid: 15100</div>
                  </div>

                  <div className="p-2.5 bg-slate-950 border border-dashed border-slate-700 rounded-xl space-y-1 text-slate-300">
                    <div className="flex items-center justify-between font-bold text-amber-400 border-b border-slate-800 pb-1">
                      <span>⚖️ TRAFFIC & PRIVACY</span>
                      <span>BACK</span>
                    </div>
                    <div>• MV Act 130: Key snatching illegal</div>
                    <div>• MV Act 207: SI rank required &gt;₹100</div>
                    <div>• CMVR 139: DigiLocker 100% legal</div>
                    <div>• Art 20(3): No forced phone unlock</div>
                    <div className="text-sky-400 font-bold pt-0.5">Anti-Corruption: 1064</div>
                  </div>
                </div>

                <button
                  id="modal-print-wallet-btn"
                  onClick={handlePrintWalletCard}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-sky-600/25 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Open Printable Wallet Card (PDF / Print)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Share & Civic Attribution */}
        <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share NyayaNow with Family & Friends'}</span>
          </button>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Public Civic Technology • Free Forever for India 🇮🇳
          </div>
        </div>

      </div>
    </div>
  );
};
